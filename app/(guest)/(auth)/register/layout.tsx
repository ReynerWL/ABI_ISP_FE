'use client'

import { MenuItem } from '#/app/(authenticated)/layout'
import BerandaHeader from '#/components/layout/BerandaHeader'
import React from 'react'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  const listMenu: MenuItem[] = [
    { name: 'Beranda', isActive: false, id: 'Hero' },
    { name: 'Tentang Kami', isActive: false, id: 'Tentang_Kami' },
    { name: 'Benefit', isActive: false, id: 'Benefit' },
    { name: 'Produk', isActive: false, id: 'Produk' }
  ]

  return (
    <>
      <BerandaHeader activeSection={listMenu} />
      {children}
    </>
  )
}

export default RegisterLayout
