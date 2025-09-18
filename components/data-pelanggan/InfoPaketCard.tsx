import Image from 'next/image'
import BuktiPembayaran from './BuktiPembayaran'

const InfoPaketCard = () => {
  return (
    <div className='flex h-fit flex-col gap-6 rounded-2xl bg-white p-6 2xl:min-w-[400px]'>
      <h1 className='text-xl font-semibold text-slate-700'>Informasi Paket</h1>
      <div className='flex items-center justify-center'>
        <Image
          src={'/paket/30mbps.svg'}
          alt='Paket 10 Mbps'
          width={0}
          height={0}
          className='w-full max-w-[250px] xl:max-w-[270px]'
          draggable={false}
        />
      </div>
      <div className='space-y-[18px]'>
        <div className='flex justify-between'>
          <p className='text-xs font-medium text-slate-500'>Harga</p>
          <p className='font-semibold text-slate-700'>Rp 150.000</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs font-medium text-slate-500'>
            Tanggal Jatuh Tempo
          </p>
          <p className='font-semibold text-slate-700'>01-08-2025</p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs font-medium text-slate-500'>
            Tanggal Pembayaran
          </p>
          <p className='font-semibold text-slate-700'>30-07-2025</p>
        </div>
      </div>
      <BuktiPembayaran imageUrl='/bukti-pembayaran.png' />
    </div>
  )
}

export default InfoPaketCard
