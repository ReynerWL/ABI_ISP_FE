'use client'

import { Folder } from 'lucide-react'
import Link from 'next/link'

interface FolderCardProps {
  title: string
  href: string
}

const FolderCard = ({ title, href }: FolderCardProps) => {
  return (
    <Link
      href={href}
      className='group relative flex flex-col items-center gap-3 rounded-2xl border-2 border-gray-200 p-6 transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-xl'
    >
      <div className='relative'>
        <Folder
          className='h-16 w-16 text-secondary transition-transform duration-300 group-hover:scale-110'
          strokeWidth={1.5}
        />
      </div>
      <div className='text-center'>
        <span className='block text-base font-semibold text-slate-500 transition-colors group-hover:text-secondary'>
          {title}
        </span>
      </div>
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-indigo-400/0 transition-all duration-300 group-hover:from-yellow-400/10 group-hover:to-amber-400/10' />
    </Link>
  )
}

export default FolderCard
