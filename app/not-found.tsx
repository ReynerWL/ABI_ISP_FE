// app/not-found.tsx

import { Button } from 'antd'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi2'

export const metadata: Metadata = {
  title: '404: Halaman Tidak Ditemukan',
  description: 'Halaman yang Anda cari tidak ada. Kembali ke beranda kami.'
}

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='flex flex-col gap-3 text-center'>
        <h1 className='text-3xl font-extrabold leading-snug text-slate-800 md:text-4xl lg:text-5xl'>
          Whoopss..
        </h1>
        <p className='text-lg font-light text-slate-500 md:text-lg lg:text-lg'>
          Maaf Sobat, Kami tidak bisa menemukan halaman yang Kamu cari.
        </p>
      </div>

      <div className='relative my-8 h-[250px] w-full max-w-lg md:h-[350px] lg:h-[450px]'>
        <Image
          src='/404.svg'
          alt='Error 404 Not Found'
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      <Link href='/'>
        <Button
          className={
            'w-fit !rounded-full !border-none !bg-secondary !px-4 !py-6 !text-base !font-semibold !text-white md:!py-5 md:!text-sm lg:!py-6 lg:!text-base'
          }
        >
          <HiArrowLeft className='mr-2 inline-block text-lg' />
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  )
}
