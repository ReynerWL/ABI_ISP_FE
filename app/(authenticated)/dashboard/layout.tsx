'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { authRepository } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  usePageTitle('Dashboard')
  TokenUtil.loadToken()
  const router = useRouter()
  const [validating, setValidating] = useState(true)
  const { data } = authRepository.hooks.useValidateToken()

  useEffect(() => {
    const validateToken = async () => {
      const localAccessToken = TokenUtil.accessToken
      const sessionAccessToken = sessionStorage?.getItem('access_token')
      const token = localAccessToken || sessionAccessToken

      if (!token) {
        router.push('/login')
        return
      }

      setValidating(false)
    }

    validateToken()
  }, [router, data])

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
