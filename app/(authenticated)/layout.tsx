'use client'

import BerandaHeader from '#/components/layout/BerandaHeader'
import colorPallete from '#/constant/enums/colorPallete'
import { RoleAccess } from '#/constant/roleAcces'
import { authRepository } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown, Layout, Menu, Skeleton } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  HiBars3BottomLeft,
  HiChevronDown,
  HiChevronUp,
  HiDocumentMagnifyingGlass,
  HiInboxArrowDown
} from 'react-icons/hi2'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import { useUIState } from '../provider'

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
  }
]

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const selectedKey = pathname?.split('/')[2] || 'dashboard'
  const beranda = pathname === '/beranda'
  const history = pathname === '/riwayat-transaksi'
  const { token } = useUIState()
  const [activeSection, setActiveSection] = useState<MenuItem[]>(listMenu)
  const [open, setOpen] = useState<boolean>(false)

  const { data, isLoading } = authRepository.hooks.useValidateToken()
  const user = data?.data

  useEffect(() => {
    if (!user || isLoading) return

    if (!user) {
      TokenUtil.clearTokens()
      return router.push('/login', { scroll: false })
    }

    const allowedRoles = RoleAccess.find(
      (val) => pathname && val.path.test(pathname)
    )

    if (
      allowedRoles &&
      !allowedRoles.role.includes(user?.role?.toLowerCase() ?? '')
    ) {
      router.push(user.role === 'User' ? '/beranda' : '/dashboard')
    }
  }, [pathname, router, user, isLoading])

  useEffect(() => {
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

  const dropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className='flex flex-col text-slate-900'>
          <h1 className='font-semibold'>{user?.name}</h1>
          <p className='text-xs font-medium text-slate-500'>{user?.email}</p>
        </div>
      ),
      disabled: true
    },
    { type: 'divider' },
    {
      key: 5,
      label: 'Logout',
      danger: true,
      onClick: () => {
        TokenUtil.clearTokens()
        return router.push('/login', { scroll: false })
      }
    }
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
      <Layout className={`h-full ${beranda || history ? '' : 'lg:ml-[288px]'}`}>
        {beranda || history ? (
          /* ----------------------------- BERANDA HEADER ----------------------------- */
          <BerandaHeader
            activeSection={activeSection}
            token={token}
            loading={isLoading}
            user={user}
            onClickLogout={() => {
              TokenUtil.clearTokens()
              return router.push('/login', { scroll: false })
            }}
            onClickHistory={() => router.push('/riwayat-transaksi')}
          />
        ) : (
          /* ---------------------------- DASHBOARD HEADER ---------------------------- */
          <Header
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              left: 288,
              height: 64
            }}
            className='dashboard-header'
          >
            <div className='flex w-full items-center justify-between gap-4 lg:justify-end'>
              <Button type='text' className='!h-fit !p-1 lg:!hidden'>
                <HiBars3BottomLeft className='!text-3xl' />
              </Button>
              <div className={'group flex items-center gap-4'}>
                {isLoading ? (
                  <>
                    <Skeleton.Avatar
                      active
                      size={'large'}
                      style={{ display: 'flex' }}
                    />
                    <Skeleton.Input
                      active
                      size={'large'}
                      style={{ display: 'flex' }}
                    />
                  </>
                ) : (
                  <>
                    <Avatar
                      size={45}
                      className='hidden !bg-secondary !text-xl font-semibold'
                    >
                      {user?.name
                        ?.split(' ')
                        .map((word) => word[0])
                        .join('') || 'NUll'}
                    </Avatar>
                    <div className='hidden items-center gap-4 sm:flex'>
                      <div>
                        <h1 className='text-lg font-bold text-primary'>
                          {user?.name}
                        </h1>
                        <p className='text-sm font-medium capitalize text-slate-400'>
                          {user?.role}
                        </p>
                      </div>
                      <Dropdown
                        menu={{ items: dropdownItems }}
                        placement='bottomRight'
                        className={'!hidden cursor-pointer sm:!flex'}
                        trigger={['click']}
                        popupRender={(menu) => (
                          <div className='min-w-[150px]'>{menu}</div>
                        )}
                      >
                        {!open ? (
                          <HiChevronDown
                            className={
                              'rounded-full border border-slate-200 p-1 text-2xl text-slate-500 group-hover:bg-slate-50'
                            }
                            strokeWidth={0.8}
                            onClick={() => setOpen(true)}
                          />
                        ) : (
                          <HiChevronUp
                            className={
                              'rounded-full border border-slate-200 p-1 text-2xl text-slate-500 group-hover:bg-slate-50'
                            }
                            strokeWidth={0.8}
                            onClick={() => setOpen(false)}
                          />
                        )}
                      </Dropdown>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Header>
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
