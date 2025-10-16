'use client'

import { Select } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react' // Import useState
import { HiChevronDown, HiXMark } from 'react-icons/hi2'

export type BankOption = { label: string; value: string }

type CustomBankSelectProps = {
  options: BankOption[]
  className?: string | null
}

const CustomBankSelect: React.FC<CustomBankSelectProps> = ({
  options,
  className
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bank = searchParams?.get('bank') || ''
  const [selectedBank, setSelectedBank] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    if (bank) setSelectedBank(bank)
    else setSelectedBank(undefined)
  }, [bank])

  const handleBankChange = (val?: string) => {
    setSelectedBank(val)
    const queryParams = new URLSearchParams(searchParams?.toString() || '')
    if (val) queryParams.set('bank', val)
    else queryParams.delete('bank')
    router.replace(`?${queryParams.toString()}`)
  }
  return (
    <div
      className={`flex items-center gap-3 text-nowrap font-semibold text-slate-500 ${className}`}
    >
      <p className={'hidden xl:flex'}>Bank :</p>
      <Select
        showSearch
        placeholder={'Nama Bank'}
        value={selectedBank}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={options}
        onChange={handleBankChange}
        className={`bank-select !h-full min-w-full xl:min-w-52`}
        suffixIcon={
          <HiChevronDown className='text-slate-300' size={20} strokeWidth={1} />
        }
        allowClear={{
          clearIcon: (
            <HiXMark
              className='size-5 bg-white text-slate-400 transition duration-200 hover:text-slate-500'
              strokeWidth={0.5}
            />
          )
        }}
      />
    </div>
  )
}

export default CustomBankSelect
