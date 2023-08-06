import numpy as np
cimport numpy as np

import cython
cimport cython
import bdot
from bcolz.carray_ext cimport carray, chunk


# numpy optimizations from:
# http://docs.cython.org/src/tutorial/numpy.html

# fused types (templating) from
# http://docs.cython.org/src/userguide/fusedtypes.html

ctypedef fused numpy_native_number:
	np.int64_t
	np.int32_t
	np.float64_t
	np.float32_t


@cython.wraparound(False)
@cython.boundscheck(False)
cpdef _dot(carray matrix, np.ndarray[numpy_native_number, ndim=1] vector, np.ndarray[numpy_native_number, ndim=1] result):
	'''
		Calculate dot product between a bcolz.carray matrix and a numpy vector.
		Second dimension of matrix must match first dimension of vector.

		Arguments:
			matrix (carray): two dimensional matrix in a bcolz.carray, row vector format
			vector (ndarray): one dimensional vector in a numpy array

		Returns:
			ndarray: result of dot product, one value per row in orginal matrix
	'''

	# fused type conversion
	if numpy_native_number is np.int64_t:
		p_dtype = np.int64
	elif numpy_native_number is np.int32_t:
		p_dtype = np.int32
	elif numpy_native_number is np.float64_t:
		p_dtype = np.float64
	else:
		p_dtype = np.float32

	# declaration
	cdef:
		Py_ssize_t i, chunk_start, chunk_len, leftover_len
		unsigned int result_j, j
		np.ndarray[numpy_native_number] dot_i
		np.ndarray[numpy_native_number, ndim=2] m_i
		chunk chunk_

	# initialization
	chunk_len = matrix.chunklen
	leftover_len = cython.cmod(matrix.shape[0], matrix.chunklen)

	try:
		dot_i = np.empty(matrix.chunklen, dtype=p_dtype)
		m_i = np.empty((matrix.chunklen, matrix.shape[1]), dtype=p_dtype)
	except:
		raise MemoryError("couldn't created intermediate arrays")


	# computation
	for i in range(matrix.nchunks):
		chunk_ = matrix.chunks[i]

		chunk_._getitem(0, chunk_len, m_i.data)
		np.dot(m_i, vector, out=dot_i)

		# copy to result
		chunk_start = i * chunk_len
		for j in range(chunk_len):
			result_j = <unsigned int> (chunk_start + j)
			result[result_j] = dot_i[j]


	if leftover_len > 0:
		np.dot(matrix.leftover_array, vector, out=dot_i)

		chunk_start = matrix.nchunks * chunk_len
		for j in range(leftover_len):
			result_j = <unsigned int> (chunk_start + j)
			result[result_j] = dot_i[j]



@cython.wraparound(False)
@cython.boundscheck(False)
cpdef _dot_carray(carray matrix, np.ndarray[numpy_native_number, ndim=1] vector, carray c_result):
	'''
		Calculate dot product between a bcolz.carray matrix and a numpy vector, storing the results
		in a carray.
		Second dimension of matrix must match first dimension of vector.

		Arguments:
			matrix (carray): two dimensional matrix in a bcolz.carray, row vector format
			vector (ndarray): one dimensional vector in a numpy array

		Returns:
			ndarray: result of dot product, one value per row in orginal matrix
	'''

	# fused type conversion
	if numpy_native_number is np.int64_t:
		p_dtype = np.int64
	elif numpy_native_number is np.int32_t:
		p_dtype = np.int32
	elif numpy_native_number is np.float64_t:
		p_dtype = np.float64
	else:
		p_dtype = np.float32

	# declaration
	cdef:
		Py_ssize_t i, chunk_start, chunk_len, leftover_len
		np.ndarray[numpy_native_number] dot_i
		np.ndarray[numpy_native_number, ndim=2] m_i
		chunk chunk_

	# initialization
	chunk_len = matrix.chunklen
	leftover_len = cython.cmod(matrix.shape[0], matrix.chunklen)

	try:
		dot_i = np.empty(matrix.chunklen, dtype=p_dtype)
		m_i = np.empty((matrix.chunklen, matrix.shape[1]), dtype=p_dtype)
	except:
		raise MemoryError("couldn't created intermediate arrays")


	# computation
	for i in range(matrix.nchunks):
		chunk_ = matrix.chunks[i]

		chunk_._getitem(0, chunk_len, m_i.data)
		dot_i = np.dot(m_i, vector)

		#write new chunk to result carray
		c_result.append(dot_i)

	if leftover_len > 0:
		dot_i = np.dot(matrix.leftover_array, vector)

		#write new chunk to result carray
		c_result.append(dot_i[:leftover_len])


@cython.wraparound(False)
@cython.boundscheck(False)
cpdef _dot_mat(carray m1, carray m2, np.ndarray[numpy_native_number, ndim=2] result):
	'''
		Calculate matrix multiply between bcolz.carray matrix and transpose of
		a second bcolz.carray matrix.
		Second dimension of m1 must match second dimension of m2.

		Requires that resulting matrix fit in RAM.

		Requires that chunks and matrix multiply of chunks fit in RAM.

		Arguments:
			m1 (carray): two dimensional matrix in a bcolz.carray, row vector format
			m2 (carray): two dimensional matrix in a bcolz.carray, row vector format
			type_indicator(ndarray) : hack to allow use of fused types (just pass in the first row)

		Returns:
			carray: result of matrix multiply between m1 and m2.T, matrix with dimensions equal to
			first dimension of m1 by first dimension of m2

	'''

	# fused type conversion
	if numpy_native_number is np.int64_t:
		p_dtype = np.int64
	elif numpy_native_number is np.int32_t:
		p_dtype = np.int32
	elif numpy_native_number is np.float64_t:
		p_dtype = np.float64
	else:
		p_dtype = np.float32

	# declaration
	cdef:
		Py_ssize_t i, chunk_start_i, chunk_len_i, leftover_len_i
		Py_ssize_t j, chunk_start_j, chunk_len_j, leftover_len_j
		unsigned int result_k, k
		unsigned int result_l, l
		np.ndarray[numpy_native_number, ndim=2] m_i
		np.ndarray[numpy_native_number, ndim=2] m_j
		np.ndarray[numpy_native_number, ndim=2] dot_k
		chunk chunk_i_
		chunk chunk_j_

	# initialization
	chunk_len_i = m1.chunklen
	chunk_len_j = m2.chunklen

	leftover_len_i = cython.cmod(m1.shape[0], m1.chunklen)
	leftover_len_j = cython.cmod(m2.shape[0], m2.chunklen)


	try:
		dot_k = np.empty((chunk_len_i, chunk_len_j), dtype=p_dtype)
		m_i = np.empty((chunk_len_i, m1.shape[1]), dtype=p_dtype)
		m_j = np.empty((chunk_len_j, m2.shape[1]), dtype=p_dtype)
	except:
		raise MemoryError("couldn't created intermediate arrays")


	# computation
	for i in range(m1.nchunks):

		chunk_i_ = m1.chunks[i]
		chunk_i_._getitem(0, chunk_len_i, m_i.data)


		for j in range(m2.nchunks):
			chunk_j_ = m2.chunks[j]

			chunk_j_._getitem(0, chunk_len_j, m_j.data)

			dot_k = np.dot(m_i, m_j.T)

			# copy to result
			chunk_start_i = i * chunk_len_i
			chunk_start_j = j * chunk_len_j
			for k in range(chunk_len_i):
				result_k = <unsigned int> (chunk_start_i + k)
				for l in range(chunk_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result[result_k, result_l] = dot_k[k, l]

		# do last chunk in first array
		if leftover_len_j > 0:
			dot_k = np.dot(m_i, m2.leftover_array.T)

			chunk_start_i = i * chunk_len_i
			chunk_start_j = m2.nchunks * chunk_len_j
			for k in range(chunk_len_i):
				result_k = <unsigned int> (chunk_start_i + k)
				for l in range(leftover_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result[result_k, result_l] = dot_k[k, l]


	# do last chunk in second array
	if leftover_len_i > 0:

		for j in range(m2.nchunks):

			chunk_j_ = m2.chunks[j]

			chunk_j_._getitem(0, chunk_len_j, m_j.data)

			dot_k = np.dot(m1.leftover_array, m_j.T)

			# copy to result
			chunk_start_i = m1.nchunks * chunk_len_i
			chunk_start_j = j * chunk_len_j
			for k in range(leftover_len_i):
				result_k = <unsigned int> (chunk_start_i + k)
				for l in range(chunk_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result[result_k, result_l] = dot_k[k, l]


		# do last chunk in first array
		if leftover_len_j > 0:
			dot_k = np.dot(m1.leftover_array, m2.leftover_array.T)

			chunk_start_i = m1.nchunks * chunk_len_i
			chunk_start_j = m2.nchunks * chunk_len_j
			for k in range(leftover_len_i):
				result_k = <unsigned int> (chunk_start_i + k)
				for l in range(leftover_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result[result_k, result_l] = dot_k[k, l]

	return result


@cython.wraparound(False)
@cython.boundscheck(False)
cpdef _dot_mat_carray(carray m1, carray m2, np.ndarray[numpy_native_number, ndim=1] type_indicator, carray c_result):
	'''
		Calculate matrix multiply between bcolz.carray matrix and transpose of
		a second bcolz.carray matrix.
		Second dimension of m1 must match second dimension of m2.

		Requires that chunks and matrix multiply of chunks fit in RAM.

		Arguments:
			m1 (carray): two dimensional matrix in a bcolz.carray, row vector format
			m2 (carray): two dimensional matrix in a bcolz.carray, row vector format
			type_indicator(ndarray) : hack to allow use of fused types (just pass in the first row)

		Returns:
			carray: result of matrix multiply between m1 and m2.T, matrix with dimensions equal to
			first dimension of m1 by first dimension of m2

	'''

	# fused type conversion
	if numpy_native_number is np.int64_t:
		p_dtype = np.int64
	elif numpy_native_number is np.int32_t:
		p_dtype = np.int32
	elif numpy_native_number is np.float64_t:
		p_dtype = np.float64
	else:
		p_dtype = np.float32

	# declaration
	cdef:
		Py_ssize_t i, chunk_start_i, chunk_len_i, leftover_len_i
		Py_ssize_t j, chunk_start_j, chunk_len_j, leftover_len_j
		unsigned int result_k, k
		unsigned int result_l, l
		np.ndarray[numpy_native_number, ndim=2] m_i
		np.ndarray[numpy_native_number, ndim=2] m_j
		np.ndarray[numpy_native_number, ndim=2] dot_k
		np.ndarray[numpy_native_number, ndim=2] result_i
		chunk chunk_i_
		chunk chunk_j_

	# initialization
	chunk_len_i = m1.chunklen
	chunk_len_j = m2.chunklen

	leftover_len_i = cython.cmod(m1.shape[0], m1.chunklen)
	leftover_len_j = cython.cmod(m2.shape[0], m2.chunklen)


	try:
		m_i = np.empty((chunk_len_i, m1.shape[1]), dtype=p_dtype)
		m_j = np.empty((chunk_len_j, m2.shape[1]), dtype=p_dtype)
		dot_k = np.empty((chunk_len_i, chunk_len_j), dtype=p_dtype)
		result_i = np.empty((chunk_len_i, m2.shape[0]), dtype=p_dtype)
	except:
		raise MemoryError("couldn't created intermediate arrays")


	# computation
	for i in range(m1.nchunks):

		chunk_i_ = m1.chunks[i]
		chunk_i_._getitem(0, chunk_len_i, m_i.data)

		chunk_start_i = i * chunk_len_i

		for j in range(m2.nchunks):
			chunk_j_ = m2.chunks[j]

			chunk_j_._getitem(0, chunk_len_j, m_j.data)

			dot_k = np.dot(m_i, m_j.T)

			# copy to result
			chunk_start_j = j * chunk_len_j
			for k in range(chunk_len_i):
				for l in range(chunk_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result_i[k, result_l] = dot_k[k, l]

		# do last chunk in second array
		if leftover_len_j > 0:
			dot_k = np.dot(m_i, m2.leftover_array.T)

			chunk_start_j = m2.nchunks * chunk_len_j
			for k in range(chunk_len_i):
				for l in range(leftover_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result_i[k, result_l] = dot_k[k, l]

		#write new chunk to result carray
		c_result.append(result_i) # fill_chunks(self, object array_)


	# do last chunk in first array
	if leftover_len_i > 0:

		for j in range(m2.nchunks):

			chunk_j_ = m2.chunks[j]

			chunk_j_._getitem(0, chunk_len_j, m_j.data)

			dot_k = np.dot(m1.leftover_array, m_j.T)

			# copy to result
			chunk_start_j = j * chunk_len_j
			for k in range(leftover_len_i):
				for l in range(chunk_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result_i[k, result_l] = dot_k[k, l]


		# do last chunk in both arrays
		if leftover_len_j > 0:
			dot_k = np.dot(m1.leftover_array, m2.leftover_array.T)

			chunk_start_j = m2.nchunks * chunk_len_j
			for k in range(leftover_len_i):
				for l in range(leftover_len_j):
					result_l = <unsigned int> (chunk_start_j + l)
					result_i[k, result_l] = dot_k[k, l]

		#write new chunk to result carray
		c_result.append(result_i[:leftover_len_i]) # fill_chunks(self, object array_)
