import { Input } from 'antd'
import { HiXMark } from 'react-icons/hi2'
import { LuSearch } from 'react-icons/lu'
interface InputSearchProps {
  placeholder?: string
}

const InputSearch = ({ placeholder = 'Cari ...' }: InputSearchProps) => {
  return (
    <Input
      className='search-input'
      prefix={<LuSearch className={'mr-2 text-lg text-slate-600'} />}
      placeholder={placeholder}
      allowClear={{
        clearIcon: (
          <HiXMark
            className='text-xl text-slate-400 transition duration-200 hover:text-slate-600'
            strokeWidth={0.5}
          />
        )
      }}
    />
  )
}

export default InputSearch
