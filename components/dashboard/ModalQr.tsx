import { qrRepository } from '#/repository/qr'
import { useWaStatus } from '#/hooks/useWaStatus'
import { Button, Spin } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { HiCheck, HiInformationCircle, HiQrCode } from 'react-icons/hi2'
import { toast } from 'sonner'
import BaseModal from '../reusable/BaseModal'

interface props {
  access: boolean
}

const ModalQr = ({ access }: props) => {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  // SSE-driven real-time status
  const { connected, qrAvailable } = useWaStatus()

  // QR image fetch (only when modal is open)
  const {
    data: Qr,
    isLoading,
    mutate: refetchQr
  } = qrRepository.hooks.useGetQr()

  // Auto-refetch QR when modal opens or qrAvailable changes
  useEffect(() => {
    if (open && qrAvailable) {
      refetchQr()
    }
  }, [open, qrAvailable, refetchQr])

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await qrRepository.api.useLogoutQr()
      toast.success('Berhasil Logout ...')
    } catch (error) {
      toast.error('Gagal Logout ...')
      console.log(error)
    } finally {
      setLoggingOut(false)
    }
  }

  const handleRefresh = async () => {
    try {
      await refetchQr()
      toast.success('Berhasil Refresh QR ...')
    } catch (error) {
      toast.error('Gagal Refresh QR ...')
      console.log(error)
    }
  }

  // Determine QR image source
  const qrSrc =
    !connected && Qr?.qrCodeDataUrl ? Qr.qrCodeDataUrl : '/emptyQr.png'

  return (
    <>
      <Button
        className={
          access
            ? '!h-full !w-fit !rounded-lg !bg-blue-50 !p-2 !text-base !font-semibold !text-primary !shadow-none hover:!bg-blue-100 md:!w-fit'
            : '!hidden'
        }
        type='text'
        onClick={() => setOpen(true)}
      >
        <HiQrCode className='text-2xl' />
        <span className={'hidden sm:flex'}>QR WhatsApp</span>

        {/* Status indicator dot */}
        <span
          className={`ml-1 inline-block h-2.5 w-2.5 rounded-full ${
            connected ? 'bg-green-500' : 'animate-pulse bg-red-400'
          }`}
        />
      </Button>

      <BaseModal
        open={open}
        title='QR WhatsApp'
        onClose={() => setOpen(false)}
        titleBorder={false}
        width={520}
      >
        <div className={'flex flex-col items-center justify-center gap-6 p-6'}>
          <div className={'flex flex-col gap-2 text-center'}>
            <h1 className={'text-lg font-bold text-slate-600'}>
              {connected ? 'WhatsApp Terhubung' : 'Scan QR Code'}
            </h1>
            <p className={'text-xs font-medium text-slate-500'}>
              {connected
                ? 'Bot WhatsApp sedang aktif dan terhubung.'
                : 'Scan QR Code ini untuk melakukan verifikasi WhatsApp Bot.'}
            </p>
          </div>

          <div
            className={
              'relative flex items-center justify-center rounded-lg border border-slate-200 p-6'
            }
          >
            {/* Loading overlay */}
            {isLoading && !connected && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/75'>
                <Spin size='large' />
              </div>
            )}

            {/* Connected overlay */}
            {connected && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80'>
                <div className='flex flex-col items-center gap-2 text-center text-xl font-semibold text-slate-800'>
                  <HiCheck
                    className='rounded-full border-2 border-green-500 p-1 text-2xl text-green-500'
                    strokeWidth={3}
                  />
                  Terhubung
                </div>
              </div>
            )}

            {/* QR not available + not connected overlay */}
            {!connected && !qrAvailable && !isLoading && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80'>
                <div className='flex flex-col items-center text-center text-base font-semibold text-slate-800'>
                  <HiInformationCircle className='rounded-full p-1 text-4xl text-secondary' />
                  QR Tidak Valid
                  <br />
                  Silahkan Refresh
                </div>
              </div>
            )}

            <Image src={qrSrc} alt={'QR WhatsApp'} width={300} height={300} />
          </div>

          {/* Refresh QR button — only show when not connected */}
          {!connected && (
            <Button
              className='!h-fit !w-60 !rounded-full !border-none !bg-blue-50 !p-3 !font-semibold !text-primary !shadow-none'
              onClick={handleRefresh}
              loading={isLoading}
            >
              Refresh QR
            </Button>
          )}

          {/* Logout button — only show when connected */}
          {connected && (
            <Button
              className='!h-fit !w-60 !rounded-full !border-none !bg-red-50 !p-3 !font-semibold !text-red-500 !shadow-none'
              onClick={handleLogout}
              loading={loggingOut}
            >
              Logout
            </Button>
          )}
        </div>
      </BaseModal>
    </>
  )
}

export default ModalQr
