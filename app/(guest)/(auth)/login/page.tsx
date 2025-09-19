'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { authRepository, LoginPayload } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { Button, Form, Input, Spin } from 'antd'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineEye } from 'react-icons/hi2'
import { toast } from 'sonner'

const Login = () => {
  usePageTitle('Login')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  const handleFinish = async (values: LoginPayload) => {
    try {
      setLoading(true)

      const { body } = await authRepository.api.login(values)
      const accessToken = body?.data?.accessToken

      TokenUtil.setAccessToken(accessToken)
      TokenUtil.persistToken()

      toast.success('Berhasil masuk! Mengarahkan ke beranda...')

      setTimeout(() => {
        toast.dismiss()
        router.push('/dashboard')
      }, 500)
    } catch (error: any) {
      const statusCode = error?.response?.status

      if (statusCode === 500) {
        toast.error(
          'Terjadi masalah pada server. Silakan coba beberapa saat lagi.'
        )
        return
      }

      if (statusCode === 400 || statusCode === 401) {
        toast.error('Email atau password salah. Silakan coba lagi.')
        return
      }

      toast.error('Terjadi kesalahan tak terduga. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    TokenUtil.loadToken()

    if (TokenUtil.accessToken) {
      router.push('/dashboard')
    } else {
      setIsChecking(false)
    }
  }, [router])

  if (isChecking) {
    return (
      <div className='flex h-dvh w-full items-center justify-center'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className='flex h-dvh w-full items-center justify-center px-4'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex w-full flex-col rounded-3xl sm:w-[640px] md:min-h-[770px] md:items-center md:justify-center md:p-7 md:shadow-[4px_4px_48px_0px_#0068FF0D]'
      >
        <div className='flex flex-col gap-6 md:w-full md:px-20'>
          <div className='space-y-4 md:space-y-8'>
            <Link href={'/'}>
              <Image
                src={'/logo-small.svg'}
                alt={'logo'}
                width={144}
                height={44}
              />
            </Link>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold sm:text-4xl'>Selamat Datang</h1>
              <p className='text-sm font-medium text-slate-400 md:text-base'>
                Akses akun Anda dan nikmati fitur lengkapnya
              </p>
            </div>
          </div>
          <Form
            requiredMark={false}
            layout='vertical'
            className='auth-form'
            onFinish={handleFinish}
          >
            <Form.Item
              label='Email'
              name='email'
              validateDebounce={500}
              rules={[
                { required: true, message: 'Email wajib diisi' },
                { type: 'email', message: 'Email tidak valid' }
              ]}
            >
              <Input
                placeholder='Masukkan emailmu'
                type='email'
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Password wajib diisi' }]}
            >
              <Input.Password
                placeholder='Masukkan password'
                type='password'
                iconRender={(visible) =>
                  visible ? (
                    <HiOutlineEye
                      style={{
                        fontSize: '18px',
                        color: '#94A3B8',
                        strokeWidth: 2.2,
                        cursor: 'pointer'
                      }}
                    />
                  ) : (
                    <HiOutlineEyeOff
                      style={{
                        fontSize: '18px',
                        color: '#94A3B8',
                        strokeWidth: 2.2,
                        cursor: 'pointer'
                      }}
                    />
                  )
                }
              />
            </Form.Item>
            <Button
              className='!mt-2 !h-fit !w-full !rounded-full !bg-secondary !px-4 !py-2.5 !text-base !font-semibold !shadow-none hover:!bg-secondary/85 md:!text-base'
              type='primary'
              htmlType='submit'
              loading={loading}
            >
              Masuk
            </Button>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
