import { http } from '#/utils/http'
import useSWR from 'swr'

export interface Kelurahan {
  id: string
  distric_id: string
  name: string
}

const url = {
  getKelurahanBabelan: () =>
    'https://www.emsifa.com/api-wilayah-indonesia/api/villages/3216090.json',
  uploadFile: () => '/file/upload'
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Gagal mengambil data')
  }
  return res.json()
}

const hooks = {
  useGetKelurahanBabelan: () => useSWR(url.getKelurahanBabelan(), fetcher)
}

const api = {
  uploadFile: (data: FormData) => http.post(url.uploadFile()).send(data)
}

export const generalRepository = { hooks, api }
