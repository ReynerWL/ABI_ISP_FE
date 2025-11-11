'use client'

import { Form, Steps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import BaseModal from '../reusable/BaseModal'
import StepInformasi from './form/StepInformasi'
import StepKTP from './form/StepKTP'
import StepNavigation from './form/StepNavigation'
import StepPaket from './form/StepPaket'

interface ModalPelangganProps {
  open: boolean
  onClose: () => void
  initialValues?: any
}

const ModalPelanggan = ({
  open,
  initialValues,
  onClose
}: ModalPelangganProps) => {
  const [form] = useForm()
  const [stepCurrent, setStepCurrent] = useState(0)

  const stepItems = [
    { title: 'Informasi Pelanggan' },
    { title: 'KTP' },
    { title: 'Paket' }
  ]

  const stepFields: string[][] = [
    ['tanggal_berlangganan', 'name', 'email', 'phone_number', 'alamat'],
    ['photo_ktp'],
    ['paket']
  ]

  const formContent = [
    <StepInformasi key={0} />,
    <StepKTP key={1} form={form} />,
    <StepPaket key={2} />
  ]

  const handleClose = () => {
    form.resetFields()
    setStepCurrent(0)
    onClose()
  }

  const handleFinish = (values: any) => {
    const data = { ...values }

    console.log('Received values of form: ', data)
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <BaseModal
      open={open}
      title='Tambah Data'
      onClose={handleClose}
      titleBorder={false}
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
