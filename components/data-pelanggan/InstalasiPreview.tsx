import { Image, Upload, UploadFile, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { toast } from 'sonner'

interface InstalasiPreviewProps {
  imageUrl?: string
}

const InstalasiPreview = ({ imageUrl }: InstalasiPreviewProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const draggerProps: UploadProps = {
    name: 'photo_instalasi',
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
      if (file.status !== 'done') {
        toast.success('Foto Instalasi berhasil diunggah!')
      }
    }
  }

  return (
    <>
      {imageUrl ? (
        <Image
          src='/router.jpg'
          alt={'ktp'}
          className='h-auto max-h-[200px] w-full max-w-full rounded-xl object-cover'
        />
      ) : (
        <div>
          <Dragger
            {...draggerProps}
            className={'ktp-upload group'}
            style={{ display: fileList.length ? 'none' : 'block' }}
          >
            <AiFillCamera className='size-16 text-blue-200' />
            <h1 className='text-base font-semibold text-primary underline underline-offset-2'>
              Klik untuk unggah foto
            </h1>
          </Dragger>
          {fileList.length > 0 && (
            <div className='flex flex-col gap-4'>
              <Image
                src={
                  fileList[0].url ||
                  URL.createObjectURL(fileList[0].originFileObj as File)
                }
                alt={'ktp'}
                className='h-auto max-h-[200px] w-full max-w-full rounded-lg object-contain'
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default InstalasiPreview
