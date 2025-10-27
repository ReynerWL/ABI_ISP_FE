'use client'

import { authRepository } from '#/repository/auth'
import { Form, StepProps, Steps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import BaseModal from '../reusable/BaseModal'
import StepInformasi from './form/StepInformasi'
import StepKTP from './form/StepKTP'
import StepNavigation from './form/StepNavigation'
import StepPaket from './form/StepPaket'
import StepPayment from './form/StepPayment'

interface ModalPelangganProps {
  open: boolean
  initialValues?: any
  onClose: () => void
  mutate: () => void
}

const ModalPelanggan = ({
  open,
  initialValues,
  onClose,
  mutate
}: ModalPelangganProps) => {
  const [form] = useForm()
  const [stepCurrent, setStepCurrent] = useState(0)
  const [loading, setLoading] = useState(false)

  const stepItems: StepProps[] = [
    { title: 'Informasi' },
    { title: 'KTP' },
    { title: 'Paket' },
    { title: 'Pembayaran' }
  ]

  const stepFields: string[][] = [
    [
      'tanggal_berlangganan',
      'name',
      'email',
      'phone_number',
      'kelurahan',
      'alamat',
      'password',
      'birth_date'
    ],
    ['photo_ktp'],
    ['paket'],
    ['banksId', 'bukti_pembayaran']
  ]

  const formContent = [
    <StepInformasi
      key={0}
      isEditMode={!!initialValues}
      alamat={initialValues?.alamat}
    />,
    <StepKTP key={1} form={form} />,
    <StepPaket key={2} />,
    <StepPayment key={3} form={form} />
  ]

  const handleClose = () => {
    form.resetFields()
    setStepCurrent(0)
    onClose()
  }

  const handleFinish = async (values: any) => {
    if (loading) return

    try {
      setLoading(true)

      const data = {
        email: values.email,
        name: values.name,
        phone_number: values.phone_number,
        birth_date: values.birth_date,
        password: values.password,
        provinsi: 'Jawa Barat',
        kota: 'Kabupaten Bekasi',
        kecamatan: 'Babelan',
        kelurahan: values.kelurahan,
        alamat: values.alamat,
        photo_ktp: values.photo_ktp,
        payment: {
          paketId: values.paket,
          banksId: values.banksId,
          buktiPembayaran: values.bukti_pembayaran
        }
      }

      const { error } = await authRepository.api.register(data)

      if (!error) {
        toast.success('Berhasil menambahkan data pelanggan!')

        onClose()
        mutate()
      }
    } catch (error: any) {
      const message = error?.response?.body?.message

      console.log(message)

      if (message) {
        toast.error(message)
        return
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birth_date: dayjs(initialValues.birth_date),
        kelurahan: initialValues.kelurahan
      })
    }
  }, [initialValues, form])

  return (
    <BaseModal
      open={open}
      title='Tambah Data'
      onClose={handleClose}
      titleBorder={false}
      width={stepCurrent === 0 ? 600 : 520}
    >
      <div className='flex flex-col gap-4'>
        <Steps
          size='small'
          current={stepCurrent}
          items={stepItems}
          className='tambah-pengguna-steps'
        />
        <Form
          form={form}
          layout='vertical'
          requiredMark={false}
          onFinish={handleFinish}
        >
          {formContent.map((content, index) => (
            <div
              key={index}
              style={{ display: index === stepCurrent ? 'block' : 'none' }}
            >
              {content}
            </div>
          ))}
          <StepNavigation
            form={form}
            stepCurrent={stepCurrent}
            formContent={formContent}
            stepFields={stepFields}
            setStepCurrent={setStepCurrent}
            handleClose={handleClose}
          />
        </Form>
      </div>
    </BaseModal>
  )
}

export default ModalPelanggan
