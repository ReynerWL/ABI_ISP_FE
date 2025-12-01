'use client'

import React from 'react'

interface ExpandedRawDataProps {
  data: any
}

const ExpandedRawData: React.FC<ExpandedRawDataProps> = ({ data }) => {
  return (
    <div className='my-2 overflow-x-auto rounded-lg bg-slate-50 p-4'>
      <pre className='m-0 font-mono text-sm text-slate-700'>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default ExpandedRawData
