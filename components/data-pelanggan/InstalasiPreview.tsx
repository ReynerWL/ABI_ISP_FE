import { Image, Skeleton, Upload, UploadFile, UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useEffect, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { toast } from 'sonner'

interface InstalasiPreviewProps {
  imageUrl?: string
  buktiPemasangan: string
  isLoading?: boolean
  handleUpload: (val: any) => void
}

const InstalasiPreview = ({
  imageUrl,
  buktiPemasangan,
  isLoading,
  handleUpload
}: InstalasiPreviewProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (buktiPemasangan) {
      setFileList([
        {
          uid: '-1',
          name: 'buktiPemasangan.png',
          status: 'done',
          url: buktiPemasangan
        }
      ])
    }
  }, [buktiPemasangan])

  const handleChange: UploadProps['onChange'] = async ({
    file,
    fileList: newFileList
  }) => {
    setFileList(newFileList)

    if (file.status === 'done') {
      const latestUpload = newFileList?.[0]?.originFileObj
      if (latestUpload) {
        await handleUpload(latestUpload)
      }
    }
  }

  const draggerProps: UploadProps = {
    name: 'buktiPemasangan',
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
      return true
    },
    onChange: handleChange
  }

  if (isLoading) {
    return <Skeleton.Image active className='!h-[200px] !w-full !rounded-lg' />
  }

  return (
    <>
      {imageUrl ? (
        <Image
          src='/dummy/router.jpg'
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
            <div className='flex flex-col items-center justify-center xl:py-4'>
              <AiFillCamera className='size-16 text-blue-200' />
              <h1 className='text-base font-semibold text-primary underline underline-offset-2'>
                Klik untuk unggah foto
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
