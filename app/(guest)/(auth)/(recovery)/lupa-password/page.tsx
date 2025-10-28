'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { authRepository } from '#/repository/auth'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi2'
import { toast } from 'sonner'

const LupaPasswordPage = () => {
  usePageTitle('Lupa Password')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  const emailFromQuery = searchParams?.get('email')

  useEffect(() => {
    if (emailFromQuery) {
      form.setFieldsValue({ email: emailFromQuery })
    }
  }, [emailFromQuery, form])

  const handleFinish = async (values: { email: string }) => {
    try {
      setLoading(true)
      await authRepository.api.sendForgetPassword(values.email)

      localStorage.setItem('reset_email', values.email)
      localStorage.setItem('reset_requested', 'true')

      toast.success('OTP berhasil dikirimkan, silahkan cek email Anda')
      router.push('/verify-otp')
    } catch (error: any) {
      setLoading(false)

      const statusCode = error?.response?.status

      if (statusCode === 404) {
        toast.error(
          'Email tidak terdaftar. Mohon periksa kembali atau buat akun baru'
        )
        return
      }

      toast.error(
        'Maaf terjadi kesalahan di server. Mohon coba beberapa saat lagi.'
      )
    }
  }

  return (
    <div className='flex h-dvh w-full items-center justify-center bg-white px-6 md:bg-slate-50'>
      <div className='flex h-auto w-full flex-col rounded-3xl bg-white sm:w-[640px] md:min-h-[420px] md:items-center md:justify-center md:p-7 md:py-10 md:shadow-[4px_4px_48px_0px_#0068FF0D] 2xl:min-h-[540px]'>
        <div className='flex flex-col gap-6 py-10 md:w-full md:px-20 2xl:py-0'>
          <Link href={'/'} className='flex w-fit'>
            <Image
              src={'/logo.png'}
              alt={'logo'}
              width={126}
              height={64}
              unoptimized
              className='xl:h-[82px] xl:w-[151px]'
            />
          </Link>
          <div className='space-y-6'>
            <div className='flex flex-col gap-3'>
              <h1 className='m-0 text-3xl font-bold sm:text-4xl'>
                Lupa Password
              </h1>
              <p className='text-xs font-medium text-slate-400 md:text-sm'>
                Masukkan email kamu di bawah, dan kami akan mengirimkan link
                untuk mengatur ulang passwordmu.
              </p>
            </div>
          </div>

          <Form
            requiredMark={false}
            layout='vertical'
            className='auth-form'
            form={form}
            onFinish={handleFinish}
            style={{ width: '100%' }}
          >
            <Form.Item
              name='email'
              validateDebounce={1000}
              rules={[
                { required: true, message: 'Email wajib diisi' },
                { type: 'email', message: 'Format email tidak valid' }
              ]}
            >
              <Input placeholder='Masukkan emailmu' type='email' />
            </Form.Item>
            <div className='mt-6 flex w-full flex-col gap-3'>
              <Button
                className='!h-fit !w-full !rounded-full !bg-secondary !py-3 !text-sm !font-semibold !shadow-none hover:!bg-secondary/85 sm:!px-16'
                type='primary'
                htmlType='submit'
                loading={loading}
              >
                Kirim
              </Button>
              <Link
                href={`/login`}
                className='flex items-center justify-center gap-2 !py-3 text-slate-400 hover:text-slate-500'
              >
                <HiChevronLeft className='text-lg' strokeWidth={0.8} />
                <p className='font-medium'>Kembali ke halaman login</p>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LupaPasswordPage
