#cython: boundscheck=False, nonecheck=False
# Minimum spanning tree single linkage implementation for hdbscan
# Authors: Leland McInnes, Steve Astels
# License: 3-clause BSD

cimport cython

import numpy as np
cimport numpy as np

from libc.float cimport DBL_MAX

from scipy.spatial.distance import cdist, pdist

cpdef np.ndarray[np.double_t, ndim=2] mst_linkage_core(
                               np.ndarray[np.double_t, ndim=2] distance_matrix):

    cdef np.ndarray[np.int64_t, ndim=1] node_labels
    cdef np.ndarray[np.int64_t, ndim=1] current_labels
    cdef np.ndarray[np.double_t, ndim=1] current_distances
    cdef np.ndarray[np.double_t, ndim=1] left
    cdef np.ndarray[np.double_t, ndim=1] right
    cdef np.ndarray[np.double_t, ndim=2] result
    
    cdef np.ndarray label_filter
    
    cdef long long current_node
    cdef long long new_node_index
    cdef long long new_node
    cdef long long i
    
    result = np.zeros((distance_matrix.shape[0] - 1, 3))
    node_labels = np.arange(distance_matrix.shape[0], dtype=np.int64)
    current_node = 0
    current_distances = np.infty * np.ones(distance_matrix.shape[0])
    current_labels = node_labels
    for i in range(1,node_labels.shape[0]):
        label_filter = current_labels != current_node
        current_labels = current_labels[label_filter]
        left = current_distances[label_filter]
        right = distance_matrix[current_node][current_labels]
        current_distances = np.where(left < right, left, right)
        
        new_node_index = np.argmin(current_distances)
        new_node = current_labels[new_node_index]
        result[i - 1, 0] = <double> current_node
        result[i - 1, 1] = <double> new_node
        result[i - 1, 2] = current_distances[new_node_index]
        current_node = new_node
        
    return result

cdef void select_distances(
    np.ndarray[np.double_t, ndim=1] pdist_matrix,
    np.ndarray[np.int64_t, ndim=1] col_select,
    np.ndarray[np.int64_t, ndim=1] current_labels,
    np.ndarray[np.double_t, ndim=1] result_buffer,
    long long row_num,
    long long dim
):

    cdef np.ndarray[np.int64_t, ndim=1] col_selection

    cdef long long i
    cdef long long n_labels = len(current_labels)
    cdef long long row_start

    col_selection = col_select - (dim - row_num)

    if row_num == 0:
        row_start = 0
    else:
        row_start = col_select[row_num - 1]

    for i in range(n_labels):
        if current_labels[i] < row_num:
            result_buffer[i] = pdist_matrix[col_selection[current_labels[i]]]
        else:
            break

    result_buffer[i:n_labels] = pdist_matrix[current_labels[i:] - (row_num + 1) + row_start]
    return
    

cpdef np.ndarray[np.double_t, ndim=2] mst_linkage_core_pdist(
                               np.ndarray[np.double_t, ndim=1] pdist_matrix):

    cdef np.ndarray[np.int64_t, ndim=1] node_labels
    cdef np.ndarray[np.int64_t, ndim=1] current_labels
    cdef np.ndarray[np.double_t, ndim=1] current_distances
    cdef np.ndarray[np.double_t, ndim=1] left
    cdef np.ndarray[np.double_t, ndim=1] right
    cdef np.ndarray[np.int64_t, ndim=1] col_select
    cdef np.ndarray[np.double_t, ndim=2] result
    
    cdef np.ndarray label_filter
    
    cdef long long current_node
    cdef long long new_node_index
    cdef long long new_node
    cdef long long i
    cdef long long dim

    dim = int((1 + np.sqrt(1 + 8 * pdist_matrix.shape[0])) / 2.0)
    col_select = np.cumsum(np.arange(dim - 1, 0, -1))
    
    result = np.zeros((dim - 1, 3))
    node_labels = np.arange(dim, dtype=np.int64)
    current_node = 0
    current_distances = np.infty * np.ones(dim)
    current_labels = node_labels
    right = np.empty(dim, dtype=np.double)
    for i in range(1,node_labels.shape[0]):
        label_filter = current_labels != current_node
        current_labels = current_labels[label_filter]
        left = current_distances[label_filter]
        #right = fill_row(pdist_matrix, current_node, dim, col_select)[current_labels]
        select_distances(pdist_matrix, col_select, current_labels, right, current_node, dim)
        current_distances = np.where(left < right[:len(current_labels)], left, right[:len(current_labels)])
        
        new_node_index = np.argmin(current_distances)
        new_node = current_labels[new_node_index]
        result[i - 1, 0] = <double> current_node
        result[i - 1, 1] = <double> new_node
        result[i - 1, 2] = current_distances[new_node_index]
        current_node = new_node
        
    return result

cpdef np.ndarray[np.double_t, ndim=2] mst_linkage_core_cdist(
                               np.ndarray raw_data,
                               np.ndarray[np.double_t, ndim=1] core_distances,
                               object metric,
                               int p):

    cdef np.ndarray[np.int64_t, ndim=1] node_labels
    cdef np.ndarray[np.int64_t, ndim=1] current_labels
    cdef np.ndarray[np.double_t, ndim=1] current_distances
    cdef np.ndarray[np.double_t, ndim=1] current_core_distances
    cdef np.ndarray[np.double_t, ndim=1] left
    # cdef np.ndarray[np.double_t, ndim=1] right
    cdef np.ndarray[np.double_t, ndim=2] result

    cdef np.ndarray label_filter

    cdef long long current_node
    cdef long long comparison_node
    cdef long long new_node_index
    cdef long long new_node
    cdef long long i
    cdef long long j
    cdef long long dim

    cdef double current_node_core_distance
    cdef double right_value
    cdef double left_value
    cdef double core_value
    cdef double new_distance

    dim = raw_data.shape[0]

    result = np.zeros((dim - 1, 3))
    node_labels = np.arange(dim, dtype=np.int64)
    current_node = 0
    current_distances = np.infty * np.ones(dim)
    current_labels = node_labels
    current_core_distances = core_distances

    masked = 0

    for i in range(1, dim):

        label_filter = current_labels != current_node
        current_labels = current_labels[label_filter]
        current_core_distances = current_core_distances[label_filter]

        left = cdist(raw_data[[current_node]], raw_data, metric=metric, p=p)[0][current_labels] # good

        current_distances = current_distances[label_filter]
        current_node_core_distance = core_distances[current_node]

        new_distance = DBL_MAX
        new_node = 0

        for j in range(current_labels.shape[0]):
            right_value = current_distances[j]
            left_value = left[j]
            comparison_node = current_labels[j]
            core_value = core_distances[comparison_node]
            if current_node_core_distance > right_value or core_value > right_value or left_value > right_value:
                if right_value < new_distance:
                    new_distance = right_value
                    new_node = current_labels[j]
                continue

            if core_value > current_node_core_distance:
                if core_value > left_value:
                    left_value = core_value
            else:
                if current_node_core_distance > left_value:
                    left_value = current_node_core_distance

            if left_value < right_value:
                current_distances[j] = left_value
                if left_value < new_distance:
                    new_distance = left_value
                    new_node = current_labels[j]
            else:
                if right_value < new_distance:
                    new_distance = right_value
                    new_node = current_labels[j]

        result[i - 1, 0] = <double> current_node
        result[i - 1, 1] = <double> new_node
        result[i - 1, 2] = new_distance
        current_node = new_node

    return result



cdef tuple get_candidate(object kdtree, long long point_index, np.ndarray[np.double_t, ndim=1] core_distances):

    point_core_distance = core_distances[point_index]
    point = kdtree.data[point_index]
    first_pass_candidates = kdtree.query_radius(point, point_core_distance)[0]

    candidate_core_distances = core_distances[first_pass_candidates]
    best_candidate_index = candidate_core_distances.argmin()
    second_pass_radius = candidate_core_distances[best_candidate_index]

    if second_pass_radius <= point_core_distance:
        return first_pass_candidates[best_candidate_index], point_core_distance

    second_pass_candidates, second_pass_distances = kdtree.query_radius(point, second_pass_radius, return_distance=True)

    candidate_core_distances = core_distances[second_pass_candidates]

    candidate_reachability_distances = np.empty(len(second_pass_candidates), dtype=np.double)

    for i in range(len(second_pass_candidates)):
        if candidate_core_distances[i] > second_pass_distances:
            if candidate_core_distances[i] > point_core_distance:
                candidate_reachability_distances[i] = second_pass_distances[i]
            else:
                 candidate_reachability_distances[i] = point_core_distance
        else:
            if second_pass_distances[i] > point_core_distance:
                candidate_reachability_distances[i] = second_pass_distances[i]
            else:
                candidate_reachability_distances[i] = point_core_distance

    best_candidate_index = candidate_reachability_distances.argmin()

    return (second_pass_candidates[best_candidate_index],
            candidate_reachability_distances[best_candidate_index])

# Started blocking this out, so hang onto it for now, but need considerably more work
# to make it correct (deal with removing and updating node candidates rom the queue)
#cpdef mst_linkage_core_kdtree(object kdtree, np.ndarray[np.double_t, ndim=1] core_distances):
#
#    cdef long long dim
#    cdef long long current_node
#    cdef long long new_candidate
#
#    dim = kdtree.data.shape[0]
#    node_labels = np.arange(dim, dtype=np.int64)
#    result = np.zeros((dim - 1, 3))
#
#    current_node = 0
#
#    for i in range(1, dim):
#        new_candidate, new_distance = get_candidate(kdtree, current_node, core_distances)
#        priority_queue.add(new_candidate, new_distance)
#        new_node, new_distance = priority_queue.pop()
#        result[i - 1, 0] = <double> current_node
#        result[i - 1, 1] = <double> new_node
#        result[i - 1, 2] = new_distance
#        current_node = new_node
#
#    return result

cdef class UnionFind (object):

    cdef np.ndarray parent
    cdef np.ndarray size
    cdef long long next_label
    
    def __init__(self, N):
        self.parent = -1 * np.ones(2 * N - 1, dtype=np.int64)
        self.next_label = N
        self.size = np.hstack((np.ones(N, dtype=np.int64),
                               np.zeros(N-1, dtype=np.int64)))
                               
    cdef void union(self, long long m, long long n):
        self.size[self.next_label] = self.size[m] + self.size[n]
        self.parent[m] = self.next_label
        self.parent[n] = self.next_label
        self.size[self.next_label] = self.size[m] + self.size[n]
        self.next_label += 1
        
        return
        
    cdef long long find(self, long long n):
        while self.parent[n] != -1:
            n = self.parent[n]
        return n
        
    cdef long long fast_find(self, long long n):
        cdef long long p
        p = n
        while self.parent[n] != -1:
            n = self.parent[n]
        # label up to the root
        while self.parent[p] != n:
            p, self.parent[p] = self.parent[p], n
        return n
        
cpdef np.ndarray[np.double_t, ndim=2] label(np.ndarray[np.double_t, ndim=2] L, 
                                           do_fast_find=True):

    cdef np.ndarray[np.double_t, ndim=2] result

    cdef long long N, a, aa, b, bb, idx
    cdef float delta
    
    result = np.zeros((L.shape[0], L.shape[1] + 1))
    N = L.shape[0] + 1
    U = UnionFind(N)
    
    for index, (a, b, delta) in enumerate(L):
        if do_fast_find:
            aa, bb = U.fast_find(a), U.fast_find(b)
        else:
            aa, bb, = U.find(a), U.find(b)
            
        result[index, 0] = aa
        result[index, 1] = bb
        result[index, 2] = delta
        result[index, 3] = U.size[aa] + U.size[bb]
        
        U.union(aa, bb)
       
    return result

cpdef np.ndarray[np.double_t, ndim=2] single_linkage(distance_matrix):
    
    cdef np.ndarray[np.double_t, ndim=2] hierarchy
    cdef np.ndarray[np.double_t, ndim=2] for_labelling
    
    hierarchy = mst_linkage_core(distance_matrix)
    for_labelling = hierarchy[np.argsort(hierarchy.T[2]), :]
    return label(for_labelling)
    
    
    
    
    
        
    
