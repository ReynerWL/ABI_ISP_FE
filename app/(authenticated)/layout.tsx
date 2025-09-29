'use client'

import type { MenuProps } from 'antd'
import { Avatar, Button, Drawer, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  HiBars3BottomLeft,
  HiBars3BottomRight,
  HiChevronDown,
  HiDocumentMagnifyingGlass,
  HiInboxArrowDown,
  HiUserCircle,
  HiUsers
} from 'react-icons/hi2'
import { TbLayoutDashboardFilled } from 'react-icons/tb'
import { useUIState } from '../provider'

interface MenuItem {
  id: string
  name: string
  isActive: boolean
}

const listMenu: MenuItem[] = [
  { name: 'Beranda', isActive: true, id: '1' },
  { name: 'Tentang Kami', isActive: false, id: '2' },
  { name: 'Benefit', isActive: false, id: '3' },
  { name: 'Produk', isActive: false, id: '4' }
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
  },
  {
    key: 'users',
    label: <Link href={'/dashboard/users'}>Users</Link>,
    icon: <HiUsers className='!text-xl' />
  }
]

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const selectedKey = pathname?.split('/')[2] || 'dashboard'

  const beranda = pathname === '/beranda'

  const [activeSection, setActiveSection] = useState<MenuItem[]>(listMenu)
  const [open, setOpen] = useState(false)
  const { isSM, isMobile } = useUIState()

  const showDrawer = () => {
    setOpen(!open)
  }

  const onClose = () => {
    setOpen(!open)
  }

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
              scrollY >= offsetTop - 100 &&
              scrollY < offsetTop + offsetHeight - 100
            ) {
              return { ...item, isActive: true }
            }
          }
          return { ...item, isActive: false }
        })
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const titleStyle = (
    <div
      className={
        'items-center text-base font-semibold text-slate-500 md:text-sm'
      }
    >
      Menu
    </div>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!beranda && (
        <Sider
          width={288}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            height: '100vh',
            overflow: 'auto'
          }}
          className='dashboard-sider'
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
      )}

      <Layout className={`h-full ${beranda ? '' : 'lg:ml-[288px]'}`}>
        {!beranda ? (
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
              <div className='group flex items-center gap-4'>
                <Avatar
                  size={48}
                  className='!bg-secondary !text-xl font-semibold'
                >
                  CS
                </Avatar>
                <div className='hidden items-center gap-4 sm:flex'>
                  <div>
                    <h1 className='text-base font-bold text-primary md:text-lg'>
                      Cecilia Siregar
                    </h1>
                    <p className='text-xs font-medium text-slate-400 md:text-sm'>
                      Admin
                    </p>
                  </div>
                  <HiChevronDown
                    className='rounded-full border border-slate-200 p-1 text-2xl text-slate-500 group-hover:bg-slate-50'
                    strokeWidth={0.8}
                  />
                </div>
              </div>
            </div>
          </Header>
        ) : (
          <Header
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              left: 288,
              height: 64
            }}
            className='header-beranda'
          >
            <div className='flex w-full flex-row items-center justify-between'>
              <Link href={'/'}>
                <Image
                  src={'/logo.png'}
                  alt={'logo'}
                  width={isSM || isMobile ? 90 : 110}
                  height={43}
                  className={'cursor-pointer'}
                />
              </Link>

              <div
                className={
                  'flex flex-row-reverse items-center gap-x-6 sm:flex-row md:gap-x-8 lg:gap-x-12'
                }
              >
                {isMobile ? (
                  <>
                    <Button type='text' className='!h-fit !p-1'>
                      <HiBars3BottomRight
                        className={'text-3xl text-slate-800'}
                        onClick={showDrawer}
                      />
                    </Button>
                    <Button
                      type='text'
                      className='!h-fit !p-1 hover:!bg-white'
                      onClick={() => router.push('/login')}
                    >
                      <HiUserCircle className={'text-4xl text-primary'} />
                    </Button>

                    <Drawer
                      title={titleStyle}
                      closable={{ 'aria-label': 'Close Button' }}
                      onClose={onClose}
                      open={open}
                      width={200}
                      mask={false}
                    >
                      {activeSection.map((value, index) => (
                        <div
                          key={index}
                          className={`items-center p-4 text-base font-semibold md:text-sm`}
                        >
                          <Link
                            href={`#${value.id}`}
                            className={`${value.isActive ? 'text-secondary' : 'text-slate-500'} hover:text-secondary`}
                            onClick={() => setOpen(!open)}
                          >
                            {value.name}
                          </Link>
                        </div>
                      ))}
                    </Drawer>
                  </>
                ) : (
                  <>
                    {activeSection.map((value, index) => (
                      <div
                        key={index}
                        className={`text-xs font-semibold md:text-sm`}
                      >
                        <Link
                          href={`#${value.id}`}
                          className={`${value.isActive ? 'text-secondary' : 'text-slate-500'} hover:text-secondary`}
                        >
                          {value.name}
                        </Link>
                      </div>
                    ))}
                    <Button
                      className={
                        '!rounded-full !border-none !bg-blue-50 !px-6 !py-3 !text-xs !font-semibold !text-primary md:!px-8 md:!py-5 md:!text-sm'
                      }
                    >
                      Masuk
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Header>
        )}
        <Content
          className={`h-full !min-h-[calc(100vh-88px)] overflow-auto ${beranda ? 'mt-16 bg-white md:mt-[84px]' : 'mt-[88px] !bg-slate-50 p-4 md:p-6'}`}
        >
          <div className={'h-full overflow-auto'}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AuthenticatedLayout
