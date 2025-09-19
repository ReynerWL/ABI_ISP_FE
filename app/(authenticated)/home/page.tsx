'use client'

import { Button } from 'antd'
import Image from 'next/image'
import {
  HiDevicePhoneMobile,
  HiEnvelope,
  HiExclamationCircle,
  HiMapPin,
  HiPhone,
  HiRocketLaunch,
  HiRss,
  HiShoppingCart,
  HiTv,
  HiWrenchScrewdriver
} from 'react-icons/hi2'

const listAbout = [
  {
    icon: <HiWrenchScrewdriver className={'text-6xl text-primary'} />,
    title: '1. Dukungan Teknis Handal',
    desc: 'Tim profesional kami siap memastikan koneksi Anda selalu optimal - dari instalasi hingga Pemeliharaan'
  },
  {
    icon: <HiPhone className={'text-6xl text-primary'} />,
    title: '2. Dukungan Teknis Handal',
    desc: 'Tim profesional kami siap memastikan koneksi Anda selalu optimal - dari instalasi hingga Pemeliharaan'
  },
  {
    icon: <HiRocketLaunch className={'text-6xl text-primary'} />,
    title: '3. Dukungan Teknis Handal',
    desc: 'Tim profesional kami siap memastikan koneksi Anda selalu optimal - dari instalasi hingga Pemeliharaan'
  }
]

const listBenefit = [
  {
    icon: <HiRss className={'text-3xl text-primary'} />,
    text: 'Koneksi stabil untuk aktivitas harian'
  },
  {
    icon: <HiDevicePhoneMobile className={'text-3xl text-primary'} />,
    text: 'Ideal untuk semua perangkat'
  },
  {
    icon: <HiTv className={'text-3xl text-primary'} />,
    text: 'Cocok untuk browsing & streaming ringan'
  },
  {
    icon: <HiWrenchScrewdriver className={'text-3xl text-primary'} />,
    text: 'Gratis biaya instalasi'
  }
]

const listPaket = [
  { nama: 'Basic Plan', image: '/10_MBPS.png', harga: '150,000' },
  { nama: 'Standart Plan', image: '/15_MBPS.png', harga: '160,000' },
  { nama: 'Smart Plan', image: '/20_MBPS.png', harga: '166,500' },
  { nama: 'Premium Plan', image: '/30_MBPS.png', harga: '220,000' },
  { nama: 'Ultimate Plan', image: '/40_MBPS.png', harga: '310,000' }
]

const Home = () => {
  return (
    <div className={'grid grid-flow-row justify-center gap-y-16'}>
      {/* Section Beranda */}
      <div className='flex flex-row items-center justify-between px-24'>
        <div className={'flex h-fit w-[728px] flex-col gap-y-8'}>
          <div
            className={
              'flex flex-col gap-y-6 text-xl font-normal text-slate-500'
            }
          >
            <div className={'flex flex-col gap-y-3'}>
              <p>Halo Sobat,</p>
              <p
                className={
                  'text-5xl font-extrabold leading-snug text-slate-800'
                }
              >
                Nikmati Internet Cepat & Stabil untuk Semua Kebutuhan
              </p>
            </div>
            <p>
              Nikmati pengalaman online tanpa hambatan dengan layanan WiFi
              berkecepatan tinggi, harga transparan, dan dukungan 24/7 untuk
              rumah maupun bisnis Anda
            </p>
          </div>
          <Button
            className={
              'w-fit !rounded-full !border-none !bg-secondary !px-4 !py-6 text-base !font-semibold !text-white'
            }
          >
            Berlangganan Sekarang
          </Button>
        </div>
        <div className={''}>
          <Image
            src={'/home_1.png'}
            alt={'logo'}
            width={898}
            height={464}
            className={''}
          />
        </div>
      </div>
      {/* Section Tentang Kami */}
      <div className={'flex flex-row justify-center bg-slate-50 px-24'}>
        <div className={'flex flex-col gap-y-8 py-16'}>
          <div className={'grid grid-flow-row justify-items-center gap-y-3'}>
            <h2 className={'text-4xl font-bold text-slate-800'}>
              Mengapa Pilih Kami ?
            </h2>
            <p
              className={
                'w-[488px] text-center text-xl font-medium text-slate-500'
              }
            >
              Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
              kepada kami
            </p>
          </div>
          <div className={'flex flex-row gap-x-12'}>
            {listAbout.map((value, index) => (
              <div
                key={index}
                className={'flex flex-col gap-y-8 rounded-2xl bg-white p-6'}
              >
                {value.icon}
                <div className={'flex flex-col gap-y-4'}>
                  <p className={'text-2xl font-bold text-slate-700'}>
                    {value.title}
                  </p>
                  <p className={'text-sm font-medium text-slate-500'}>
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Section Top Benefit */}
      <div className={'flex flex-row items-center -space-x-44 px-24'}>
        <Image
          src={'/home_2.png'}
          alt={'logo'}
          width={649}
          height={512}
          className={'z-10'}
        />
        <div
          className={
            'flex h-[600px] w-full items-center justify-center rounded-2xl bg-blue-50 [clip-path:polygon(0_17%,100%_0,100%_100%,0_86%)]'
          }
        >
          <div className={'ml-14 flex w-[600px] flex-col gap-y-8'}>
            <div className={'flex flex-col gap-y-3'}>
              <h2 className={'text-4xl font-bold text-slate-800'}>
                Top Benefit
              </h2>
              <p className={'text-xl font-medium text-slate-500'}>
                Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
                kepada kami
              </p>
            </div>
            <div className={'flex flex-col gap-y-4'}>
              {listBenefit.map((value, index) => (
                <div
                  key={index}
                  className={'flex gap-x-3 text-xl font-medium text-slate-500'}
                >
                  {value.icon}
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Section Produk */}
      <div className={'flex flex-col justify-center gap-y-8 px-24'}>
        <div className={'grid grid-flow-row justify-items-center gap-y-3'}>
          <h2 className={'text-4xl font-bold text-slate-800'}>Produk Kami</h2>
          <p
            className={
              'w-[533px] text-center text-xl font-medium text-slate-500'
            }
          >
            Kami menyediakan berbagai pilihan produk internet yang cepat,
            stabil, dan sesuai kebutuhan Anda
          </p>
        </div>
        <div className={'flex flex-row gap-x-6 p-3'}>
          {listPaket.map((value, index) => (
            <div
              key={index}
              className={
                'grid w-full grid-flow-row justify-center gap-y-6 rounded-xl bg-white p-6'
              }
              style={{
                boxShadow:
                  '4px 4px 20px 0px rgba(0, 104, 255, 0.03), -4px -4px 20px 0px rgba(0, 104, 255, 0.03) '
              }}
            >
              <p className={'text-2xl font-semibold text-slate-700'}>
                {value.nama}
              </p>
              <Image
                src={value.image}
                alt={'logo'}
                width={296}
                height={298}
                className={''}
              />
              <div className={'grid grid-flow-row justify-center gap-y-3'}>
                <p className={'text-2xl font-bold text-primary'}>
                  Rp. {value.harga}/Bulan
                </p>
                <p
                  className={
                    'flex justify-center text-sm font-medium italic text-slate-500'
                  }
                >
                  Harga Sudah Termasuk PPN
                </p>
              </div>
              <Button
                className={
                  '!rounded-xl !border-none !bg-blue-50 !px-8 !py-5 !font-semibold !text-primary'
                }
              >
                Langganan Sekarang
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className={'flex flex-col bg-primary'}>
        <div className={'flex flex-row gap-x-72 p-24'}>
          <div className={'flex w-full flex-col gap-y-6'}>
            <Image
              src={'/logo_footer.png'}
              alt={'logo'}
              width={280}
              height={85}
              className={''}
            />
            <div className={'flex flex-col gap-y-3'}>
              <p className={'text-base font-normal text-slate-50'}>
                PT Amarta Buana Informatika perusahaan teknologi yang berfokus
                pada pengembangan solusi digital inovatif untuk membantu bisnis
                berkembang di era digital.
              </p>
              <div className={'flex flex-row gap-x-6'}>
                <Image
                  src={'/icons/linkedin.svg'}
                  alt={'Linkedin'}
                  width={20}
                  height={20}
                />
                <Image
                  src={'/icons/facebook.svg'}
                  alt={'Linkedin'}
                  width={20}
                  height={20}
                />
                <Image
                  src={'/icons/instagram.svg'}
                  alt={'Linkedin'}
                  width={20}
                  height={20}
                />
                <Image
                  src={'/icons/twitter.svg'}
                  alt={'Linkedin'}
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className={'flex w-full flex-col gap-y-6'}>
            <h4 className={'text-2xl font-bold text-slate-50'}>Tautan Cepat</h4>
            <div className={'flex flex-col gap-y-3 text-white'}>
              <div
                className={
                  'flex flex-row gap-x-3 text-base font-normal text-slate-50'
                }
              >
                <HiExclamationCircle className={'text-xl'} />
                <p>Tentang Kami</p>
              </div>
              <div
                className={
                  'flex flex-row gap-x-3 text-base font-normal text-slate-50'
                }
              >
                <HiShoppingCart className={'text-xl'} />
                <p>Produk</p>
              </div>
            </div>
          </div>
          <div className={'flex w-full flex-col gap-y-6'}>
            <h4 className={'text-2xl font-bold text-slate-50'}>Kontak</h4>
            <div className={'flex flex-col gap-y-3 text-white'}>
              <div
                className={
                  'flex flex-row gap-x-3 text-base font-normal text-slate-50'
                }
              >
                <HiMapPin className={'items-start text-7xl'} />
                <p>
                  Perumahan Puri Kasablanka 3 , JL.Mede Raya Blok AA1 No.27
                  Sukamekar Kec.Sukawangi, Kabupaten Bekasi ,Jawa Barat 17656
                </p>
              </div>
              <div
                className={
                  'flex flex-row gap-x-3 text-base font-normal text-slate-50'
                }
              >
                <HiPhone className={'text-xl'} />
                <p>+62 859 3933 5865</p>
              </div>
              <div
                className={
                  'flex flex-row gap-x-3 text-base font-normal text-slate-50'
                }
              >
                <HiEnvelope className={'text-xl'} />
                <p>no-reply@amartanet.id</p>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex justify-center bg-slate-900 p-4 text-white'}>
          © 2025 PT Amarta Buana Informati. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Home
