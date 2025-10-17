import { generalRepository } from '#/repository/general'
import {
  Button,
  Form,
  FormInstance,
  Image,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { PiTrash } from 'react-icons/pi'
import { toast } from 'sonner'

interface UploadFieldProps {
  form: FormInstance
  name: string
  label?: string
  rules?: any[]
  maxSizeMB?: number
  accept?: string
  successMessage?: string
  requiredMessage?: string
}

const UploadField = ({
  form,
  name,
  label,
  rules = [],
  maxSizeMB = 15,
  accept = 'image/*',
  successMessage = 'File berhasil diunggah!',
  requiredMessage = 'File wajib diisi'
}: UploadFieldProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleUpload = async (file: any) => {
    const data = new FormData()
    data.append('file', file)
    data.append('type', name)

    const { body } = await generalRepository.api.uploadFile(data)

    form.setFieldsValue({ [name]: body?.data?.url })
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const draggerProps: UploadProps = {
    name,
    multiple: false,
    maxCount: 1,
    accept,
    fileList,
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`Ukuran file maksimal ${maxSizeMB}MB`)
        return Upload.LIST_IGNORE
      }
      return false
    },
    onChange: (info: UploadChangeParam<UploadFile>) => {
      const { file } = info
      handleChange(info)
      handleUpload(file)
      if (file.status !== 'done') {
        toast.success(successMessage)
      }
    }
  }

  const handleRemove = () => {
    form.setFieldsValue({ [name]: '' })
    setFileList([])
  }

  return (
    <Form.Item
      name={name}
      preserve={true}
      validateDebounce={1000}
      rules={[{ required: true, message: requiredMessage }, ...rules]}
    >
      <div>
        <Dragger
          {...draggerProps}
          className={'ktp-upload group'}
          style={{ display: fileList.length ? 'none' : 'block' }}
        >
          <AiFillCamera className='size-16 text-blue-200' />
          <h1 className='text-base font-semibold text-primary underline-offset-2 group-hover:underline'>
            Klik untuk ambil foto
          </h1>
        </Dragger>
        {fileList.length > 0 && (
          <div className='flex flex-col gap-4'>
            <Image
              src={
                fileList[0].url ||
                URL.createObjectURL(fileList[0].originFileObj as File)
              }
              alt={name}
              className='h-auto max-h-[300px] w-full max-w-full rounded-lg object-contain'
            />
            <Button
              onClick={handleRemove}
              className='!h-full !rounded-lg !border-slate-200 !py-2 !font-semibold !text-red-500 !shadow-none hover:!border-red-500 hover:!bg-red-100 hover:!text-red-500'
            >
              <PiTrash className='size-5' strokeWidth={3} />
              Hapus {label || 'file'}
            </Button>
          </div>
        )}
      </div>
    </Form.Item>
  )
}

export default UploadField
