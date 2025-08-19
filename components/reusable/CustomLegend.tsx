const CustomLegend = ({ payload }: any) => {
  return (
    <div className='flex w-full flex-wrap justify-center gap-4'>
      {payload?.map(
        (entry: { value: string; color: string }, index: number) => (
          <div key={index} className='flex items-center gap-1.5'>
            <span
              className='block h-3 w-3 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-sm font-medium text-slate-500'>
              {entry.value}
            </span>
          </div>
        )
      )}
    </div>
  )
}

export default CustomLegend
