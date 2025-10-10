'use client'

import { useUIState } from '#/app/provider'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  const listMenu = [
    { name: 'Beranda', isActive: false },
    { name: 'Tentang Kami', isActive: false },
    { name: 'Benefit', isActive: false },
    { name: 'Produk', isActive: false }
  ]
  const { isSM, isMobile } = useUIState()
  const router = useRouter()

  return (
    <>
      <Header
        style={{ right: 0, left: 288, height: 64 }}
        className='header-beranda'
      >
        <div className='flex w-full flex-row items-center justify-between gap-4 px-4 md:px-16'>
          <Link href={'/'}>
            <Image
              src={'/logo.png'}
              alt={'logo'}
              width={isSM || isMobile ? 90 : 110}
              height={isSM || isMobile ? 90 : 110}
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
              onClick={() => router.push('/login')}
            >
              Masuk
            </Button>
          </div>
        </div>
      </Header>
      {children}
    </>
  )
}

export default RegisterLayout
