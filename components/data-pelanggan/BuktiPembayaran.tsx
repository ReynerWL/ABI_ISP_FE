import { Button } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlineDownload } from 'react-icons/hi'
import { PiImageFill } from 'react-icons/pi'
import BaseModal from '../reusable/BaseModal'

interface BuktiPembayaranProps {
  imageUrl?: string
}

const BuktiPembayaran = ({ imageUrl }: BuktiPembayaranProps) => {
  const [open, setOpen] = useState(false)

  const handleDownload = async () => {
    if (!imageUrl) return

    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'Bukti_Pembayaran.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(url)
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-base font-semibold text-primary'>Bukti Pembayaran</h2>
      <Button
        className='!shadow-[0_0_0_4px_rgba(207, 207, 207, 0.1)] !h-fit !w-full !justify-start !gap-3 !rounded-xl !border-slate-200 !p-4 hover:!bg-slate-50'
        onClick={() => setOpen(true)}
      >
        <div className='rounded border border-slate-200 p-1'>
          <PiImageFill className='text-2xl text-secondary' />
        </div>
        <span className='font-semibold text-primary'>
          Bukti Pembayaran_121846234310
        </span>
      </Button>

      <BaseModal
        open={open}
        title='Bukti Pembayaran'
        onClose={() => setOpen(false)}
      >
        <div className='flex flex-col gap-4'>
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt='bukti pembayaran'
                width={0}
                height={400}
                layout='responsive'
                className='rounded-2xl'
              />
              <Button
                className='!h-[44px] !w-full text-base !font-medium tracking-wide !shadow-none'
                type='primary'
                icon={
                  <HiOutlineDownload
                    className='text-[23px]'
                    strokeWidth={1.9}
                  />
                }
                onClick={handleDownload}
                htmlType='button'
              >
                Download
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </BaseModal>
    </div>
  )
}

export default BuktiPembayaran
