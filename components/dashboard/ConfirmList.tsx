import { HiInboxArrowDown } from 'react-icons/hi2'
import Chip from '../reusable/Chip'

const ConfirmList = () => {
  return (
    <div className='flex max-h-[350px] w-full flex-col gap-4 rounded-2xl bg-white p-6 xl:h-full'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold text-slate-600'>Perlu Konfirmasi</h1>
        <p className='text-base font-semibold text-slate-400'>5 data</p>
      </div>
      <div className='custom-scrollbar flex flex-col gap-2 overflow-y-auto pr-2'>
        <div className='flex cursor-pointer items-center justify-between rounded-[14px] p-4 hover:bg-slate-50'>
          <div className='flex gap-4'>
            <div className='rounded-full bg-slate-100 p-3'>
              <HiInboxArrowDown className='text-2xl text-slate-500' />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='font-semibold text-slate-700'>122323234</h1>
              <p className='text-xs font-semibold text-slate-400'>
                27/03/2025, 14:58
              </p>
            </div>
          </div>
          <Chip text='Pending' color='orange' />
        </div>
        <div className='flex cursor-pointer items-center justify-between rounded-[14px] p-4 hover:bg-slate-50'>
          <div className='flex gap-4'>
            <div className='rounded-full bg-slate-100 p-3'>
              <HiInboxArrowDown className='text-2xl text-slate-500' />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='font-semibold text-slate-700'>122323234</h1>
              <p className='text-xs font-semibold text-slate-400'>
                27/03/2025, 14:58
              </p>
            </div>
          </div>
          <Chip text='Pending' color='orange' />
        </div>
        <div className='flex cursor-pointer items-center justify-between rounded-[14px] p-4 hover:bg-slate-50'>
          <div className='flex gap-4'>
            <div className='rounded-full bg-slate-100 p-3'>
              <HiInboxArrowDown className='text-2xl text-slate-500' />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='font-semibold text-slate-700'>122323234</h1>
              <p className='text-xs font-semibold text-slate-400'>
                27/03/2025, 14:58
              </p>
            </div>
          </div>
          <Chip text='Pending' color='orange' />
        </div>
        <div className='flex cursor-pointer items-center justify-between rounded-[14px] p-4 hover:bg-slate-50'>
          <div className='flex gap-4'>
            <div className='rounded-full bg-slate-100 p-3'>
              <HiInboxArrowDown className='text-2xl text-slate-500' />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='font-semibold text-slate-700'>122323234</h1>
              <p className='text-xs font-semibold text-slate-400'>
                27/03/2025, 14:58
              </p>
            </div>
          </div>
          <Chip text='Pending' color='orange' />
        </div>
      </div>
    </div>
  )
}

export default ConfirmList
