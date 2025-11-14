import { createContext, useContext, useEffect, useState } from 'react'

interface UIState {
  is2XL: boolean
  isXL: boolean
  isLG: boolean
  isMD: boolean
  isSM: boolean
  isMobile: boolean
  isMiniMobile: boolean
}

const UIStateContext = createContext<UIState | undefined>(undefined)

export const useUIState = () => {
  const context = useContext(UIStateContext)
  if (!context) {
    throw new Error('useUIState must be used within a UIStateProvider')
  }
  return context
}

export const UIStateProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [is2XL, setIs2XL] = useState(false)
  const [isXL, setIsXL] = useState(false)
  const [isLG, setIsLG] = useState(false)
  const [isMD, setIsMD] = useState(false)
  const [isSM, setIsSM] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMiniMobile, setIsMiniMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      setIs2XL(width >= 1536)
      setIsXL(width >= 1280 && width < 1536)
      setIsLG(width >= 1024 && width < 1280)
      setIsMD(width >= 768 && width < 1024)
      setIsSM(width >= 640 && width < 768)
      setIsMobile(width < 640)
      setIsMiniMobile(width < 440)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const value = { is2XL, isXL, isLG, isMD, isSM, isMobile, isMiniMobile }

  return (
    <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>
  )
}
