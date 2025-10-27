'use client'

import BaseModal from '#/components/reusable/BaseModal'
import DataTable from '#/components/reusable/DataTable'
import { EmptyImg } from '#/components/reusable/EmptyImg'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import type { BankOption } from '#/components/transaksi/BankSelect'
import CustomBankSelect from '#/components/transaksi/BankSelect'
import CustomMonthPicker from '#/components/transaksi/DateMonth'
import usePageTitle from '#/hooks/usePageTitle'
import { Bank, bankRepository } from '#/repository/bank'
import { DataTransaksi, transakasiRepository } from '#/repository/transaksi'
import { formatRupiah } from '#/utils/formatter'
import { Button, TableProps } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineDownload } from 'react-icons/hi'
import { HiPhoto } from 'react-icons/hi2'

const Transaksi = () => {
  usePageTitle('Transaksi')
  const searchParams = useSearchParams()
  const search = searchParams?.get('search') || null
  const bank = searchParams?.get('bank') || ''
  const month = searchParams?.get('month') || ''
  const [openModal, setOpenModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { data: listBank } = bankRepository.hooks.useGetBanks()

  const { data: listTransaksi, isLoading: loadingTransaksi } =
    transakasiRepository.hooks.useGetAllTransaksi({ search, bank, month })

  const convertDataBank = (data: Bank[]): BankOption[] =>
    data?.map((val) => ({
      label: `${val.bank_name} - ${val.owner}`,
      value: val.bank_name
    }))

  const Transaksi: DataTransaksi[] = listTransaksi?.data

  const columns: TableProps['columns'] = [
    {
      title: 'ID Pelanggan',
      dataIndex: ['user', 'customerId'],
      key: 'customerId',
      render: (_, record) => record?.user?.customerId ?? '-'
    },
    {
      title: 'Nama Pelanggan',
      dataIndex: ['user', 'name'],
      key: 'name',
      render: (_, record) => record?.user?.name ?? '-'
    },
    {
      title: 'Paket',
      dataIndex: ['paket', 'speed'],
      key: 'speed',
      render: (_, record) => record?.paket?.speed ?? '-',
      sorter: (a, b) => a.paket?.speed.localeCompare(b.paket?.speed)
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      render: (value) => formatRupiah(value ?? 0, { withPrefix: true })
    },
    {
      title: 'Bank',
      dataIndex: ['bank', 'bank_name'],
      key: 'bank_name',
      render: (_, record) =>
        record?.bank?.bank_name ? (
          <span>{`${record?.bank?.bank_name} - ${record?.bank?.owner}`}</span>
        ) : (
          '-'
        )
    },
    {
      title: 'Tanggal Berlangganan',
      dataIndex: ['user', 'createdAt'],
      key: 'user_createdAt',
      render: (_, record) =>
        record?.user?.createdAt ? (
          dayjs(record?.user?.createdAt).format('DD/MM/YYYY')
        ) : (
          <span className={'text-slate-500'}>-</span>
        ),
      sorter: (a, b) =>
        dayjs(a?.user?.createdAt).unix() - dayjs(b?.user?.createdAt).unix()
    },
    {
      title: 'Jatuh Tempo',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (value) =>
        value ? (
          dayjs(value).format('DD/MM/YYYY')
        ) : (
          <span className={'text-slate-500'}>-</span>
        ),
      sorter: (a, b) => dayjs(a?.due_date).unix() - dayjs(b?.due_date).unix()
    },
    {
      title: 'Tanggal Bayar',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) =>
        value ? (
          dayjs(value).format('DD/MM/YYYY')
        ) : (
          <span className={'text-slate-500'}>-</span>
        ),
      sorter: (a, b) => dayjs(a?.createdAt).unix() - dayjs(b?.createdAt).unix()
    },
    {
      title: 'Bukti Pembayaran',
      dataIndex: 'buktiPembayaran',
      key: 'buktiPembayaran',
      render: (value) => (
        <div className='flex gap-2'>
          <Button
            className={
              '!rounded-lg !border-slate-100 !p-2 !font-semibold !text-primary !shadow-none hover:!bg-slate-50'
            }
            onClick={() => {
              setSelectedImage(value)
              setOpenModal(true)
            }}
          >
            <HiPhoto className='text-lg' />
            Lihat Foto
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className='flex flex-col gap-8'>
      <Title>Transaksi</Title>
      <div className='flex flex-col gap-6 text-nowrap rounded-2xl bg-white p-4 md:p-6'>
        <div className='grid h-fit grid-cols-10 gap-4 lg:gap-6 xl:flex xl:h-11 xl:grid-cols-1 xl:flex-row'>
          <InputSearch className={'order-1 !col-span-8'} />
          <Button
            className='order-2 !col-span-2 !h-full !w-full !rounded-lg !bg-blue-50 !p-2 !text-base !font-semibold !text-primary !shadow-none hover:!bg-blue-100 lg:!px-3 xl:order-4 xl:!w-fit xl:!px-5'
            type='primary'
          >
            <HiOutlineDownload className='text-xl' strokeWidth={1.9} />
            <p className='hidden sm:inline'>Ekspor</p>
          </Button>
          <CustomBankSelect
            options={convertDataBank(listBank?.data)}
            className={'order-3 col-span-5 xl:order-2'}
          />
          <CustomMonthPicker className={'order-4 col-span-5 xl:order-3'} />
        </div>
        <DataTable
          dataSource={Transaksi}
          columns={columns}
          limit={10}
          totalData={listTransaksi?.total}
          isLoading={loadingTransaksi}
        />
        <BaseModal
          title='Bukti Pembayaran'
          open={openModal}
          onClose={() => {
            setOpenModal(false)
            setSelectedImage(null)
          }}
        >
          <div className='flex items-center justify-center'>
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt='Bukti Pembayaran'
                width={472}
                height={472}
                className='rounded-lg object-contain'
              />
            ) : (
              <EmptyImg />
            )}
          </div>
        </BaseModal>
      </div>
    </div>
  )
}

export default Transaksi
