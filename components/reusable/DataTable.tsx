import { Button, Select, Table, TableProps } from 'antd'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from 'react-icons/hi2'

interface DataTableProps {
  dataSource: TableProps['dataSource']
  columns: TableProps['columns']
  page?: number
  limit?: number
  totalPage?: number
  totalData?: number
  isLoading?: boolean
  setSort?: (value: string | null) => void
}

const DataTable = ({
  dataSource,
  columns,
  page = 1,
  limit = 10,
  totalPage = 1,
  totalData = 0,
  isLoading = false,
  setSort
}: DataTableProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set('page', newPage.toString())
    router.push(`?${params.toString()}`)
  }

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set('limit', newLimit.toString())
    params.set('page', '1') // Reset to first page when changing limit
    router.push(`?${params.toString()}`)
  }

  const handlePrevPage = () => {
    if (page > 1) {
      handlePageChange(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPage) {
      handlePageChange(page + 1)
    }
  }

  return (
    <Table
      dataSource={dataSource}
      loading={{ spinning: isLoading, size: 'large' }}
      columns={columns}
      className='data-table custom-scrollbar'
      pagination={false}
      rowHoverable={false}
      scroll={{ x: 'max-content' }}
      rowKey={'id'}
      locale={{
        emptyText: !isLoading && (
          <div className='flex w-full flex-col items-center justify-center py-10'>
            <Image
              src={'/empty-data.svg'}
              width={240}
              height={240}
              alt={'empty'}
              className='h-auto w-36 sm:w-40 md:w-48'
            />
            <h1 className='text-base font-bold'>Data tidak ditemukan</h1>
            <p className='font-normal text-slate-400'>
              Tidak ada data yang dapat ditampilkan saat ini
            </p>
          </div>
        )
      }}
      footer={() => (
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-2 font-semibold text-slate-400'>
            <p className='hidden md:block'>Tampilkan</p>
            <Select
              options={[
                { value: 10, label: '10 / halaman' },
                { value: 25, label: '25 / halaman' },
                { value: 50, label: '50 / halaman' }
              ]}
              value={Number(limit)}
              className='page-limit-select'
              suffixIcon={
                <HiOutlineChevronDown className='text-lg' strokeWidth={2.5} />
              }
              onChange={handleLimitChange}
            />
            <p className='hidden md:block'>dari {totalData} data</p>
          </div>
          <div className='flex items-center gap-2 md:gap-4'>
            <Button
              color='default'
              variant='filled'
              className='!h-fit !w-fit !rounded-full border-none !bg-slate-100 !py-[7px] !font-semibold !text-slate-500 hover:!bg-slate-200 disabled:!border-0 disabled:!bg-slate-50 disabled:!text-slate-300 sm:!px-4'
              iconPosition='start'
              icon={
                <HiOutlineChevronLeft strokeWidth={3} className='text-base' />
              }
              disabled={page === 1}
              onClick={handlePrevPage}
            >
              <span className='hidden sm:block'>Kembali</span>
            </Button>
            <Button
              variant='filled'
              className='!h-fit !w-fit !rounded-full !border-none !bg-blue-50 !py-[7px] !font-semibold !text-primary hover:!bg-blue-100 disabled:!bg-blue-50 disabled:!text-blue-300 sm:!px-4'
              iconPosition='end'
              icon={
                <HiOutlineChevronRight strokeWidth={3} className='text-base' />
              }
              disabled={page === totalPage}
              onClick={handleNextPage}
            >
              <span className='hidden sm:block'>Lanjut</span>
            </Button>
          </div>
        </div>
      )}
      onChange={(_, filters, sorter) => {
        const params = new URLSearchParams(searchParams?.toString())

        // Clear old sort params (only for known sortable columns)
        if (columns) {
          columns.forEach((col) => {
            if (col.key) params.delete(col.key.toString())
          })
        }

        // Handle multi or single sort
        if (Array.isArray(sorter)) {
          sorter.forEach((s) => {
            if (s.order && s.columnKey) {
              params.set(
                s.columnKey.toString(),
                s.order === 'ascend' ? 'asc' : 'desc'
              )
            }
          })
        } else if (sorter && sorter.order && sorter.columnKey) {
          params.set(
            sorter.columnKey.toString(),
            sorter.order === 'ascend' ? 'asc' : 'desc'
          )
        }

        // Handle Paket Filter
        const paketFilter = filters.paket as string[] | null
        if (paketFilter && paketFilter.length > 0) {
          params.set('paket_speed', paketFilter.join(','))
        } else {
          params.delete('paket_speed')
        }

        router.push(`?${params.toString()}`)

        // Optional: trigger callback for sorting changes
        if (setSort) {
          const sortEntries: Record<string, string> = {}
          params.forEach((value, key) => {
            if (['asc', 'desc'].includes(value)) {
              sortEntries[key] = value
            }
          })
          setSort(JSON.stringify(sortEntries))
        }
      }}
    />
  )
}

export default DataTable
