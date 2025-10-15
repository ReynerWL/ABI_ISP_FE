'use client'

import { ContextProvider } from '#/context/ContextProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import { Suspense } from 'react'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0049AC',
            fontFamily: 'var(--font-plus-jakarta-sans), sans-serif'
          },
          components: {
            Segmented: { itemSelectedBg: '#0049AC', itemSelectedColor: '#fff' }
          }
        }}
      >
        <ContextProvider>
          <AntdRegistry>
            <App>{children}</App>
          </AntdRegistry>
        </ContextProvider>
      </ConfigProvider>
    </Suspense>
  )
}
