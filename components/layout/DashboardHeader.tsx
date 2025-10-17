import { useUser } from '#/context/UserContext'
import { TokenUtil } from '#/utils/token'
import { Avatar, Button, Dropdown, MenuProps, Skeleton } from 'antd'
import { Header } from 'antd/es/layout/layout'
import dayjs from 'dayjs'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { HiBars3BottomLeft, HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { TbLogout } from 'react-icons/tb'

interface DashboardHeaderProps {
  isLoading?: boolean
}

const DashboardHeader = ({ isLoading }: DashboardHeaderProps) => {
  const { user } = useUser()
  const [open, setOpen] = useState<boolean>(false)

  const dropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className='flex flex-col text-slate-900'>
          <h1 className='font-semibold'>Test</h1>
          <p className='text-xs font-medium text-slate-500'>test@gmail.com</p>
        </div>
      ),
      disabled: true
    },
    { type: 'divider' },
    {
      key: 5,
      label: (
        <div className='flex items-center gap-2 font-medium'>
          <TbLogout className='text-lg' />
          <span>Logout</span>
        </div>
      ),
      danger: true,
      onClick: () => {
        TokenUtil.clearTokens()
        TokenUtil.persistToken()
        window.location.href = '/beranda'
      }
    }
  ]

  return (
    <Header
      style={{ position: 'fixed', top: 0, right: 0, left: 288, height: 64 }}
      className='dashboard-header'
    >
      <div className='ml-0 flex w-full items-center justify-between gap-4 lg:ml-[288px] lg:justify-between'>
        <div className='flex items-center gap-6'>
          <Button type='text' className='!h-fit !p-1 lg:!hidden'>
            <HiBars3BottomLeft className='!text-3xl' />
          </Button>
          <p className='hidden text-sm font-medium text-slate-700 sm:flex'>
            {dayjs().format('dddd, DD MMMM YYYY')}
          </p>
        </div>
        <div className={'group flex items-center gap-4'}>
          {isLoading ? (
            <>
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
              <div className='flex flex-col gap-2'>
                <Skeleton.Node
                  active
                  style={{ display: 'flex', width: 100, height: 18 }}
                />
                <Skeleton.Node
                  active
                  style={{ display: 'flex', width: 80, height: 15 }}
                />
              </div>
            </>
          ) : (
            <>
              <Dropdown
                menu={{ items: dropdownItems }}
                placement='bottomRight'
                className={'!flex cursor-pointer'}
                trigger={['click']}
                popupRender={(menu) => (
                  <div className='min-w-[150px]'>{menu}</div>
                )}
                open={open}
                onOpenChange={(value) => setOpen(value)}
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
                      <h1 className='text-lg font-bold text-primary'>
                        {user?.name}
                      </h1>
                      <p className='text-sm font-medium capitalize text-slate-400'>
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  {!open ? (
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
            </>
          )}
        </div>
      </div>
    </Header>
  )
}

export default DashboardHeader
