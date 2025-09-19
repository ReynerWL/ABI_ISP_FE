import Link from 'next/link'
import { HiInboxArrowDown } from 'react-icons/hi2'
import Chip from '../reusable/Chip'

const ConfirmList = () => {
  return (
    <div className='flex max-h-[350px] w-full flex-col gap-4 rounded-2xl bg-white p-6 xl:h-full xl:max-w-[360px] 2xl:max-w-full'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold text-slate-600'>Perlu Konfirmasi</h1>
        <p className='text-base font-semibold text-slate-400'>5 data</p>
      </div>
      <div className='custom-scrollbar flex flex-col gap-2 overflow-y-auto'>
        <ConfirmListItem id='1234' date='2023-01-01' status='Pending' />
      </div>
    </div>
  )
}

const ConfirmListItem = ({
  id,
  date,
  status
}: {
  id: string
  date: string
  status: string
}) => {
  return (
    <Link
      href={'/'}
      className='flex cursor-pointer items-center justify-between rounded-[14px] p-3 hover:bg-slate-50 2xl:p-4'
    >
      <div className='flex items-center gap-4'>
        <div className='rounded-full bg-slate-100 p-3'>
          <HiInboxArrowDown className='text-2xl text-slate-500' />
        </div>
        <div className='flex flex-col justify-center'>
          <h1 className='font-semibold text-slate-700'>{id}</h1>
          <p className='text-xs font-semibold text-slate-400'>{date}</p>
        </div>
      </div>
      <Chip text={status} color='orange' />
    </Link>
  )
}

export default ConfirmList
