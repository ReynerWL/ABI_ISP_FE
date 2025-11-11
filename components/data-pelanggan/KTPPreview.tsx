import Image from 'next/image'
import { useState } from 'react'
import { PiImageFill } from 'react-icons/pi'
import BaseModal from '../reusable/BaseModal'

interface KTPPreviewProps {
  imageUrl: string
}

const KTPPreview = ({ imageUrl }: KTPPreviewProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className='group flex h-[210px] w-full cursor-pointer flex-col items-center justify-center gap-7 rounded-2xl bg-slate-50 p-6 transition-colors duration-300 hover:bg-slate-100'
        onClick={() => setOpen(true)}
      >
        <PiImageFill className='transform text-[75px] text-blue-200 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:text-blue-400' />
        <h1 className='text-base font-semibold text-primary underline underline-offset-2 transition-all duration-300 group-hover:underline-offset-4'>
          Klik untuk lihat foto
        </h1>
      </div>
      <BaseModal open={open} title='Foto KTP' onClose={() => setOpen(false)}>
        <Image
          src={imageUrl}
          alt='bukti pembayaran'
          width={0}
          height={400}
          layout='responsive'
          className='rounded-2xl'
        />
      </BaseModal>
    </>
  )
}

export default KTPPreview
