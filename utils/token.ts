export class TokenUtil {
  static accessToken?: string
  static refreshToken?: string
  static rememberMe: boolean = true

  static loadToken() {
    if (typeof window === 'undefined') return

    const accessToken =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token')

    const refreshToken =
      localStorage.getItem('refresh_token') ||
      sessionStorage.getItem('refresh_token')

    if (accessToken) {
      TokenUtil.setAccessToken(accessToken)
    }

    if (refreshToken) {
      TokenUtil.setRefreshToken(refreshToken)
    }

    TokenUtil.rememberMe = !!localStorage.getItem('access_token')
  }

  static persistToken() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')

    if (TokenUtil.accessToken) {
      if (TokenUtil.rememberMe) {
        localStorage.setItem('access_token', TokenUtil.accessToken)
      } else {
        sessionStorage.setItem('access_token', TokenUtil.accessToken)
      }
    }

    if (TokenUtil.refreshToken) {
      if (TokenUtil.rememberMe) {
        localStorage.setItem('refresh_token', TokenUtil.refreshToken)
      } else {
        sessionStorage.setItem('refresh_token', TokenUtil.refreshToken)
      }
    }
  }

  static setAccessToken(accessToken: string) {
    TokenUtil.accessToken = accessToken
  }

  static setRefreshToken(refreshToken: string) {
    TokenUtil.refreshToken = refreshToken
  }

  static clearTokens() {
    TokenUtil.accessToken = undefined
    TokenUtil.refreshToken = undefined
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
  }

  static setRememberMe(remember: boolean) {
    TokenUtil.rememberMe = remember
  }
}
