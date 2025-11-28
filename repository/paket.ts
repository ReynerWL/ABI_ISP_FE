import { http } from '#/utils/http'
import { buildQueryParams } from '#/utils/params'
import useSWR from 'swr'

export interface Paket {
  id: string
  name: string
  price: number
  speed: string
  photo: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface CreatePaketPayload {
  name: string
  price: number
  speed: string
  photo: any
}

export interface GetPaketParams {
  query?: string | null
  order?: string
  status?: boolean
  page?: number
  limit?: number
}

const url = {
  getPaket: (params?: GetPaketParams) => {
    if (params) {
      const query = buildQueryParams(params)
      return `/paket?${query}`
    }
    return `/paket`
  },
  getPaketById: (id: string) => `/paket/${id}`
}

const hooks = {
  useGetPaket: (params: GetPaketParams) =>
    useSWR(url.getPaket(params), http.fetcher, { revalidateOnFocus: false })
}

const api = {
  createPaket: (data: CreatePaketPayload) =>
    http.post(url.getPaket()).send(data),
  updatePaket: (id: string, data: CreatePaketPayload) =>
    http.put(url.getPaketById(id)).send(data),
  paketActive: (id: string) => http.put(`/paket/active/${id}`).send(),
  paketInactive: (id: string) => http.put(`/paket/inactive/${id}`).send()
}

export const paketRepository = { url, hooks, api }
