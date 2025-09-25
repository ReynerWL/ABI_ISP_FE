'use client'

import { PackageInformation } from '#/repository/dashboard'
import { Pie, PieChart } from 'recharts'
import CustomLegend from '../reusable/CustomLegend'
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart'

interface PaketChartProps {
  data?: PackageInformation[]
  isLoading?: boolean
}

const colorPalette = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)'
]

function formatSpeed(speed: string) {
  const match = speed.match(/(\d+)([a-zA-Z]+)/) // contoh "10mbps"
  if (!match) return speed.toUpperCase()
  const [, num, unit] = match
  return `${num} ${unit.toUpperCase()}`
}

const PaketChart = ({
  data: packageInformations,
  isLoading
}: PaketChartProps) => {
  if (isLoading) {
    return (
      <div className='flex w-full flex-col rounded-2xl bg-white px-6 py-[26px] xl:max-w-[420px]'>
        <h1 className='text-lg font-bold text-slate-600'>Informasi Paket</h1>
        <div className='flex h-[350px] w-full items-center justify-center'>
          <p className='italic text-slate-400'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!packageInformations || packageInformations.length === 0) {
    return (
      <div className='flex w-full flex-col rounded-2xl bg-white px-6 py-[26px] xl:max-w-[420px]'>
        <h1 className='text-lg font-bold text-slate-600'>Informasi Paket</h1>
        <div className='flex h-[350px] w-full items-center justify-center'>
          <p className='italic text-slate-400'>Belum ada data paket</p>
        </div>
      </div>
    )
  }

  const data = packageInformations.map((item, idx) => ({
    name: formatSpeed(item.paketSpeed),
    value: Number(item.total),
    fill: colorPalette[idx % colorPalette.length]
  }))

  const chartConfig = data.reduce(
    (acc, cur) => {
      acc[cur.name] = { label: cur.name, color: cur.fill }
      return acc
    },
    {} as Record<string, { label: string; color: string }>
  )

  return (
    <div className='flex w-full flex-col rounded-2xl bg-white px-6 py-[26px] xl:max-w-[420px]'>
      <h1 className='text-lg font-bold text-slate-600'>Informasi Paket</h1>
      <ChartContainer
        config={chartConfig}
        className='flex h-[350px] w-full items-center xl:max-w-[420px]'
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
