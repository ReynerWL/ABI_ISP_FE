'use client'
import chipColor from '#/constant/chipColor'
import { GiPlainCircle } from 'react-icons/gi'

interface ChipProps {
  text: string
}

const Chip = ({ text }: ChipProps) => {
  const lowerText = text.toLowerCase().replace('-', '_')
  const displayText = text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-')

  const { bgColor, textColor } = chipColor[lowerText] || {
    bgColor: '#6B728033',
    textColor: '#6b7280'
  }

  return (
    <div
      className={`flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold md:text-sm`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <GiPlainCircle className='text-[6px] md:text-[8px]' />
      {displayText}
    </div>
  )
}

export default Chip
