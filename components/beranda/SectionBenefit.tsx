'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { JSX } from 'react'

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
      id='Benefit'
      className='flex scroll-mt-28 flex-col items-center -space-y-16 px-4 sm:px-14 md:flex-row md:-space-x-44 md:-space-y-0 md:px-10 xl:px-16 2xl:px-20'
    >
      {/* Image with slide-in on scroll */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }} // triggers when ~30% visible
        className='z-10'
      >
        <Image
          src='/home_2.png'
          alt='logo'
          width={widthImage}
          height={widthImage}
        />
      </motion.div>

      {/* Background + Content */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
        className='flex h-[430px] w-full items-center justify-center rounded-2xl bg-blue-50 sm:h-[340px] md:h-[315px] md:[clip-path:polygon(0_17%,100%_0,100%_100%,0_86%)] lg:h-[360px] xl:h-[500px] 2xl:h-[600px]'
      >
        <div className='flex w-full flex-col gap-y-4 px-9 pt-16 sm:px-14 md:ml-52 md:w-[300px] md:p-0 lg:w-[450px] xl:ml-52 xl:w-[500px] xl:gap-y-8 2xl:ml-14 2xl:w-[600px]'>
          {/* Header with fade-up on scroll */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className='flex flex-col gap-y-1 xl:gap-y-3'
          >
            <h2 className='text-2xl font-bold text-slate-800 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'>
              Top Benefit
            </h2>
            <p className='text-base font-medium text-slate-500 md:text-sm xl:text-base 2xl:text-xl'>
              Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
              kepada kami
            </p>
          </motion.div>

          {/* Benefit list with staggered scroll animation */}
          <motion.div
            className='flex flex-col gap-y-2 lg:gap-y-1 xl:gap-y-4'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.4 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {data.map((value, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='flex gap-x-3 text-base font-medium text-slate-500 md:text-xs lg:text-sm xl:text-base 2xl:text-xl'
              >
                {value.icon}
                <p>{value.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
