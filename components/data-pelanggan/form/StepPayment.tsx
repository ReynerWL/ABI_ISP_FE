import UploadField from '#/components/reusable/UploadField'
import { Bank, bankRepository } from '#/repository/bank'
import { Form, FormInstance, Segmented, Skeleton } from 'antd'

interface StepPaymentProps {
  form: FormInstance
}

const StepPayment = ({ form }: StepPaymentProps) => {
  const { data, isLoading } = bankRepository.hooks.useGetBanks()
  const bankOptions = data?.data?.map((bank: Bank) => ({
    label: bank.bank_name,
    value: bank.id
  }))

  const handleChange = (value: string) => {
    form.setFieldsValue({ banksId: value })
  }

  return (
    <>
      <Form.Item name={'banksId'} validateDebounce={500}>
        {isLoading ? (
          <Skeleton.Button className='!h-[44px] !w-full !rounded-lg' active />
        ) : (
          <Segmented options={bankOptions} onChange={handleChange} />
        )}
      </Form.Item>
      <UploadField
        form={form}
        name='bukti_pembayaran'
        label='Bukti Pembayaran'
        requiredMessage='Bukti Pembayaran wajib diisi'
        successMessage='Bukti Pembayaran berhasil diunggah!'
      />
    </>
  )
}

export default StepPayment
