import colorPallete from '#/constant/enums/colorPallete'
import { bankRepository } from '#/repository/bank'
import { Button, Tooltip } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiCheckCircle, HiDocumentDuplicate } from 'react-icons/hi2'
import { toast } from 'sonner'
import AlertDialog from '../reusable/AlertDialog'

interface props {
  id?: string
  active?: boolean
  noRekening: string
  owner: string
  bankName: string
  showDelete?: boolean
  showCopy?: boolean
  onClick?: (value: string | null | undefined) => void
  mutate: () => void
}

export const CardBank: React.FC<props> = ({
  id,
  active,
  bankName,
  noRekening,
  owner,
  showDelete = true,
  showCopy = false,
  onClick,
  mutate
}) => {
  const [copied, setCopied] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 1000)
    } catch (err) {
      console.error('Gagal menyalin teks ke clipboard:', err)
    }
  }

  const handleDelete = async () => {
    try {
      await bankRepository.api.deleteBank(id || '')
      toast.success('Berhasil menghapus bank')
      setShowDeleteConfirm(false)
      mutate()
    } catch (error) {
      toast.error('Gagal menghapus bank')
    }
  }

  return (
    <>
      <div
        className={`group relative col-span-1 flex w-full min-w-[325px] ${showCopy && 'border border-slate-200'} ${onClick && 'cursor-pointer'} items-center justify-center rounded-lg p-6 ${active ? 'bg-primary' : 'bg-white'}`}
        onClick={() => onClick && onClick(id)}
      >
        <div className={'flex w-full items-center justify-between'}>
          <div className={'flex flex-col gap-2'}>
            <p
              className={'line-clamp-2 text-sm font-semibold text-slate-200'}
              style={{
                color: active ? colorPallete.Slate200 : colorPallete.Primary
              }}
            >
              {owner}
            </p>
            <p
              className={'line-clamp-2 text-sm font-medium'}
              style={{
                color: active ? colorPallete.Slate200 : colorPallete.Slate500
              }}
            >
              {bankName}
            </p>
            <p
              className={'text-xl font-bold text-white'}
              style={{
                color: active ? colorPallete.White : colorPallete.Slate800
              }}
            >
              {noRekening}
            </p>
          </div>
          {showDelete && (
            <Button
              className='!z-10 !rounded-lg !bg-red-50 !p-2 !text-xs !font-semibold !text-red-500 !shadow-none hover:!bg-red-100 sm:!hidden sm:group-hover:!block'
              type='primary'
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteConfirm(true)
              }}
            >
              Hapus
            </Button>
          )}
          {showCopy && (
            <Tooltip
              title={
                copied === noRekening
                  ? 'Berhasil disalin!'
                  : 'Salin nomor rekening'
              }
              color={copied === noRekening ? 'green' : undefined}
              className='!z-10'
            >
              <Button
                type='link'
                onClick={() => handleCopy(noRekening)}
                icon={
                  copied === noRekening ? (
                    <HiCheckCircle className='text-3xl !text-green-500' />
                  ) : (
                    <HiDocumentDuplicate className='text-3xl !text-primary hover:!text-blue-600' />
                  )
                }
              />
            </Tooltip>
          )}
        </div>
        <Image
          src={active ? '/pattern_white.svg' : '/pattern_grey.svg'}
          width={289}
          height={164}
          alt={'pattern'}
          className='absolute bottom-0 right-0'
        />
      </div>
      <AlertDialog
        open={showDeleteConfirm}
        title='Hapus Bank'
        description={`Apakah Anda yakin ingin menghapus bank ${bankName} - ${noRekening}?`}
        danger
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}
