import { qrRepository } from '#/repository/qr'
import { Button, Spin } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { HiCheck, HiInformationCircle, HiQrCode } from 'react-icons/hi2'
import { toast } from 'sonner'
import BaseModal from '../reusable/BaseModal'

const ModalQr = () => {
  const [open, setOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const {
    data: Qr,
    isLoading,
    mutate: refetchQr
  } = qrRepository.hooks.useGetQr()
  const { data: QrStatus, mutate: refetchQrStatus } =
    qrRepository.hooks.useGetQrStatus()

  useEffect(() => {
    if (!QrStatus?.qrCode && QrStatus?.connected === false) {
      const handleLogout = async () => {
        try {
          await qrRepository.api.useLogoutQr()
        } catch (error) {
          console.log(`Gagal Logout ...`)
          console.log(error)
        }
      }

      handleLogout()
    }
  }, [QrStatus])

  useEffect(() => {
    if (open) {
      refetchQrStatus()
      refetchQr()
    }
  }, [open, refetchQrStatus, refetchQr])

  const handleLogout = async () => {
    try {
      await qrRepository.api.useLogoutQr()
      toast.success(`Berhasil Logout ...`)
      setOpen(!open)
    } catch (error) {
      toast.success(`Gagal Logout ...`)
      console.log(error)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefresh(true)
      await refetchQrStatus()
      await refetchQr()
      toast.success(`Berhasil Refresh QR ...`)
    } catch (error) {
      toast.success(`Gagal Refresh QR ...`)
      console.log(error)
    } finally {
      setRefresh(false)
    }
  }

  const QrVisible =
    Qr?.qrCodeDataUrl && QrStatus?.connected === false
      ? Qr?.qrCodeDataUrl
      : '/emptyQr.png'

  return (
    <>
      <Button
        className='!h-full !w-fit !rounded-lg !bg-blue-50 !p-2 !text-base !font-semibold !text-primary !shadow-none hover:!bg-blue-100 md:!w-fit'
        type='text'
        onClick={() => setOpen(true)}
      >
        <HiQrCode className='text-2xl' />
        <span className={'hidden sm:flex'}>QR WhatsApp</span>
      </Button>

      <BaseModal
        open={open}
        title='QR WhatsApp'
        onClose={() => setOpen(!open)}
        titleBorder={false}
        width={520}
      >
        <div className={'flex flex-col items-center justify-center gap-6 p-6'}>
          <div className={'flex flex-col gap-2 text-center'}>
            <h1 className={'text-lg font-bold text-slate-600'}>Scan QR Code</h1>
            <p className={'text-xs font-medium text-slate-500'}>
              Scan QR Code ini untuk melakukan verifikasi whatsApp Bot.
            </p>
          </div>

          <div
            className={
              'flex items-center justify-center rounded-lg border border-slate-200 p-6'
            }
          >
            {(isLoading || refresh) && (
              <div className='absolute inset-x-20 inset-y-28 z-10 flex items-center justify-center bg-white/75'>
                <Spin size='large' />
              </div>
            )}
            <div
              className={
                QrStatus?.connected === true
                  ? 'absolute inset-x-24 inset-y-32 top-[182px] z-10 flex items-center justify-center bg-white/70'
                  : isLoading || refresh
                    ? 'hidden'
                    : 'hidden'
              }
            >
              <div
                className={
                  'flex flex-col items-center gap-2 text-center text-xl font-semibold text-slate-800'
                }
              >
                <HiCheck
                  className={
                    'rounded-full border-2 border-green-500 p-1 text-2xl text-green-500'
                  }
                  strokeWidth={3}
                />
                Terhubung
              </div>
            </div>
            <div
              className={
                !Qr?.qrCodeDataUrl && QrStatus?.connected === false
                  ? 'absolute inset-x-24 inset-y-32 top-[182px] z-10 flex items-center justify-center bg-white/70'
                  : 'hidden'
              }
            >
              <div
                className={
                  'flex flex-col items-center text-center text-base font-semibold text-slate-800'
                }
              >
                <HiInformationCircle
                  className={'rounded-full p-1 text-4xl text-secondary'}
                />
                QR Tidak Valid
                <br />
                Silahkan Refresh
              </div>
            </div>
            <Image
              src={QrVisible}
              alt={'QR WhatsApp'}
              width={300}
              height={300}
            />
          </div>
          <Button
            className={
              QrStatus?.connected === false
                ? '!h-fit !w-60 !rounded-full !border-none !bg-blue-50 !p-3 !font-semibold !text-primary !shadow-none'
                : '!hidden'
            }
            onClick={handleRefresh}
          >
            Refresh QR
          </Button>
          <Button
            className={
              QrStatus?.connected === true
                ? '!h-fit !w-60 !rounded-full !border-none !bg-red-50 !p-3 !font-semibold !text-red-500 !shadow-none'
                : '!hidden'
            }
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </BaseModal>
    </>
  )
}

export default ModalQr
