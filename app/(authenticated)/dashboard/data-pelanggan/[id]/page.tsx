'use client'

import InfoPaketCard from '#/components/data-pelanggan/InfoPaketCard'
import InfoPelanggan from '#/components/data-pelanggan/InfoPelanggan'
import InstalasiPreview from '#/components/data-pelanggan/InstalasiPreview'
import KTPPreview from '#/components/data-pelanggan/KTPPreview'
import Title from '#/components/reusable/Title'
import usePageTitle from '#/hooks/usePageTitle'
import { User, userRepository } from '#/repository/user'
import { Button } from 'antd'
import { use } from 'react'

const DetailPelanggan = ({ params }: { params: Promise<{ id: string }> }) => {
  usePageTitle('Detail Pelanggan')
  const { id } = use(params)
  const { data } = userRepository.hooks.useGetUserById(id)
  const user: User = data?.data

  return (
    <div className='space-y-8'>
      <Title>Detail Pelanggan</Title>
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
          />
          <div className='grid w-full gap-6 rounded-2xl bg-white p-6 xl:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl font-semibold text-slate-700'>Foto KTP</h1>
              <KTPPreview imageUrl={user?.photo_ktp} />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between font-semibold'>
                <h1 className='text-xl text-slate-700'>Foto Instalasi</h1>
                <h2 className='text-slate-500'>01-08-2025</h2>
              </div>
              <InstalasiPreview />
            </div>
          </div>
        </div>
        <InfoPaketCard />
      </div>
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
    </div>
  )
}

export default DetailPelanggan
