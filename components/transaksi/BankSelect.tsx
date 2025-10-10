'use client'

import { Select } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react' // Import useState
import { HiChevronDown, HiXMark } from 'react-icons/hi2'

export type BankOption = { label: string; value: string }

type CustomBankSelectProps = { options: BankOption[] }

const CustomBankSelect: React.FC<CustomBankSelectProps> = ({ options }) => {
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
    <Select
      showSearch
      placeholder={'Nama Bank'}
      value={selectedBank}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      onChange={handleBankChange}
      className={'bank-select !h-full'}
      suffixIcon={
        <HiChevronDown
          className={`text-xl text-slate-400 transition duration-200`}
          strokeWidth={1}
        />
      }
      allowClear={{
        clearIcon: (
          <HiXMark
            className={`text-xl text-slate-400 transition duration-200`}
            strokeWidth={0.4}
          />
        )
      }}
    />
  )
}

export default CustomBankSelect
