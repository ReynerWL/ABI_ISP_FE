import Chip from '../reusable/Chip'

interface InfoPelangganProps {
  id: string
  tanggalBerlangganan: string
  namaPelanggan: string
  email: string
  noTelp: string
  alamat: string
  status: string
}

const InfoPelanggan = ({
  id,
  tanggalBerlangganan,
  namaPelanggan,
  email,
  noTelp,
  alamat,
  status
}: InfoPelangganProps) => {
  return (
    <div className='flex w-full flex-col gap-8 rounded-2xl bg-white p-6'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <div className='h-full w-2 rounded-sm bg-secondary'></div>
          <div className='flex flex-col gap-1 font-semibold'>
            <h1 className='text-xl font-semibold text-slate-700'>
              Informasi Pelanggan
            </h1>
            <h2 className='text-base font-semibold text-slate-500'>
              ID Pelanggan : <span className='text-primary'>{id}</span>
            </h2>
          </div>
        </div>
        <div className='flex items-center'>
          <Chip text={status} />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-y-6'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-medium leading-[14px] text-slate-500'>
            Tanggal Berlangganan
          </p>
          <h3 className='font-bold text-slate-700'>{tanggalBerlangganan}</h3>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-medium leading-[14px] text-slate-500'>
            Nama Pelanggan
          </p>
          <h3 className='font-bold text-slate-700'>{namaPelanggan}</h3>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-medium leading-[14px] text-slate-500'>
            Email
          </p>
          <h3 className='font-bold text-slate-700'>{email}</h3>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-medium leading-[14px] text-slate-500'>
            No. Telp
          </p>
          <h3 className='font-bold text-slate-700'>{noTelp}</h3>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-medium leading-[14px] text-slate-500'>
            Alamat
          </p>
          <h3 className='font-bold text-slate-700'>{alamat}</h3>
        </div>
      </div>
    </div>
  )
}

export default InfoPelanggan
