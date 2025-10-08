'use client'

import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiOutlineCalendar, HiXMark } from 'react-icons/hi2'

const CustomMonthPicker = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const monthQuery = searchParams?.get('month') || ''
  const [selectedValue, setSelectedValue] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (monthQuery) {
      setSelectedValue(dayjs(monthQuery))
    } else {
      setSelectedValue(null)
    }
  }, [monthQuery])

  const handleChange = (date: Dayjs | null) => {
    setSelectedValue(date)
    const queryParams = new URLSearchParams(searchParams?.toString())

    if (date) {
      const formattedMonth = date.format('YYYY-MM')
      queryParams.set('month', formattedMonth)
    } else {
      queryParams.delete('month')
    }
    router.replace(`?${queryParams.toString()}`)
  }

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    handleChange(null)
  }

  return (
    <DatePicker
      value={selectedValue}
      onChange={handleChange}
      picker='month'
      className='custom-date-range-picker'
      placeholder='Bulan Tranksaksi'
      style={{ minWidth: 200 }}
      format={'MMMM YYYY'}
      suffixIcon={
        selectedValue ? (
          <div className='group relative flex items-center justify-center'>
            <HiOutlineCalendar
              className='text-xl text-secondary transition-opacity duration-200 group-hover:opacity-0'
              strokeWidth={1.8}
            />

            <span
              onClick={handleClear}
              className='pointer-events-auto absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'
            >
              <HiXMark
                className='text-xl text-slate-400 transition duration-200 hover:text-slate-600'
                strokeWidth={0.4}
              />
            </span>
          </div>
        ) : (
          <HiOutlineCalendar
            className='text-xl text-slate-400'
            strokeWidth={1.8}
          />
        )
      }
      allowClear={false}
    />
  )
}

export default CustomMonthPicker
