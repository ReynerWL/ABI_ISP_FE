'use client'

import { NeedConfirmation } from '#/repository/dashboard'
import { Skeleton } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { HiInboxArrowDown } from 'react-icons/hi2'
import Chip from '../reusable/Chip'

interface ConfirmListProps {
  list?: NeedConfirmation[]
  isLoading?: boolean
}

const ConfirmList = ({
  list = [],
  isLoading: loading = false
}: ConfirmListProps) => {
  return (
    <div className='flex max-h-[350px] w-full flex-col gap-4 rounded-2xl bg-white p-6 xl:h-full xl:max-w-[360px] 2xl:max-w-full'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold text-slate-600'>Perlu Konfirmasi</h1>
        <p className='text-base font-semibold text-slate-400'>
          {list?.length || 0} data
        </p>
      </div>
      <div
        className={`custom-scrollbar flex flex-col gap-2 overflow-y-auto ${list?.length === 0 && 'h-full'}`}
      >
        {list?.map((item: NeedConfirmation) => (
          <ConfirmListItem
            key={item.customerId}
            customerId={item.customerId}
            status={item.status}
            updatedAt={item.updatedAt}
            loading={loading}
          />
        ))}
        {list?.length === 0 && !loading && (
          <div className='flex h-full w-full flex-col items-center justify-center'>
            <Image
              src={'/empty-data.svg'}
              width={200}
              height={200}
              alt='Empty'
              className='h-auto w-36 sm:w-40 md:w-48'
            />
            <h1 className='text-sm font-medium text-slate-500'>
              Tidak ada data yang perlu dikonfirmasi
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}

interface ConfirmListItemProps extends NeedConfirmation {
  loading?: boolean
}

const ConfirmListItem = ({
  customerId,
  status,
  updatedAt,
  loading
}: ConfirmListItemProps) => {
  return (
    <Link
      href={`/dashboard/data-pelanggan/${customerId}`}
      className='flex cursor-pointer items-center justify-between rounded-[14px] p-3 hover:bg-slate-50 2xl:p-4'
    >
      <div className='flex items-center gap-4'>
        <div className='rounded-full bg-slate-100 p-3'>
          <HiInboxArrowDown className='text-2xl text-slate-500' />
        </div>
        <div className='flex flex-col justify-center'>
          {loading ? (
            <>
              <Skeleton.Button style={{ height: 18, width: 200 }} active />
              <Skeleton.Button style={{ height: 18, width: 100 }} active />
            </>
          ) : (
            <>
              <h1 className='font-semibold text-slate-700'>{customerId}</h1>
              <p className='text-xs font-semibold text-slate-400'>
                {updatedAt}
              </p>
            </>
          )}
        </div>
      </div>
      {loading ? (
        <Skeleton.Button
          style={{ height: 20, width: 80, borderRadius: 10 }}
          active
        />
      ) : (
        <Chip text={status} />
      )}
    </Link>
  )
}

export default ConfirmList
