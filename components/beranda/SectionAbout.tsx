import React, { JSX } from 'react'

interface aboutList {
  icon: JSX.Element
  title: string
  desc: string
}

interface props {
  data: aboutList[]
}

export const SectionAbout = ({ data }: props) => {
  return (
    <div
      id={'2'}
      className={
        'flex scroll-mt-20 flex-row justify-center bg-slate-50 px-4 md:px-10 xl:px-16 2xl:px-20'
      }
    >
      <div className={'flex flex-col gap-8 py-12 lg:py-16'}>
        <div
          className={
            'flex flex-col items-center justify-center gap-y-2 md:gap-y-3 xl:grid xl:grid-flow-row xl:justify-items-center'
          }
        >
          <h2
            className={
              'text-2xl font-bold text-slate-800 xl:text-3xl 2xl:text-4xl'
            }
          >
            Mengapa Pilih Kami ?
          </h2>
          <p
            className={
              'w-[350px] text-center text-base font-medium text-slate-500 md:w-[300px] md:text-sm xl:w-[400px] xl:text-base 2xl:w-[488px] 2xl:text-xl'
            }
          >
            Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
            kepada kami
          </p>
        </div>
        <div className={'flex flex-col gap-6 xl:flex-row xl:gap-12'}>
          {data.map((value, index) => (
            <div
              key={index}
              className={
                'flex flex-row items-center gap-8 rounded-2xl bg-white p-8 xl:flex-col xl:items-start xl:p-6'
              }
            >
              {value.icon}
              <div className={'flex flex-col gap-y-1 xl:gap-y-2 2xl:gap-y-4'}>
                <p className={'text-lg font-bold text-slate-700 2xl:text-2xl'}>
                  {value.title}
                </p>
                <p
                  className={
                    'font-medium text-slate-500 xl:text-xs 2xl:text-sm'
                  }
                >
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
