import { DatePicker } from 'antd'
import { HiOutlineCalendar, HiXMark } from 'react-icons/hi2'

const CustomDateRangePicker = () => {
  return (
    <DatePicker.RangePicker
      className='custom-date-range-picker'
      placeholder={['Tanggal Awal', 'Tanggal Akhir']}
      suffixIcon={
        <HiOutlineCalendar
          className='text-xl text-slate-400'
          strokeWidth={1.8}
        />
      }
      format={'DD-MM-YYYY'}
      allowClear={{
        clearIcon: (
          <HiXMark
            className='text-xl text-slate-400 transition duration-200 hover:text-slate-600'
            strokeWidth={0.4}
          />
        )
      }}
    />
  )
}

export default CustomDateRangePicker
