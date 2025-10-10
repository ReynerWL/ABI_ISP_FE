import { http } from '#/utils/http'
import useSWR from 'swr'

export interface Dashboard {
  totalCustomer: number
  newCustomer: number
  praAktifCustomer: number
  activeCustomer: number
  inactiveCustomer: number
  packageInformations: PackageInformation[]
  needConfirmations: NeedConfirmation[]
  transactionSummary: TransactionSummary[]
}

export interface PackageInformation {
  paketSpeed: string
  total: string
}

export interface NeedConfirmation {
  customerId: string
  status: string
  updatedAt: string
}

export interface TransactionSummary {
  month: string
  total: string
}

const url = { dashboard: () => '/dashboard' }
const hooks = { useGetDashboard: () => useSWR(url.dashboard(), http.fetcher) }
const api = {}

export const dashboardRepository = { url, hooks, api }
