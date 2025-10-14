'use client'

import { authRepository } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Validation = () => {
  const router = useRouter()
  const { data, isLoading, error } = authRepository.hooks.useValidateToken()
  const user = data?.data

  useEffect(() => {
    if (isLoading) return

    if (!user || error) {
      TokenUtil.clearTokens()
      return router.push('/login', { scroll: false })
    }

    const role = user.role
    if (role === 'User') {
      router.push('/beranda')
    } else if (role === 'Admin') {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }, [data, router, user, isLoading, error])

  if (isLoading) {
    return (
      <div className='absolute left-0 top-0 z-50 flex h-dvh w-dvw items-center justify-center bg-white'>
        <Spin size='large' />
      </div>
    )
  }
}

export default Validation
