import { http } from '#/utils/http'
import useSWR from 'swr'

const url = { getQr: () => '/wa/qr', logout: () => '/wa/logout' }

const hooks = {
  useGetQr: () =>
    useSWR(url.getQr(), http.fetcher, { revalidateOnFocus: false })
}

const api = { useLogoutQr: () => http.post(url.logout()) }

export const qrRepository = { url, hooks, api }
