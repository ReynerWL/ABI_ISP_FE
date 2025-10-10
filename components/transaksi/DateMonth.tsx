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
  const month = searchParams?.get('month') || ''
  const [selectedValue, setSelectedValue] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (month) {
      setSelectedValue(dayjs(month, 'MM-YYYY'))
    } else {
      setSelectedValue(null)
    }
  }, [month])

  const handleChange = (date: Dayjs | null) => {
    setSelectedValue(date)
    const queryParams = new URLSearchParams(searchParams?.toString())

    if (date) {
      const formattedMonth = date.format('MM-YYYY')
      queryParams.set('month', formattedMonth)
    } else {
      queryParams.delete('month')
    }
    router.replace(`?${queryParams.toString()}`)
  }

  return (
    <DatePicker
      onChange={handleChange}
      value={selectedValue}
      picker='month'
      className='custom-date-range-picker'
      placeholder='Bulan Tranksaksi'
      format={'MMMM YYYY'}
      style={{ minWidth: 200 }}
      allowClear={{
        clearIcon: (
          <HiXMark
            className={`text-xl text-slate-400 transition duration-200`}
            strokeWidth={0.4}
          />
        )
      }}
      suffixIcon={
        <HiOutlineCalendar
          className={`text-xl text-slate-400 transition duration-200`}
          strokeWidth={1.8}
        />
      }
    />
  )
}

export default CustomMonthPicker
