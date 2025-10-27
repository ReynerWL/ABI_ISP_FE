'use client'

import ModalPelanggan from '#/components/data-pelanggan/ModalPelanggan'
import Chip from '#/components/reusable/Chip'
import CustomDateRangePicker from '#/components/reusable/CustomDateRangePicker'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import WAButton from '#/components/reusable/WAButton'
import usePageTitle from '#/hooks/usePageTitle'
import { Paket, paketRepository } from '#/repository/paket'
import { User, userRepository } from '#/repository/user'
import { formatSpeed } from '#/utils/formatter'
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
  const search = searchParams?.get('search') || null
  const status = searchParams?.get('status') || 'Semua'
  const page = searchParams?.get('page') || 1
  const limit = searchParams?.get('limit') || 10
  const startDate = searchParams?.get('start_date') || null
  const endDate = searchParams?.get('end_date') || null
  const paketParam = searchParams?.get('paket')
  const paketSpeedParam = searchParams?.get('paket_speed')

  const [initialValues, setInitialValues] = useState<User | null>(null)

  const { data, isLoading, mutate } = userRepository.hooks.useGetUser({
    search,
    role: 'User',
    page: Number(page),
    limit: Number(limit),
    start_date: startDate,
    end_date: endDate,
    status: status === 'Semua' ? null : status,
    paket: paketParam || null,
    paket_speed: paketSpeedParam || null
  })

  const { data: pakets } = paketRepository.hooks.useGetPaket()

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
    {
      title: 'Paket',
      dataIndex: 'paket',
      key: 'paket',
      width: 130,
      render: (_, record) => formatSpeed(record?.paket?.speed),
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      filters:
        pakets?.data?.map((paket: Paket) => ({
          text: formatSpeed(paket.speed),
          value: paket.speed
        })) || [],
      filterMultiple: true,
      onFilter: () => true
    },
    {
      title: 'Tanggal Berlangganan',
      dataIndex: 'tanggal_berlangganan',
      key: 'tanggal_berlangganan',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => dayjs(record?.createdAt).format('DD/MM/YYYY')
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
            scroll={false}
            href={`/dashboard/data-pelanggan/${record?.id}`}
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
        <div className='hidden xl:block'>
          <Segmented
            options={[
              'Semua',
              'Baru',
              'Aktif',
              'Pra-Aktif',
              'Nonaktif',
              'Ditolak'
            ]}
            shape='round'
            defaultValue='Semua'
            value={status}
            className='tab-filter'
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
          page={data?.pagination?.page}
          limit={data?.pagination?.limit}
          totalData={data?.pagination?.total}
          totalPage={data?.pagination?.totalPages}
          isLoading={isLoading}
        />
        <ModalPelanggan
          open={openModal}
          onClose={() => {
            setInitialValues(null)
            setOpenModal(false)
          }}
          initialValues={initialValues}
          mutate={mutate}
        />
      </div>
    </div>
  )
}

export default DataPelanggan
