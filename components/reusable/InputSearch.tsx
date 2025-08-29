'use client'

import { Input } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { HiXMark } from 'react-icons/hi2'
import { LuSearch } from 'react-icons/lu'
import { useDebouncedCallback } from 'use-debounce'
interface InputSearchProps {
  placeholder?: string
}

const InputSearch = ({ placeholder = 'Cari ...' }: InputSearchProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = useDebouncedCallback((value: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString())

    if (value) {
      queryParams.set('search', value)
    } else {
      queryParams.delete('search')
    }

    router.push(`?${queryParams.toString()}`)
  }, 500)

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
      onChange={(e) => handleChange(e.target.value)}
    />
  )
}

export default InputSearch
