import colorPallete from '#/constant/enums/colorPallete'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'

interface props {
  active?: boolean
  noRekening: string
  owner: string
  bankName: string
  onClick: (value: string | null) => void
}

export const CardBank: React.FC<props> = ({
  active,
  bankName,
  noRekening,
  owner,
  onClick
}) => {
  return (
    <div
      className={`relative col-span-1 flex w-full cursor-pointer items-center justify-center rounded-lg p-6 ${active ? 'bg-primary' : 'bg-white'}`}
      onClick={() => onClick(`${owner}-${bankName}`)}
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
        <Button
          className='!rounded-lg !bg-red-50 !p-2 !text-xs !font-semibold !text-red-500 !shadow-none'
          type='primary'
        >
          Hapus
        </Button>
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
