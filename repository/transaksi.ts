import { http } from '#/utils/http'
import { buildQueryParams } from '#/utils/params'
import useSWR from 'swr'
import { Bank } from './bank'
import { User } from './user'

export interface DataTransaksi {
  user: User
  price: number
  bank: Bank
  buktiPembayaran: string
  createdAt: string
  start_date: string
  due_date: string
}

export interface ListTransaksiResponse {
  data: DataTransaksi[]
  total: number
}

export interface GetTransakasiParams {
  search: string | null
  bank?: string | null
  month?: string | null
  page?: number
  limit?: number
}
export interface GetTransakasiByUserParams {
  search: string | null
  bank?: string | null
  month?: string | null
  page?: number
  limit?: number
}

const url = {
  getAllTransaksi: (params: GetTransakasiParams) => {
    const query = buildQueryParams(params)
    return `/payment?${query}`
  },
  getAllTransaksiByUser: (params?: GetTransakasiByUserParams) => {
    const query = buildQueryParams(params)
    return `/payment/user?${query}`
  }
}

const hooks = {
  useGetAllTransaksi: (params: GetTransakasiParams) => {
    return useSWR(url.getAllTransaksi(params), http.fetcher)
  },
  useGetAllTransaksiByUser: (params?: GetTransakasiByUserParams) => {
    return useSWR(url.getAllTransaksiByUser(params), http.fetcher)
  }
}

export const transakasiRepository = { url, hooks }
