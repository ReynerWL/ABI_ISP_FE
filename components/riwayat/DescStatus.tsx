'use client'
import descText from '#/constant/descText'
import dayjs from 'dayjs'

interface props {
  text: string
  startDate?: string
  dueDate?: string
}

const Desc = ({ text, dueDate }: props) => {
  const lowerText = text?.toLowerCase().replace('-', '_')
  const dueDateFormated = dueDate ? dayjs(dueDate).format('DD/MM/YYYY') : ''

  const { desc } = descText[lowerText] || { desc: 'Terjadi kesalahan' }
  const value = desc.replace('{due_date}', dueDateFormated)

  return <p className={'text-xs font-medium italic text-slate-400'}>{value}</p>
}

export default Desc
