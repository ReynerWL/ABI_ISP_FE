import { Image } from 'antd'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import AlertDialog from '../reusable/AlertDialog'
import BaseModal from '../reusable/BaseModal'

interface ImagePreviewProps {
  src: string
  alt: string
  onDelete: () => void
}

const ImagePreview = ({ src, alt, onDelete }: ImagePreviewProps) => {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    onDelete()
    setShowModal(false)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className='group relative flex aspect-square cursor-pointer items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-lg'
      >
        <Image
          src={src}
          alt={alt}
          preview={false}
          className='!h-full !w-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <div className='absolute bottom-2 left-2 right-2'>
            <p className='truncate text-xs font-medium text-white'>{alt}</p>
          </div>
        </div>
      </div>

      <BaseModal
        width={600}
        open={showModal}
        onClose={() => setShowModal(false)}
        title={alt}
        footer={
          <div className='flex'>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className='flex !w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 font-medium text-white shadow-md transition-all hover:bg-red-600 hover:shadow-lg active:scale-95'
            >
              <Trash2 className='h-4 w-4' />
              Hapus
            </button>
          </div>
        }
      >
        <div className='flex w-full justify-center p-6'>
          <Image
            src={src}
            alt={alt}
            style={{ maxHeight: '50vh', maxWidth: '100%' }}
            className='h-auto w-full rounded-lg object-contain'
          />
        </div>
      </BaseModal>
      <AlertDialog
        open={showDeleteConfirm}
        title='Hapus Gambar'
        description={`Apakah Anda yakin ingin menghapus gambar ${alt}?`}
        confirmText='Hapus'
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}

export default ImagePreview
