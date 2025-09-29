import useSWR from 'swr'

export interface Kelurahan {
  id: string
  distric_id: string
  name: string
}

const url = {
  getKelurahanBabelan: () =>
    'https://www.emsifa.com/api-wilayah-indonesia/api/villages/3216090.json'
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

export const alamatRepository = { hooks }
