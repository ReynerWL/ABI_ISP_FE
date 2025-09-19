'use client'

import StepKTP from '#/components/data-pelanggan/form/StepKTP'
import StepAlamat from '#/components/register/form/StepAlamat'
import StepIcon from '#/components/register/form/StepIcon'
import StepInformasi from '#/components/register/form/StepInformasi'
import StepNavigation from '#/components/register/form/StepNavigation'
import usePageTitle from '#/hooks/usePageTitle'
import { Form, StepProps, Steps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Register = () => {
  usePageTitle('Register')
  const [form] = useForm()
  const [stepCurrent, setStepCurrent] = useState(0)

  const formContent = [
    <StepInformasi key={0} />,
    <StepAlamat key={1} />,
    <StepKTP key={2} form={form} />
  ]

  const stepFields: string[][] = [
    ['email', 'phone_number', 'name', 'birth_date', 'password'],
    ['alamat'],
    ['ktp']
  ]

  const stepItems: StepProps[] = [
    {
      title: 'Informasi Pribadi',
      status: stepCurrent > 0 ? 'finish' : 'process',
      icon: <StepIcon status={stepCurrent > 0 ? 'finish' : 'process'} />
    },
    {
      title: 'Alamat',
      status:
        stepCurrent > 1 ? 'finish' : stepCurrent === 1 ? 'process' : 'wait',
      icon: (
        <StepIcon
          status={
            stepCurrent > 1 ? 'finish' : stepCurrent === 1 ? 'process' : 'wait'
          }
        />
      )
    },
    {
      title: 'Upload KTP',
      status:
        stepCurrent > 2 ? 'finish' : stepCurrent === 2 ? 'process' : 'wait',
      icon: (
        <StepIcon
          status={
            stepCurrent > 2 ? 'finish' : stepCurrent === 2 ? 'process' : 'wait'
          }
        />
      )
    }
  ]

  return (
    <div className='flex h-dvh w-full items-center justify-center px-4'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex w-full flex-col rounded-3xl sm:w-[770px] md:min-h-[740px] md:items-center md:justify-center md:p-16 md:shadow-[4px_4px_48px_0px_#0068FF0D] xl:w-[940px]'
      >
        <div className='m-0 flex flex-col gap-6 md:w-full lg:gap-9'>
          <div className='space-y-6'>
            <div className='space-y-2'>
              <h1 className='m-0 text-3xl font-bold sm:text-4xl'>Data Diri</h1>
              <p className='text-sm font-medium text-slate-400 md:text-base'>
                Semua data ini wajib di isi untuk kebutuhan proses pemesanan
                Kamu.
              </p>
            </div>
            <Steps
              size='small'
              current={stepCurrent}
              items={stepItems}
              className='steps-register'
            />
          </div>
          <Form
            requiredMark={false}
            layout='vertical'
            className='auth-form'
            form={form}
            initialValues={{
              provinsi: 'Jawa Barat',
              kota_kabupaten: 'Kabupaten Bekasi',
              kecamatan: 'Babelan'
            }}
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
            />
          </Form>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
