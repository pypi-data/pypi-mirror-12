"""
The SCIMES core package
"""
import numpy as np
import random
from itertools import combinations, cycle
from matplotlib import pyplot as plt
from astropy.io import fits
from astropy.table import Column
from sklearn import metrics
from .spectral import spectral_clustering

def mat_smooth(Mat, scalpar = 0, lscal = False):
    """
    Estimate the scaling parameter and rescale
    the affinity matrix through a Gaussian kernel.
    
    Parameters
    -----------

    Mat: numpy array
        The affinity matrix to be rescaled

    scalpar: float
        User-defined scaling parameter

    lscal: boll
        Rescale the matrix using a local
        scaling approach
        
    Return
    -------

    NM: numpy array
        Rescaled affinity matrix

    sigmas: float
        The estimated scaling parameter

    """
    
    # Using estimated global scaling    
    if scalpar == 0 and lscal == False:

        Aff = np.unique(Mat.ravel())[1::]
        psigmas = (Aff+np.roll(Aff,-1))/2
            
        psigmas = psigmas[1:-1]        

        diff = np.roll(Aff,-1)-Aff                
        diff = diff[1:-1]

        sel_diff_ind = np.min(np.argsort(diff)[::-1][0:5])
        sigmas = psigmas[sel_diff_ind]**2

        print '-- Estimated scaling parameter:', np.sqrt(sigmas)

    # Using local scaling        
    if scalpar == 0 and lscal == True:

        print "-- Local scaling"

        dr = np.std(Mat, axis=0)
        sigmar = np.tile(dr,(Mat.shape[0],1))
        sigmas = sigmar*sigmar.T


    # Using user-defined scaling parameter
    if scalpar != 0:

        print "-- User defined scaling parameter:", scalpar
        sigmas = scalpar**2

            
    NM = np.exp(-(Mat**2)/sigmas)
    NM[range(NM.shape[0]), range(NM.shape[1])] = 0

    return NM, sigmas
    


def aff_matrix(allleavidx, alllevels, dictparents, dictprops):

    """
    Generate the affinity matrices
    
    Parameters
    -----------

    allleavidx: list
        List of all leaf indexes within the
        dendrogram

    alllevels: list
        Dendrogram levels of all structures

    dictparents: dictionary
        Parents and ancestors of all leaves
        within the dendrogram

    dictprops: dictionary
        Properties of all leaf parents and
        ancestors within the dendrogram
        
    Return
    -------

    WAs: numpy array
        Volume and luminosity affinity matrices

    """
    
    print "- Creating affinity matrices"

    num = len(allleavidx)        
    WAs = np.zeros((2,num,num))

    volumes = dictprops['volumes']
    luminosities = dictprops['luminosities']
        
    # Let's save one for loop
    combs = list(combinations(xrange(num), 2))
    ncombs = len(combs)
    
    # Going through the branch
    for i in range(ncombs):

        icont = combs[i][0]
        jcont = combs[i][1]
            
        i_idx = allleavidx[icont]
        imat = allleavidx.index(i_idx)
                
        j_idx = allleavidx[jcont]
        jmat = allleavidx.index(j_idx)
            
        ipars = dictparents[str(i_idx)]
        jpars = dictparents[str(j_idx)]

        # Find shorter list for the comparison
        lpars = min(ipars,jpars)

        # Finding the common parents
        aux_commons = np.asarray(list(set(ipars).intersection(set(jpars))))
        plevels = alllevels[aux_commons]
        pi_idx = aux_commons[plevels == max(plevels)][0]

        # Volume
        wij = volumes[pi_idx]
        WAs[0,imat,jmat] = wij
        WAs[0,jmat,imat] = wij
        
        # Luminosity
        wij = luminosities[pi_idx]
        WAs[1,imat,jmat] = wij
        WAs[1,jmat,imat] = wij

    return WAs




def guessk(Mat, thresh = 0.2):

    """
    Guess the number of clusters by couting
    the connected blocks in the affinity matrix
    
    Parameters
    -----------

    Mat: numpy array
        The rescaled affinity matrix to guess the
        number of cluster from

    thresh: float
        The threshold to mask the matrix and count
        the blocks
        
    Return
    -------

    kguess: int
        Number of guessed clusters

    """
    
    M = 1*Mat
    M[M < thresh] = 0
    M[M > 0] = 1


    np.fill_diagonal(M, 1)
    guess_clusters = np.zeros(M.shape[0])

    for i in range(M.shape[0]):
        guess_clusters[i] = sum(M[i,:])

    kguess = 1
    i = 0

    while i < len(guess_clusters)-1:

        curr = int(guess_clusters[i])

        if curr != 1:
            kguess = kguess+1

        i = i + curr

    """
    np.fill_diagonal(M, 0)
    D = np.zeros(M.shape)

    for i in range(D.shape[0]):
        D[i,i] = sum(M[i,:])

    Lap = D - M
    eigv = np.abs(np.linalg.eigvals(Lap))

    kguess2 = len(np.where(eigv == 0)[0])    

    """
            
    return kguess




def clust_cleaning(allleavidx, allclusters, dictpars, dictchilds):

    """
    Remove clusters that do not corresponds to
    isolated dendrogram branches
    
    Parameters
    -----------

    allleavidx: list
        List of all leaf indexes within the
        dendrogram

    allclusters: list
        List of dendrogram indexes that
        correspond to significant objects
        (i.e. clusters)

    dictpars: dictionary
        Parents and ancestors of all leaves
        within the dendrogram

    dictchilds: dictionary
        Children of all branches
        within the dendrogram
        
    Return
    -------

    cores_idx: list
        The final cluster dendrogram indexes

    """
        
    cores_idx = []
      
    for cluster in set(allclusters):

        # Selecting the cluster
        clust_idx = allclusters == cluster

        # Leaves and levels in that cluster
        clust_leaves_idx = np.asarray(allleavidx)[clust_idx]

        all_par_list = []
        
        for cli in clust_leaves_idx:

            par_list = dictpars[str(cli)]
            par_list = par_list[0:-1] #The lowest, the trunk, is not considered

            all_par_list = all_par_list + par_list

        all_par_list = list(set(all_par_list))
        
        core_clust_num = []
        clust_core_num = []
        
        for i in range(len(all_par_list)):
            
            sel_par = all_par_list[i]
            core_leaves_idx = dictchilds[str(sel_par)]

            # Leaves in the core but not in the cluster
            core_clust = list(set(core_leaves_idx) - set(clust_leaves_idx))
            core_clust_num.append(len(core_clust))

            # Leaves in the cluster but not in the core            
            clust_core = list(set(clust_leaves_idx) & set(core_leaves_idx))
            clust_core_num.append(len(clust_core))

        # The selected core must not contain other leaves than
        # those of the cluster, plus it is the one with the highest
        # number of cluster leaves contained    

        core_clust_num = np.asarray(core_clust_num)
        core_clust_num0 = np.where(core_clust_num == 0)
        
        if len(core_clust_num0[0]) > 0:
        
            all_par_list = np.asarray(all_par_list)
            all_par_list0 = all_par_list[core_clust_num0]
            all_par_list0 = np.asarray(all_par_list0)
            
            clust_core_num = np.asarray(clust_core_num)
            clust_core_num0 = clust_core_num[core_clust_num0]
            clust_core_num0 = np.asarray(clust_core_num0)
            
            max_num = max(clust_core_num0)
            cores = all_par_list0[np.where(clust_core_num0 == max_num)]           

            cores_idx = cores_idx + cores.tolist()
            
        else:

            print "Unassignable cluster ", cluster
            
    return cores_idx





def cloudstering(dendrogram, catalog, criteria, user_k, user_ams, user_scalpars, ssingle, locscal, blind):    

    """
    SCIMES main function. It collects parents/children
    of all structrures within the dendrogram, and their
    properties. It calls the affinity matrix-related
    functions (for creation, rescaling, cluster counting),
    and it runs several time the actual spectral clustering
    routine by calculating every time the silhouette of the
    current configuration. Input parameter are passed by the
    SpectralCloudstering class.
    
    Parameters
    -----------

    dendrogram: 'astrodendro.dendrogram.Dendrogram' instance
        The dendrogram to clusterize

    catalog: 'astropy.table.table.Table' instance
        A catalog containing all properties of the dendrogram
        structures. Generally generated with ppv_catalog module

    criteria: list
        Defaul clustering criteria to use,
        0 = volume, 1 = luminosity

    user_k: int
        The expected number of clusters, if not provided
        it will be guessed automatically through the eigenvalues
        of the unsmoothed affinity matrix

    user_ams: numpy array
        User provided affinity matrix. Whether this is not
        furnish it is automatically generated through the
        volume and/or luminosity criteria

    user_scalpars: list of floats
        User-provided scaling parameters to smooth the
        affinity matrices

    locscal: bool
        Smooth the affinity matrices using a local
        scaling technique
    
    ssingles: bool
        Consider the single, isolated leaves as
        individual 'clusters'. Useful for low
        resolution data where the beam size
        corresponds to the size of a Giant
        Molecular Cloud
    
    blind: bool
        Show the affinity matrices. 
        Matplotlib required

    Return
    -------

    clusts: list
        The dendrogram branch indexes corresponding to the
        identified clusters

    AMs: numpy array
        The affinity matrices calculated by the algorithm
    
    escalpars: list
        Estimated scaling parameters for the different
        affinity matrixes
    
    silhoutte: float
        Silhouette of the best cluster configuration

    """

    # Collecting all connectivity information into more handy lists
    all_structures_idx = range(len(catalog['radius'].data))

    all_levels = []

    all_leav_names = []
    all_leav_idx = []

    all_brc_names = []
    all_brc_idx = []

    all_parents = []
    all_children = []

    trunk_brs_idx = []
    two_clust_idx = []    
    mul_leav_idx = []
    
    for structure_idx in all_structures_idx:

        s = dendrogram[structure_idx]
        all_levels.append(s.level)

        # If structure is a leaf find all the parents
        if s.is_leaf and s.parent != None:

            par = s.parent
            all_leav_names.append(str(s.idx))

            parents = []
            
            while par != None:

                parents.append(par.idx)
                par = par.parent
                
            parents.append(len(catalog['radius'].data)) # This is the trunk!
            all_parents.append(parents)
            
            
        # If structure is a brach find all its leaves
        if s.is_branch:

            all_brc_idx.append(s.idx)
            all_brc_names.append(str(s.idx))
            
            children = []
            
            for leaf in s.sorted_leaves():

                children.append(leaf.idx)
                
            all_children.append(children)

            # Trunk branches
            if s.parent == None:

                trunk_brs_idx.append(s.idx)
                all_leav_idx = all_leav_idx + children

                if s.children[0].is_branch or s.children[1].is_branch:
                    mul_leav_idx = mul_leav_idx + children
                else:
                    two_clust_idx.append(s.idx)
        
    two_clust_idx = np.unique(two_clust_idx).tolist()
    
    dict_parents = dict(zip(all_leav_names,all_parents))            
    dict_children = dict(zip(all_brc_names,all_children))    
    
    all_levels.append(-1)
    all_levels = np.asarray(all_levels)

    # Retriving needed properties from the catalog
    volumes = catalog['volume'].data
    luminosities = catalog['luminosity'].data

    t_volume = sum(volumes[trunk_brs_idx])
    t_luminosity = sum(luminosities[trunk_brs_idx])

    volumes = volumes.tolist()
    luminosities = luminosities.tolist()

    volumes.append(t_volume)
    luminosities.append(t_luminosity)
    
    dict_props = {'volumes':volumes, 'luminosities':luminosities}
     
    # Generating affinity matrices if not provided
    if user_ams == None:

        AMs = aff_matrix(all_leav_idx, all_levels, dict_parents, dict_props)

        if blind == False:
            
            # Showing the volume and luminosity affinity matrices
            fig = plt.figure(figsize=(12, 6))

            ax1 = fig.add_subplot(121)
            m1 = ax1.imshow(AMs[0,:,:], interpolation = 'nearest')
            ax1.set_title('"Volume" affinity matrix', fontsize = 'medium')
            ax1.set_xlabel('leaf index')
            ax1.set_ylabel('leaf index')    
            cb1 = plt.colorbar(m1)

            ax2 = fig.add_subplot(122)
            m2 = ax2.imshow(AMs[1,:,:], interpolation = 'nearest')
            ax2.set_xlabel('leaf index')
            ax2.set_ylabel('leaf index')        
            ax2.set_title('"Luminosity" affinity matrix', fontsize = 'medium')
            cb2 = plt.colorbar(m2)
        
    else:

        AMs = user_ams


    # Check if the affinity matrix has more than 2 elements
    # otherwise return everything as clusters ("savesingles").
    if AMs.shape[1] <= 2:

        print '--- Not necessary to cluster. "savesingles" keyword triggered.'

        all_leaves = []
        for leaf in dendrogram.leaves:
            all_leaves.append(leaf.idx)

        clusts = all_leaves

        return clusts, AMs
        
                
    # Check whether the affinity matrix scaling parameter
    # are provided by the user, if so use them, otherwise
    # calculate them    

    if user_scalpars == None:
        scpars = np.zeros(max(criteria)+1)
    else:
        scpars = user_scalpars

                
    print "- Start spectral clustering"

    # Selecting the criteria and merging the matrices    
    escalpars = []
    for cr in criteria:

        print "-- Rescaling ", cr, " matrix"
        
        if criteria.index(cr) == 0:
            AM, sigma = mat_smooth(AMs[cr,:,:], scalpar = scpars[cr], lscal = locscal)
            escalpars.append(sigma)                
        else:
            AMc, sigma = mat_smooth(AMs[cr,:,:], scalpar = scpars[cr], lscal = locscal)
            AM = AM*AMc
            escalpars.append(sigma)
            
    
    # Making the reduced affinity matrices
    mul_leav_mat = []
    for mli in mul_leav_idx:
        mul_leav_mat.append(all_leav_idx.index(mli))

    mul_leav_mat = np.asarray(mul_leav_mat)
    rAM = AM[mul_leav_mat,:]
    rAM = rAM[:,mul_leav_mat]

    if blind == False:
            
        # Showing the final affinity matrix
        plt.matshow(AM)
        plt.colorbar()
        plt.title('Final Affinity Matrix')
        plt.xlabel('leaf index')
        plt.ylabel('leaf index')

      
    # Guessing the number of clusters
    # if not provided

    if user_k == 0:   
        kg = guessk(rAM)
    else:
        kg = user_k-len(two_clust_idx)

    print '-- Guessed number of clusters =', kg+len(two_clust_idx)
    
    if kg > 1:

        # Find the best cluster number
        sils = []

        min_ks = max(2,kg-15)
        max_ks = min(kg+15,rAM.shape[0]-1)
                
        for ks in range(min_ks,max_ks):

            try:
                     
                all_clusters, evecs = spectral_clustering(rAM, n_clusters=ks, assign_labels = 'kmeans', eigen_solver='arpack')
                sil = metrics.silhouette_score(evecs, np.asarray(all_clusters), metric='euclidean')

            except np.linalg.LinAlgError:

                sil = 0
                
            sils.append(sil)
                    
        # Use the best cluster number to generate clusters                    
        best_ks = sils.index(max(sils))+min_ks
        print "-- Best cluster number found through SILHOUETTE (", max(sils),")= ", best_ks+len(two_clust_idx)
        silhoutte = max(sils)
        
        all_clusters, evecs = spectral_clustering(rAM, n_clusters=best_ks, assign_labels = 'kmeans', eigen_solver='arpack')
                        
    else:

        print '-- Not necessary to cluster'
        all_clusters = np.zeros(len(all_leaves_idx), dtype = np.int32)
        

    clust_branches = clust_cleaning(mul_leav_idx, all_clusters, dict_parents, dict_children)
    clusts = clust_branches + two_clust_idx

    print "-- Final cluster number (after cleaning)", len(clusts)
    

    

    # Add to the cluster list the single leaves, if required
    if ssingle == True:

        all_leaves = []
        clust_leaves = []

        for leaf in dendrogram.leaves:
            all_leaves.append(leaf.idx)

        for clust in clusts:
            for leaf in dendrogram[clust].sorted_leaves():
                clust_leaves.append(leaf.idx)

        unclust_leaves = list(set(all_leaves)-set(clust_leaves))

        clusts = clusts + unclust_leaves

        print "-- Unclustered leaves added. Final cluster number", len(clusts)
    
    return clusts, AMs, escalpars, silhoutte 


    
    
class SpectralCloudstering(object):
    """
    Apply the spectral clustering to find the best 
    cloud segmentation out from a dendrogram.

    Parameters
    -----------

    dendrogram: 'astrodendro.dendrogram.Dendrogram' instance
        The dendrogram to clusterize

    catalog: 'astropy.table.table.Table' instance
        A catalog containing all properties of the dendrogram
        structures. Generally generated with ppv_catalog module

    cl_volume: bool
        Clusterize the dendrogram using the 'volume' criterium 

    cl_luminosity: bool
        Clusterize the dendrogram using the 'luminosity' criterium        

    user_k: int
        The expected number of clusters, if not provided
        it will be guessed automatically through the eigenvalues
        of the unsmoothed affinity matrix

    user_ams: numpy array
        User provided affinity matrix. Whether this is not
        furnish it is automatically generated through the
        volume and/or luminosity criteria

    user_scalpars: list of floats
        User-provided scaling parameters to smooth the
        affinity matrices

    locscaling: bool
        Smooth the affinity matrices using a local
        scaling technique
    
    savesingles: bool
        Consider the single, isolated leaves as
        individual 'clusters'. Useful for low
        resolution data where the beam size
        corresponds to the size of a Giant
        Molecular Cloud.
    
    blind: bool
        Show the affinity matrices. 
        Matplotlib required.

    Return
    -------

    clusters: list
        The dendrogram branch indexes corresponding to the
        identified clusters

    affmats: numpy array
        The affinity matrices calculated by the algorithm
    
    escalpars: list
        Estimated scaling parameters for the different
        affinity matrixes
    
    silhouette: float
        Silhouette of the best cluster configuration
        
    """

    def __init__(self, dendrogram, catalog, cl_volume = True, cl_luminosity=True,
                 user_k = None, user_ams = None, user_scalpars = None,
                 savesingles = False, locscaling = False, blind = False):

        self.dendrogram = dendrogram
        self.catalog = catalog
        if 'luminosity' not in catalog.colnames:
            print("WARNING: adding luminosity = flux to the catalog.")
            catalog.add_column(Column(catalog['flux'], 'luminosity'))
        if 'volume' not in catalog.colnames:
            print("WARNING: adding volume = pi * radius^2 * v_rms to the catalog.")
            catalog.add_column(Column(catalog['radius']**2*np.pi *
                                      catalog['v_rms'], 'volume'))
        
        self.cl_volume = cl_volume
        self.cl_luminosity = cl_luminosity
        self.user_k = user_k or 0
        self.user_ams = user_ams
        self.user_scalpars = user_scalpars
        self.locscaling = locscaling        
        self.savesingles = savesingles
        self.blind = blind

        # Clustering criteria chosen
        self.criteria = []
        if self.cl_volume:
            self.criteria.append(0)
        if self.cl_luminosity:
            self.criteria.append(1)

        if self.cl_volume == False:
            print("WARNING: clustering will be performed on the Luminosity matrix only")

        if self.cl_luminosity == False:
            print("WARNING: clustering will be performed on the Volume matrix only")

        if self.cl_luminosity and self.cl_volume:
            print("WARNING: clustering will be performed on the Aggregated matrix")

        # Default colors in case plot_connected_colors is called before showdendro
        self.colors = cycle('rgbcmyk')
        
        self.clusters, self.affmats, self.escalpars, self.silhouette = cloudstering(self.dendrogram,
                                                                                    self.catalog,
                                                                                    self.criteria,
                                                   self.user_k, self.user_ams, self.user_scalpars,
                                                   self.savesingles, self.locscaling, self.blind)

    def showdendro(self):
        
        """

        Show the clustered dendrogram
        every color correspond to a
        different cluster

        """

        dendro = self.dendrogram
        cores_idx = self.clusters


        # For the random colors
        r = lambda: random.randint(0,255)
                 
        p = dendro.plotter()

        fig = plt.figure(figsize=(14, 8))
        ax = fig.add_subplot(111)
                
        ax.set_yscale('log')
                
        cols = []

        
        # Plot the whole tree

        p.plot_tree(ax, color='black')

        for i in range(len(cores_idx)):

            col = '#%02X%02X%02X' % (r(),r(),r())
            cols.append(col)
            p.plot_tree(ax, structure=dendro[cores_idx[i]], color=cols[i], lw=3)

        ax.set_title("Final clustering configuration")

        ax.set_xlabel("Structure")
        ax.set_ylabel("Flux")

        self.colors = cols



    def plot_connected_clusters(self, **kwargs):
        from plotting import dendroplot_clusters

        return dendroplot_clusters(self.clusters, self.dendrogram, self.catalog,
                                   colors=self.colors,
                                   **kwargs)


    def asgncube(self, header, collapse = True):

        """
        Create a label cube with only the cluster (cloudster) IDs included, and
        write to disk.

        Parameters
        ----------
        header : `fits.Header`
            The header of the output assignment cube.  Should be the same
            header that the dendrogram was generated from
            
        collapse : bool
            Collapsed (2D) version of the assignment cube

        Return
        -------
        asgn = 'astropy.io.fits.PrimaryHDU' instance
            Cube of labels

        """

        data = self.dendrogram.data.squeeze()
        dendro = self.dendrogram
        
        # Making the assignment cube
        asgn = np.zeros(data.shape, dtype=np.int32)

        for i in self.clusters:
            asgn[np.where(dendro[i].get_mask(shape = asgn.shape))] = i+1


        # Write the fits file
        self.asgn = fits.PrimaryHDU(asgn.astype('short'), header)

        # Collapsed version of the asgn cube
        if collapse:

            asgn_map = np.amax(self.asgn.data, axis = 0) 

            plt.matshow(asgn_map, origin = "lower")
            cbar = plt.colorbar()
            cbar.ax.get_yaxis().labelpad = 15
            cbar.ax.set_ylabel('Structure label', rotation=270)

