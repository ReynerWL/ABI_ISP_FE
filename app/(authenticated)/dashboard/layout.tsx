'use client'

import type { MenuProps } from 'antd'
import { Avatar, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  HiChevronDown,
  HiDocumentMagnifyingGlass,
  HiInboxArrowDown,
  HiUsers
} from 'react-icons/hi2'
import { TbLayoutDashboardFilled } from 'react-icons/tb'

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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const selectedKey = pathname?.split('/')[2] || 'dashboard'

  return (
    <Layout hasSider>
      <Sider className='dashboard-sider' width={288}>
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
      <Layout className='!bg-slate-50'>
        <Header className='dashboard-header'>
          <div className='flex items-center gap-4'>
            <Avatar size={48} className='!bg-secondary !text-xl font-semibold'>
              CS
            </Avatar>
            <div>
              <h1 className='text-lg font-bold text-primary'>
                Cecilia Siregar
              </h1>
              <p className='text-sm font-medium text-slate-400'>Admin</p>
            </div>
            <HiChevronDown
              className='ml-2 rounded-full border border-slate-200 p-1 text-2xl text-slate-500'
              strokeWidth={0.8}
            />
          </div>
        </Header>
        <Content style={{ margin: '40px 32px', overflow: 'initial' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
