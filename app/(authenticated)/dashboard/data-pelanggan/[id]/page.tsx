'use client'

import InfoPaketCard from '#/components/data-pelanggan/InfoPaketCard'
import InfoPelanggan from '#/components/data-pelanggan/InfoPelanggan'
import InstalasiPreview from '#/components/data-pelanggan/InstalasiPreview'
import KTPPreview from '#/components/data-pelanggan/KTPPreview'
import Title from '#/components/reusable/Title'
import usePageTitle from '#/hooks/usePageTitle'
import { User, userRepository } from '#/repository/user'
import { Button, Spin } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'

const DetailPelanggan = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  usePageTitle('Detail Pelanggan')
  const { data, isLoading, error } = userRepository.hooks.useGetUserById(id)
  const user: User = data?.data

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh-140px)] items-center justify-center'>
        <Spin size='large' />
      </div>
    )
  }

  if (error?.status === 404) {
    return (
      <div className='flex h-[calc(100vh-140px)] w-full flex-col items-center justify-center py-10'>
        <Image
          src={'/empty-data.svg'}
          width={240}
          height={240}
          alt={'empty'}
          className='h-auto w-36 sm:w-40 md:w-48 lg:w-60'
        />
        <h1 className='text-base font-bold'>Data pelanggan tidak ditemukan</h1>
        <p className='font-normal text-slate-400'>
          Data pelanggan yang Kamu cari tidak ditemukan
        </p>
        <Link
          href={'/dashboard/data-pelanggan'}
          className='mt-4 flex items-center gap-4 rounded-full border border-slate-200 p-2 px-4 text-slate-800 hover:bg-slate-100 hover:text-slate-900'
        >
          <HiArrowLeft className='text-2xl text-slate-800' />
          Kembali
        </Link>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <Link
          href={'/dashboard/data-pelanggan'}
          className='rounded-full border border-slate-200 p-2 hover:bg-slate-100'
        >
          <HiArrowLeft className='text-2xl text-slate-800' />
        </Link>
        <Title>Detail Pelanggan</Title>
      </div>
      <div className='flex w-full flex-col gap-6 md:flex-row'>
        <div className='flex w-full flex-col gap-6 2xl:w-full'>
          <InfoPelanggan
            id={user?.customerId}
            tanggalBerlangganan='2023-01-01'
            status={user?.status}
            namaPelanggan={user?.name}
            email={user?.email}
            noTelp={user?.phone_number}
            alamat={user?.alamat}
            isLoading={isLoading}
          />
          <div className='grid w-full gap-6 rounded-2xl bg-white p-6 xl:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl font-semibold text-slate-700'>Foto KTP</h1>
              <KTPPreview imageUrl={user?.photo_ktp} isLoading={isLoading} />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between font-semibold'>
                <h1 className='text-xl font-semibold text-slate-700'>
                  Foto Instalasi
                </h1>
                <h2 className='text-slate-500'>01-08-2025</h2>
              </div>
              <InstalasiPreview isLoading={isLoading} />
            </div>
          </div>
        </div>
        <InfoPaketCard paket={user?.paket} isLoading={isLoading} />
      </div>
      {!isLoading && (
        // TODO: Apply the button based on the user status
        <div className='flex w-full justify-end gap-4'>
          <Button
            type='primary'
            className={`!h-full w-fit !rounded-lg !bg-white !px-5 !py-2 !font-semibold !text-slate-500 !shadow-none hover:!bg-opacity-70`}
          >
            Kembali
          </Button>
          {}
          <Button
            type='primary'
            className={`!h-full w-fit !rounded-lg !bg-red-50 !px-5 !py-2 !font-semibold !text-red-500 !shadow-none hover:!bg-red-100`}
          >
            Menolak
          </Button>
          <Button
            type='primary'
            className={`!h-full w-fit !rounded-lg !px-5 !py-2 !font-semibold !shadow-none`}
          >
            Setujui
          </Button>
          <Button
            type='primary'
            className={`!h-full w-fit !rounded-lg !px-5 !py-2 !font-semibold !shadow-none`}
          >
            Aktifkan
          </Button>
        </div>
      )}
    </div>
  )
}

export default DetailPelanggan
