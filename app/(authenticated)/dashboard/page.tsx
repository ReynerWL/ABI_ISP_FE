'use client'

import ConfirmList from '#/components/dashboard/ConfirmList'
import InfoCard from '#/components/dashboard/InfoCard'
import PaketChart from '#/components/dashboard/PaketChart'
import TotalPelangganCard from '#/components/dashboard/TotalPelangganCard'
import TransactionChart from '#/components/dashboard/TransactionChart'
import Title from '#/components/reusable/Title'
import {
  Dashboard as DashboardData,
  dashboardRepository
} from '#/repository/dashboard'
import { HiArchiveBox, HiClock, HiSignal, HiSignalSlash } from 'react-icons/hi2'
import { toast } from 'sonner'

const Dashboard = () => {
  toast.dismiss()
  const { isLoading, data } = dashboardRepository.hooks.useGetDashboard()
  const summary: DashboardData = data?.data

  return (
    <div className='w-full'>
      <Title>Dashboard</Title>
      <div className='mt-6 flex w-full flex-col gap-4 md:gap-6'>
        <div className='flex w-full flex-col gap-4 md:gap-6 xl:h-[320px] xl:flex-row'>
          <div className='flex w-full flex-col gap-4 sm:flex-row md:gap-6'>
            <TotalPelangganCard
              totalPelanggan={summary?.totalCustomer}
              isLoading={isLoading}
            />
            <div className='grid w-full grid-cols-2 gap-4 md:gap-6'>
              <InfoCard
                icon={HiArchiveBox}
                title='Pelanggan Baru'
                description={summary?.newCustomer + ' data'}
                href='/dashboard/data-pelanggan?status=Baru'
                isLoading={isLoading}
              />
              <InfoCard
                icon={HiSignal}
                title='Pelanggan Aktif'
                description={summary?.activeCustomer + ' data'}
                href='/dashboard/data-pelanggan?status=Aktif'
                isLoading={isLoading}
              />
              <InfoCard
                icon={HiClock}
                title='Pelanggan Pra-Aktif'
                description={summary?.praAktifCustomer + ' data'}
                href='/dashboard/data-pelanggan?status=Pra-Aktif'
                isLoading={isLoading}
              />
              <InfoCard
                icon={HiSignalSlash}
                title='Pelanggan Nonaktif'
                description={summary?.inactiveCustomer + ' data'}
                href='/dashboard/data-pelanggan?status=Nonaktif'
                isLoading={isLoading}
              />
            </div>
          </div>
          <ConfirmList
            list={summary?.needConfirmations}
            isLoading={isLoading}
          />
        </div>
        <div className='flex max-w-full flex-col gap-4 md:gap-6 xl:flex-row'>
          <PaketChart data={summary?.packageInformations} />
          <TransactionChart
            data={summary?.transactionSummary}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
