'use client'

import ExpandedRawData from '#/components/log/ExpandedRawData'
import MethodChip from '#/components/log/MethodChip'
import StatusChip from '#/components/log/StatusChip'
import DataTable from '#/components/reusable/DataTable'
import Title from '#/components/reusable/Title'
import { logRepository } from '#/repository/log'
import { TableProps } from 'antd'
import { useSearchParams } from 'next/navigation'

const LogPage = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams?.get('page')) || 1
  const limit = Number(searchParams?.get('limit')) || 10

  const { data, isLoading } = logRepository.hooks.useGetLog({ page, limit })

  const logs = data?.data || []

  const expandedRowRender = (record: any) => {
    return <ExpandedRawData data={record.data} />
  }

  const columns: TableProps['columns'] = [
    {
      title: 'Tanggal & Waktu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <div>{new Date(createdAt).toLocaleString()}</div>
      )
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (_, record: any) => <div>{record?.data?.user?.name || '-'}</div>
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      width: 300,
      render: (_, record: any) => (
        <div
          className='line-clamp-1 max-w-[300px]'
          title={record?.data?.url || ''}
        >
          {record?.data?.url || '-'}
        </div>
      )
    },
    {
      title: 'Method',
      key: 'method',
      render: (_, record) => <MethodChip method={record?.data?.method} />
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      render: (_, record: any) => <div>{record?.data?.ip || '-'}</div>
    },
    {
      title: 'Status Code',
      dataIndex: 'statusCode',
      key: 'statusCode',
      render: (_, record: any) => (
        <StatusChip status={record?.data?.statusCode} />
      )
    },
    {
      title: 'User Agent',
      dataIndex: 'userAgent',
      key: 'userAgent',
      width: 400,
      render: (_, record: any) => (
        <div
          className='line-clamp-1 max-w-[300px]'
          title={record?.data?.userAgent || ''}
        >
          {record?.data?.userAgent || '-'}
        </div>
      )
    }
  ]

  return (
    <div className='w-full'>
      <Title>Log Aktivitas</Title>

      <div className='mt-6 rounded-2xl bg-white p-4 md:p-6'>
        <DataTable
          columns={columns}
          dataSource={logs}
          isLoading={isLoading}
          page={page}
          limit={limit}
          totalData={data?.total || 0}
          totalPage={data?.totalPages || 1}
          // expandedRowRender={expandedRowRender} // Pass the expanded row render function
        />
      </div>
    </div>
  )
}

export default LogPage
