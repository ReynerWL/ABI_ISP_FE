'use client'

import { useUser } from '#/context/UserContext'
import usePageTitle from '#/hooks/usePageTitle'
import { authRepository, UserPayload } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  TokenUtil.loadToken()
  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(true)

  usePageTitle('Dashboard')

  const { isValidating, setUser } = useUser()
  const { data, isLoading } = authRepository.hooks.useValidateToken()
  const user: UserPayload = data?.data

  useEffect(() => {
    if (!isLoading && !isValidating) {
      setUser(user)
      if (
        user?.role.toLowerCase() !== 'admin' &&
        user?.role.toLowerCase() !== 'superadmin'
      ) {
        setIsRedirecting(true)
        router.replace('/beranda')
      } else {
        setIsRedirecting(false)
      }
    }
  }, [isLoading, isValidating, user, router, setUser])

  if (isLoading || isValidating || isRedirecting) {
    return (
      <div className='absolute left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white'>
        <Spin size='large' />
      </div>
    )
  }

  return <>{children}</>
}

export default DashboardLayout
