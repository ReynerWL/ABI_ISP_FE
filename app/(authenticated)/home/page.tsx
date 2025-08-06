'use client'

import DataTable from '#/components/reusable/DataTable'
import { TableProps } from 'antd'

const Page = () => {
  const dataSource = [
    {
      key: '1',
      id: '1234567890',
      nama: 'John Doe',
      email: 'john.doe@me.com',
      no_telp: '08123456789',
      paket: '10 mbps',
      tanggal_berlangganan: '2025-01-01',
      status: 'Baru'
    }
  ]

  const columns: TableProps['columns'] = [
    { title: 'ID Pelanggan', dataIndex: 'id', key: 'id' },
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'No. Telp', dataIndex: 'no_telp', key: 'no_telp' },
    { title: 'Paket', dataIndex: 'paket', key: 'paket' },
    {
      title: 'Tanggal Berlangganan',
      dataIndex: 'tanggal_berlangganan',
      key: 'tanggal_berlangganan'
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Aksi', dataIndex: 'aksi', key: 'aksi' }
  ]

  return (
    <div className='p-4'>
      <DataTable dataSource={dataSource} columns={columns} limit={10} />
    </div>
  )
}

export default Page
