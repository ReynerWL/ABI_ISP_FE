'use client'

import ModalPaket from '#/components/paket/ModalPaket'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import { useUser } from '#/context/UserContext'
import usePageTitle from '#/hooks/usePageTitle'
import { Paket, paketRepository } from '#/repository/paket'
import { formatSpeed } from '#/utils/formatter'
import { Button, TableProps } from 'antd'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import { HiMiniPencilSquare } from 'react-icons/hi2'

const SpeedPage = () => {
  usePageTitle('Data Speed')

  const searchParams = useSearchParams()
  const { user } = useUser()

  const search = searchParams?.get('search') || null
  const page = Number(searchParams?.get('page') || 1)
  const limit = Number(searchParams?.get('limit') || 10)
  const [openModal, setOpenModal] = useState(false)
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null)

  const { data, isLoading, mutate } = paketRepository.hooks.useGetPaket({
    query: search,
    page,
    limit
  })

  const speeds: Paket[] = data?.data || []

  const columns: TableProps['columns'] = [
    { title: 'Nama Paket', dataIndex: 'name', key: 'name' },
    {
      title: 'Speed',
      dataIndex: 'speed',
      key: 'speed',
      render: (speed: string) => formatSpeed(speed)
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `Rp ${price.toLocaleString('id-ID')}`
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <Button
          className={
            user?.role.toLowerCase() === 'superadmin'
              ? '!rounded-lg !border-slate-100 !p-2 !font-semibold !text-secondary !shadow-none hover:!bg-slate-50'
              : '!hidden'
          }
          onClick={() => {
            setOpenModal(true)
            setSelectedPaket(record as Paket)
          }}
        >
          <HiMiniPencilSquare className='text-lg' />
          Edit
        </Button>
      )
    }
  ]

  return (
    <div className='flex flex-col gap-8'>
      {/* Title */}
      <div className='flex items-center justify-between'>
        <Title>Data Paket</Title>
      </div>

      {/* Content Wrapper */}
      <div className='flex flex-col gap-6 rounded-2xl bg-white p-4 md:p-6'>
        {/* Search */}
        <div className='flex gap-6'>
          <InputSearch />
          <Button
            className='!h-full !w-full !rounded-lg !px-4 !py-2 !text-base !font-medium !shadow-none md:!w-fit'
            type='primary'
            onClick={() => setOpenModal(true)}
          >
            <HiPlus className='text-xl' />
            Tambah
          </Button>
        </div>

        {/* Table */}
        <DataTable
          dataSource={speeds}
          columns={columns}
          isLoading={isLoading}
          page={page}
          limit={limit}
          totalData={speeds?.length || 0}
          totalPage={1}
        />

        <ModalPaket
          open={openModal}
          initialValues={selectedPaket}
          onClose={() => {
            setOpenModal(false)
            setSelectedPaket(null)
          }}
          mutate={mutate}
        />
      </div>
    </div>
  )
}

export default SpeedPage
