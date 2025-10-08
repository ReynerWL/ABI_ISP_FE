'use client'

import BaseModal from '#/components/reusable/BaseModal'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import type { BankOption } from '#/components/transaksi/CustomBankSelect'
import CustomBank from '#/components/transaksi/CustomBankSelect'
import CustomMonthPicker from '#/components/transaksi/CustomDateMonth'
import { Button, Image, TableProps } from 'antd'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiOutlineDownload } from 'react-icons/hi'
import { HiPhoto } from 'react-icons/hi2'

const Transaksi = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // query params
  const bankQuery = searchParams?.get('bank') || ''

  // local UI state
  const [openModal, setOpenModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedBank, setSelectedBank] = useState<string | undefined>(
    undefined
  )

  const bankOptions: BankOption[] = [
    { label: 'Bank Central Asia (BCA)', value: 'bca' },
    { label: 'Bank Rakyat Indonesia (BRI)', value: 'bri' },
    { label: 'Bank Negara Indonesia (BNI)', value: 'bni' },
    { label: 'Bank Mandiri', value: 'mandiri' },
    { label: 'CIMB Niaga', value: 'cimb' },
    { label: 'Bank Danamon', value: 'danamon' },
    { label: 'Permata Bank', value: 'permata' },
    { label: 'Bank Syariah Indonesia (BSI)', value: 'bsi' },
    { label: 'Bank Mega', value: 'mega' },
    { label: 'OCBC NISP', value: 'ocbc' },
    { label: 'Maybank Indonesia', value: 'maybank' },
    { label: 'Panin Bank', value: 'panin' }
  ]

  useEffect(() => {
    if (bankQuery) setSelectedBank(bankQuery)
    else setSelectedBank(undefined)
  }, [bankQuery])

  const handleBankChange = (val?: string) => {
    setSelectedBank(val)
    const queryParams = new URLSearchParams(searchParams?.toString() || '')
    if (val) queryParams.set('bank', val)
    else queryParams.delete('bank')
    router.replace(`?${queryParams.toString()}`)
  }

  const dataSource = [
    {
      key: '1',
      id: '1234567890',
      nama: 'John Doe',
      paket: '10 mbps',
      harga: '10000',
      tanggal_berlangganan: '2025-01-01',
      tanggal_transaksi: '2025-01-01',
      jatuh_tempo: '2025-01-01',
      tanggal_bayar: '2025-01-01',
      bukti_pembayaran: '/dummy/bukti_pembayaran.png',
      bank: 'bca'
    }
  ]

  const columns: TableProps['columns'] = [
    { title: 'ID Pelanggan', dataIndex: 'id', key: 'id' },
    { title: 'Nama Pelanggan', dataIndex: 'nama', key: 'nama' },
    {
      title: 'Paket',
      dataIndex: 'paket',
      key: 'paket',
      sorter: (a, b) => String(a.paket).localeCompare(String(b.paket))
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      render: (text) => new Intl.NumberFormat('id-ID').format(Number(text))
    },
    {
      title: 'Tanggal Berlangganan',
      dataIndex: 'tanggal_berlangganan',
      key: 'tanggal_berlangganan',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
      sorter: (a, b) =>
        dayjs(a.tanggal_berlangganan).unix() -
        dayjs(b.tanggal_berlangganan).unix()
    },
    {
      title: 'Jatuh Tempo',
      dataIndex: 'jatuh_tempo',
      key: 'jatuh_tempo',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
      sorter: (a, b) =>
        dayjs(a.jatuh_tempo).unix() - dayjs(b.jatuh_tempo).unix()
    },
    {
      title: 'Tanggal Bayar',
      dataIndex: 'tanggal_bayar',
      key: 'tanggal_bayar',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
      sorter: (a, b) =>
        dayjs(a.tanggal_bayar).unix() - dayjs(b.tanggal_bayar).unix()
    },
    {
      title: 'Bukti Pembayaran',
      dataIndex: 'bukti_pembayaran',
      key: 'bukti_pembayaran',
      render: (_: any, record: any) => (
        <div className='flex gap-2'>
          <Button
            className='!rounded-lg !border-slate-100 !p-2 !font-semibold !text-primary !shadow-none hover:!bg-slate-50'
            disabled={!record.bukti_pembayaran}
            onClick={() => {
              setSelectedImage(record.bukti_pembayaran)
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
      <div className='flex items-center justify-between'>
        <Title>Transaksi</Title>
      </div>

      <div className='flex flex-col gap-6 text-nowrap rounded-2xl bg-white p-4 md:p-6'>
        <div className='flex flex-col gap-3 md:flex-row md:gap-6'>
          <InputSearch />
          <div className='flex flex-1 items-center gap-3 text-nowrap'>
            <span className='font-semibold text-slate-500'>Bank :</span>
            <CustomBank
              options={bankOptions}
              value={selectedBank}
              onChange={handleBankChange}
            />
          </div>
          <div className='flex flex-1 items-center gap-3 text-nowrap'>
            <span className='font-semibold text-slate-500'>Bulan :</span>
            <CustomMonthPicker />
          </div>
          <div className='flex w-full gap-6 md:w-fit'>
            <Button
              className='!h-full !w-full !rounded-lg !bg-blue-50 !px-5 !py-2 !text-base !font-semibold !text-primary !shadow-none hover:!bg-blue-100 md:!w-fit'
              type='primary'
            >
              <HiOutlineDownload className='text-[23px]' strokeWidth={1.9} />
              Ekspor
            </Button>
          </div>
        </div>

        <DataTable dataSource={dataSource} columns={columns} limit={10} />

        <BaseModal
          title='Bukti Pembayaran'
          open={openModal}
          onClose={() => {
            setOpenModal(false)
            setSelectedImage(null)
          }}
        >
          <div className='flex items-center justify-center'>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt='Bukti Pembayaran'
                className='max-h-[80vh] max-w-full rounded-lg object-contain'
              />
            )}
          </div>
        </BaseModal>
      </div>
    </div>
  )
}

export default Transaksi
