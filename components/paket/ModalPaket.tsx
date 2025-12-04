'use client'

import { Paket, paketRepository } from '#/repository/paket'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { toast } from 'sonner'
import BaseModal from '../reusable/BaseModal'
import UploadField from '../reusable/UploadField'

interface ModalPaketProps {
  open: boolean
  initialValues?: Paket | null
  onClose: () => void
  mutate: () => void
}

const ModalPaket = ({
  open,
  initialValues,
  onClose,
  mutate
}: ModalPaketProps) => {
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  const isEdit = !!initialValues

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  const handleFinish = async (values: any) => {
    if (loading) return
    setLoading(true)

    try {
      // Gabungkan speedValue dan speedUnit menjadi satu string lowercase
      const speedCombined =
        `${values.speedValue}${values.speedUnit}`.toLowerCase()

      const payload = {
        name: values.name,
        price: Number(values.price),
        speed: speedCombined,
        photo: values.photo || undefined
      }

      if (isEdit) {
        await paketRepository.api.updatePaket(initialValues!.id, payload)
        toast.success('Berhasil mengubah paket!')
      } else {
        await paketRepository.api.createPaket(payload)
        toast.success('Berhasil menambahkan paket!')
      }

      handleClose()
      mutate()
    } catch (error: any) {
      toast.error(error?.response?.body?.message || 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialValues) {
      // Parse speed untuk memisahkan angka dan satuan
      const speedStr = initialValues.speed || ''
      const match = speedStr.match(/^(\d+)\s*(mbps|gbps)$/i)

      if (match) {
        form.setFieldsValue({
          name: initialValues.name,
          speedValue: Number(match[1]),
          speedUnit: match[2].toLowerCase(),
          price: initialValues.price
        })
      } else {
        form.setFieldsValue({
          name: initialValues.name,
          speedValue: undefined,
          speedUnit: 'mbps',
          price: initialValues.price
        })
      }
    }
  }, [initialValues])

  return (
    <BaseModal
      open={open}
      title={isEdit ? 'Edit Paket' : 'Tambah Paket'}
      onClose={handleClose}
      titleBorder={false}
      width={500}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        requiredMark={false}
      >
        {/* Nama Paket */}
        <Form.Item
          name='name'
          label='Nama Paket'
          rules={[{ required: true, message: 'Masukkan nama paket' }]}
        >
          <Input placeholder='Contoh: Paket Silver' />
        </Form.Item>
        {/* Speed - Split into two fields */}
        <div className='flex gap-2'>
          <Form.Item
            name='speedValue'
            label='Speed'
            rules={[{ required: true, message: 'Masukkan speed' }]}
            className='flex-1'
          >
            <InputNumber placeholder='Contoh: 50' className='!w-full' min={1} />
          </Form.Item>

          <Form.Item
            name='speedUnit'
            label='Satuan'
            rules={[{ required: true, message: 'Pilih satuan' }]}
            initialValue='mbps'
            className='w-28'
          >
            <Select
              options={[
                { label: 'Mbps', value: 'mbps' },
                { label: 'Gbps', value: 'gbps' }
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
        </div>
        {/* Harga */}
        <Form.Item
          name='price'
          label='Harga'
          rules={[{ required: true, message: 'Masukkan harga paket' }]}
        >
          <InputNumber<number>
            placeholder='Contoh: 150000'
            className='!w-full'
            min={0}
            formatter={(v) =>
              v ? `Rp ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
            }
            parser={(v) => Number(v?.replace(/[Rp .]/g, '') || 0)}
          />
        </Form.Item>
        {/* Foto Paket */}
        <UploadField
          form={form}
          name='photo'
          folder='Paket'
          label={`Foto Paket`}
          showPlaceholder={true}
          successMessage='Foto Paket berhasil diunggah!'
          requiredMessage='Foto Paket wajib diisi'
        />
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
            {initialValues ? 'Edit Paket' : 'Tambah Paket'}
          </Button>
        </div>
      </Form>
    </BaseModal>
  )
}

export default ModalPaket
