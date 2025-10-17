'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { authRepository, LoginPayload, UserPayload } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { Button, Form, Input } from 'antd'
import Checkbox from 'antd/es/checkbox/Checkbox'
import { motion } from 'framer-motion'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineEye } from 'react-icons/hi2'
import { toast } from 'sonner'

const Login = () => {
  usePageTitle('Login')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleFinish = async (values: LoginPayload) => {
    try {
      setLoading(true)

      const { body } = await authRepository.api.login(values)
      const accessToken = body?.data?.accessToken

      const decoded = jwtDecode<UserPayload>(accessToken)
      const userRole = decoded?.role.toLowerCase()

      if (rememberMe) {
        TokenUtil.setRememberMe(rememberMe)
        TokenUtil.setAccessToken(accessToken)
        TokenUtil.persistToken()
      } else {
        sessionStorage.setItem('access_token', accessToken || '')
        TokenUtil.setAccessToken(accessToken)
        TokenUtil.persistToken()
      }

      toast.success(
        `Berhasil masuk! Mengarahkan ke ${userRole === 'admin' ? 'dashboard' : 'beranda'}...`
      )

      setTimeout(() => {
        switch (userRole) {
          case 'admin':
            router.push('/dashboard')
            break
          case 'user':
            router.push('/beranda')
            break
          default:
            break
        }
      }, 1000)
    } catch (error: any) {
      setLoading(false)
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
    }
  }

  return (
    <div className='flex h-dvh w-full items-center justify-center bg-white px-6 md:bg-slate-50'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex h-auto w-full flex-col rounded-3xl bg-white sm:w-[640px] md:items-center md:justify-center md:p-7 md:shadow-[4px_4px_48px_0px_#0068FF0D] 2xl:min-h-[680px]'
      >
        <div className='flex flex-col gap-6 py-10 md:w-full md:px-20 2xl:py-0'>
          <div className='space-y-3'>
            <Link href={'/'}>
              <Image
                src={'/logo.png'}
                alt={'logo'}
                width={126}
                height={64}
                unoptimized
                className='xl:h-[82px] xl:w-[151px]'
              />
            </Link>
            <div className='flex flex-col gap-2'>
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
            name='login-form'
          >
            <Form.Item
              label='Email'
              name='email'
              validateDebounce={1000}
              rules={[
                { required: true, message: 'Email wajib diisi' },
                { type: 'email', message: 'Email tidak valid' }
              ]}
            >
              <Input placeholder='Masukkan emailmu' type='email' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              validateDebounce={1000}
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
            <div className='flex items-center justify-between gap-4'>
              <Checkbox
                onChange={(e) => setRememberMe(e.target.checked)}
                className='text-sm font-medium !text-slate-500 md:text-base'
              >
                Ingat akun saya
              </Checkbox>
              <Link
                href={'/forgot-password'}
                className='font-medium text-slate-500'
              >
                Lupa password?
              </Link>
            </div>
          </Form>
          <Button
            className='!h-fit !w-full !rounded-full !bg-secondary !px-4 !py-2.5 !text-base !font-semibold !shadow-none hover:!bg-secondary/85 md:!text-base'
            type='primary'
            htmlType='submit'
            loading={loading}
            form='login-form'
          >
            Masuk
          </Button>
          <p className='text-center text-xs font-medium text-slate-400 md:text-sm'>
            Belum berlangganan?{' '}
            <Link
              href={'/register'}
              className='font-semibold italic text-primary hover:text-primary/80 hover:underline'
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
