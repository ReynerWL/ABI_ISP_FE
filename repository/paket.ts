import { http } from '#/utils/http'
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

const url = { getPaket: () => '/paket' }

const hooks = {
  useGetPaket: () =>
    useSWR(url.getPaket(), http.fetcher, { revalidateOnFocus: false })
}

export const paketRepository = { url, hooks }
