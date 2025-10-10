'use client'

import { TokenUtil } from '#/utils/token'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, Suspense, useContext, useEffect, useState } from 'react'

interface UIState {
  is2XL: boolean
  isXL: boolean
  isLG: boolean
  isMD: boolean
  isSM: boolean
  isMobile: boolean
  token: string | null
  validating: boolean
  // user: ValidateToken | null
}

const UIStateContext = createContext<UIState | undefined>(undefined)

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
  const [validating, setValidating] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  // const [user, setUser] = useState<ValidateToken | null>(null)

  const router = useRouter()
  const pathname = usePathname()

  TokenUtil.loadToken()

  useEffect(() => {
    const validateToken = async () => {
      // BYPASS DEV MODE
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Development mode: bypass token validation')
        setToken('dev-token-bypass')
        setValidating(false)
        return
      }

      const localAccessToken = TokenUtil.accessToken
      const sessionAccessToken = sessionStorage?.getItem('access_token')
      const token = localAccessToken || sessionAccessToken

      if (!token && pathname !== '/login' && pathname !== '/beranda') {
        router.push('/login')
        return
      }

      setToken(token)
      setValidating(false)
    }

    validateToken()
  }, [router, pathname])

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

  const value = {
    is2XL,
    isXL,
    isLG,
    isMD,
    isSM,
    isMobile,
    token,
    validating
    // user
  }

  return (
    <UIStateContext.Provider value={value}>
      <Suspense>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#0049AC',
              fontFamily: 'var(--font-plus-jakarta-sans), sans-serif'
            },
            components: {
              Segmented: {
                itemSelectedBg: '#0049AC',
                itemSelectedColor: '#fff'
              }
            }
          }}
        >
          <AntdRegistry>
            <App>{children}</App>
          </AntdRegistry>
        </ConfigProvider>
      </Suspense>
    </UIStateContext.Provider>
  )
}
