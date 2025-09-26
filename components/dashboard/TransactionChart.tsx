'use client'

import { TransactionSummary } from '#/repository/dashboard'
import { formatRupiah } from '#/utils/formatter'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

const chartConfig = {
  value: { label: 'Total' },
  Jan: { label: 'January' },
  Feb: { label: 'February' },
  Mar: { label: 'March' },
  Apr: { label: 'April' },
  May: { label: 'May' },
  Jun: { label: 'June' },
  Jul: { label: 'July' },
  Aug: { label: 'August' },
  Sep: { label: 'September' },
  Oct: { label: 'October' },
  Nov: { label: 'November' },
  Dec: { label: 'December' }
}

interface TransactionChartProps {
  data?: TransactionSummary[]
  isLoading?: boolean
}

const ALL_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const TransactionChart = ({ data, isLoading }: TransactionChartProps) => {
  if (isLoading) {
    return (
      <div className='flex w-full flex-col gap-6 rounded-2xl bg-white px-6 py-[26px]'>
        <h1 className='text-lg font-bold text-slate-600'>Jumlah Transaksi</h1>
        <div className='flex h-[350px] w-full items-center justify-center'>
          <p className='italic text-slate-400'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex w-full flex-col gap-6 rounded-2xl bg-white px-6 py-[26px]'>
        <h1 className='text-lg font-bold text-slate-600'>Jumlah Transaksi</h1>
        <div className='flex h-[350px] w-full items-center justify-center'>
          <p className='italic text-slate-400'>Belum ada data transaksi</p>
        </div>
      </div>
    )
  }

  const dataMap = new Map(data.map((item) => [item.month, Number(item.total)]))

  const chartData = ALL_MONTHS.map((month) => ({
    month,
    value: dataMap.get(month) ?? 0
  }))

  return (
    <div className='no-scrollbar flex w-full flex-col gap-6 overflow-x-auto rounded-2xl bg-white px-6 py-[26px]'>
      <h1 className='text-lg font-bold text-slate-600'>Jumlah Transaksi</h1>
      <ChartContainer
        className='h-[350px] w-full min-w-[800px] md:min-w-[1024px]'
        config={chartConfig}
      >
        <BarChart data={chartData} barCategoryGap={10} width={400} height={350}>
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontWeight: 600 }}
            tickFormatter={(value) => formatRupiah(value)}
          />
          <ChartTooltip
            cursor={{ fill: 'var(--chart-1)', fillOpacity: 0.1, radius: 6 }}
            content={<ChartTooltipContent className='bg-white' />}
          />
          <Bar dataKey='value' fill='var(--chart-1)' radius={6} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default TransactionChart
