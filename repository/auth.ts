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
  paketId?: string | null
  banksId?: string | null
  buktiPembayaran?: string | null
}

export interface UserPayload {
  id: string
  name: string
  email: string
  role: string
}

const url = {
  login: () => '/auth/login',
  validateToken: () => '/auth/validate-token',
  register: () => '/user/register',
  sendForgetPassword: () => '/auth/forget-password/send-token',
  validatePasswordToken: () => '/auth/forget-password/validate',
  resetPassword: () => '/auth/forget-password'
}

const hooks = {
  useValidateToken: () => useSWR(url.validateToken(), http.fetcher)
}

const api = {
  login: (data: LoginPayload) => http.post(url.login()).send(data),
  register: (data: RegisterPayload) => http.post(url.register()).send(data),
  sendForgetPassword: (email: string) =>
    http.post(url.sendForgetPassword()).send({ email }),
  validatePasswordToken: (token: string) =>
    http.post(url.validatePasswordToken()).send({ token }),
  resetPassword: (token: string, new_password: string) =>
    http.post(url.resetPassword()).send({ token, new_password })
}

export const authRepository = { url, hooks, api }
