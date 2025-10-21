'use client'

import { motion } from 'framer-motion'
import { JSX } from 'react'

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
      id={'Tentang_Kami'}
      className={
        'flex scroll-mt-28 flex-row justify-center bg-slate-50 px-4 md:px-10 xl:px-16 2xl:px-20'
      }
    >
      <div className={'flex flex-col gap-8 py-12 lg:py-16'}>
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
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
        </motion.div>

        {/* Cards Animation */}
        <div className={'grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-12'}>
          {data.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.15
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={
                'flex flex-row items-center gap-8 rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md xl:flex-col xl:items-start xl:p-6'
              }
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.15 + 0.2
                }}
                viewport={{ once: true }}
              >
                {value.icon}
              </motion.div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
