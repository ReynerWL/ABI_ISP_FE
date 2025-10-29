import { http } from '#/utils/http'
import { buildQueryParams } from '#/utils/params'
import useSWR from 'swr'
import { Paket } from './paket'

export interface Subscription {
  start_date: string
  due_date: string
  createdAt: string
}

export interface User {
  id: string
  customerId: any
  email: string
  name: string
  phone_number: string
  birth_date: any
  password: string
  salt: string
  status: string
  alamat: string
  pronvisi: string
  kota: string
  kecamatan: string
  kelurahan: string
  photo_ktp: string
  priority: boolean
  createdAt: string
  updatedAt: string
  buktiPembayaran: string
  deletedAt: any
  role: Role
  paket?: Paket
  payment?: Payment[]
  tanggal_berlangganan?: string
  subscription: Subscription
}

export interface DetailUser {
  data: User
}

export interface Role {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}
export interface Payment {
  buktiPembayaran: string
  id: string
  price: number
  reason: string
  status: string
  start_date?: string | null
  due_date?: string | null
  confirmAt?: string | null
}

export interface ListPayment {
  data: Payment[]
  count: number
}

export interface GetUserParams {
  search?: string | null
  status?: string | null
  start_date?: string | null
  end_date?: string | null
  page?: number
  limit?: number
  paket?: string | null
  paket_speed?: string | null
  role: string
  created_at?: string
}

export interface UpdateUserPayload {
  email: string
  phone_number: string
  status: string
  paketsId: string
  banksId?: string
  buktiPembayaran?: string
}

export interface UserDetail {
  data: User
}

export interface CreatePayload {
  name: string
  email: string
  password: string
  phone_number: string
  status: string
}

const url = {
  getUser: (params: GetUserParams) => {
    const query = buildQueryParams(params)

    return `/user?${query}`
  },
  getDetailUser() {
    return `/user/detail`
  },
  create() {
    return `/user/create-admin`
  },
  getUserById(id: string) {
    return `/user/${id}`
  },
  getUserByIdAdmin(id: string) {
    return `/user/${id}/status`
  }
}

const hooks = {
  useGetUser: (params: GetUserParams) => {
    return useSWR(url.getUser(params), http.fetcher)
  },
  useGetDetailUser() {
    return useSWR(url.getDetailUser(), http.fetcher)
  },
  useGetUserById(id: string) {
    return useSWR(url.getUserById(id), http.fetcher, { errorRetryCount: 1 })
  }
}

const api = {
  updateUser(id: string, data: UpdateUserPayload) {
    return http.put(url.getUserById(id)).send(data)
  },
  updateStatus(id: string) {
    return http.put(url.getUserByIdAdmin(id))
  },
  createAdmin: (data: CreatePayload) => http.post(url.create()).send(data)
}

export const userRepository = { url, hooks, api }
