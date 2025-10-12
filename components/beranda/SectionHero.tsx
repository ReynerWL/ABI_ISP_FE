import { Button } from 'antd'
import Image from 'next/image'

interface props {
  widthImage: number
}

export const SectionHero = ({ widthImage }: props) => {
  return (
    <div
      id={'Hero'}
      className='mt-4 flex !w-full scroll-mt-20 flex-col-reverse items-center justify-between gap-y-6 px-4 md:flex-row md:px-10 xl:px-16 2xl:px-20'
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
              <span className={'hidden lg:inline'}>Nikmati</span> Internet Cepat
              & Stabil untuk Semua Kebutuhan
            </p>
          </div>
          <p>
            <span className={'hidden md:inline lg:hidden'}>
              Nikmati WiFi cepat, harga transparan, dan dukungan 24/7 untuk
              rumah & bisnis Anda
            </span>
            <span className={'inline md:hidden lg:inline'}>
              Nikmati pengalaman online tanpa hambatan dengan layanan WiFi
              berkecepatan tinggi, harga transparan, dan dukungan 24/7 untuk
              rumah maupun bisnis Anda
            </span>
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
          width={widthImage}
          height={widthImage}
          className={'mt-1'}
        />
      </div>
    </div>
  )
}
