import UploadField from '#/components/reusable/UploadField'
import { FormInstance } from 'antd'

interface StepKTPProps {
  form: FormInstance
}

const StepKTP = ({ form }: StepKTPProps) => {
  return (
    <UploadField
      form={form}
      name='photo_ktp'
      folder='KTP'
      label='Foto KTP'
      successMessage='Foto KTP berhasil diunggah!'
      requiredMessage='Foto KTP wajib diisi'
    />
  )
}

export default StepKTP
