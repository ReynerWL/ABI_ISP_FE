const CustomLegend = ({ payload }: any) => {
  return (
    <div className='flex w-full flex-wrap justify-center gap-1.5'>
      {payload?.map(
        (entry: { value: string; color: string }, index: number) => (
          <div key={index} className='flex items-center gap-1.5'>
            <span
              className='block h-2 w-2 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-[12px] font-medium text-slate-500'>
              {entry.value}
            </span>
          </div>
        )
      )}
    </div>
  )
}

export default CustomLegend
