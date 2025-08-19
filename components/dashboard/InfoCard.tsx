'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface InfoCardProps {
  icon: IconType
  title: string
  description: string
  href: string
}

const InfoCard = ({ icon, title, description, href }: InfoCardProps) => {
  const IconComponent: IconType = icon

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -5 }}
      transition={{ type: 'keyframes', stiffness: 300, damping: 15 }}
      className='group flex cursor-pointer rounded-2xl bg-white p-6 hover:bg-gradient-to-r hover:from-secondary hover:to-yellow-400'
    >
      <Link href={href} className='flex flex-col justify-between'>
        <IconComponent className='text-2xl text-secondary group-hover:text-white' />
        <div className='flex flex-col gap-1'>
          <h1 className='text-base font-bold text-slate-700 group-hover:text-white'>
            {title}
          </h1>
          <p className='font-semibold text-slate-500 group-hover:text-white'>
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default InfoCard
