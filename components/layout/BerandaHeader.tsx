import { MenuItem } from '#/app/(authenticated)/layout'
import { ValidateToken } from '#/repository/auth'
import { Avatar, Button, Drawer, Dropdown, MenuProps, Skeleton } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { HiBars3BottomRight } from 'react-icons/hi2'

interface BerandaHeaderProps {
  activeSection: MenuItem[]
  token: string | null
  loading: boolean
  user?: ValidateToken
  onClickHistory: () => void
  onClickLogout: () => void
}

const BerandaHeader = ({
  activeSection,
  token,
  loading,
  user,
  onClickHistory,
  onClickLogout
}: BerandaHeaderProps) => {
  const [openDrawer, setOpenDrawer] = useState(false)

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
    { key: 3, label: 'History', onClick: onClickHistory },
    { type: 'divider' },
    { key: 5, label: 'Logout', danger: true, onClick: onClickLogout }
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
          {!loading ? (
            <>
              <Link
                href={'/login'}
                className={`${!token ? '!flex items-center gap-2 !rounded-full !border-none !bg-blue-50 px-6 py-2.5 !text-xs !font-semibold !text-primary hover:!bg-blue-100 md:!text-sm' : '!hidden'}`}
              >
                <AiOutlineUser className='hidden text-lg sm:block' />
                Masuk
              </Link>
              <Button type='text' className='!h-fit !p-1 sm:!hidden'>
                <HiBars3BottomRight
                  className={'text-3xl text-slate-800'}
                  onClick={() => setOpenDrawer(!openDrawer)}
                />
              </Button>
              <Dropdown
                menu={{ items: dropdownItems }}
                placement='bottomRight'
                className={
                  user && token ? '!hidden cursor-pointer sm:!flex' : '!hidden'
                }
                trigger={['click']}
                popupRender={(menu) => (
                  <div className='min-w-[150px]'>{menu}</div>
                )}
              >
                <Avatar
                  size={42}
                  className='!bg-secondary !text-xl font-semibold'
                >
                  {user?.name
                    ?.split(' ')
                    .map((word: string) => word[0])
                    .join('') || <AiOutlineUser className='text-xl' />}
                </Avatar>
              </Dropdown>
            </>
          ) : (
            <Skeleton.Avatar
              active
              size={'large'}
              style={{ display: 'flex' }}
            />
          )}
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
          <div>
            {activeSection.map((value, index) => (
              <div
                key={index}
                className={`items-center py-4 text-sm font-semibold`}
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
          <div className='flex flex-col gap-3 text-slate-900'>
            <div>
              <h1 className='text-base font-semibold'>{user?.name}</h1>
              <p className='text-sm font-medium text-slate-500'>
                {user?.email}
              </p>
            </div>
            <hr />
            <Link
              href={'/login'}
              className={
                'rounded-xl bg-red-50 p-3 text-center font-bold text-red-600'
              }
              onClick={() => onClickLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </Drawer>
    </Header>
  )
}

export default BerandaHeader
