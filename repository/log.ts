import { http } from '#/utils/http'
import { buildQueryParams } from '#/utils/params'
import useSWR from 'swr'

export interface Log {
  id: string
  data: any
  createdAt: string
}

export interface GetLogParams {
  page?: number
  limit?: number
}

const url = {
  getLog: (params: GetLogParams) => {
    const query = buildQueryParams(params)
    return `/log?${query}`
  }
}

const hooks = {
  useGetLog: (params: GetLogParams) => {
    return useSWR(url.getLog(params), http.fetcher)
  }
}

export const logRepository = { url, hooks }
