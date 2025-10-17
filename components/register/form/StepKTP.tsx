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

interface StepKTPProps {
  form: FormInstance
}

const StepKTP = ({ form }: StepKTPProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleUpload = async (file: any) => {
    const data = new FormData()
    data.append('file', file)
    data.append('type', 'photo_ktp')

    const { body } = await generalRepository.api.uploadFile(data)

    form.setFieldsValue({ photo_ktp: body?.data?.url })
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const draggerProps: UploadProps = {
    name: 'photo_ktp',
    multiple: false,
    maxCount: 1,
    accept: 'image/*',
    fileList,
    showUploadList: false,
    beforeUpload: (file) => {
      if (file.size > 15 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 15MB')
        return Upload.LIST_IGNORE
      }
      return false
    },
    onChange: (info: UploadChangeParam<UploadFile>) => {
      const { file } = info
      handleChange(info)
      handleUpload(file)
      if (file.status !== 'done') {
        toast.success('Foto KTP berhasil diunggah!')
      }
    }
  }

  return (
    <Form.Item
      name={'photo_ktp'}
      preserve={true}
      validateDebounce={1000}
      rules={[{ required: true, message: 'KTP wajib diisi' }]}
    >
      <div>
        <Dragger
          {...draggerProps}
          className={'ktp-upload group'}
          style={{ display: fileList.length ? 'none' : 'block' }}
        >
          <div className='flex flex-col items-center py-[26px]'>
            <AiFillCamera className='size-16 text-blue-200' />
            <h1 className='text-base font-semibold text-primary underline-offset-2 group-hover:underline'>
              Klik untuk ambil foto
            </h1>
          </div>
        </Dragger>
        {fileList.length > 0 && (
          <div className='flex flex-col gap-4'>
            <Image
              src={
                fileList[0].url ||
                URL.createObjectURL(fileList[0].originFileObj as File)
              }
              alt={'ktp'}
              className='h-auto max-h-[300px] w-full max-w-full rounded-lg object-contain'
            />
            <Button
              onClick={() => {
                setFileList([])
                form.setFieldsValue({ photo_ktp: null })
              }}
              className='!h-full !rounded-lg !border-slate-200 !py-2 !font-semibold !text-red-500 !shadow-none hover:!border-red-500 hover:!bg-red-100 hover:!text-red-500'
            >
              <PiTrash className='size-5' strokeWidth={3} />
              Hapus foto
            </Button>
          </div>
        )}
      </div>
    </Form.Item>
  )
}

export default StepKTP
