'use client'

import BerandaHeader from '#/components/layout/BerandaHeader'
import DashboardHeader from '#/components/layout/DashboardHeader'
import { config } from '#/config/app'
import colorPallete from '#/constant/enums/colorPallete'
import { useUser } from '#/context/UserContext'
import { TokenUtil } from '#/utils/token'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  HiDocumentMagnifyingGlass,
  HiInboxArrowDown,
  HiUserGroup
} from 'react-icons/hi2'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import { toast } from 'sonner'

export interface MenuItem {
  id: string
  name: string
  isActive: boolean
  icon?: React.JSX.Element
}

const listMenu: MenuItem[] = [
  { name: 'Beranda', isActive: true, id: 'Hero' },
  { name: 'Tentang Kami', isActive: false, id: 'Tentang_Kami' },
  { name: 'Benefit', isActive: false, id: 'Benefit' },
  { name: 'Produk', isActive: false, id: 'Produk' }
]

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUser()
  const pathname = usePathname()
  const selectedKey = pathname?.split('/')[2] || 'dashboard'
  const beranda = pathname === '/beranda'
  const history = pathname === '/riwayat-transaksi'
  const [activeSection, setActiveSection] = useState<MenuItem[]>(listMenu)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    toast.dismiss()
    const handleScroll = () => {
      const scrollY = window.scrollY

      setActiveSection((prev) =>
        prev.map((item) => {
          const el = document.getElementById(item.id)
          if (el) {
            const offsetTop = el.offsetTop
            const offsetHeight = el.offsetHeight

            if (
              scrollY >= offsetTop - 150 &&
              scrollY < offsetTop + offsetHeight - 150
            ) {
              return { ...item, isActive: true }
            }
          }
          return { ...item, isActive: false }
        })
      )
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    TokenUtil.loadToken()

    const fetchUser = async () => {
      try {
        if (pathname !== '/dashboard' || history) {
          const result = await fetch(`${config.baseUrl}/auth/validate-token`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${TokenUtil.accessToken}` }
          })

          const response = await result.json()

          setUser(response.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [setUser, pathname, history])

  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: <Link href={'/dashboard'}>Dashboard</Link>,
      icon: <TbLayoutDashboardFilled className='!text-xl' />
    },
    {
      key: 'data-pelanggan',
      label: <Link href={'/dashboard/data-pelanggan'}>Data Pelanggan</Link>,
      icon: <HiInboxArrowDown className='!text-xl' />
    },
    {
      key: 'transaksi',
      label: <Link href={'/dashboard/transaksi'}>Transaksi</Link>,
      icon: <HiDocumentMagnifyingGlass className='!text-xl' />
    },
    ...(user?.role.toLowerCase() === 'superadmin'
      ? [
          {
            key: 'manajemen-admin',
            label: (
              <Link href={'/dashboard/manajemen-admin'}>Manajemen Admin</Link>
            ),
            icon: <HiUserGroup className='!text-xl' />
          }
        ]
      : [])
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={288}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          overflow: 'auto',
          display: beranda || history ? 'none' : 'inline'
        }}
        className={beranda || history ? '' : 'dashboard-sider'}
      >
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            alt={'logo'}
            width={110}
            height={56}
            unoptimized
            className={'cursor-pointer'}
          />
        </Link>
        <Menu
          mode='inline'
          selectedKeys={[selectedKey]}
          items={items}
          className='dashboard-menu !mt-6'
        />
      </Sider>
      <Layout className={`h-full ${beranda || history ? '' : 'xl:ml-[288px]'}`}>
        {beranda || history ? (
          /* ----------------------------- BERANDA HEADER ----------------------------- */
          <BerandaHeader activeSection={activeSection} isLoading={loading} />
        ) : (
          /* ---------------------------- DASHBOARD HEADER ---------------------------- */
          <DashboardHeader
            isLoading={loading}
            selectedKey={selectedKey}
            items={items}
          />
        )}
        <Content
          className={`h-full !min-h-[calc(100vh-88px)] overflow-auto ${beranda ? 'mt-16 bg-white sm:mt-20 md:mt-24' : 'mt-[88px] !bg-slate-50 p-4 md:p-6'}`}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: colorPallete.Slate900,
            color: colorPallete.White,
            display: beranda ? 'inline' : 'none'
          }}
          className={'!px-0 !text-xs sm:!text-sm'}
        >
          ©{new Date().getFullYear()} PT Amarta Buana Informati. All rights
          reserved.
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AuthenticatedLayout
