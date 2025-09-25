'use client'

interface TotalPelangganCardProps {
  totalPelanggan?: number
  isLoading?: boolean
}

const TotalPelangganCard = ({
  totalPelanggan = 0,
  isLoading: loading = false
}: TotalPelangganCardProps) => {
  return (
    <div className='relative w-full overflow-hidden rounded-2xl sm:max-w-[220px]'>
      <div className='flex h-full flex-col gap-6 bg-primary px-6 py-8 sm:justify-between'>
        <h1 className='z-10 text-xl font-semibold text-white'>
          Jumlah Total Pelanggan
        </h1>
        <div className='z-10'>
          <h1 className='z-10 text-xl font-semibold text-white'>
            {loading ? (
              <span className='animate-pulse'>Loading...</span>
            ) : (
              <>
                {totalPelanggan}
                <br /> pelanggan
              </>
            )}
          </h1>
        </div>
      </div>
      <div className='absolute left-[180px] top-0 h-[calc(100%+300px)] w-[calc(100%+300px)] rotate-[35deg] bg-[#0657C5] sm:left-20 sm:h-[calc(100%+100px)] sm:w-[calc(100%+100px)] sm:rotate-[20deg]'></div>
    </div>
  )
}

export default TotalPelangganCard
