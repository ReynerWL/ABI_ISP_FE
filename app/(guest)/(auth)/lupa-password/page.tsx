'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LupaPasswordPage = () => {
  usePageTitle('Lupa Password')
  const router = useRouter()
  const [form] = useForm()

  const handleFinish = () => {}

  return (
    <div className='flex h-dvh w-full items-center justify-center bg-white px-6 md:bg-slate-50'>
      <div className='flex h-auto w-full flex-col rounded-3xl bg-white sm:w-[640px] md:min-h-[420px] md:items-center md:justify-center md:p-7 md:py-10 md:shadow-[4px_4px_48px_0px_#0068FF0D] 2xl:min-h-[540px]'>
        <div className='flex flex-col gap-6 py-10 md:w-full md:px-20 2xl:py-0'>
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
          <div className='space-y-6'>
            <div className='flex flex-col gap-3'>
              <h1 className='m-0 text-3xl font-bold sm:text-4xl'>
                Lupa Password
              </h1>
              <p className='text-xs font-medium text-slate-400 md:text-base'>
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
              <Input
                placeholder='Masukkan emailmu'
                type='email'
                autoComplete='off'
              />
            </Form.Item>
            <div className='mt-6 flex w-full justify-between gap-6'>
              <Button
                className='!h-fit !w-full !rounded-full !bg-slate-50 !py-3 !text-sm !font-semibold !text-slate-500 !shadow-none hover:!bg-slate-100 sm:!w-fit sm:!px-16'
                type='primary'
                htmlType='button'
                onClick={() => router.push('/login')}
              >
                Kembali
              </Button>
              <Button
                className='!h-fit !w-full !rounded-full !bg-secondary !py-3 !text-sm !font-semibold !shadow-none hover:!bg-secondary/85 sm:!w-fit sm:!px-16'
                type='primary'
                htmlType='submit'
              >
                Kirim
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LupaPasswordPage
