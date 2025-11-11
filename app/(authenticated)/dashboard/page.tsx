'use client'

import ConfirmList from '#/components/dashboard/ConfirmList'
import InfoCard from '#/components/dashboard/InfoCard'
import PaketChart from '#/components/dashboard/PaketChart'
import PelangganChart from '#/components/dashboard/PelangganChart'
import TotalPelangganCard from '#/components/dashboard/TotalPelangganCard'
import Title from '#/components/reusable/Title'
import { HiArchiveBox, HiClock, HiSignal, HiSignalSlash } from 'react-icons/hi2'

const Dashboard = () => {
  return (
    <div className='w-full'>
      <Title>Dashboard</Title>
      <div className='mt-6 flex w-full flex-col gap-4 md:gap-6'>
        <div className='flex w-full flex-col gap-4 md:gap-6 xl:h-[320px] xl:flex-row'>
          <div className='flex w-full flex-col gap-4 sm:flex-row md:gap-6'>
            <TotalPelangganCard />
            <div className='grid w-full grid-cols-2 gap-4 md:gap-6'>
              <InfoCard
                icon={HiArchiveBox}
                title='Pelanggan Baru'
                description={'32 data'}
                href='/'
              />
              <InfoCard
                icon={HiSignal}
                title='Pelanggan Aktif'
                description={'32 data'}
                href='/'
              />
              <InfoCard
                icon={HiClock}
                title='Pelanggan Pending'
                description={'32 data'}
                href='/'
              />
              <InfoCard
                icon={HiSignalSlash}
                title='Pelanggan Nonaktif'
                description={'32 data'}
                href='/'
              />
            </div>
          </div>
          <ConfirmList />
        </div>
        <div className='flex max-w-full flex-col gap-4 md:gap-6 xl:flex-row'>
          <PaketChart />
          <PelangganChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
