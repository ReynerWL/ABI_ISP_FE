import Chip from '#/components/reusable/Chip'
import Title from '#/components/reusable/Title'
import { Image } from 'antd'

const DetailPelanggan = () => {
  return (
    <div className='space-y-8'>
      <Title>Detail Pelanggan</Title>
      <div className='flex w-full gap-6'>
        <div className='flex w-full max-w-[940px] flex-col gap-6'>
          <div className='flex w-full flex-col gap-8 rounded-2xl bg-white p-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <div className='h-full w-2 rounded-sm bg-secondary'></div>
                <div className='flex flex-col gap-1 font-semibold'>
                  <h1 className='text-xl text-slate-700'>
                    Informasi Pelanggan
                  </h1>
                  <h2 className='text-base text-slate-500'>
                    ID Pelanggan :{' '}
                    <span className='text-primary'>121846234310</span>
                  </h2>
                </div>
              </div>
              <div className='flex items-center'>
                <Chip text='Pending' color='orange' />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-y-6'>
              <div className='flex flex-col gap-1'>
                <p className='text-xs font-medium leading-[14px] text-slate-500'>
                  Tanggal Berlangganan
                </p>
                <h3 className='font-semibold text-slate-700'>
                  01 Januari 2025
                </h3>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-xs font-medium leading-[14px] text-slate-500'>
                  Nama Pelanggan
                </p>
                <h3 className='font-semibold text-slate-700'>Edward</h3>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-xs font-medium leading-[14px] text-slate-500'>
                  Email
                </p>
                <h3 className='font-semibold text-slate-700'>
                  edward205@gmail.com
                </h3>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-xs font-medium leading-[14px] text-slate-500'>
                  No. Telp
                </p>
                <h3 className='font-semibold text-slate-700'>085178527835</h3>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-xs font-medium leading-[14px] text-slate-500'>
                  Alamat
                </p>
                <h3 className='font-semibold text-slate-700'>
                  Jl.Bintara 14 No.08, RT.001/RW.009
                </h3>
              </div>
            </div>
          </div>
          <div className='grid w-full grid-cols-2 gap-6 rounded-2xl bg-white p-6'>
            <div className='flex flex-col gap-6'>
              <h1 className='text-xl font-semibold text-slate-700'>Foto KTP</h1>
              <Image
                src='/ktp.png'
                alt={'ktp'}
                className='h-auto max-h-[250px] w-full max-w-full rounded-xl object-cover'
              />
            </div>
            <div className='flex flex-col gap-6'>
              <div className='flex items-center justify-between font-semibold'>
                <h1 className='text-xl text-slate-700'>Foto Instalasi</h1>
                <h2 className='text-slate-500'>01-08-2025</h2>
              </div>
              <Image
                src='/router.jpg'
                alt={'ktp'}
                className='h-auto max-h-[250px] w-full max-w-full rounded-xl object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPelanggan
