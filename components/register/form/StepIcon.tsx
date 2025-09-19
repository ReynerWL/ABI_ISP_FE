import { HiCheck } from 'react-icons/hi2'

interface StepIconProps {
  status: 'process' | 'finish' | 'wait'
}

const StepIcon = ({ status }: StepIconProps) => {
  if (status === 'finish') {
    return <FinishedIcon />
  }

  if (status === 'process') {
    return <ProcessIcon />
  }

  return <WaitIcon />
}

const FinishedIcon = () => {
  return (
    <div className='flex size-6 items-center justify-center rounded-full bg-primary'>
      <HiCheck className='m-auto text-base text-white' strokeWidth={1.8} />
    </div>
  )
}

const ProcessIcon = () => {
  return (
    <div className='size-6 rounded-full border-4 border-primary bg-blue-50' />
  )
}

const WaitIcon = () => {
  return (
    <div className='size-6 rounded-full border-4 border-slate-400 bg-slate-200' />
  )
}

export default StepIcon
