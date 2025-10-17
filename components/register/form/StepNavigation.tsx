import { Button } from 'antd'
import { FormInstance } from 'antd/es/form'
import { useRouter } from 'next/navigation'
import React from 'react'

interface StepNavigationProps {
  form: FormInstance
  stepCurrent: number
  formContent: React.ReactNode[]
  stepFields: (string | number)[][]
  loading?: boolean
  setStepCurrent: React.Dispatch<React.SetStateAction<number>>
}

const StepNavigation = ({
  form,
  stepCurrent,
  formContent,
  stepFields,
  loading,
  setStepCurrent
}: StepNavigationProps) => {
  const router = useRouter()
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
    if (stepCurrent > 0) {
      setStepCurrent(stepCurrent - 1)
    }
    if (stepCurrent === 0) {
      router.push('/beranda')
    }
  }

  return (
    <div className='flex w-full justify-between gap-6'>
      <Button
        className='!mt-9 !h-fit !w-full !rounded-full !bg-slate-50 !py-3 !text-sm !font-semibold !text-slate-500 !shadow-none hover:!bg-slate-100 sm:!w-fit sm:!px-16'
        type='primary'
        onClick={handlePrev}
      >
        {stepCurrent === 0 ? 'Beranda' : 'Kembali'}
      </Button>
      <Button
        className='!mt-9 !h-fit !w-full !rounded-full !bg-secondary !py-3 !text-sm !font-semibold !shadow-none hover:!bg-secondary/85 sm:!w-fit sm:!px-16'
        type='primary'
        onClick={handleNext}
        loading={loading}
      >
        {stepCurrent === formContent.length - 1 ? 'Submit' : 'Lanjut'}
      </Button>
    </div>
  )
}

export default StepNavigation
