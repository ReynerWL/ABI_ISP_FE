import React from 'react'

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className='text-[40px] font-bold text-slate-700'>{children}</h1>
}

export default Title
