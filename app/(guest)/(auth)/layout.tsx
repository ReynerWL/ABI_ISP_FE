'use client'

import { config } from '#/config/app'
import { UserPayload } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import '@ant-design/v5-patch-for-react-19'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface GuestLayoutProps {
  children: React.ReactNode
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const validateUser = async () => {
      if (typeof window === 'undefined') return

      TokenUtil.loadToken()

      const token = TokenUtil.accessToken
      if (!token) {
        setIsChecking(false)
        return
      }

      try {
        const result = await fetch(`${config.baseUrl}/auth/validate-token`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${TokenUtil.accessToken}` }
        })

        const response = await result.json()
        const user: UserPayload = response.data

        if (user?.role.toLowerCase() === 'admin') {
          router.replace('/dashboard')
        } else {
          router.replace('/beranda')
        }
      } catch (err) {
        console.warn('GuestLayout: token validation failed', err)
        setIsChecking(false)
      }
    }

    validateUser()
  }, [router])

  if (isChecking) {
    return (
      <div className='flex h-dvh w-full items-center justify-center bg-white'>
        <Spin size='large' />
      </div>
    )
  }

  return <>{children}</>
}

export default GuestLayout
