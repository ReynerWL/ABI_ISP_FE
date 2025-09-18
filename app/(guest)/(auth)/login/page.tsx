'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { Button, Form, Input } from 'antd'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineEye } from 'react-icons/hi2'

const Login = () => {
  usePageTitle('Login')

  return (
    <div className='flex h-dvh w-full items-center justify-center px-4'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex w-full flex-col rounded-3xl sm:w-[640px] md:min-h-[770px] md:items-center md:justify-center md:p-7 md:shadow-[4px_4px_48px_0px_#0068FF0D]'
      >
        <div className='flex flex-col gap-6 md:w-full md:px-20'>
          <div className='space-y-4'>
            <Image
              src={'/logo-small.svg'}
              alt={'logo'}
              width={144}
              height={44}
              className={'cursor-pointer'}
            />
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold sm:text-4xl'>Selamat Datang</h1>
              <p className='text-sm font-medium text-slate-400 md:text-base'>
                Akses akun Anda dan nikmati fitur lengkapnya
              </p>
            </div>
          </div>
          <Form requiredMark={false} layout='vertical' className='auth-form'>
            <Form.Item
              label='Email'
              name='email'
              validateDebounce={500}
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
              className='!mt-2 !h-fit !w-full !rounded-full !bg-secondary !px-4 !py-2.5 !text-base !font-semibold !shadow-none hover:!bg-secondary/85 md:!text-lg'
              type='primary'
              htmlType='submit'
            >
              Masuk
            </Button>
          </Form>
          <p className='text-center font-light'>
            Tidak punya akun?{' '}
            <Link
              className='font-semibold italic text-secondary'
              href={'/register'}
            >
              Isi Data Diri
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
