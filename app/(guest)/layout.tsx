'use client'
import '@ant-design/v5-patch-for-react-19'
import React from 'react'

interface GuestLayoutProps {
  children: React.ReactNode
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default GuestLayout
