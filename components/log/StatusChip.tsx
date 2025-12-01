'use client'
import { chipColorStatus } from '#/constant/chipColor'
import { Skeleton } from 'antd'
import { GiPlainCircle } from 'react-icons/gi'

interface StatusChipProps {
  status: number
  isLoading?: boolean
}

const StatusChip = ({ status, isLoading }: StatusChipProps) => {
  let key = 'success'

  if (status >= 200 && status < 300) key = 'success'
  else if (status >= 300 && status < 400) key = 'redirect'
  else if (status >= 400 && status < 500) key = 'client_error'
  else if (status >= 500) key = 'server_error'

  const { bgColor, textColor } = chipColorStatus[key] || {
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
      <GiPlainCircle className='text-[6px] md:text-[8px]' />
      {status}
    </div>
  )
}

export default StatusChip
