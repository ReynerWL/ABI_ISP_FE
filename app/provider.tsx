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
          colorPrimary: '#0049AC',
          fontFamily: 'var(--font-plus-jakarta-sans), sans-serif'
        },
        components: {
          Segmented: { itemSelectedBg: '#FFA600', itemSelectedColor: '#fff' }
        }
      }}
    >
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  )
}
