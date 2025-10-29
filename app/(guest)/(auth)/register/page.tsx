'use client'

import FieldPembayaran from '#/components/register/form/FieldPembayaran'
import StepAlamat from '#/components/register/form/StepAlamat'
import StepIcon from '#/components/register/form/StepIcon'
import StepInformasi from '#/components/register/form/StepInformasi'
import StepKTP from '#/components/register/form/StepKTP'
import StepNavigation from '#/components/register/form/StepNavigation'
import StepPaket from '#/components/register/form/StepPaket'
import RegisterSuccess from '#/components/register/RegisterSuccess'
import usePageTitle from '#/hooks/usePageTitle'
import { authRepository, RegisterPayload } from '#/repository/auth'
import { Paket, paketRepository } from '#/repository/paket'
import { Form, StepProps, Steps, UploadFile } from 'antd'
import { useForm, useWatch } from 'antd/es/form/Form'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Register = () => {
  usePageTitle('Register')
  const [form] = useForm()

  const searchParams = useSearchParams()
  const paketParam = searchParams?.get('paket') || ''
  const paketValue = useWatch('paket', form)

  const [stepCurrent, setStepCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [buktiPembayaran, setBuktiPembayaran] = useState<string | null>(null)

  const { data, isLoading } = paketRepository.hooks.useGetPaket()
  const pakets: Paket[] = data?.data

  const formContent = [
    <StepInformasi key={0} />,
    <StepAlamat key={1} />,
    <StepKTP key={2} form={form} />,
    <StepPaket
      key={3}
      setSelectedPaket={setSelectedPaket}
      pakets={pakets}
      isLoading={isLoading}
    />
  ]

  const stepFields: string[][] = [
    ['email', 'phone_number', 'name', 'birth_date', 'password'],
    ['alamat'],
    ['photo_ktp'],
    ['paket']
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
    },
    {
      title: 'Pilih Paket',
      status:
        stepCurrent > 3 ? 'finish' : stepCurrent === 3 ? 'process' : 'wait',
      icon: (
        <StepIcon
          status={
            stepCurrent > 3 ? 'finish' : stepCurrent === 3 ? 'process' : 'wait'
          }
        />
      )
    }
  ]

  const handleFinish = async (values: RegisterPayload) => {
    if (loading) return

    console.log(values)

    if (selectedPaket && !buktiPembayaran) {
      toast.error('Mohon unggah bukti pembayaran sebelum melanjutkan!')
      return
    }

    try {
      setLoading(true)

      const data = {
        ...values,
        provinsi: 'Jawa Barat',
        kota: 'Kabupaten Bekasi',
        kecamatan: 'Babelan',
        payment: { buktiPembayaran, paketId: selectedPaket?.id }
      }

      const { error } = await authRepository.api.register(data)

      if (!error) {
        setSuccess(true)
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
    if (paketParam) {
      form.setFieldValue('paket', paketParam)
    }
  }, [form, paketParam])

  useEffect(() => {
    if (!paketParam) return
    if (paketValue && paketValue !== paketParam) {
      const url = new URL(window.location.href)
      url.searchParams.delete('paket')
      window.history.replaceState({}, '', url.pathname)
    }
  }, [paketValue, paketParam])

  useEffect(() => {
    if (!pakets?.length || !paketParam) return

    const paketFromParam = pakets.find((p) => p.id === paketParam)
    if (paketFromParam) {
      setSelectedPaket(paketFromParam)
      form.setFieldValue('paket', paketFromParam.id)
    }
  }, [pakets, paketParam, form])

  return (
    <div className='flex min-h-dvh w-full items-center justify-center bg-white px-4 md:bg-slate-50'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`grid w-full rounded-3xl bg-white sm:w-[770px] md:min-w-[800px] md:justify-center md:p-16 md:shadow-[4px_4px_48px_0px_#0068FF0D] lg:w-auto xl:w-auto ${success ? 'lg:min-w-[600px]' : 'xl:min-w-[940px]'} ${stepCurrent === 3 && paketValue ? 'grid-cols-[700px_auto] items-start gap-6' : 'grid-cols-1 md:items-center'}`}
      >
        {success ? (
          <RegisterSuccess />
        ) : (
          <>
            <div
              className={`m-0 flex flex-col gap-6 md:w-full lg:gap-9 ${stepCurrent === 3 && paketValue && 'w-[600px] border-r border-slate-200 pr-6'}`}
            >
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <h1 className='m-0 text-3xl font-bold sm:text-4xl'>
                    Data Diri
                  </h1>
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
                onFinish={handleFinish}
                initialValues={{
                  provinsi: 'Jawa Barat',
                  kota_kabupaten: 'Kabupaten Bekasi',
                  kecamatan: 'Babelan'
                }}
              >
                {formContent.map((content, index) => (
                  <div
                    key={index}
                    style={{
                      display: index === stepCurrent ? 'block' : 'none'
                    }}
                  >
                    {content}
                  </div>
                ))}
                <StepNavigation
                  form={form}
                  stepCurrent={stepCurrent}
                  formContent={formContent}
                  stepFields={stepFields}
                  loading={loading}
                  setStepCurrent={setStepCurrent}
                />
              </Form>
            </div>
            {stepCurrent === 3 && paketValue && (
              <FieldPembayaran
                selectedPaket={selectedPaket}
                fileList={fileList}
                setFileList={setFileList}
                setBuktiPembayaran={setBuktiPembayaran}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}

export default Register
