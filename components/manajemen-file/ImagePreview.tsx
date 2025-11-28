import { Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface ImagePreviewProps {
  src: string
  alt: string
  onDelete: () => void
}

const ImagePreview = ({ src, alt, onDelete }: ImagePreviewProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className='group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-lg'
      >
        <img
          src={src}
          alt={alt}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <div className='absolute bottom-2 left-2 right-2'>
            <p className='truncate text-xs font-medium text-white'>{alt}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'
          onClick={() => setShowModal(false)}
        >
          <div
            className='relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className='absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:scale-110 hover:bg-white'
            >
              <X className='h-5 w-5 text-gray-700' />
            </button>

            <div className='p-6'>
              <img
                src={src}
                alt={alt}
                className='h-auto max-h-[70vh] w-full rounded-lg object-contain'
              />
            </div>

            <div className='flex items-center justify-between border-t border-gray-200 bg-gray-50 p-6'>
              <div>
                <h3 className='font-semibold text-gray-800'>{alt}</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Click outside to close
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Hapus ${alt}?`)) {
                    onDelete()
                    setShowModal(false)
                  }
                }}
                className='flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95'
              >
                <Trash2 className='h-4 w-4' />
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImagePreview
