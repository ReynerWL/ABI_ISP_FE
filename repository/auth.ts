import { http } from '#/utils/http'

export interface LoginPayload {
  email: string
  password: string
}

const url = { login: () => '/auth/login' }

const api = { login: (data: LoginPayload) => http.post(url.login()).send(data) }

export const authRepository = { url, api }
