'use client'

import ImagePreview from '#/components/manajemen-file/ImagePreview'
import Title from '#/components/reusable/Title'
import { config } from '#/config/app'
import { fileRepository } from '#/repository/file'
import { Skeleton } from 'antd'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'

interface File {
  id: string
  name: string
  path: string
  size: number
  type: string
  lastModified: string
}

const ManajemenFileDetailPage = () => {
  const params = useParams()
  const folder = params?.folder as string | null

  const {
    data: response,
    isLoading,
    setSize,
    isReachedEnd,
    mutate,
    isValidating
  } = fileRepository.hooks.useGetFileListInfinite({ folder: folder })

  const images: string[] = response

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && !isReachedEnd) {
      setSize((size) => size + 1)
    }
  }, [inView, isReachedEnd, setSize])

  const handleDelete = async (filename: string) => {
    try {
      await fileRepository.api.deleteFile({ folder, filename })
      toast.success('File berhasil dihapus!')
      mutate()
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus file!')
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
      <div className='w-full'>
        {/* Header */}
        <div className='mb-8'>
          <Title>Manajemen File - {folder}</Title>
        </div>

        {/* Images Section */}
        <div>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='flex items-center gap-2 text-xl font-semibold text-gray-800'>
              <IoImageOutline className='h-5 w-5 text-secondary' />
              List Gambar
            </h2>
          </div>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {images.map((image: string) => (
              <ImagePreview
                key={image}
                src={`${config.fileUrl}/${image}`}
                alt={image}
                onDelete={() => handleDelete(image)}
              />
            ))}

            {(isLoading || isValidating) &&
              Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className='relative flex aspect-square animate-pulse items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'
                >
                  <Skeleton.Image
                    active
                    className='!h-full !w-full !rounded-xl'
                  />
                </div>
              ))}
          </div>
          <div ref={ref} />
          {isReachedEnd && response.length > 0 && (
            <div className='py-12 text-center text-gray-400'>
              <p>Tidak ada gambar lagi</p>
            </div>
          )}
          {isReachedEnd && response.length === 0 && (
            <div className='py-12 text-center text-gray-400'>
              <p>Tidak ada gambar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManajemenFileDetailPage
