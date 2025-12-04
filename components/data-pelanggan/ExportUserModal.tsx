'use client'

import { Paket, paketRepository } from '#/repository/paket'
import { ExportUser, userRepository } from '#/repository/user'
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

const ExportUserModal = ({ open, onClose }: ExportModalProps) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  // Paket Options
  const { data: paketResponse, isLoading: paketLoading } =
    paketRepository.hooks.useGetPaket({})
  const pakets: Paket[] = paketResponse?.data
  const paketOptions = pakets?.map((paket) => ({
    label: <p className='font-semibold text-slate-500'>{paket.name}</p>,
    value: paket.id
  }))

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  const handleExport = async (values: ExportUser) => {
    try {
      setLoading(true)
      const response = await userRepository.hooks.useExportUser(values)

      const arrayBuffer = response.body

      const blob = new Blob([arrayBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Export-Data-Pelanggan-${Date.now()}.xlsx`
      link.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      toast.error('Gagal export data data pelanggan!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseModal
      title='Export Data Pelanggan'
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
        <Form.Item name='status' label='Status' className='w-full'>
          <Select
            placeholder='Pilih status'
            allowClear={{
              clearIcon: (
                <HiXMark
                  className='size-5 bg-white text-slate-400 transition duration-200 hover:text-slate-500'
                  strokeWidth={0.5}
                />
              )
            }}
            options={[
              {
                label: <p className='font-semibold text-slate-500'>Baru</p>,
                value: 'Baru'
              },
              {
                label: <p className='font-semibold text-slate-500'>Aktif</p>,
                value: 'Aktif'
              },
              {
                label: (
                  <p className='font-semibold text-slate-500'>Pra-Aktif</p>
                ),
                value: 'Pra-Aktif'
              },
              {
                label: <p className='font-semibold text-slate-500'>Nonaktif</p>,
                value: 'Nonaktif'
              },
              {
                label: <p className='font-semibold text-slate-500'>Ditolak</p>,
                value: 'Ditolak'
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
        <Form.Item name='paket_id' label='Paket' className='w-full'>
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

export default ExportUserModal
