'use client'

import type { MenuProps } from 'antd'
import { Avatar, Button, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  HiBars3BottomLeft,
  HiChevronDown,
  HiDocumentMagnifyingGlass,
  HiInboxArrowDown,
  HiUsers
} from 'react-icons/hi2'
import { TbLayoutDashboardFilled } from 'react-icons/tb'

const listMenu = [
  { name: 'Beranda', isActive: true },
  { name: 'Tentang Kami', isActive: false },
  { name: 'Benefit', isActive: false },
  { name: 'Produk', isActive: false }
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
  const pathname = usePathname()
  const selectedKey = pathname?.split('/')[2] || 'dashboard'

  const home = pathname === '/home'

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!home && (
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
              width={187}
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

      <Layout className={`h-full ${home ? '' : 'lg:ml-[288px]'}`}>
        {!home ? (
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
            className='header-home'
          >
            <div className='flex w-full flex-row items-center justify-between gap-4 px-4 md:px-16'>
              <Link href={'/'}>
                <Image
                  src={'/logo.png'}
                  alt={'logo'}
                  width={162}
                  height={43}
                  className={'cursor-pointer'}
                />
              </Link>

              <div className={'flex flex-row items-center gap-x-12'}>
                {listMenu.map((value, index) => (
                  <div
                    key={index}
                    className={`text-sm font-semibold ${value.isActive === true ? 'text-secondary' : 'text-slate-500'}`}
                  >
                    <p>{value.name}</p>
                  </div>
                ))}
                <Button
                  className={
                    '!rounded-full !border-none !bg-blue-50 !px-8 !py-5 !font-semibold !text-primary'
                  }
                >
                  Login
                </Button>
              </div>
            </div>
          </Header>
        )}
        <Content
          className={`h-full !min-h-[calc(100vh-88px)] ${home ? 'mt-[84px] bg-white md:px-0' : 'mt-[88px] !bg-slate-50 p-4 md:p-6'}`}
        >
          <div className={`h-full`}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AuthenticatedLayout
