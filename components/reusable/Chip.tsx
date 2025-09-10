'use client'
import { GiPlainCircle } from 'react-icons/gi'

interface ChipProps {
  text: React.ReactNode
  color?: 'gray' | 'green' | 'red' | 'orange'
}

const chipVariants = {
  gray: { bg: 'bg-slate-50', text: 'text-slate-500' },
  green: { bg: 'bg-green-50', text: 'text-green-600' },
  red: { bg: 'bg-red-50', text: 'text-red-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-500' }
}

const Chip = ({ text, color }: ChipProps) => {
  const { bg, text: textColor } = chipVariants[color || 'gray']
  return (
    <div
      className={`flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold md:text-sm ${bg} ${textColor}`}
    >
      <GiPlainCircle className='text-[6px] md:text-[8px]' />
      {text}
    </div>
  )
}

export default Chip
