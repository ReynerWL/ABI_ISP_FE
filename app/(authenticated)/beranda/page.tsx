'use client'

import { SectionAbout } from '#/components/beranda/SectionAbout'
import { SectionBenefit } from '#/components/beranda/SectionBenefit'
import { SectionFooter } from '#/components/beranda/SectionFooter'
import { SectionHero } from '#/components/beranda/SectionHero'
import { SectionProduk } from '#/components/beranda/SectionProduk'
import { useUIState } from '#/context/UIStateContext'
import usePageTitle from '#/hooks/usePageTitle'
import { paketRepository } from '#/repository/paket'
import {
  HiDevicePhoneMobile,
  HiPhone,
  HiRocketLaunch,
  HiRss,
  HiTv,
  HiWrenchScrewdriver
} from 'react-icons/hi2'

const listAbout = [
  {
    icon: (
      <HiWrenchScrewdriver className={'text-4xl text-primary xl:text-5xl'} />
    ),
    title: '1. Dukungan Teknis Handal',
    desc: 'Tim profesional kami siap memastikan koneksi Anda selalu optimal - dari instalasi hingga Pemeliharaan'
  },
  {
    icon: <HiPhone className={'text-4xl text-primary xl:text-5xl'} />,
    title: '2. Layanan Pelanggan Responsive',
    desc: 'Kami Hadir 24/7 untuk menjawab setiap pertanyaan dan membantu Anda kapan saja'
  },
  {
    icon: <HiRocketLaunch className={'text-4xl text-primary xl:text-5xl'} />,
    title: '3. Jaringan Cepat & Stabil',
    desc: 'Dengan teknologi terkini dan pemantauan berkala, kami pastikan pengalaman internet Anda lancar tanpa gangguan'
  }
]

const listBenefit = [
  {
    icon: <HiRss className={'text-primary xl:text-2xl 2xl:text-3xl'} />,
    text: 'Koneksi stabil untuk aktivitas harian'
  },
  {
    icon: (
      <HiDevicePhoneMobile
        className={'text-primary xl:text-2xl 2xl:text-3xl'}
      />
    ),
    text: 'Ideal untuk semua perangkat'
  },
  {
    icon: <HiTv className={'text-primary xl:text-2xl 2xl:text-3xl'} />,
    text: 'Cocok untuk browsing & streaming ringan'
  },
  {
    icon: (
      <HiWrenchScrewdriver
        className={'text-primary xl:text-2xl 2xl:text-3xl'}
      />
    ),
    text: 'Gratis biaya instalasi'
  }
]

const Home = () => {
  usePageTitle('Beranda')
  const { isXL, isMD, isLG, isMobile } = useUIState()
  const { data, isLoading } = paketRepository.hooks.useGetPaket()

  return (
    <div className={'flex flex-col justify-center gap-y-16 overflow-auto'}>
      <SectionHero widthImage={isXL ? 620 : isLG ? 900 : isMD ? 600 : 898} />
      <SectionAbout data={listAbout} />
      <SectionBenefit
        data={listBenefit}
        widthImage={isXL ? 549 : isLG ? 380 : isMD ? 320 : 649}
      />
      <SectionProduk
        data={data?.data}
        widthImage={isMD ? 160 : 296}
        loading={isLoading}
      />
      <SectionFooter
        widthLogo={isXL ? 180 : isLG || isMD || isMobile ? 200 : 280}
        widthIcon={isXL ? 20 : 18}
      />
    </div>
  )
}

export default Home
