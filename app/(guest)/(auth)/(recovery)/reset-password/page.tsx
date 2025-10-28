'use client'

import { useUser } from '#/context/UserContext'
import { authRepository } from '#/repository/auth'
import { Button, Form, Input, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineEye } from 'react-icons/hi2'
import { toast } from 'sonner'

const ResetPasswordPage = () => {
  const { resetPasswordToken } = useUser()
  const [isValidating, setIsValidating] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!resetPasswordToken) {
      window.location.href = '/lupa-password'
    } else {
      setIsValidating(false)
    }
  }, [resetPasswordToken])

  if (isValidating)
    return (
      <div className='absolute left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white'>
        <Spin size='large' />
      </div>
    )

  const handleFinish = async (values: any) => {
    try {
      setLoading(true)

      await authRepository.api.resetPassword(
        resetPasswordToken,
        values.new_password
      )

      toast.success('Password berhasil diubah, silahkan login kembali')

      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    } catch (error: any) {
      setLoading(false)

      const statusCode = error?.response?.status

      if (statusCode === 500) {
        toast.error(
          'Maaf terjadi kesalahan di server. Mohon coba beberapa saat lagi.'
        )
      }
    }
  }

  return (
    <div className='flex h-dvh w-full items-center justify-center bg-white px-6 md:bg-slate-50'>
      <div className='flex h-auto w-full flex-col rounded-3xl bg-white sm:w-[640px] md:min-h-[420px] md:items-center md:justify-center md:p-7 md:py-10 md:shadow-[4px_4px_48px_0px_#0068FF0D] 2xl:min-h-[540px]'>
        <div className='flex flex-col gap-6 py-10 md:w-full md:px-20'>
          <h1 className='text-3xl font-bold'>Reset Password</h1>
          <p className='text-sm font-medium text-slate-500'>
            Masukkan password baru untuk akun Anda. Gunakan kombinasi huruf,
            angka, dan simbol agar aman.
          </p>

          <Form
            layout='vertical'
            className='auth-form'
            requiredMark={false}
            onFinish={handleFinish}
          >
            <Form.Item
              label='Password Baru'
              name='new_password'
              validateDebounce={1000}
              rules={[
                { required: true, message: 'Password baru wajib diisi' },
                { min: 8, message: 'Password baru minimal 8 karakter' }
              ]}
            >
              <Input.Password
                placeholder='Masukkan password baru'
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
            <Form.Item
              label='Konfirmasi Password'
              name='confirm_password'
              dependencies={['new_password']}
              validateDebounce={1000}
              rules={[
                { required: true, message: 'Konfirmasi Password wajib diisi' },
                { min: 8, message: 'Konfirmasi Password minimal 8 karakter' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value && getFieldValue('new_password') !== value) {
                      return Promise.reject(
                        'Password tidak sama, silakan periksa kembali.'
                      )
                    }
                    return Promise.resolve()
                  }
                })
              ]}
            >
              <Input.Password
                placeholder='Konfirmasi password baru anda'
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
              className='!mt-4 !h-fit !w-full !rounded-full !bg-secondary !py-3 !text-sm !font-semibold !shadow-none hover:!bg-secondary/85 sm:!px-16'
              type='primary'
              htmlType='submit'
              loading={loading}
            >
              Simpan
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
