import { Button, Select, Table, TableProps } from 'antd'
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
}

const DataTable = ({
  dataSource,
  columns,
  page = 1,
  limit = 10,
  totalPage = 1,
  totalData = 0
}: DataTableProps) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className='data-table'
      pagination={false}
      footer={() => (
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-2 font-semibold text-slate-400'>
            <p>Tampilkan</p>
            <Select
              options={[
                { value: 10, label: '10 / halaman' },
                { value: 25, label: '25 / halaman' },
                { value: 50, label: '50 / halaman' }
              ]}
              defaultValue={limit}
              className='page-limit-select'
              suffixIcon={
                <HiOutlineChevronDown className='text-lg' strokeWidth={2.5} />
              }
            />
            <p>dari {totalData} data</p>
          </div>
          <div className='flex items-center gap-6'>
            <Button
              color='default'
              variant='filled'
              className='!h-fit !w-fit !rounded-full border-none !bg-slate-100 !px-4 !py-[7px] !font-semibold !text-slate-400 hover:!bg-slate-200 disabled:!border-0 disabled:!bg-slate-50 disabled:!text-slate-300'
              iconPosition='start'
              icon={<HiOutlineChevronLeft strokeWidth={3} />}
              disabled={page === 1}
            >
              Kembali
            </Button>
            <Button
              color='orange'
              variant='filled'
              className='!h-fit !w-fit !rounded-full !border-none !bg-[#FFF7ED] !px-4 !py-[7px] !font-semibold !text-[#F59E0B] hover:!bg-orange-100 disabled:!bg-orange-50 disabled:!text-orange-300'
              iconPosition='end'
              icon={<HiOutlineChevronRight strokeWidth={3} />}
              disabled={page === totalPage}
            >
              Lanjut
            </Button>
          </div>
        </div>
      )}
    />
  )
}

export default DataTable
