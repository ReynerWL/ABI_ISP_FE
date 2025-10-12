'use client'

import { Skeleton } from 'antd'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface InfoCardProps {
  icon: IconType
  title: string
  description: string
  href: string
  isLoading?: boolean
}

const InfoCard = ({
  icon,
  title,
  description,
  href,
  isLoading: loading
}: InfoCardProps) => {
  const IconComponent: IconType = icon

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.01, y: -5 }}
        transition={{ type: 'keyframes', stiffness: 300, damping: 15 }}
        className='group flex h-full cursor-pointer rounded-2xl bg-white p-6 hover:bg-gradient-to-r hover:from-secondary hover:to-yellow-500'
      >
        <div className='flex w-full flex-col gap-4 md:justify-between xl:gap-0'>
          <IconComponent className='text-2xl text-secondary group-hover:text-white' />
          <div className='flex flex-col gap-1'>
            <h1 className='text-sm font-bold text-slate-700 group-hover:text-white md:text-base'>
              {title}
            </h1>

            {loading ? (
              <Skeleton.Button style={{ height: 18 }} active />
            ) : (
              <p className='font-semibold text-slate-500 group-hover:text-white'>
                {description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default InfoCard
