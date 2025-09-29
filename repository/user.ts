import { http } from '#/utils/http'
import { buildQueryParams } from '#/utils/params'
import useSWR from 'swr'

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
  photo_ktp: string
  priority: boolean
  createdAt: string
  updatedAt: string
  deletedAt: any
  role: Role
}

export interface Role {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface GetUserParams {
  query?: string
  start_date?: string | null
  end_date?: string | null
  page?: number
  page_size?: number
}

const url = {
  getUser: (params: GetUserParams) => {
    const query = buildQueryParams(params)

    return `/user?${query}`
  }
}

const hooks = {
  useGetUser: (params: GetUserParams) => {
    return useSWR(url.getUser(params), http.fetcher)
  }
}

const api = {}

export const userRepository = { url, hooks, api }
