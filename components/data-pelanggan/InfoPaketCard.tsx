import { Paket } from '#/repository/paket'
import { formatRupiah } from '#/utils/formatter'
import { Skeleton } from 'antd'
import Image from 'next/image'
import BuktiPembayaran from './BuktiPembayaran'

interface InfoPaketCardProps {
  paket: Paket | undefined
  isLoading: boolean
}

const InfoPaketCard = ({ paket, isLoading }: InfoPaketCardProps) => {
  return (
    <div className='flex h-fit flex-col gap-6 rounded-2xl bg-white p-6 2xl:min-w-[400px]'>
      <h1 className='text-xl font-semibold text-slate-700'>Informasi Paket</h1>
      <div className='flex items-center justify-center'>
        {!isLoading && paket?.photo && (
          <Image
            src={paket?.photo}
            alt='Paket'
            width={296}
            height={298}
            draggable={false}
            priority
          />
        )}
      </div>
      <div className='space-y-[18px]'>
        <div className='flex justify-between'>
          <p className='text-xs font-medium text-slate-500'>Harga</p>
          <p className='font-semibold text-slate-700'>
            {isLoading ? (
              <Skeleton.Node active style={{ width: 100, height: 21 }} />
            ) : paket?.price ? (
              formatRupiah(paket?.price, { withPrefix: true })
            ) : (
              '-'
            )}
          </p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs font-medium text-slate-500'>
            Tanggal Jatuh Tempo
          </p>
          <p className='font-semibold text-slate-700'>
            {isLoading ? (
              <Skeleton.Node active style={{ width: 100, height: 21 }} />
            ) : (
              // TODO: replace with actual date
              '30-07-2025'
            )}
          </p>
        </div>
        <div className='flex justify-between'>
          <p className='text-xs font-medium text-slate-500'>
            Tanggal Pembayaran
          </p>
          <p className='font-semibold text-slate-700'>
            {isLoading ? (
              <Skeleton.Node active style={{ width: 100, height: 21 }} />
            ) : (
              // TODO: replace with actual date
              '30-07-2025'
            )}
          </p>
        </div>
      </div>

      {isLoading ? (
        <Skeleton.Image className='!h-[68px] !w-full !min-w-[310px] !rounded-xl' />
      ) : (
        // TODO: replace with actual image
        <BuktiPembayaran imageUrl='/dummy/bukti_pembayaran.png' />
      )}
    </div>
  )
}

export default InfoPaketCard
