import Image from 'next/image'
import React from 'react'

export const EmptyImg = () => {
  return (
    <div className={'flex flex-col gap-6 p-6'}>
      <Image
        src={'/emptyImg.svg'}
        width={372}
        height={372}
        alt='Bukti Pembayaran Tidak Ditemukan'
        className='rounded-lg object-contain'
      />
      <div className={'flex flex-col gap-1'}>
        <h1 className='text-center text-base font-bold'>
          Gambar tidak ditemukan
        </h1>
        <p className='text-center font-normal text-slate-400'>
          Tidak ada Gambar yang dapat ditampilkan saat ini
        </p>
      </div>
    </div>
  )
}
