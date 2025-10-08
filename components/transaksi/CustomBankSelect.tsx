'use client'

import { Select } from 'antd'
import React, { useState } from 'react' // Import useState
import { HiChevronDown, HiXMark } from 'react-icons/hi2'

export type BankOption = { label: string; value: string }

type CustomBankSelectProps = {
  options: BankOption[]
  value?: string | undefined
  onChange?: (value: string | undefined) => void
  placeholder?: string
  disabled?: boolean
}

const CustomBankSelect: React.FC<CustomBankSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Pilih Bank',
  disabled = false
}) => {
  // 1. Tambahkan state untuk melacak status open/close dropdown
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp='children'
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`custom-bank-select ${value ? 'has-value' : ''}`}
      style={{ minWidth: 200 }}
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      onDropdownVisibleChange={setIsOpen}
      suffixIcon={
        value ? (
          <div className='group relative flex items-center justify-center'>
            <HiChevronDown
              className={`transform text-xl text-secondary transition-opacity group-hover:opacity-0 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              strokeWidth={1.8}
              aria-hidden
            />
            <span
              onClick={(e) => {
                e.stopPropagation()
                onChange?.(undefined)
              }}
              className='pointer-events-auto absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'
            >
              <HiXMark
                className='text-xl text-slate-400 transition duration-200 hover:text-slate-600'
                strokeWidth={0.4}
                aria-hidden
              />
            </span>
          </div>
        ) : (
          <HiChevronDown
            // 3. Tambahkan class rotasi di sini
            className={`transform text-xl text-slate-400 transition duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            strokeWidth={1.8}
            aria-hidden
          />
        )
      }
      allowClear={false}
    >
      {options.map((bank) => (
        <Select.Option key={bank.value} value={bank.value}>
          {bank.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default CustomBankSelect
