'use client'

import { Pie, PieChart } from 'recharts'
import CustomLegend from '../reusable/CustomLegend'
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart'

const data = [
  { name: '10 Mbps', value: 400, fill: 'var(--chart-1)' },
  { name: '15 Mbps', value: 45, fill: 'var(--chart-2)' },
  { name: '20 Mbps', value: 35, fill: 'var(--chart-3)' },
  { name: '30 Mbps', value: 120, fill: 'var(--chart-4)' },
  { name: '40 Mbps', value: 200, fill: 'var(--chart-5)' }
]

const chartConfig = {
  '10 Mbps': { label: '10 Mbps', color: 'var(--chart-1)' },
  '15 Mbps': { label: '15 Mbps', color: 'var(--chart-2)' },
  '20 Mbps': { label: '20 Mbps', color: 'var(--chart-3)' },
  '30 Mbps': { label: '30 Mbps', color: 'var(--chart-4)' },
  '40 Mbps': { label: '40 Mbps', color: 'var(--chart-5)' }
}

const PaketChart = () => {
  return (
    <div className='flex w-full flex-col rounded-2xl bg-white px-6 py-[26px] xl:max-w-[420px]'>
      <h1 className='text-lg font-bold text-slate-600'>Informasi Paket</h1>
      <ChartContainer
        config={chartConfig}
        className='h-[350px] w-full xl:max-w-[420px]'
      >
        <PieChart width={400} height={350}>
          <Pie data={data} dataKey='value' nameKey='name' />
          <ChartTooltip
            content={<ChartTooltipContent className='bg-white' />}
          />
          <ChartLegend content={<CustomLegend payload={data} />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}

export default PaketChart
