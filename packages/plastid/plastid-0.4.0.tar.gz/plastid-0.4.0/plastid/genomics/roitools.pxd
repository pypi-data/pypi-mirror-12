from plastid.genomics.c_common cimport Strand, undef_strand, ExBool, bool_exception
from cpython cimport array
import numpy
import array
cimport numpy


cdef str strand_to_str(Strand)
cdef Strand str_to_strand(str) #except undef_strand

cpdef list positions_to_segments(str,str,object)
cpdef list positionlist_to_segments(str,str,list)
cpdef Transcript add_three_for_stop_codon(Transcript)


cdef class GenomicSegment(object):
    cdef str chrom
    cdef long start
    cdef long end
    cdef Strand c_strand
    cpdef bint contains(self,GenomicSegment)
    cpdef bint overlaps(self,GenomicSegment)
    cpdef bint _cmp_helper(self,GenomicSegment,int)
    cpdef str as_igv_str(self)

cdef class SegmentChain(object):
    cdef:
        list _segments, _mask_segments
        readonly GenomicSegment spanning_segment
        readonly long length
        readonly long masked_length

        array.array _position_hash
        array.array _position_mask # really should be bint, but we can't use it there
        public dict attr
        dict _inverse_hash

    # maintenance of chain internals
    cdef bint c_add_segments(self,tuple) except False
    cdef bint _set_segments(self,list) except False
    cdef bint _set_masks(self,list) except False
    cdef void c_reset_masks(self)
    cdef dict _get_inverse_hash(self)

    # comparison operators
    cdef  list c_shares_segments_with(self, SegmentChain)
    cdef  ExBool c_covers(self ,SegmentChain) except bool_exception
    cdef  ExBool c_unstranded_overlaps(self, SegmentChain) except bool_exception 
    cdef  ExBool c_overlaps(self, SegmentChain) except bool_exception
    cdef  ExBool c_antisense_overlaps(self, SegmentChain) except bool_exception
    cdef  ExBool c_contains(self, SegmentChain) except bool_exception

    # position info - c impl
    cdef list c_get_position_list(self)
    cdef set c_get_position_set(self)
    cdef numpy.ndarray c_get_position_array(self,bint)
    cpdef set get_masked_position_set(self)

    # subchains/coordinates
    cdef long c_get_genomic_coordinate(self, long, bint) except -1
    cdef long c_get_segmentchain_coordinate(self, long, bint) except -1
    cdef SegmentChain c_get_subchain(self,long, long, bint)
    cpdef SegmentChain get_antisense(self)

 
cdef class Transcript(SegmentChain):
    cdef:
        object cds_genome_start, cds_genome_end, cds_start, cds_end

    cdef bint _update_cds(self) except False
    cdef bint _update_from_cds_start(self) except False
    cdef bint _update_from_cds_end(self) except False
    cdef bint _update_from_cds_genome_start(self) except False
    cdef bint _update_from_cds_genome_end(self) except False

cdef GenomicSegment NullSegment
