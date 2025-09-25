'use client'

import { useUIState } from '#/app/provider'
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
    icon: (
      <HiWrenchScrewdriver
        className={'text-6xl text-primary sm:text-4xl xl:text-5xl 2xl:text-6xl'}
      />
    ),
    title: '1. Dukungan Teknis Handal',
    desc: 'Tim profesional kami siap memastikan koneksi Anda selalu optimal - dari instalasi hingga Pemeliharaan'
  },
  {
    icon: (
      <HiPhone
        className={'text-5xl text-primary sm:text-3xl xl:text-4xl 2xl:text-6xl'}
      />
    ),
    title: '2. Dukungan Teknis Handal',
    desc: 'Kami Hadir 24/7 untuk menjawab setiap pertanyaan dan membantu Anda kapan saja'
  },
  {
    icon: (
      <HiRocketLaunch
        className={'text-6xl text-primary sm:text-4xl xl:text-5xl 2xl:text-6xl'}
      />
    ),
    title: '3. Dukungan Teknis Handal',
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

const listPaket = [
  { nama: 'Basic Plan', image: '/10_MBPS.png', harga: '150,000' },
  { nama: 'Standart Plan', image: '/15_MBPS.png', harga: '160,000' },
  { nama: 'Smart Plan', image: '/20_MBPS.png', harga: '166,500' },
  { nama: 'Premium Plan', image: '/30_MBPS.png', harga: '220,000' },
  { nama: 'Ultimate Plan', image: '/40_MBPS.png', harga: '310,000' }
]

const Home = () => {
  const { isXL, isMD, isLG, isSM, isMobile } = useUIState()
  return (
    <div className={'flex flex-col justify-center gap-y-16 overflow-auto'}>
      {/* Section Beranda */}
      <div
        id={'1'}
        className='mt-4 flex !w-full scroll-m-0 flex-col-reverse items-center justify-between gap-y-6 px-4 sm:scroll-mt-20 md:flex-row md:px-10 xl:px-16 2xl:px-20'
      >
        <div
          className={
            'flex h-fit flex-col gap-y-5 text-center md:gap-y-4 md:text-start xl:gap-y-5 2xl:gap-y-8'
          }
        >
          <div
            className={
              'flex w-full flex-col gap-y-1 text-base font-normal text-slate-500 md:w-[350px] md:gap-y-3 md:text-sm lg:w-[460px] xl:w-[600px] 2xl:w-[800px] 2xl:gap-y-6 2xl:text-xl'
            }
          >
            <div className={'flex flex-col gap-y-2 md:gap-y-1 2xl:gap-y-3'}>
              <p>Halo Sobat,</p>
              <p
                className={
                  'text-3xl font-extrabold leading-snug text-slate-800 md:text-2xl lg:text-3xl 2xl:text-5xl'
                }
              >
                {`${isMD || isSM || isMobile ? '' : 'Nikmati'} Internet Cepat & Stabil untuk Semua Kebutuhan`}
              </p>
            </div>
            <p>
              {`${
                isMD || isMobile
                  ? 'Nikmati WiFi cepat, harga transparan, dan dukungan 24/7 untuk rumah & bisnis Anda'
                  : 'Nikmati pengalaman online tanpa hambatan dengan layanan WiFi berkecepatan tinggi, harga transparan, dan dukungan 24/7 untuk rumah maupun bisnis Anda'
              }`}
            </p>
          </div>
          <div className={'flex w-full justify-center md:justify-start'}>
            <Button
              className={
                'w-fit !rounded-full !border-none !bg-secondary !px-4 !py-6 !text-base !font-semibold !text-white md:!py-5 md:!text-xs lg:!py-6 lg:!text-base'
              }
            >
              Berlangganan Sekarang
            </Button>
          </div>
        </div>
        <div className={''}>
          <Image
            src={'/home_1.png'}
            alt={'logo'}
            width={isXL ? 620 : isLG ? 900 : isMD ? 600 : 898}
            height={isXL ? 464 : isLG ? 700 : 464}
            className={'mt-1'}
          />
        </div>
      </div>
      {/* Section Tentang Kami */}
      <div
        id={'2'}
        className={
          'flex scroll-mt-20 flex-row justify-center bg-slate-50 px-4 md:px-10 xl:px-16 2xl:px-20'
        }
      >
        <div className={'flex flex-col gap-8 py-12 lg:py-16'}>
          <div
            className={
              'flex flex-col items-center justify-center gap-y-2 md:gap-y-3 xl:grid xl:grid-flow-row xl:justify-items-center'
            }
          >
            <h2
              className={
                'text-2xl font-bold text-slate-800 xl:text-3xl 2xl:text-4xl'
              }
            >
              Mengapa Pilih Kami ?
            </h2>
            <p
              className={
                'w-[350px] text-center text-base font-medium text-slate-500 md:w-[300px] md:text-sm xl:w-[400px] xl:text-base 2xl:w-[488px] 2xl:text-xl'
              }
            >
              Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
              kepada kami
            </p>
          </div>
          <div className={'flex flex-col gap-6 xl:flex-row xl:gap-12'}>
            {listAbout.map((value, index) => (
              <div
                key={index}
                className={
                  'flex flex-row items-center gap-8 rounded-2xl bg-white p-8 xl:flex-col xl:items-start xl:p-6'
                }
              >
                {value.icon}
                <div className={'flex flex-col gap-y-1 xl:gap-y-2 2xl:gap-y-4'}>
                  <p
                    className={'text-lg font-bold text-slate-700 2xl:text-2xl'}
                  >
                    {value.title}
                  </p>
                  <p
                    className={
                      'font-medium text-slate-500 xl:text-xs 2xl:text-sm'
                    }
                  >
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Section Top Benefit */}
      <div
        id={'3'}
        className={
          'flex scroll-mt-20 flex-col items-center -space-y-16 px-4 sm:px-14 md:flex-row md:-space-x-44 md:-space-y-0 md:px-10 xl:px-16 2xl:px-20'
        }
      >
        <Image
          src={'/home_2.png'}
          alt={'logo'}
          width={isXL ? 549 : isLG ? 380 : isMD ? 320 : 649}
          height={512}
          className={'z-10'}
        />
        <div
          className={
            'flex h-[430px] w-full items-center justify-center rounded-2xl bg-blue-50 sm:h-[340px] md:h-[315px] md:[clip-path:polygon(0_17%,100%_0,100%_100%,0_86%)] lg:h-[360px] xl:h-[500px] 2xl:h-[600px]'
          }
        >
          <div
            className={
              'flex w-full flex-col gap-y-4 px-9 pt-16 sm:px-14 md:ml-52 md:w-[300px] md:p-0 lg:w-[450px] xl:ml-52 xl:w-[500px] xl:gap-y-8 2xl:ml-14 2xl:w-[600px]'
            }
          >
            <div className={'flex flex-col gap-y-1 xl:gap-y-3'}>
              <h2
                className={
                  'text-2xl font-bold text-slate-800 md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl'
                }
              >
                Top Benefit
              </h2>
              <p
                className={
                  'text-base font-medium text-slate-500 md:text-sm xl:text-base 2xl:text-xl'
                }
              >
                Alasan ribuan pelanggan mempercayakan kebutuhan internet mereka
                kepada kami
              </p>
            </div>
            <div className={'flex flex-col gap-y-2 lg:gap-y-1 xl:gap-y-4'}>
              {listBenefit.map((value, index) => (
                <div
                  key={index}
                  className={
                    'flex gap-x-3 text-base font-medium text-slate-500 md:text-xs lg:text-sm xl:text-base 2xl:text-xl'
                  }
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
      <div
        id={'4'}
        className={
          'flex scroll-mt-20 flex-col justify-center gap-y-8 px-4 md:px-10 xl:px-16 2xl:px-20'
        }
      >
        <div
          className={
            'grid grid-flow-row justify-items-center gap-y-1 xl:gap-y-3'
          }
        >
          <h2
            className={
              'text-2xl font-bold text-slate-800 xl:text-3xl 2xl:text-4xl'
            }
          >
            Produk Kami
          </h2>
          <p
            className={
              'w-80 text-center text-base font-medium text-slate-500 sm:w-[400px] md:text-sm xl:text-base 2xl:w-[533px] 2xl:text-xl'
            }
          >
            Kami menyediakan berbagai pilihan produk internet yang cepat,
            stabil, dan sesuai kebutuhan Anda
          </p>
        </div>
        <div className={'flex w-full flex-row gap-x-6 overflow-y-auto p-3'}>
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
              <p
                className={
                  'text-lg font-semibold text-slate-700 xl:text-xl 2xl:text-2xl'
                }
              >
                {value.nama}
              </p>
              <Image
                src={value.image}
                alt={'logo'}
                width={isMD ? 160 : 296}
                height={298}
                className={'w-full'}
              />
              <div className={'grid grid-flow-row justify-center gap-y-3'}>
                <p className={'text-lg font-bold text-primary 2xl:text-2xl'}>
                  Rp. {value.harga}/Bulan
                </p>
                <p
                  className={
                    'flex justify-center text-xs font-medium italic text-slate-500 lg:text-sm'
                  }
                >
                  Harga Sudah Termasuk PPN
                </p>
              </div>
              <Button
                className={
                  '!rounded-xl !border-none !bg-blue-50 !px-8 !py-5 !text-sm !font-semibold !text-primary xl:!text-base'
                }
              >
                Langganan Sekarang
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div
        className={
          'flex flex-col bg-gradient-to-r from-[#001E46] from-0% via-[#003379] via-50% to-primary to-100%'
        }
      >
        <div
          className={
            'flex flex-col gap-16 p-11 sm:flex-row sm:gap-24 xl:gap-40 xl:p-16 2xl:gap-72 2xl:p-20'
          }
        >
          {/* <Image
            src={'/icons/spiral.svg'}
            alt={'logo'}
            width={2590}
            height={2000}
            className={'absolute w-[1800px] overflow-hidden'}
          /> */}
          <div className={'flex w-full flex-col gap-y-5 lg:gap-y-6'}>
            <Image
              src={'/logo_footer.png'}
              alt={'logo'}
              width={isXL ? 180 : isLG || isMD || isMobile ? 200 : 280}
              height={85}
              className={''}
            />
            <div className={'flex flex-col gap-y-3'}>
              <p className={'text-sm font-normal text-slate-50 2xl:text-base'}>
                PT Amarta Buana Informatika perusahaan teknologi yang berfokus
                pada pengembangan solusi digital inovatif untuk membantu bisnis
                berkembang di era digital.
              </p>
              <div className={'flex flex-row gap-x-6'}>
                <Image
                  src={'/icons/linkedin.svg'}
                  alt={'Linkedin'}
                  width={isXL ? 20 : 18}
                  height={isXL ? 20 : 18}
                  className={'cursor-pointer'}
                />
                <Image
                  src={'/icons/facebook.svg'}
                  alt={'Linkedin'}
                  width={isXL ? 20 : 18}
                  height={isXL ? 20 : 18}
                  className={'cursor-pointer'}
                />
                <Image
                  src={'/icons/instagram.svg'}
                  alt={'Linkedin'}
                  width={isXL ? 20 : 18}
                  height={isXL ? 20 : 18}
                  className={'cursor-pointer'}
                />
                <Image
                  src={'/icons/twitter.svg'}
                  alt={'Linkedin'}
                  width={isXL ? 20 : 18}
                  height={isXL ? 20 : 18}
                  className={'cursor-pointer'}
                />
              </div>
            </div>
          </div>
          <div className={'flex w-full flex-col gap-y-6'}>
            <h4
              className={
                'text-base font-bold text-slate-50 xl:text-lg 2xl:text-2xl'
              }
            >
              Tautan Cepat
            </h4>
            <div className={'flex flex-col gap-y-3 text-white'}>
              <div
                className={
                  'flex flex-row gap-x-3 text-sm font-normal text-slate-50 2xl:text-base'
                }
              >
                <HiExclamationCircle className={'text-lg 2xl:text-xl'} />
                <p>Tentang Kami</p>
              </div>
              <div
                className={
                  'flex flex-row gap-x-3 text-sm font-normal text-slate-50 2xl:text-base'
                }
              >
                <HiShoppingCart className={'text-lg 2xl:text-xl'} />
                <p>Produk</p>
              </div>
            </div>
          </div>
          <div className={'flex w-full flex-col gap-y-6'}>
            <h4
              className={
                'text-base font-bold text-slate-50 xl:text-lg 2xl:text-2xl'
              }
            >
              Kontak
            </h4>
            <div className={'flex flex-col gap-y-3 text-white'}>
              <div
                className={
                  'flex flex-row gap-x-3 text-sm font-normal text-slate-50 2xl:text-base'
                }
              >
                <HiMapPin
                  className={
                    'h-fit w-fit items-start text-5xl sm:text-6xl xl:text-6xl'
                  }
                />
                <p>
                  Perumahan Puri Kasablanka 3 , JL.Mede Raya Blok AA1 No.27
                  Sukamekar Kec.Sukawangi, Kabupaten Bekasi ,Jawa Barat 17656
                </p>
              </div>
              <div
                className={
                  'flex flex-row gap-x-3 font-normal text-slate-50 xl:text-sm 2xl:text-base'
                }
              >
                <HiPhone className={'text-base xl:text-lg 2xl:text-xl'} />
                <p>+62 859 3933 5865</p>
              </div>
              <div
                className={
                  'flex flex-row gap-x-3 font-normal text-slate-50 xl:text-sm 2xl:text-base'
                }
              >
                <HiEnvelope className={'text-base xl:text-lg 2xl:text-xl'} />
                <p>no-reply@amartanet.id</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            'z-10 flex justify-center bg-slate-900 p-4 text-xs text-white sm:text-sm'
          }
        >
          © 2025 PT Amarta Buana Informati. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Home
