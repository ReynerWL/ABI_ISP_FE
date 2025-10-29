'use client'

import { useUIState } from '#/context/UIStateContext'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import { PiSealCheckFill } from 'react-icons/pi'

const RegisterSuccess = () => {
  const { isSM, isMobile } = useUIState()

  const triggerConfetti = () => {
    const end = Date.now() + 1 * 1000
    const colors = [
      '#26ccff',
      '#a25afd',
      '#ff5e7e',
      '#88ff5a',
      '#ffa62d',
      '#fcff42',
      '#ff36ff'
    ]

    const frame = () => {
      if (Date.now() > end) return
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors
      })
      requestAnimationFrame(frame)
    }

    frame()
  }

  useEffect(() => {
    setTimeout(() => {
      triggerConfetti()
    }, 300)
  }, [])

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 to-white md:gap-4'>
      {/* Animasi icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
      >
        <PiSealCheckFill
          className='text-[140px] text-primary drop-shadow-lg'
          onClick={triggerConfetti}
        />
      </motion.div>

      {/* Judul */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='text-center text-2xl font-extrabold text-slate-800 md:text-3xl'
      >
        Selamat! {isSM || isMobile ? <br /> : ' '} Registrasi Anda Berhasil 🎉
      </motion.h1>

      {/* Pesan tambahan */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='max-w-xl text-center leading-relaxed text-slate-600'
      >
        Terima kasih telah bergabung dengan layanan internet kami. Akun Anda
        kini terdaftar sebagai{' '}
        <span className='font-semibold text-blue-600'>Pelanggan MBInet</span>.
        <br />
        <br />
        Tim kami akan segera menghubungi Anda melalui{' '}
        <span className='font-semibold text-green-600'>WhatsApp </span>
        untuk mengatur jadwal{' '}
        <span className='font-semibold'>
          pemasangan perangkat di rumah Anda
        </span>
        . Pastikan nomor WhatsApp Anda aktif agar proses berjalan lancar.
      </motion.p>

      {/* Tombol aksi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4`}
      >
        <Link
          href='/login'
          className='h-full w-full rounded-lg bg-primary px-6 py-2.5 text-center text-base font-medium text-white shadow-none transition-colors hover:bg-primary/80 hover:text-white sm:w-fit'
        >
          Masuk ke Akun
        </Link>
        <Link
          href='/beranda'
          className='h-full w-full rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-center text-base font-semibold text-primary shadow-none transition-colors hover:bg-slate-50 hover:text-primary sm:w-fit'
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  )
}

export default RegisterSuccess
