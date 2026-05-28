import { useWaStatus } from '#/hooks/useWaStatus'
import { HiExclamationTriangle, HiXMark } from 'react-icons/hi2'
import { useState } from 'react'

interface WaStatusBannerProps {
  access: boolean
}

const WaStatusBanner = ({ access }: WaStatusBannerProps) => {
  const { connected } = useWaStatus()
  const [dismissed, setDismissed] = useState(false)

  // Only show for superadmin, when WA is not connected, and not dismissed
  if (!access || connected || dismissed) return null

  return (
    <div className='mt-6 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm'>
      <div className='flex items-center gap-3'>
        <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100'>
          <HiExclamationTriangle className='text-lg text-amber-600' />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-amber-800'>
            WhatsApp Bot Tidak Terhubung
          </span>
          <span className='text-xs text-amber-600'>
            Notifikasi WA tidak akan terkirim. Silakan hubungkan melalui QR
            WhatsApp.
          </span>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className='flex-shrink-0 rounded-md p-1 text-amber-400 transition-colors hover:bg-amber-100 hover:text-amber-600'
      >
        <HiXMark className='text-lg' />
      </button>
    </div>
  )
}

export default WaStatusBanner
