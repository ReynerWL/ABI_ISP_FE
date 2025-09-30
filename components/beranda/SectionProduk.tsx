import { GetAllPaket } from '#/repository/beranda'
import { formatRupiah } from '#/utils/formatter'
import { Button, Skeleton } from 'antd'
import Image from 'next/image'
import React from 'react'

interface props {
  data?: GetAllPaket[]
  widthImage?: number
  loading?: boolean
}

export const SectionProduk = ({ data = [], widthImage, loading }: props) => {
  return (
    <div
      id={'4'}
      className={
        'flex scroll-mt-20 flex-col justify-center gap-y-8 px-4 md:px-10 xl:px-16 2xl:px-20'
      }
    >
      <Skeleton active loading={loading} round paragraph={{ rows: 6 }}>
        <div
          className={
            'grid grid-flow-row justify-items-center gap-y-1 xl:gap-y-3'
          }
        >
          <h2
            className={
              'text-2xl font-bold text-slate-800 xl:text-3xl 2xl:text-4xl'
            }
          >
            Produk Kami
          </h2>
          <p
            className={
              'w-80 text-center text-base font-medium text-slate-500 sm:w-[400px] md:text-sm xl:text-base 2xl:w-[533px] 2xl:text-xl'
            }
          >
            Kami menyediakan berbagai pilihan produk internet yang cepat,
            stabil, dan sesuai kebutuhan Anda
          </p>
        </div>
        <div
          className={
            'no-scrollbar flex w-full flex-row gap-x-6 overflow-y-auto p-3'
          }
        >
          {data?.map((value, index) => (
            <div
              key={index}
              className={
                'grid w-full grid-flow-row justify-center gap-y-6 rounded-xl bg-white p-6'
              }
              style={{
                boxShadow:
                  '4px 4px 20px 0px rgba(0, 104, 255, 0.03), -4px -4px 20px 0px rgba(0, 104, 255, 0.03) '
              }}
            >
              <p className={'text-lg font-semibold text-slate-700 xl:text-xl'}>
                {value.name}
              </p>
              <Image
                src={value.photo ?? ''}
                alt={'logo'}
                width={widthImage}
                height={widthImage}
                className={'w-full'}
              />
              <div className={'grid grid-flow-row justify-center gap-y-3'}>
                <p className={'text-lg font-bold text-primary'}>
                  {formatRupiah(value.price ?? '', { withPrefix: true })}/Bulan
                </p>
                <p
                  className={
                    'flex justify-center text-xs font-medium italic text-slate-500'
                  }
                >
                  Harga Sudah Termasuk PPN
                </p>
              </div>
              <Button
                className={
                  '!rounded-xl !border-none !bg-blue-50 !px-8 !py-5 !text-sm !font-semibold !text-primary xl:!text-base'
                }
              >
                Langganan Sekarang
              </Button>
            </div>
          ))}
        </div>
      </Skeleton>
    </div>
  )
}
