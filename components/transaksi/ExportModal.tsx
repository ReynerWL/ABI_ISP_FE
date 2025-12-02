'use client'

import { Bank, bankRepository } from '#/repository/bank'
import { Paket, paketRepository } from '#/repository/paket'
import { ExportTransaksi, transakasiRepository } from '#/repository/transaksi'
import { User, userRepository } from '#/repository/user'
import { Button, DatePicker, Form, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { HiChevronDown, HiOutlineCalendar, HiXMark } from 'react-icons/hi2'
import { toast } from 'sonner'
import BaseModal from '../reusable/BaseModal'

interface ExportModalProps {
  open: boolean
  onClose: () => void
}

const ExportModal = ({ open, onClose }: ExportModalProps) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)
  const [userSearch, setUserSearch] = useState<string>('')

  // Bank Options
  const { data: bankResponse, mutate } = bankRepository.hooks.useGetBanks()
  const banks: Bank[] = bankResponse?.data
  const bankOptions = banks?.map((bank) => ({
    label: (
      <p className='font-semibold text-slate-500'>
        {bank.owner} - {bank.bank_name}
      </p>
    ),
    value: bank.id
  }))

  // Paket Options
  const { data: paketResponse, isLoading: paketLoading } =
    paketRepository.hooks.useGetPaket({})
  const pakets: Paket[] = paketResponse?.data
  const paketOptions = pakets?.map((paket) => ({
    label: <p className='font-semibold text-slate-500'>{paket.name}</p>,
    value: paket.id
  }))

  // User Options
  const { data: userResponse, isLoading: userLoading } =
    userRepository.hooks.useGetUser({
      search: userSearch,
      role: 'User',
      page: 1,
      limit: 10
    })

  // generate option
  const userOptions =
    userResponse?.data?.map((u: User) => ({
      label: (
        <p className='font-semibold text-slate-500'>
          {u.name} — {u.customerId}
        </p>
      ),
      value: u.customerId
    })) || []

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  const handleExport = async (values: ExportTransaksi) => {
    try {
      const response =
        await transakasiRepository.hooks.useExportTransaksi(values)

      const arrayBuffer = response.body

      const blob = new Blob([arrayBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Export-Transaksi-${Date.now()}.xlsx`
      link.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      toast.error('Gagal export data transaksi!')
    }
  }

  return (
    <BaseModal
      title='Export Transaksi'
      open={open}
      width={500}
      titleBorder={false}
      onClose={() => {
        handleClose()
      }}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleExport}
        requiredMark={false}
      >
        <div className='grid grid-cols-1 gap-x-4 gap-y-0 md:grid-cols-2'>
          {/* Tanggal awal */}
          <Form.Item
            name={'startDate'}
            label='Dari Tanggal'
            validateDebounce={1000}
            preserve={true}
            rules={[{ required: true, message: 'Tanggal mulai wajib diisi' }]}
          >
            <DatePicker
              placeholder='Masukkan Tanggal Mulai'
              format={'DD-MM-YYYY'}
              suffixIcon={
                <HiOutlineCalendar
                  className='text-lg text-slate-400'
                  strokeWidth={1.8}
                />
              }
              allowClear={{
                clearIcon: (
                  <HiXMark
                    className='size-[18px] text-slate-400 transition duration-200 hover:brightness-50'
                    strokeWidth={0.4}
                  />
                )
              }}
            />
          </Form.Item>
          <Form.Item
            name={'endDate'}
            label='Sampai Tanggal'
            validateDebounce={1000}
            preserve={true}
            rules={[{ required: true, message: 'Tanggal selesai wajib diisi' }]}
          >
            <DatePicker
              placeholder='Masukkan Tanggal Selesai'
              format={'DD-MM-YYYY'}
              suffixIcon={
                <HiOutlineCalendar
                  className='text-lg text-slate-400'
                  strokeWidth={1.8}
                />
              }
              allowClear={{
                clearIcon: (
                  <HiXMark
                    className='size-[18px] text-slate-400 transition duration-200 hover:brightness-50'
                    strokeWidth={0.4}
                  />
                )
              }}
            />
          </Form.Item>
        </div>
        <Form.Item name='bankId' label='Bank' className='w-full'>
          <Select
            placeholder='Pilih bank'
            showSearch
            options={bankOptions}
            suffixIcon={
              <HiChevronDown
                className='text-slate-300'
                size={20}
                strokeWidth={1}
              />
            }
          />
        </Form.Item>
        <Form.Item name='status' label='Status' className='w-full'>
          <Select
            placeholder='Pilih status'
            options={[
              {
                label: <p className='font-semibold text-slate-500'>Pending</p>,
                value: 'pending'
              },
              {
                label: (
                  <p className='font-semibold text-slate-500'>Confirmed</p>
                ),
                value: 'confirmed'
              },
              {
                label: <p className='font-semibold text-slate-500'>Rejected</p>,
                value: 'rejected'
              }
            ]}
            suffixIcon={
              <HiChevronDown
                className='text-slate-300'
                size={20}
                strokeWidth={1}
              />
            }
          />
        </Form.Item>
        <Form.Item name='customerId' label='Pengguna' className='w-full'>
          <Select
            placeholder='Cari pengguna…'
            showSearch
            filterOption={false}
            onSearch={(value) => setUserSearch(value)}
            options={userOptions}
            loading={userLoading}
            notFoundContent={
              userSearch
                ? 'Tidak ada pengguna ditemukan'
                : 'Ketik untuk mencari...'
            }
            suffixIcon={
              <HiChevronDown
                className='text-slate-300'
                size={20}
                strokeWidth={1}
              />
            }
          />
        </Form.Item>
        <Form.Item name='paketId' label='Paket' className='w-full'>
          <Select
            placeholder='Pilih paket'
            allowClear={{
              clearIcon: (
                <HiXMark
                  className='size-5 bg-white text-slate-400 transition duration-200 hover:text-slate-500'
                  strokeWidth={0.5}
                />
              )
            }}
            options={paketOptions}
            loading={paketLoading}
            suffixIcon={
              <HiChevronDown
                className='text-slate-300'
                size={20}
                strokeWidth={1}
              />
            }
          />
        </Form.Item>
        {/* Submit */}
        <div className='flex w-full gap-4 pt-2'>
          <Button
            className='!h-[44px] !w-full !border-slate-200 text-base !font-medium tracking-wide !text-slate-500 hover:!bg-slate-100'
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className='!h-[44px] !w-full text-base !font-medium tracking-wide !shadow-none'
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            Export
          </Button>
        </div>
      </Form>
    </BaseModal>
  )
}

export default ExportModal
