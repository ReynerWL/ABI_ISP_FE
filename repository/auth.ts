import { http } from '#/utils/http'

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

const url = { login: () => '/auth/login' }

const api = { login: (data: LoginPayload) => http.post(url.login()).send(data) }

export const authRepository = { url, api }
