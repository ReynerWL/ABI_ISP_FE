'use client'

import { useUser } from '#/context/UserContext'
import { authRepository, UserPayload } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const HistoryLayout = ({ children }: { children: React.ReactNode }) => {
  TokenUtil.loadToken()
  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(true)

  const { isValidating } = useUser()
  const { data, isLoading } = authRepository.hooks.useValidateToken()
  const user: UserPayload = data?.data

  useEffect(() => {
    if (!isLoading && !isValidating) {
      if (user?.role.toLowerCase() === 'admin') {
        setIsRedirecting(true)
        router.replace('/dashboard')
      } else {
        setIsRedirecting(false)
      }
    }
  }, [isLoading, isValidating, user, router])

  if (isLoading || isValidating || isRedirecting) {
    return (
      <div className='absolute left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white'>
        <Spin size='large' />
      </div>
    )
  }

  return <>{children}</>
}

export default HistoryLayout
