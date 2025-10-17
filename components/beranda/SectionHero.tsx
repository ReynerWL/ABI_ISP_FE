'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface props {
  widthImage: number
}

export const SectionHero = ({ widthImage }: props) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = 'Internet Cepat & Stabil untuk Semua Kebutuhan'

  useEffect(() => {
    // Start typing after initial animation (0.8s)
    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index))
          index++
        } else {
          setIsTypingComplete(true)
          clearInterval(interval)
        }
      }, 50) // 50ms per character for smooth but not slow typing

      return () => clearInterval(interval)
    }, 800)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      id='Hero'
      className='mt-4 flex !w-full scroll-mt-28 flex-col-reverse items-center justify-between gap-y-6 px-4 md:flex-row md:px-10 xl:px-16 2xl:px-20'
    >
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='flex h-fit flex-col gap-y-5 text-center md:gap-y-4 md:text-start xl:gap-y-5 2xl:gap-y-8'
      >
        <div className='flex w-full flex-col gap-y-1 text-base font-normal text-slate-500 md:w-[350px] md:gap-y-3 md:text-sm lg:w-[460px] xl:w-[600px] 2xl:w-[800px] 2xl:gap-y-6 2xl:text-xl'>
          <div className='flex flex-col gap-y-2 md:gap-y-1 2xl:gap-y-3'>
            <p>Halo Sobat,</p>
            <p className='text-3xl font-extrabold leading-snug text-slate-800 md:text-2xl lg:text-3xl 2xl:text-5xl'>
              <span className='hidden lg:inline'>Nikmati</span> {displayedText}
              {!isTypingComplete && <span className='animate-pulse'>|</span>}
            </p>
          </div>
          <p>
            <span className='hidden md:inline lg:hidden'>
              Nikmati WiFi cepat, harga transparan, dan dukungan 24/7 untuk
              rumah & bisnis Anda
            </span>
            <span className='inline md:hidden lg:inline'>
              Nikmati pengalaman online tanpa hambatan dengan layanan WiFi
              berkecepatan tinggi, harga transparan, dan dukungan 24/7 untuk
              rumah maupun bisnis Anda
            </span>
          </p>
        </div>
        <div className='flex w-full justify-center md:justify-start'>
          <Link
            className='!h-fit w-fit !rounded-full !border-none !bg-secondary !px-4 !py-4 !text-base !font-semibold !text-white md:!py-4 md:!text-xs lg:!py-4 lg:!text-base'
            href={'#Produk'}
          >
            Berlangganan Sekarang
          </Link>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src='/home_1.png'
          alt='logo'
          width={widthImage}
          height={widthImage}
          className='mt-1'
        />
      </motion.div>
    </div>
  )
}
