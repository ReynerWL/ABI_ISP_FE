'use client'

import { useUIState } from '#/app/provider'
import usePageTitle from '#/hooks/usePageTitle'
import { Spin } from 'antd'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  usePageTitle('Dashboard')
  const { validating } = useUIState()

  if (validating) {
    return (
      <div className='absolute left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white'>
        <Spin size='large' />
      </div>
    )
  }

  return <>{children}</>
}

export default DashboardLayout
