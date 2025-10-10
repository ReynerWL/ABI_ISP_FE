'use client'

import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { HiOutlineCalendar, HiXMark } from 'react-icons/hi2'

const { RangePicker } = DatePicker

const CustomDateRangePicker = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const dateRange = searchParams?.get('dateRange') || ''

  const handleChange = (dates: any) => {
    const queryParams = new URLSearchParams(searchParams?.toString())

    if (dates) {
      const startDate = dayjs(dates[0]).format('YYYY-MM-DD')
      const endDate = dayjs(dates[1]).format('YYYY-MM-DD')
      queryParams.set('dateRange', `${startDate},${endDate}`)
    } else {
      queryParams.delete('dateRange')
    }

    router.push(`?${queryParams.toString()}`)
  }

  return (
    <RangePicker
      className='custom-date-range-picker'
      placeholder={['Tanggal Awal', 'Tanggal Akhir']}
      suffixIcon={
        <HiOutlineCalendar
          className={`text-xl text-slate-400 transition duration-200`}
          strokeWidth={1.8}
        />
      }
      format={'DD-MM-YYYY'}
      allowClear={{
        clearIcon: (
          <HiXMark
            className={`text-xl text-slate-400 transition duration-200 hover:text-slate-600`}
            strokeWidth={0.4}
          />
        )
      }}
      onChange={handleChange}
    />
  )
}

export default CustomDateRangePicker
