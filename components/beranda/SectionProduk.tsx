'use client'

import { useUser } from '#/context/UserContext'
import { Paket } from '#/repository/paket'
import { formatRupiah } from '#/utils/formatter'
import { Button, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

interface props {
  data?: Paket[]
  widthImage?: number
  loading?: boolean
}

export const SectionProduk = ({ data = [], widthImage, loading }: props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()

  const onClickPaket = (val: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString() || '')
    if (val) queryParams.set('paket', val)
    else queryParams.delete('paket')
    router.push(`/register?${queryParams.toString()}`)
  }

  return (
    <div
      id='Produk'
      className='flex scroll-mt-28 flex-col justify-center gap-y-8 px-4 md:px-10 xl:px-16 2xl:px-20'
    >
      {/* Header Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
        className='grid grid-flow-row justify-items-center gap-y-1 xl:gap-y-3'
      >
        <h2 className='text-2xl font-bold text-slate-800 xl:text-3xl 2xl:text-4xl'>
          Produk Kami
        </h2>
        <p className='w-80 text-center text-base font-medium text-slate-500 sm:w-[400px] md:text-sm xl:text-base 2xl:w-[533px] 2xl:text-xl'>
          Kami menyediakan berbagai pilihan produk internet yang cepat, stabil,
          dan sesuai kebutuhan Anda
        </p>
      </motion.div>

      {/* Product Cards Animation */}
      <motion.div
        className='produk-scrollbar flex w-full flex-row gap-x-6 overflow-x-auto overflow-y-hidden p-3'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {loading ? (
          <div className='scrollbar-hide grid w-full grid-flow-col gap-6 overflow-x-hidden'>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton.Node
                key={idx}
                active
                className='!min-h-[380px] !w-[250px] flex-shrink-0 !rounded-2xl md:!min-h-[420px] md:!w-full md:!min-w-[270px]'
              />
            ))}
          </div>
        ) : (
          data?.map((value, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='grid w-full grid-flow-row justify-center gap-y-6 rounded-xl bg-white p-6'
              style={{
                boxShadow:
                  '4px 4px 20px 0px rgba(0, 104, 255, 0.03), -4px -4px 20px 0px rgba(0, 104, 255, 0.03)'
              }}
            >
              <p className='text-lg font-semibold text-slate-700 xl:text-xl'>
                {value.name}
              </p>

              <Image
                src={value.photo}
                alt='logo'
                width={widthImage}
                height={widthImage}
                className='w-full'
              />

              <div className='grid grid-flow-row justify-center gap-y-3'>
                <p className='text-lg font-bold text-primary'>
                  {formatRupiah(value.price, { withPrefix: true })}/Bulan
                </p>
                <p className='flex justify-center text-xs font-medium italic text-slate-500'>
                  *Harga Sudah Termasuk PPN
                </p>
              </div>

              <Button
                className={
                  '!rounded-xl !border-none !bg-blue-50 !px-8 !py-5 !text-sm !font-semibold !text-primary hover:!bg-blue-100 xl:!text-base'
                }
                disabled={
                  user?.role.toLowerCase() === 'admin' ||
                  user?.role.toLowerCase() === 'superadmin'
                }
                onClick={() => onClickPaket(value.id)}
                loading={loading}
              >
                Langganan Sekarang
              </Button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
