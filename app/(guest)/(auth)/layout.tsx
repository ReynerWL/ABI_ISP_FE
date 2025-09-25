'use client'
import { TokenUtil } from '#/utils/token'
import '@ant-design/v5-patch-for-react-19'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface GuestLayoutProps {
  children: React.ReactNode
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  TokenUtil.loadToken()
  useEffect(() => {
    if (TokenUtil.accessToken) {
      router.push('/dashboard')
    } else {
      setIsChecking(false)
    }
  }, [router])

  if (isChecking) {
    return (
      <div className='flex h-dvh w-full items-center justify-center'>
        <Spin size='large' />
      </div>
    )
  }

  return <>{children}</>
}

export default GuestLayout
