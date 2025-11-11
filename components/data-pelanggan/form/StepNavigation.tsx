import { Button } from 'antd'
import { FormInstance } from 'antd/es/form'
import React from 'react'

interface StepNavigationProps {
  form: FormInstance
  stepCurrent: number
  formContent: React.ReactNode[]
  stepFields: (string | number)[][]
  setStepCurrent: React.Dispatch<React.SetStateAction<number>>
  handleClose: () => void
}

const StepNavigation = ({
  form,
  stepCurrent,
  formContent,
  stepFields,
  handleClose,
  setStepCurrent
}: StepNavigationProps) => {
  const handleNext = async () => {
    try {
      await form.validateFields(stepFields[stepCurrent])
      if (stepCurrent === formContent.length - 1) {
        form.submit()
      } else {
        setStepCurrent(stepCurrent + 1)
      }
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo)
    }
  }

  const handlePrev = () => {
    if (stepCurrent === 0) {
      handleClose()
    } else {
      setStepCurrent(stepCurrent - 1)
    }
  }

  return (
    <div className='flex w-full gap-4 pt-2'>
      <Button
        className='!h-[44px] !w-full !border-slate-200 text-base !font-medium tracking-wide !text-slate-500 hover:!bg-slate-100'
        onClick={handlePrev}
      >
        {stepCurrent === 0 ? 'Cancel' : 'Previous'}
      </Button>
      <Button
        className='!h-[44px] !w-full text-base !font-medium tracking-wide !shadow-none'
        type='primary'
        onClick={handleNext}
      >
        {stepCurrent === formContent.length - 1 ? 'Save' : 'Next'}
      </Button>
    </div>
  )
}

export default StepNavigation
