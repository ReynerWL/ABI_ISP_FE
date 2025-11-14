'use client'

import InfoPaketCard from '#/components/data-pelanggan/InfoPaketCard'
import InfoPelanggan from '#/components/data-pelanggan/InfoPelanggan'
import InstalasiPreview from '#/components/data-pelanggan/InstalasiPreview'
import KTPPreview from '#/components/data-pelanggan/KTPPreview'
import Title from '#/components/reusable/Title'
import usePageTitle from '#/hooks/usePageTitle'
import { generalRepository } from '#/repository/general'
import { transakasiRepository } from '#/repository/transaksi'
import { User, userRepository } from '#/repository/user'
import { Button, Form, Input, Modal, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { use, useState } from 'react'
import { HiArrowLeft, HiCheckCircle, HiXCircle } from 'react-icons/hi2'
import { toast } from 'sonner'

const DetailPelanggan = ({ params }: { params: Promise<{ id: string }> }) => {
  usePageTitle('Detail Pelanggan')
  const [form] = useForm()
  const { id } = use(params)
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<string>()
  const [reason, setReason] = useState<string>()
  const [isloading, setIsLoading] = useState<boolean>(false)

  const { data, isLoading, error, mutate } =
    userRepository.hooks.useGetUserById(id)
  const user: User = data?.data

  const handleConfirm = async () => {
    if (isloading) return
    setIsLoading(true)

    const paymentId = user?.payments?.[0].id

    if (!paymentId) {
      toast.error('ID pembayaran tidak ditemukan!')
      return
    }

    setIsLoading(true)

    try {
      const { error } =
        await transakasiRepository.api.confirmTransaksi(paymentId)
      if (!error) {
        toast.success('Pembayaran berhasil disetujui!')
        mutate()
      }
    } catch (error) {
      if (error) {
        toast.error('Terjadi kesalahan saat konfirmasi pembayaran!')
      }
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const handleReject = async () => {
    if (isloading) return
    setIsLoading(true)

    const paymentId = user?.payments?.[0].id

    if (!paymentId) {
      toast.error('ID pembayaran tidak ditemukan!')
      return
    }

    if (!reason) {
      toast.error('Mohon berikan alasannya!')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await transakasiRepository.api.rejectedTransaksi(
        paymentId,
        { reason: reason }
      )
      if (!error) {
        toast.success('Pembayaran berhasil ditolak!')
        mutate()
      }
    } catch (error) {
      if (error) {
        toast.error('Terjadi kesalahan saat konfirmasi pembayaran!')
      }
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value)
  }

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh-140px)] items-center justify-center'>
        <Spin size='large' />
      </div>
    )
  }

  if (error?.status === 404) {
    return (
      <div className='flex h-[calc(100vh-140px)] w-full flex-col items-center justify-center py-10'>
        <Image
          src={'/empty-data.svg'}
          width={240}
          height={240}
          alt={'empty'}
          className='h-auto w-36 sm:w-40 md:w-48 lg:w-60'
        />
        <h1 className='text-base font-bold'>Data pelanggan tidak ditemukan</h1>
        <p className='font-normal text-slate-400'>
          Data pelanggan yang Kamu cari tidak ditemukan
        </p>
        <Link
          href={'/dashboard/data-pelanggan'}
          className='mt-4 flex items-center gap-4 rounded-full border border-slate-200 p-2 px-4 text-slate-800 hover:bg-slate-100 hover:text-slate-900'
        >
          <HiArrowLeft className='text-2xl text-slate-800' />
          Kembali
        </Link>
      </div>
    )
  }

  const handleActive = async () => {
    if (isLoading) return

    if (!user?.buktiPemasangan) {
      setIsLoading(false)
      setOpen(false)
      toast.error('Harap unggah bukti pemasangan terlebih dahulu!')
      return
    }

    try {
      await userRepository.api.updateUser(id, { status: 'Aktif' })
      toast.success('Berhasil konfirmasi data pelanggan!')
      mutate()
    } catch (error) {
      toast.error('Terjadi kesalahan saat konfirmasi pelanggan!')
      console.log(error)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const handleUpload = async (file: File) => {
    if (isloading) return
    setIsLoading(true)

    try {
      const data = new FormData()
      data.append('file', file)
      data.append('type', 'buktiPemasangan')

      const { body } = await generalRepository.api.uploadFile(data)

      const uploadURL = body?.data?.url

      const { error } = await userRepository.api.updateUser(id, {
        buktiPemasangan: uploadURL
      })

      if (!error) {
        toast.success('Bukti Pemasangan berhasil diunggah!')
        mutate()
      }
    } catch (error) {
      if (error) {
        toast.error('Terjadi kesalahan saat upload bukti Pemasangan!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <Link
          href={'/dashboard/data-pelanggan'}
          className='rounded-full border border-slate-200 p-2 hover:bg-slate-100'
        >
          <HiArrowLeft className='text-2xl text-slate-800' />
        </Link>
        <Title>Detail Pelanggan</Title>
      </div>
      <div className='flex w-full flex-col gap-6 md:flex-row'>
        <div className='flex w-full flex-col gap-6 2xl:w-full'>
          <InfoPelanggan
            id={user?.customerId}
            tanggalBerlangganan={dayjs(user?.createdAt).format('DD MMMM YYYY')}
            status={user?.status}
            namaPelanggan={user?.name}
            email={user?.email}
            noTelp={user?.phone_number}
            alamat={user?.alamat}
            isLoading={isLoading}
          />
          <div className='grid w-full gap-6 rounded-2xl bg-white p-6 xl:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-xl font-semibold text-slate-700'>Foto KTP</h1>
              <KTPPreview imageUrl={user?.photo_ktp} isLoading={isLoading} />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between font-semibold'>
                <h1 className='text-xl font-semibold text-slate-700'>
                  Foto Instalasi
                </h1>
                <h2 className='text-slate-500'>01-08-2025</h2>
              </div>
              <InstalasiPreview
                isLoading={isLoading}
                handleUpload={handleUpload}
                buktiPemasangan={user?.buktiPemasangan}
              />
            </div>
          </div>
        </div>
        <InfoPaketCard
          paket={user?.paket}
          dueDate={dayjs(user?.payments?.[0].due_date).format('DD MMMM YYYY')}
          payDate={dayjs(user?.payments?.[0].updatedAt).format('DD MMMM YYYY')}
          isLoading={isLoading}
        />
      </div>
      {!isLoading && (
        // TODO: Apply the button based on the user status
        <div className='flex w-full justify-end gap-4'>
          {(() => {
            const status = user?.status?.toLowerCase()

            if (status === 'pra-aktif') {
              return (
                <>
                  <Button
                    type='primary'
                    className='!h-full w-fit !rounded-lg !bg-red-50 !px-5 !py-2 !font-semibold !text-red-500 !shadow-none hover:!bg-red-100'
                    onClick={() => {
                      setOpen(true)
                      setMode('tolak')
                    }}
                  >
                    Menolak
                  </Button>
                  <Button
                    type='primary'
                    className='!h-full w-fit !rounded-lg !px-5 !py-2 !font-semibold !shadow-none'
                    loading={isLoading}
                    onClick={() => {
                      setOpen(true)
                      setMode('setujui')
                    }}
                  >
                    Setujui
                  </Button>
                </>
              )
            }

            if (status === 'baru') {
              return (
                <Button
                  type='primary'
                  className='!h-full w-fit !rounded-lg !px-5 !py-2 !font-semibold !shadow-none'
                  onClick={() => {
                    setOpen(true)
                    setMode('aktif')
                  }}
                >
                  Aktifkan
                </Button>
              )
            }

            return null
          })()}
        </div>
      )}
      <Modal open={open} closable={false} footer={null} centered width={412}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-center'>
              <div
                className={`rounded-full ${mode !== 'tolak' ? 'bg-blue-50' : 'bg-red-50'} p-[3px]`}
              >
                <div
                  className={`rounded-full ${mode !== 'tolak' ? 'bg-blue-100' : 'bg-red-100'} p-[7px]`}
                >
                  {mode === 'tolak' ? (
                    <HiXCircle className='text-3xl text-red-500' />
                  ) : (
                    <HiCheckCircle className='text-3xl text-primary' />
                  )}
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center gap-[10px]'>
              <h1 className='text-[18px] font-bold leading-[22.68px] text-slate-600'>
                {mode === 'setujui'
                  ? 'Setujui'
                  : mode === 'tolak'
                    ? 'Menolak'
                    : 'Aktifkan'}
              </h1>
              <p className='text-center text-sm font-medium leading-[18px] text-slate-800 text-opacity-55'>
                {mode !== 'aktif'
                  ? `Apakah Anda yakin ingin ${mode === 'setujui' ? 'setujui' : 'menolak'} pembayaran ini?`
                  : `Apakah Anda yakin ingin aktifkan pelanggan ini?`}
                <br />
                <span className={'font-bold'}>{`"{user?.customerId}".`}</span>
              </p>
            </div>
            <div className={mode === 'tolak' ? 'pt-5' : 'hidden'}>
              <Form
                requiredMark={false}
                layout='vertical'
                className='auth-form'
                form={form}
              >
                <Form.Item
                  name={'reason'}
                  validateDebounce={1000}
                  preserve={true}
                  rules={[{ required: true, message: 'Wajib diisi' }]}
                >
                  <Input
                    placeholder='Masukkan alasan'
                    onChange={handleChange}
                    value={reason}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <Button
              className='!h-full w-fit !rounded-lg !border-slate-200 !px-5 !py-3 !font-semibold !text-slate-500 !shadow-none'
              type='default'
              block
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button
              className={`!h-full w-fit !rounded-lg ${mode !== 'tolak' ? '!bg-primary hover:!bg-blue-300' : '!bg-red-500 hover:!bg-red-400'} !px-5 !py-3 !font-semibold !text-white !shadow-none`}
              block
              type='primary'
              htmlType='submit'
              onClick={
                mode === 'setujui'
                  ? handleConfirm
                  : mode === 'tolak'
                    ? handleReject
                    : handleActive
              }
            >
              {mode === 'setujui'
                ? 'Setujui'
                : mode === 'tolak'
                  ? 'Menolak'
                  : 'Aktifkan'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DetailPelanggan
