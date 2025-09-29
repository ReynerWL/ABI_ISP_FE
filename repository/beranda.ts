import { http } from '#/utils/http'
import useSWR from 'swr'
import qs from 'qs'

export interface GetAllPaket {
  name?: string | null
  price?: number | null
  speed?: string | null
  photo?: string | null
}

const url = {
  getPaket() {
    return `/paket`
  }
}

const hooks = {
  useGetAllPaket() {
    return useSWR(url.getPaket(), http.fetcher)
  }
}

const api = {}

export const berandaRepository = { url, hooks, api }
