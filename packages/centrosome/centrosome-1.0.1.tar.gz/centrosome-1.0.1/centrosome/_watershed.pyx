cdef extern from "numpy/arrayobject.h":
        cdef void import_array()
import_array()

import numpy as np
cimport numpy as np
cimport cython

DTYPE_INT32 = np.int32
ctypedef np.int32_t DTYPE_INT32_t
DTYPE_BOOL = np.bool
ctypedef np.int8_t DTYPE_BOOL_t

include "heap_watershed.pxi"

@cython.boundscheck(False)
def watershed(np.ndarray[DTYPE_INT32_t,ndim=1,negative_indices=False, mode='c'] image,
              np.ndarray[DTYPE_INT32_t,ndim=2,negative_indices=False, mode='c'] pq,
              np.ndarray[DTYPE_INT32_t,ndim=2,negative_indices=False, mode='c'] structure,
              DTYPE_INT32_t ndim,
              np.ndarray[DTYPE_BOOL_t,ndim=1,negative_indices=False, mode='c'] mask,
              np.ndarray[DTYPE_INT32_t,ndim=1,negative_indices=False, mode='c'] image_shape,
              np.ndarray[DTYPE_INT32_t,ndim=1,negative_indices=False, mode='c'] output):
    """Do heavy lifting of watershed algorithm
    
    image - the flattened image pixels, converted to rank-order
    pq    - the priority queue, starts with the marked pixels
            the first element in each row is the image intensity
            the second element is the age at entry into the queue
            the third element is the index into the flattened image or labels
            the remaining elements are the coordinates of the point.
    structure - a numpy int32 array containing the structuring elements
                that define nearest neighbors. For each row, the first
                element is the stride from the point to its neighbor
                in a flattened array. The second element is an ordering
                criterion such as the manhattan distance from the center - 1
                which should be used to break ties
                in the propagation age. The remaining elements are the
                offsets from the point to its neighbor in the various
                dimensions
    ndim  - # of dimensions in the image
    mask  - numpy boolean (char) array indicating which pixels to consider
            and which to ignore. Also flattened.
    image_shape - the dimensions of the image, for boundary checking,
                  a numpy array of np.int32
    output - put the image labels in here
    """
    cdef Heapitem elem
    cdef Heapitem new_elem
    cdef DTYPE_INT32_t nneighbors = structure.shape[0] 
    cdef DTYPE_INT32_t i = 0
    cdef DTYPE_INT32_t index = 0
    cdef DTYPE_INT32_t old_index = 0
    cdef DTYPE_INT32_t max_index = image.shape[0]
    cdef DTYPE_INT32_t age_modulo = 1
    cdef DTYPE_INT32_t age = 0

    cdef Heap *hp = <Heap *> heap_from_numpy2()

    # The propagation age must be a multiple of 1 + the maximum distance ordering
    # to allow us to combine the two into a single integer to sort on:
    # age * (max_distance+1) + distance
    #
    for 0 <= i < nneighbors:
        if structure[i, 1] >= age_modulo:
            age_modulo = structure[i, 1] + 1
    #
    # The initial age must be greater than any of the seeds
    #
    for 0 <= i < pq.shape[0]:
        elem.value = pq[i, 0]
        elem.age = pq[i, 1]
        elem.index = pq[i, 2]
        if elem.age >= age:
            age = elem.age+1
        heappush(hp, &elem)

    while hp.items > 0:
        #
        # Pop off an item to work on
        #
        heappop(hp, &elem)
        ####################################################
        # loop through each of the structuring elements
        #
        old_index = elem.index
        for 0 <= i < nneighbors:
            # get the flattened address of the neighbor
            index = structure[i,0]+old_index
            if index < 0 or index >= max_index or output[index] or not mask[index]:
                continue

            new_elem.value   = image[index]
            if new_elem.value > elem.value:
                new_elem.age = age
            else:
                new_elem.age = elem.age + age_modulo + structure[i, 1]
            new_elem.index   = index
            output[index] = output[old_index]
            #
            # Push the neighbor onto the heap to work on it later
            #
            heappush(hp, &new_elem)
    heap_done(hp)
