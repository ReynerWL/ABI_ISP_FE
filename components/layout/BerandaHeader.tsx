'use client'

import { MenuItem } from '#/app/(authenticated)/layout'
import { useUser } from '#/context/UserContext'
import { TokenUtil } from '#/utils/token'
import { Avatar, Button, Drawer, Dropdown, MenuProps, Skeleton } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import {
  HiBars3BottomRight,
  HiChevronDown,
  HiChevronUp,
  HiOutlineClock
} from 'react-icons/hi2'
import { TbLayoutDashboardFilled, TbLogout } from 'react-icons/tb'

interface BerandaHeaderProps {
  activeSection: MenuItem[]
  isLoading?: boolean
}

const BerandaHeader = ({ activeSection, isLoading }: BerandaHeaderProps) => {
  const token = TokenUtil.accessToken
  const { user, setUser } = useUser()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

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
    ...(user?.role.toLowerCase() !== 'admin'
      ? [
          {
            key: 2,
            label: (
              <Link
                href={'/riwayat-transaksi'}
                className='flex items-center gap-2 font-medium !text-slate-600'
              >
                <HiOutlineClock className='text-lg' />
                History
              </Link>
            )
          }
        ]
      : [
          {
            key: 2,
            label: (
              <Link
                href={'/dashboard'}
                className='flex items-center gap-2 font-medium !text-slate-600'
              >
                <TbLayoutDashboardFilled className='text-lg' />
                Dashboard
              </Link>
            )
          }
        ]),
    {
      key: 3,
      label: (
        <div className='flex items-center gap-2'>
          <TbLogout className='text-lg' />
          <span>Logout</span>
        </div>
      ),
      danger: true,
      onClick: () => {
        TokenUtil.clearTokens()
        TokenUtil.persistToken()
        setUser(null)
        window.location.href = '/beranda'
      }
    }
  ]

  return (
    <Header
      style={{ position: 'fixed', top: 0, right: 0, left: 288, height: 64 }}
      className='header-beranda'
    >
      <div className='flex w-full flex-row items-center justify-between'>
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            alt={'logo'}
            priority
            width={92}
            height={48}
            unoptimized
            className={'sm:h-[60px] sm:w-[110px] md:h-[68px] md:w-[126px]'}
          />
        </Link>

        <div
          className={
            'flex flex-row items-center gap-x-4 md:gap-x-8 lg:gap-x-12'
          }
        >
          <div
            className={
              'hidden flex-row items-center gap-x-4 sm:flex md:gap-x-8 lg:gap-x-12'
            }
          >
            {activeSection.map((value, index) => (
              <Link
                key={index}
                href={value.id === 'Hero' ? '#' : `#${value.id}`}
                className={`${value.isActive ? 'text-secondary' : 'text-slate-500'} text-xs font-semibold hover:text-secondary md:text-sm`}
              >
                {value.name}
              </Link>
            ))}
          </div>
          {isLoading ? (
            <Skeleton.Node
              active
              style={{
                display: 'flex',
                width: 45,
                height: 45,
                borderRadius: '100%'
              }}
            >
              <AiOutlineUser className='!text-xl !text-slate-500' />
            </Skeleton.Node>
          ) : user && token ? (
            <Dropdown
              menu={{ items: dropdownItems }}
              placement='bottomRight'
              className={'group !hidden cursor-pointer sm:!flex'}
              trigger={['click']}
              popupRender={(menu) => (
                <div className='min-w-[150px]'>{menu}</div>
              )}
              open={openDropdown}
              onOpenChange={(value) => setOpenDropdown(value)}
            >
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-4'>
                  <Avatar
                    size={45}
                    className='hidden !bg-secondary !text-xl font-semibold'
                  >
                    {user?.name
                      ?.split(' ')
                      .map((word) => word[0])
                      .join('') || 'NUll'}
                  </Avatar>
                  <div>
                    <h1 className='text-base font-bold text-primary'>
                      {user?.name}
                    </h1>
                  </div>
                </div>
                {!openDropdown ? (
                  <HiChevronDown
                    className={
                      'rounded-full border border-slate-200 p-1 text-2xl text-slate-500 group-hover:bg-slate-50'
                    }
                    strokeWidth={0.8}
                  />
                ) : (
                  <HiChevronUp
                    className={
                      'rounded-full border border-slate-200 p-1 text-2xl text-slate-500 group-hover:bg-slate-50'
                    }
                    strokeWidth={0.8}
                  />
                )}
              </div>
            </Dropdown>
          ) : (
            <Link
              href={'/login'}
              className={`!flex items-center gap-2 !rounded-full !border-none !bg-blue-50 px-6 py-2.5 !text-xs !font-semibold !text-primary hover:!bg-blue-100 md:!text-sm`}
            >
              <AiOutlineUser className='hidden text-lg sm:block' />
              Masuk
            </Link>
          )}

          <Button type='text' className='!h-fit !p-1 sm:!hidden'>
            <HiBars3BottomRight
              className={'text-3xl text-slate-800'}
              onClick={() => setOpenDrawer(!openDrawer)}
            />
          </Button>
        </div>
      </div>

      <Drawer
        title={
          <div
            className={
              'items-center text-base font-semibold text-slate-800 md:text-sm'
            }
          >
            Menu
          </div>
        }
        closable={{ 'aria-label': 'Close Button' }}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
        width={200}
        mask={false}
        classNames={{ wrapper: 'sm:!hidden' }}
      >
        <div className={'flex h-full flex-col justify-between'}>
          <div className={'flex flex-col gap-8'}>
            {activeSection.map((value, index) => (
              <div
                key={index}
                className={`items-center text-sm font-semibold md:text-sm`}
              >
                <Link
                  href={value.id === 'Hero' ? '#' : `#${value.id}`}
                  className={`${value.isActive ? 'text-secondary' : 'text-slate-500'} hover:text-secondary`}
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  {value.name}
                </Link>
              </div>
            ))}
          </div>

          <div
            className={`flex flex-col gap-3 text-base font-semibold md:text-sm`}
          >
            <div className='flex flex-col border-b border-slate-200 pb-4 text-slate-800'>
              <h1 className='font-semibold'>{user?.name}</h1>
              <p className='truncate text-sm font-medium text-slate-500'>
                {user?.email}
              </p>
            </div>

            <Link
              href={'/riwayat-transaksi'}
              className='flex items-center gap-2 text-sm !text-slate-500'
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <HiOutlineClock className='text-lg' />
              History
            </Link>
            <Button
              type='text'
              className='flex !h-fit !justify-start !p-0 !text-sm !font-semibold !text-red-500 sm:!hidden'
              onClick={() => {
                TokenUtil.clearTokens()
                TokenUtil.persistToken()
                router.push('/login', { scroll: false })
              }}
            >
              <TbLogout className='text-lg' />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </Drawer>
    </Header>
  )
}

export default BerandaHeader
