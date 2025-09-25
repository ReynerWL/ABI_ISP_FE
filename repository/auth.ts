import { http } from '#/utils/http'
import useSWR from 'swr'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  phone_number: string
  name: string
  birth_date: string
  password: string
  province: string
  city: string
  district: string
  alamat: string
  photo_ktp: string
  paket: string
}

const url = {
  login: () => '/auth/login',
  validateToken: () => '/auth/validate-token',
  register: () => '/user/register'
}

const hooks = {
  useValidateToken: () =>
    useSWR(url.validateToken(), http.fetcher, { revalidateOnFocus: false })
}

const api = {
  login: (data: LoginPayload) => http.post(url.login()).send(data),
  register: (data: RegisterPayload) => http.post(url.register()).send(data)
}

export const authRepository = { url, hooks, api }
