'use client'

import ModalPelanggan from '#/components/data-pelanggan/ModalPelanggan'
import Chip from '#/components/reusable/Chip'
import CustomDateRangePicker from '#/components/reusable/CustomDateRangePicker'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import WAButton from '#/components/reusable/WAButton'
import usePageTitle from '#/hooks/usePageTitle'
import { User, userRepository } from '#/repository/user'
import { Button, Segmented, TableProps } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineDownload, HiPlus } from 'react-icons/hi'
import { HiEye, HiMiniPencilSquare } from 'react-icons/hi2'

const DataPelanggan = () => {
  usePageTitle('Data Pelanggan')
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams?.get('status') || 'Semua'
  const page = searchParams?.get('page') || 1
  const pageSize = searchParams?.get('page_size') || 10
  const startDate = searchParams?.get('start_date') || null
  const endDate = searchParams?.get('end_date') || null
  const [initialValues, setInitialValues] = useState<User | null>(null)
  const { data, isLoading, mutate } = userRepository.hooks.useGetUser({
    page: Number(page),
    page_size: Number(pageSize),
    start_date: startDate,
    end_date: endDate
  })

  const [openModal, setOpenModal] = useState(false)

  const users: User[] = data?.data

  const columns: TableProps['columns'] = [
    {
      title: 'ID Pelanggan',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => record?.customerId
    },
    { title: 'Nama', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'No. Telp',
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 190,
      render: (text) => <WAButton phoneNumber={text} />
    },
    { title: 'Paket', dataIndex: 'paket', key: 'paket' },
    {
      title: 'Tanggal Berlangganan',
      dataIndex: 'tanggal_berlangganan',
      key: 'tanggal_berlangganan',
      render: (text) => dayjs(text).format('DD/MM/YYYY')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Chip text={status} />
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      key: 'aksi',
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button
            className='!rounded-lg !border-slate-100 !p-2 !font-semibold !text-secondary !shadow-none hover:!bg-slate-50'
            onClick={() => {
              setOpenModal(true)
              setInitialValues(record as User)
            }}
          >
            <HiMiniPencilSquare className='text-lg' />
            Edit
          </Button>
          <Link
            href={`/dashboard/data-pelanggan/${record?.customerId}`}
            className='flex items-center gap-2 !rounded-lg border !border-slate-100 px-2 !font-semibold !text-primary !shadow-none hover:!bg-slate-50'
          >
            <HiEye className='text-lg' />
            Detail
          </Link>
        </div>
      )
    }
  ]

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set('status', value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <Title>Data Pelanggan</Title>
        <div className='hidden md:block'>
          <Segmented
            options={['Semua', 'Baru', 'Aktif', 'Pending', 'Nonaktif']}
            shape='round'
            defaultValue='Semua'
            value={status}
            onChange={handleStatusChange}
          />
        </div>
      </div>
      <div className='flex flex-col gap-6 rounded-2xl bg-white p-4 md:p-6'>
        <div className='flex flex-col gap-3 md:flex-row md:gap-6'>
          <InputSearch />
          <CustomDateRangePicker />
          <div className='flex w-full gap-6 md:w-fit'>
            <Button
              className='!h-full !w-full !rounded-lg !bg-blue-50 !px-5 !py-2 !text-base !font-semibold !text-primary !shadow-none hover:!bg-blue-100 md:!w-fit'
              type='primary'
            >
              <HiOutlineDownload className='text-[23px]' strokeWidth={1.9} />
              Ekspor
            </Button>
            <Button
              className='!h-full !w-full !rounded-lg !px-4 !py-2 !text-base !font-medium !shadow-none md:!w-fit'
              type='primary'
              onClick={() => setOpenModal(true)}
            >
              <HiPlus className='text-xl' />
              Tambah
            </Button>
          </div>
        </div>
        <DataTable
          dataSource={users}
          columns={columns}
          page={data?.page}
          limit={data?.page_size}
          totalData={data?.total}
          isLoading={isLoading}
          onRefresh={() => mutate()}
        />
        <ModalPelanggan
          open={openModal}
          onClose={() => {
            setInitialValues(null)
            setOpenModal(false)
          }}
          initialValues={initialValues}
        />
      </div>
    </div>
  )
}

export default DataPelanggan
