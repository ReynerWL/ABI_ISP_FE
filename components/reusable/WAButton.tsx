import Link from 'next/link'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { HiChevronRight } from 'react-icons/hi2'

interface WAButtonProps {
  phoneNumber?: string
}

const WAButton = ({ phoneNumber }: WAButtonProps) => {
  return (
    <Link
      href={`https://wa.me/${phoneNumber}`}
      className='flex items-center justify-between gap-5 rounded-lg border px-2.5 py-2 hover:bg-slate-50'
    >
      <div className='flex items-center gap-2.5'>
        <AiOutlineWhatsApp className='text-2xl text-green-500' />
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-semibold text-slate-500'>Whatsapp to</p>
          <p className='text-xs font-normal text-slate-500'>{phoneNumber}</p>
        </div>
      </div>
      <HiChevronRight className='text-sm text-slate-500' strokeWidth={1.2} />
    </Link>
  )
}

export default WAButton
