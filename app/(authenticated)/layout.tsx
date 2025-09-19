'use client'
import usePageTitle from '#/hooks/usePageTitle'
import '@ant-design/v5-patch-for-react-19'
import React from 'react'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children
}) => {
  usePageTitle('Dashboard')

  return <>{children}</>
}

export default AuthenticatedLayout
