import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  HiEnvelope,
  HiExclamationCircle,
  HiMapPin,
  HiPhone,
  HiShoppingCart
} from 'react-icons/hi2'

interface props {
  widthLogo: number
  widthIcon: number
}

export const SectionFooter = ({ widthIcon, widthLogo }: props) => {
  return (
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
        <div className={'flex w-full flex-col gap-y-5 lg:gap-y-6'}>
          <Image
            src={'/logo_light.png'}
            alt={'logo'}
            width={widthLogo}
            height={widthLogo}
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
                width={widthIcon}
                height={widthIcon}
                className={'cursor-pointer'}
              />
              <Image
                src={'/icons/facebook.svg'}
                alt={'Facebook'}
                width={widthIcon}
                height={widthIcon}
                className={'cursor-pointer'}
              />
              <Image
                src={'/icons/instagram.svg'}
                alt={'Instagram'}
                width={widthIcon}
                height={widthIcon}
                className={'cursor-pointer'}
              />
              <Image
                src={'/icons/twitter.svg'}
                alt={'Twitter'}
                width={widthIcon}
                height={widthIcon}
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
            <Link
              href={'https://maps.app.goo.gl/wCZRhAXJZoz5dhTm7'}
              target='_blank'
              rel='noopener noreferrer'
              className={
                'flex flex-row gap-x-3 text-sm font-normal text-slate-50 hover:text-slate-200 2xl:text-base'
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
            </Link>
            <Link
              href={'https://wa.me/+6285939335865'}
              target='_blank'
              rel='noopener noreferrer'
              className={
                'flex flex-row gap-x-3 font-normal text-slate-50 hover:text-slate-200 xl:text-sm 2xl:text-base'
              }
            >
              <HiPhone className={'text-base xl:text-lg 2xl:text-xl'} />
              <p>+62 859 3933 5865</p>
            </Link>
            <Link
              href={'mailto:no-reply@amartanet.id'}
              target='_blank'
              rel='noopener noreferrer'
              className={
                'flex flex-row gap-x-3 font-normal text-slate-50 hover:text-slate-200 xl:text-sm 2xl:text-base'
              }
            >
              <HiEnvelope className={'text-base xl:text-lg 2xl:text-xl'} />
              <p>no-reply@amartanet.id</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
