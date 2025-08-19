interface TotalPelangganCardProps {
  totalPelanggan?: number
}

const TotalPelangganCard = ({
  totalPelanggan = 0
}: TotalPelangganCardProps) => {
  return (
    <div className='relative w-full overflow-hidden rounded-2xl sm:max-w-[220px]'>
      <div className='flex h-full flex-col justify-between bg-primary px-6 py-8'>
        <h1 className='z-10 text-xl font-semibold text-white'>
          Jumlah Total Pelanggan
        </h1>
        <div className='z-10'>
          <h1 className='z-10 text-xl font-semibold text-white'>
            {totalPelanggan} <br /> pelanggan
          </h1>
        </div>
      </div>
      <div className='absolute left-20 top-0 h-[calc(100%+100px)] w-[calc(100%+100px)] rotate-[20deg] bg-[#0657C5]'></div>
    </div>
  )
}

export default TotalPelangganCard
