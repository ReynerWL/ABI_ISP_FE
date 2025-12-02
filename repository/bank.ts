import { http } from '#/utils/http'
import useSWR from 'swr'

export interface Bank {
  id: string
  bank_name: string
  no_rekening: string
  owner: string
}

const url = {
  getBanks: () => '/bank',
  getBankById: (id: string) => `/bank/${id}`
}

const hooks = {
  useGetBanks: () =>
    useSWR(url.getBanks(), http.fetcher, { revalidateOnFocus: false })
}

const api = {
  createBank: (data: Bank) => http.post(url.getBanks()).send(data),
  deleteBank: (id: string) => http.del(url.getBankById(id)).send()
}

export const bankRepository = { url, hooks, api }
