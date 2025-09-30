import { http } from '#/utils/http'
import useSWR from 'swr'

export interface Bank {
  id: string
  bank_name: string
  no_rekening: string
  owner: string
}

const url = { getBanks: () => '/bank' }

const hooks = {
  useGetBanks: () =>
    useSWR(url.getBanks(), http.fetcher, { revalidateOnFocus: false })
}

export const bankRepository = { url, hooks }
