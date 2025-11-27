import colorPallete from '#/constant/enums/colorPallete'
import { Button, Tooltip } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiCheckCircle, HiDocumentDuplicate } from 'react-icons/hi2'

interface props {
  active?: boolean
  noRekening: string
  owner: string
  bankName: string
  showDelete?: boolean
  showCopy?: boolean
  onClick?: (value: string | null) => void
}

export const CardBank: React.FC<props> = ({
  active,
  bankName,
  noRekening,
  owner,
  showDelete = true,
  showCopy = false,
  onClick
}) => {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(text)
      setTimeout(() => setCopied(null), 1000)
    } catch (err) {
      console.error('Gagal menyalin teks ke clipboard:', err)
    }
  }

  return (
    <div
      className={`relative col-span-1 flex w-full ${showCopy && 'border border-slate-200'} ${onClick && 'cursor-pointer'} items-center justify-center rounded-lg p-6 ${active ? 'bg-primary' : 'bg-white'}`}
      onClick={() => onClick && onClick(`${owner}-${bankName}`)}
    >
      <div className={'flex w-full items-center justify-between'}>
        <div className={'flex flex-col gap-2'}>
          <p
            className={'text-sm font-medium text-slate-200'}
            style={{
              color: active ? colorPallete.Slate200 : colorPallete.Slate500
            }}
          >
            {`${owner} - ${bankName}`}
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
            className='!rounded-lg !bg-red-50 !p-2 !text-xs !font-semibold !text-red-500 !shadow-none'
            type='primary'
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
        className='absolute right-0'
      />
    </div>
  )
}
