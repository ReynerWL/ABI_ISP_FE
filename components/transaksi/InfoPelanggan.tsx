import { Skeleton } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

export interface DataPelanggan {
  idPelanggan: string
  tanggalBerlangganan: string
  tanggalLahir: string
  namaPelanggan: string
  email: string
  noTelp: string
  alamat: string
  kelurahan: string
}

interface Props {
  data: DataPelanggan
  isLoading?: boolean
}

const InfoPelanggan = ({ data, isLoading }: Props) => {
  const field = [
    { label: 'ID Pelanggan', value: data.idPelanggan, color: 'text-primary' },
    {
      label: 'Tanggal Berlangganan',
      value: dayjs(data.tanggalBerlangganan).format('DD MMMM YYYY')
    },
    { label: 'Nama', value: data.namaPelanggan },
    { label: 'Email', value: data.email },
    { label: 'No. Telp', value: data.noTelp },
    {
      label: 'Tanggal Lahir',
      value: dayjs(data.tanggalLahir).format('DD MMMM YYYY')
    },
    { label: 'Kelurahan', value: data.kelurahan },
    { label: 'Alamat', value: data.alamat }
  ]

  return (
    <div className='grid grid-cols-2 gap-y-3'>
      {field.map((val, index) => (
        <div
          key={index}
          className='col-span-2 flex flex-col gap-1 sm:col-span-1'
        >
          <p className='text-xs font-medium leading-[14px] text-slate-500'>
            {val.label}
          </p>
          <h3 className={`font-bold ${val.color && 'text-primary'}`}>
            {isLoading ? (
              <Skeleton.Node active style={{ width: 100, height: 21 }} />
            ) : (
              val.value
            )}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default InfoPelanggan
