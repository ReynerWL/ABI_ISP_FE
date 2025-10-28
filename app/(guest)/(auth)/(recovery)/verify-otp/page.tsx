'use client'

import { useUser } from '#/context/UserContext'
import { authRepository } from '#/repository/auth'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi2'
import { toast } from 'sonner'

const VerifyOTPPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)
  const [loading, setLoading] = useState(false)
  const { setResetPasswordToken } = useUser()

  useEffect(() => {
    const requested = localStorage.getItem('reset_requested')
    const storedEmail = localStorage.getItem('reset_email')

    if (!requested || !storedEmail) {
      router.replace('/lupa-password')
      return
    }

    setEmail(storedEmail)

    // OTP expiry timer (60s)
    const expiryTime = localStorage.getItem('otp_expiry')
    let targetTime: number

    if (expiryTime) {
      targetTime = parseInt(expiryTime, 10)
    } else {
      targetTime = Date.now() + 60000 // 60s
      localStorage.setItem('otp_expiry', targetTime.toString())
    }

    const remainingTime = Math.floor((targetTime - Date.now()) / 1000)
    if (remainingTime <= 0) {
      setCountdown(0)
      return
    }

    setCountdown(remainingTime)

    const timer = setInterval(() => {
      const remaining = Math.floor((targetTime - Date.now()) / 1000)
      if (remaining <= 0) {
        clearInterval(timer)
        setCountdown(0)
      } else {
        setCountdown(remaining)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [router, countdown])

  const clearStorage = () => {
    localStorage.removeItem('reset_requested')
    localStorage.removeItem('otp_expiry')
  }

  const handleFinish = async (values: { otp: string }) => {
    try {
      setLoading(true)
      const res = await authRepository.api.validatePasswordToken(values.otp)

      if (res.body.data === 'valid') {
        toast.success('OTP valid, silakan ubah password')
        setResetPasswordToken(values.otp)
        clearStorage()
        router.push('/reset-password')
      } else {
        toast.error('Kode OTP tidak valid')
        setLoading(false)
      }
    } catch (error: any) {
      const statusCode = error?.response?.status

      if (statusCode === 500) {
        toast.error(
          'Maaf terjadi kesalahan di server. Mohon coba beberapa saat lagi.'
        )
      }
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      await authRepository.api.sendForgetPassword(email || '')

      // Reset OTP expiry timer (60s)
      const newExpiryTime = Date.now() + 60000
      localStorage.setItem('otp_expiry', newExpiryTime.toString())
      setCountdown(60)

      toast.success('OTP baru berhasil dikirim')
    } catch {
      toast.error('Gagal mengirim ulang OTP')
    } finally {
      setLoading(false)
    }
  }

  if (!email) return null

  return (
    <div className='flex h-dvh w-full items-center justify-center bg-white px-6 md:bg-slate-50'>
      <div className='flex h-auto w-full flex-col rounded-3xl bg-white sm:w-[640px] md:min-h-[420px] md:items-center md:justify-center md:p-7 md:py-10 md:shadow-[4px_4px_48px_0px_#0068FF0D] 2xl:min-h-[540px]'>
        <div className='flex flex-col gap-6 py-10 md:w-full md:px-20'>
          <h1 className='text-3xl font-bold'>Verifikasi OTP</h1>
          <p className='text-sm font-medium text-slate-500'>
            Kami telah mengirimkan kode OTP ke alamat email{' '}
            <span className='font-semibold text-primary'>{email}</span>, silakan
            periksa email Anda dan masukkan kode OTP yang kami kirimkan di bawah
            ini.
          </p>

          <Form onFinish={handleFinish}>
            <Form.Item
              name='otp'
              rules={[
                { required: true, message: 'OTP wajib diisi' },
                { len: 6, message: 'OTP harus 6 digit' }
              ]}
            >
              <Input.OTP length={6} />
            </Form.Item>

            <div className='flex flex-col items-center justify-center'>
              <p className='text-slate-400'>Tidak menerima kode?</p>
              <Button
                type='link'
                className={`!h-fit !font-medium underline underline-offset-2 ${loading || countdown > 0 ? '!text-slate-400 hover:!text-slate-400' : '!text-primary hover:!text-blue-600'}`}
                disabled={loading || countdown > 0}
                onClick={handleResend}
              >
                Kirim ulang {countdown > 0 ? `(${countdown}d)` : ''}
              </Button>

              <Button
                className='!mt-4 !h-fit !w-full !rounded-full !bg-secondary !py-3 !text-sm !font-semibold !shadow-none hover:!bg-secondary/85 sm:!px-16'
                type='primary'
                htmlType='submit'
                loading={loading}
              >
                Verifikasi
              </Button>
            </div>
          </Form>

          <Link
            href='/lupa-password'
            className='flex items-center justify-center gap-2 text-slate-400 hover:text-slate-500'
            onClick={() => {
              clearStorage()
            }}
          >
            <HiChevronLeft className='text-lg' strokeWidth={0.8} />
            <p className='font-medium'>Kembali</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTPPage
