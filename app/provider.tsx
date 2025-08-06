'use client'

import { TokenUtil } from '#/utils/token'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

TokenUtil.loadToken()
export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          fontFamily: 'var(--font-plus-jakarta-sans), sans-serif'
        }
      }}
    >
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  )
}
