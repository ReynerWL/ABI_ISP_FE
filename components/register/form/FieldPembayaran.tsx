'use client'

import { generalRepository } from '#/repository/general'
import { Paket } from '#/repository/paket'
import { formatRupiah, formatSpeed } from '#/utils/formatter'
import {
  Button,
  Image,
  QRCode,
  Segmented,
  Tooltip,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { HiCheckCircle, HiDocumentDuplicate } from 'react-icons/hi2'
import { PiTrash } from 'react-icons/pi'
import { toast } from 'sonner'

interface FieldPembayaranProps {
  selectedPaket: Paket | null
  fileList: UploadFile[]
  setFileList: (fileList: UploadFile[]) => void
  setBuktiPembayaran: (url: string | null) => void
}

const FieldPembayaran = ({
  selectedPaket,
  fileList,
  setFileList,
  setBuktiPembayaran
}: FieldPembayaranProps) => {
  const [copied, setCopied] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('qris')

  const paymentOptions = [
    { label: 'Qris', value: 'qris' },
    { label: 'Transfer Bank', value: 'transfer' }
  ]

  const price = selectedPaket
    ? formatRupiah(selectedPaket.price ?? '', { withPrefix: true })
    : 'Rp 0'

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 1000)
    } catch (err) {
      console.error('Gagal menyalin teks ke clipboard:', err)
    }
  }

  const handleUpload = async (file: any) => {
    const data = new FormData()
    data.append('file', file)
    data.append('type', 'buktiPembayaran')

    const { body } = await generalRepository.api.uploadFile(data)

    setBuktiPembayaran(body?.data?.url)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const draggerProps: UploadProps = {
    name: 'buktiPembayaran',
    multiple: false,
    maxCount: 1,
    accept: 'image/*',
    fileList,
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.size > 15 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 15MB')
        return Upload.LIST_IGNORE
      }
      return false
    },
    onChange: (info: UploadChangeParam<UploadFile>) => {
      const { file } = info
      handleChange(info)
      handleUpload(file)
      if (file.status !== 'done') {
        toast.success('Foto berhasil diunggah!')
      }
    }
  }

  const bankInfo = {
    bankName: 'Bank BCA',
    accountName: 'Cecil Siregar',
    accountNumber: '1670006749153'
  }

  return (
    <div className='grid gap-8 p-6 pl-0'>
      {/* Header */}
      <div className='flex items-center gap-2'>
        <div className='h-full w-2 rounded-sm bg-secondary'></div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold text-slate-700'>Pembayaran</h1>
          <h2 className='text-sm font-semibold text-slate-500'>
            {selectedPaket?.name}: Up To{' '}
            {selectedPaket && formatSpeed(selectedPaket?.speed, 'upper')}
          </h2>
        </div>
      </div>

      {/* Payment Method Switch */}
      <Segmented options={paymentOptions} onChange={setPaymentMethod} />

      {/* QRIS Section */}
      {paymentMethod === 'qris' && (
        <div className='flex items-center justify-center rounded-lg bg-slate-50 p-8'>
          <QRCode
            value={'https://google.com'}
            className='!size-[250px] !border-0 !bg-white object-cover'
          />
        </div>
      )}

      {/* Bank Transfer Section */}
      {paymentMethod === 'transfer' && (
        <div className='flex w-full min-w-[350px] flex-col items-center gap-6 rounded-lg bg-blue-50 p-6'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex flex-col'>
              <p className='font-medium text-slate-400'>{bankInfo.bankName}</p>
              <p className='font-semibold text-slate-500'>
                {bankInfo.accountName}
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <p className='font-semibold text-slate-700'>
                {bankInfo.accountNumber}
              </p>
              <Tooltip
                title={
                  copied === bankInfo.accountNumber
                    ? 'Berhasil disalin!'
                    : 'Salin nomor rekening'
                }
                color={copied === bankInfo.accountNumber ? 'green' : undefined}
              >
                <Button
                  type='link'
                  onClick={() => handleCopy(bankInfo.accountNumber)}
                  icon={
                    copied === bankInfo.accountNumber ? (
                      <HiCheckCircle className='text-xl !text-green-500' />
                    ) : (
                      <HiDocumentDuplicate className='text-xl !text-primary hover:!text-blue-600' />
                    )
                  }
                />
              </Tooltip>
            </div>
          </div>
        </div>
      )}

      {/* Harga */}
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-slate-500'>Harga</p>
        <div className='flex items-center gap-1'>
          <p className='font-semibold text-slate-700'>{price}</p>
          <Tooltip
            title={copied === price ? 'Berhasil disalin!' : 'Salin harga'}
            color={copied === price ? 'green' : undefined}
          >
            {selectedPaket && (
              <Button
                type='link'
                onClick={() => handleCopy(selectedPaket?.price.toString())}
                icon={
                  copied === selectedPaket?.price.toString() ? (
                    <HiCheckCircle className='text-xl !text-green-500' />
                  ) : (
                    <HiDocumentDuplicate className='text-xl !text-primary hover:!text-blue-600' />
                  )
                }
              />
            )}
          </Tooltip>
        </div>
      </div>

      {/* Bukti Pembayaran */}
      <div className='flex flex-col gap-2'>
        <p className='font-semibold text-slate-500'>Bukti Pembayaran</p>
        <Dragger
          {...draggerProps}
          className='ktp-upload group'
          style={{ display: fileList.length ? 'none' : 'block' }}
        >
          <div className='flex flex-col items-center py-[42px]'>
            <AiFillCamera className='size-16 text-blue-200' />
            <h1 className='text-base font-semibold text-primary underline-offset-2 group-hover:underline'>
              Klik untuk ambil foto
            </h1>
          </div>
        </Dragger>
        {fileList.length > 0 && (
          <div className='flex flex-col gap-4'>
            <Image
              src={
                fileList[0].url ||
                URL.createObjectURL(fileList[0].originFileObj as File)
              }
              alt='bukti-pembayaran'
              className='h-auto max-h-[300px] w-full max-w-[350px] rounded-lg object-contain'
            />
            <Button
              onClick={() => {
                setFileList([])
                setBuktiPembayaran(null)
              }}
              className='!h-full !rounded-lg !border-slate-200 !py-2 !font-semibold !text-red-500 !shadow-none hover:!border-red-500 hover:!bg-red-100 hover:!text-red-500'
            >
              <PiTrash className='size-5' strokeWidth={3} />
              Hapus foto
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldPembayaran
