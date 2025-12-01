import { http } from '#/utils/http'
import { buildQueryParams } from '#/utils/params'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

export interface GetFileParams {
  folder?: string | null
  page?: number
  limit?: number
}

export interface DeleteFileParams {
  folder?: string | null
  filename?: string | null
}

export interface File {
  id: string
  name: string
  path: string
  size: number
  type: string
  lastModified: string
}

const url = {
  getFile: (params: GetFileParams) => {
    const query = buildQueryParams(params)
    return `/file/list?${query}`
  },
  deleteFile: (params: DeleteFileParams) => {
    const query = buildQueryParams(params)
    return `/file/delete?${query}`
  }
}

const hooks = {
  useGetFileList: (params: GetFileParams) => {
    return useSWR(url.getFile(params), http.fetcher)
  },
  useGetFileListInfinite: (params: GetFileParams) => {
    const getKey = (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.data.length) return null
      return url.getFile({ ...params, page: pageIndex + 1, limit: 10 })
    }

    const { data, error, size, setSize, mutate, isLoading, isValidating } =
      useSWRInfinite(getKey, http.fetcher, { revalidateOnFocus: false })

    const isReachedEnd = data && data[data.length - 1]?.data.length < 10

    return {
      data: data ? data.flatMap((page) => page.data) : [],
      error,
      size,
      setSize,
      mutate,
      isLoading,
      isReachedEnd,
      isValidating
    }
  }
}

const api = {
  deleteFile: (params: DeleteFileParams) => {
    return http.del(url.deleteFile(params))
  }
}

export const fileRepository = { url, hooks, api }
