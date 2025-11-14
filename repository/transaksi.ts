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
  search?: string | null
  bank?: string | null
  month?: string | null
  page?: number
  limit?: number
}
export interface UpdateTransaksi {
  buktiPembayaran: string | null
}
export interface RejectedTransaksi {
  reason: string | null
}

const url = {
  getAllTransaksi: (params: GetTransakasiParams) => {
    const query = buildQueryParams(params)
    return `/payment?${query}`
  },
  getAllTransaksiByUser: (params: GetTransakasiParams) => {
    const query = buildQueryParams(params)
    return `/payment/user?${query}`
  },
  updateTransaksi: (id: string) => {
    return `/payment/${id}`
  },
  confirmTransaksi: (id: string) => {
    return `/payment/confirmed/${id}`
  },
  rejectedTransaksi: (id: string) => {
    return `/payment/rejected/${id}`
  }
}

const hooks = {
  useGetAllTransaksi: (params: GetTransakasiParams) => {
    return useSWR(url.getAllTransaksi(params), http.fetcher)
  },
  useGetAllTransaksiByUser: (params: GetTransakasiParams) => {
    return useSWR(url.getAllTransaksiByUser(params), http.fetcher)
  }
}

const api = {
  updateTransaksi: (id: string, data: UpdateTransaksi) => {
    return http.put(url.updateTransaksi(id)).send(data)
  },
  confirmTransaksi: (id: string) => {
    return http.put(url.confirmTransaksi(id))
  },
  rejectedTransaksi: (id: string, data: RejectedTransaksi) => {
    return http.put(url.rejectedTransaksi(id)).send(data)
  }
}

export const transakasiRepository = { url, hooks, api }
