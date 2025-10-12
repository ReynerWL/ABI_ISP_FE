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
  provinsi: string
  kota: string
  kecamatan: string
  kelurahan: string
  alamat: string
  photo_ktp: string
  payment: PaymentPayload
}

export interface PaymentPayload {
  paketsId: string
  banksId: string
  buktiPembayaran: string
}

export interface ValidateToken {
  name: string
  role: string
}
export interface Users extends ValidateToken {
  data: ValidateToken
}

const url = {
  login: () => '/auth/login',
  validateToken: () => '/auth/validate-token',
  register: () => '/user/register'
}

const hooks = {
  useValidateToken: () => useSWR<Users>(url.validateToken(), http.fetcher)
}

const api = {
  login: (data: LoginPayload) => http.post(url.login()).send(data),
  register: (data: RegisterPayload) => http.post(url.register()).send(data)
}

export const authRepository = { url, hooks, api }
