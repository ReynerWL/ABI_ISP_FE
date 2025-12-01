'use client'
import { chipColorMethod } from '#/constant/chipColor'
import { Skeleton } from 'antd'

interface MethodChipProps {
  method: string
  isLoading?: boolean
}

const MethodChip = ({ method, isLoading }: MethodChipProps) => {
  const key = method?.toLowerCase()

  const { bgColor, textColor } = chipColorMethod[key] || {
    bgColor: '#E5E7EB33',
    textColor: '#6B7280'
  }

  if (isLoading) {
    return (
      <Skeleton.Node active className='!h-[28px] !w-[100px] !rounded-full' />
    )
  }

  return (
    <div
      className='flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold md:text-sm'
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {method?.toUpperCase() || '-'}
    </div>
  )
}

export default MethodChip
