import { UserPayload } from '#/repository/auth'
import { TokenUtil } from '#/utils/token'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface UserState {
  isValidating: boolean
  user: UserPayload | null
  setUser: (user: UserPayload | null) => void
  resetPasswordToken: string
  setResetPasswordToken: (token: string) => void
}

const UserContext = createContext<UserState | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [validating, setValidating] = useState(true)
  const [user, setUser] = useState<UserPayload | null>(null)
  const [resetPasswordToken, setResetPasswordToken] = useState('')

  useEffect(() => {
    TokenUtil.loadToken()
    const validateToken = async () => {
      const localAccessToken = TokenUtil.accessToken
      const sessionAccessToken = sessionStorage?.getItem('access_token')
      const token = localAccessToken || sessionAccessToken

      const excludedPaths = new Set([
        '/login',
        '/beranda',
        '/register',
        '/lupa-password',
        '/verify-otp',
        '/reset-password'
      ])
      if (!token && !excludedPaths.has(pathname as string)) {
        router.push('/beranda')
        return
      }

      setValidating(false)
    }

    validateToken()
  }, [router, pathname])

  const value: UserState = {
    user,
    setUser,
    isValidating: validating,
    resetPasswordToken,
    setResetPasswordToken
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
