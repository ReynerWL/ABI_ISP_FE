import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

const data = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 44 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 51 },
  { month: 'Jun', value: 10 },
  { month: 'Jul', value: 5 },
  { month: 'Aug', value: 10 },
  { month: 'Sep', value: 15 },
  { month: 'Oct', value: 20 },
  { month: 'Nov', value: 25 },
  { month: 'Dec', value: 30 }
]

const chartConfig = {
  value: { label: 'Pelanggan' },
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

const PelangganChart = () => {
  return (
    <div className='no-scrollbar flex w-full flex-col gap-6 overflow-x-auto rounded-2xl bg-white px-6 py-[26px]'>
      <h1 className='text-lg font-bold text-slate-600'>Jumlah Pelanggan</h1>
      <ChartContainer
        className='h-[350px] w-full min-w-[1024px]'
        config={chartConfig}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            barCategoryGap={10}
            margin={{ left: -28 }}
            width={400}
            height={350}
          >
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontWeight: 600 }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--chart-1)', fillOpacity: 0.1, radius: 6 }}
              content={<ChartTooltipContent className='bg-white' />}
            />
            <Bar dataKey='value' fill='var(--chart-1)' radius={6} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

export default PelangganChart
