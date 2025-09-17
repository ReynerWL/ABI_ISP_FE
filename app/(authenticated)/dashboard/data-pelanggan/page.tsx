'use client'

import ModalPelanggan from '#/components/data-pelanggan/ModalPelanggan'
import Chip from '#/components/reusable/Chip'
import CustomDateRangePicker from '#/components/reusable/CustomDateRangePicker'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import { Button, Segmented, TableProps } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineDownload, HiPlus } from 'react-icons/hi'
import { HiEye, HiMiniPencilSquare } from 'react-icons/hi2'

const DataPelanggan = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams?.get('status') || 'Semua'

  const [openModal, setOpenModal] = useState(false)

  const dataSource = [
    {
      key: '1',
      id: '1234567890',
      nama: 'John Doe',
      email: 'john.doe@me.com',
      no_telp: '08123456789',
      paket: '10 mbps',
      tanggal_berlangganan: '2025-01-01',
      status: 'Baru'
    }
  ]

  const columns: TableProps['columns'] = [
    { title: 'ID Pelanggan', dataIndex: 'id', key: 'id' },
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'No. Telp', dataIndex: 'no_telp', key: 'no_telp' },
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
      render: (text) => <Chip text={text} color='orange' />
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      key: 'aksi',
      render: () => (
        <div className='flex gap-2'>
          <Button className='!rounded-lg !border-slate-100 !p-2 !font-semibold !text-secondary !shadow-none hover:!bg-slate-50'>
            <HiMiniPencilSquare className='text-lg' />
            Edit
          </Button>
          <Link
            href={`/dashboard/data-pelanggan/${'1234567890'}`}
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
        <DataTable dataSource={dataSource} columns={columns} limit={10} />
        <ModalPelanggan open={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </div>
  )
}

export default DataPelanggan
