import Image from 'next/image'
import React, { JSX } from 'react'

interface listBenefit {
  icon: JSX.Element
  text: string
}

interface props {
  data: listBenefit[]
  widthImage: number
}

export const SectionBenefit = ({ data, widthImage }: props) => {
  return (
    <div
      id={'Benefit'}
      className={
        'flex scroll-mt-20 flex-col items-center -space-y-16 px-4 sm:px-14 md:flex-row md:-space-x-44 md:-space-y-0 md:px-10 xl:px-16 2xl:px-20'
      }
    >
      <Image
        src={'/home_2.png'}
        alt={'logo'}
        width={widthImage}
        height={widthImage}
        className={'z-10'}
      />
      <div
        className={
          'flex h-[430px] w-full items-center justify-center rounded-2xl bg-blue-50 sm:h-[340px] md:h-[315px] md:[clip-path:polygon(0_17%,100%_0,100%_100%,0_86%)] lg:h-[360px] xl:h-[500px] 2xl:h-[600px]'
        }
      >
        <div
          className={
            'flex w-full flex-col gap-y-4 px-9 pt-16 sm:px-14 md:ml-52 md:w-[300px] md:p-0 lg:w-[450px] xl:ml-52 xl:w-[500px] xl:gap-y-8 2xl:ml-14 2xl:w-[600px]'
          }
        >
          <div className={'flex flex-col gap-y-1 xl:gap-y-3'}>
            <h2
              className={
                'text-2xl font-bold text-slate-800 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'
              }
            >
              Top Benefit
            </h2>
            <p
              className={
                'text-base font-medium text-slate-500 md:text-sm xl:text-base 2xl:text-xl'
              }
            >
              Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
              kepada kami
            </p>
          </div>
          <div className={'flex flex-col gap-y-2 lg:gap-y-1 xl:gap-y-4'}>
            {data.map((value, index) => (
              <div
                key={index}
                className={
                  'flex gap-x-3 text-base font-medium text-slate-500 md:text-xs lg:text-sm xl:text-base 2xl:text-xl'
                }
              >
                {value.icon}
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
