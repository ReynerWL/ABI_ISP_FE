'use client'

import FolderCard from '#/components/manajemen-file/Folder'
import ImagePreview from '#/components/manajemen-file/ImagePreview'
import Title from '#/components/reusable/Title'
import { useState } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { LuFolder } from 'react-icons/lu'

// Main Page Component
const ManajemenFilePage = () => {
  const [images, setImages] = useState([
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400',
      alt: 'Document_001.jpg'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400',
      alt: 'Receipt_2024.jpg'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400',
      alt: 'Invoice_March.jpg'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400',
      alt: 'Contract_Final.jpg'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1557682260-96773eb01377?w=400',
      alt: 'Report_Q1.jpg'
    },
    {
      id: '6',
      src: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=400',
      alt: 'Proposal_v2.jpg'
    }
  ])

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
      <div className='w-full'>
        {/* Header */}
        <div className='mb-8'>
          <Title>Manajemen File</Title>
        </div>

        {/* Folders Section */}
        <div className='mb-12'>
          <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800'>
            <LuFolder className='h-5 w-5 text-secondary' />
            Folder
          </h2>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            <FolderCard title='KTP' href='/manajemen-file/ktp' />
            <FolderCard
              title='Bukti Pembayaran'
              href='/manajemen-file/bukti-pembayaran'
            />
            <FolderCard title='Paket' href='/manajemen-file/paket' />
            <FolderCard title='Misc' href='/manajemen-file/misc' />
          </div>
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
            {images.map((image) => (
              <ImagePreview
                key={image.id}
                src={image.src}
                alt={image.alt}
                onDelete={() => handleDelete(image.id)}
              />
            ))}
          </div>
          {images.length === 0 && (
            <div className='py-12 text-center text-gray-400'>
              <p>Tidak ada gambar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManajemenFilePage
