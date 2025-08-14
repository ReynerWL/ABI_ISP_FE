import Title from '#/components/reusable/Title'
import { Segmented } from 'antd'

const DataPelanggan = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <Title>Data Pelanggan</Title>
        <Segmented
          options={['Semua', 'Baru', 'Lama']}
          shape='round'
          defaultValue='Semua'
        />
      </div>
      <div className='flex flex-col gap-6 rounded-2xl bg-white p-6'></div>
    </div>
  )
}

export default DataPelanggan
