import React from 'react'

interface props {
  val: string
  className?: string | undefined
}
export const Heading = ({ val, className }: props) => {
  return (
    <div className={`text-base font-semibold text-slate-800 ${className}`}>
      {val}
    </div>
  )
}
