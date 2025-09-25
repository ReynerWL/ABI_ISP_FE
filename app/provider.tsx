'use client'

import { TokenUtil } from '#/utils/token'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'

TokenUtil.loadToken()

interface UIState {
  is2XL: boolean
  isXL: boolean
  isLG: boolean
  isMD: boolean
  isSM: boolean
  isMobile: boolean
}

const UIStateContext = createContext<UIState>({
  is2XL: false,
  isXL: false,
  isLG: false,
  isMD: false,
  isSM: false,
  isMobile: false
})

export const useUIState = () => {
  const context = useContext(UIStateContext)
  if (!context) {
    throw new Error('useUIState must be used within a UIStateProvider')
  }
  return context
}

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [is2XL, setIs2XL] = useState(false)
  const [isXL, setIsXL] = useState(false)
  const [isLG, setIsLG] = useState(false)
  const [isMD, setIsMD] = useState(false)
  const [isSM, setIsSM] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  console.log(
    'xl:',
    isXL,
    'LG:',
    isLG,
    'MD:',
    isMD,
    'SM:',
    isSM,
    'isMobile:',
    isMobile
  )

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      setIs2XL(width >= 1536)
      setIsXL(width >= 1280 && width < 1536)
      setIsLG(width >= 1024 && width < 1280)
      setIsMD(width >= 768 && width < 1024)
      setIsSM(width >= 640 && width < 768)
      setIsMobile(width < 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const value = { is2XL, isXL, isLG, isMD, isSM, isMobile }
  return (
    <UIStateContext.Provider value={value}>
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
        <AntdRegistry>
          <App>{children}</App>
        </AntdRegistry>
      </ConfigProvider>
    </UIStateContext.Provider>
  )
}
