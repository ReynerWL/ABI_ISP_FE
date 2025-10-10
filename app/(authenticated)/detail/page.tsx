'use client'

import usePageTitle from '#/hooks/usePageTitle'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MenuItem } from '../layout'
import { HiDocumentMagnifyingGlass, HiPhoto, HiServer } from 'react-icons/hi2'
import { Button, Form, TableProps, Upload, UploadFile, UploadProps } from 'antd'
import { HiChevronDoubleLeft } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import { Heading } from '#/components/detail/Heading'
import Image from 'next/image'
import { formatRupiah } from '#/utils/formatter'
import Chip from '#/components/reusable/Chip'
import { DetailUser, ListPayment, userRepository } from '#/repository/user'
import Dragger from 'antd/es/upload/Dragger'
import { AiFillCamera } from 'react-icons/ai'
import { PiTrash } from 'react-icons/pi'
import { toast } from 'sonner'
import { UploadChangeParam } from 'antd/es/upload'
import { useForm } from 'antd/es/form/Form'
import StepInformasi from '#/components/data-pelanggan/form/StepInformasi'
import dayjs from 'dayjs'
import DataTable from '#/components/reusable/DataTable'
import Desc from '#/components/detail/DescStatus'
import BaseModal from '#/components/reusable/BaseModal'
import { EmptyImg } from '#/components/reusable/EmptyImg'

const listMenu: MenuItem[] = [
  {
    name: 'Informasi Paket',
    isActive: true,
    id: 'Informasi_Paket',
    icon: <HiServer className={'text-xl'} />
  },
  {
    name: 'Transaksi',
    isActive: false,
    id: 'History_Transaksi',
    icon: <HiDocumentMagnifyingGlass className={'text-xl'} />
  }
]

// interface Props {
//   params: { id: string }
// }

const Detail = () => {
  usePageTitle('Detail')
  // const userId = params.id;
  const router = useRouter()
  const [form] = useForm()
  const [activeSection, setActiveSection] = useState<MenuItem[]>(listMenu)
  const [initialValues, setInitialValues] = useState<DetailUser | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { data: detailUser, isLoading } =
    userRepository.hooks.useGetDetailUser()

  const PaymentsUser: ListPayment[] = detailUser?.data.payments.data

  useEffect(() => {
    if (detailUser !== undefined) {
      setFormFieldsValue()
      setInitialValues(detailUser)
    }
  }, [detailUser])

  const setFormFieldsValue = () => {
    const { data } = detailUser ?? {}

    form.setFieldsValue({
      alamat: data?.alamat,
      birth_date: dayjs(data?.birth_date),
      customerId: data?.customerId,
      email: data?.email,
      kelurahan: data?.kelurahan,
      name: data?.name,
      phone_number: data?.phone_number,
      tanggal_berlangganan: dayjs(data?.createdAt)
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      setActiveSection((prev) =>
        prev.map((item) => {
          const el = document.getElementById(item.id)
          if (el) {
            const offsetTop = el.offsetTop
            const offsetHeight = el.offsetHeight

            if (
              scrollY >= offsetTop - 100 &&
              scrollY < offsetTop + offsetHeight - 100
            ) {
              return { ...item, isActive: true }
            }
          }
          return { ...item, isActive: false }
        })
      )
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUpload = (file: UploadFile) => {
    form.setFieldsValue({ buktiPembayaran: file })
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const draggerProps: UploadProps = {
    name: 'buktiPembayaran',
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
        toast.success('Bukti Pembayaran berhasil diunggah!')
      }
    }
  }

  // const handleFinish = async (values: any) => {
  //   if (loading) return

  //   try {
  //     setLoading(true)

  //     const data = {
  //       email: values.email,
  //       name: values.name,
  //       phone_number: values.phone_number,
  //       birth_date: values.birth_date,
  //       password: values.password,
  //       provinsi: 'Jawa Barat',
  //       kota: 'Kabupaten Bekasi',
  //       kecamatan: 'Babelan',
  //       kelurahan: values.kelurahan,
  //       alamat: values.alamat,
  //       photo_ktp: values.photo_ktp,
  //       payment: {
  //         paketsId: values.paket,
  //         banksId: values.banksId,
  //         buktiPembayaran: values.bukti_pembayaran
  //       }
  //     }

  //     // const { error } = await userRepository.api.updateUser('',data)

  //     // if (!error) {
  //     //   toast.success('Berhasil menambahkan data pelanggan!', { duration: 800 })

  //     //   onClose()
  //     //   mutate()
  //     // }
  //   } catch (error: any) {
  //     const message = error?.response?.body?.message

  //     console.log(message)

  //     if (message) {
  //       toast.error(message)
  //       return
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const columns: TableProps['columns'] = [
    {
      title: 'Bulan Penagihan',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => (value ? dayjs(value).format('MMMM') : '-')
    },
    {
      title: 'Jatuh Tempo',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (value) => (value ? dayjs(value).format('DD/MM/YYYY') : '-'),
      sorter: (a, b) => dayjs(a?.due_date).unix() - dayjs(b?.due_date).unix()
    },
    {
      title: 'Tanggal Bayar',
      dataIndex: 'confirmAt',
      key: 'confirmAt',
      render: (value) =>
        value ? dayjs(value).format('DD/MM/YYYY, HH:mm') : '-',
      sorter: (a, b) => dayjs(a?.confirmAt).unix() - dayjs(b?.confirmAt).unix()
    },
    {
      title: 'Bukti Pembayaran',
      dataIndex: 'buktiPembayaran',
      key: 'buktiPembayaran',
      render: (value) => (
        <div className='flex gap-2'>
          <Button
            className={
              '!rounded-lg !border-slate-100 !p-2 !font-semibold !text-primary !shadow-none hover:!bg-slate-50'
            }
            onClick={() => {
              setSelectedImage(value)
              setOpenModal(true)
            }}
          >
            <HiPhoto className='text-lg' />
            Lihat Foto
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className='mt-10 flex min-h-dvh w-full items-center justify-center bg-white px-4 md:bg-slate-50'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex h-lvh !w-fit flex-row gap-6 rounded-3xl bg-white p-6 sm:w-[770px] md:shadow-[4px_4px_48px_0px_#0068FF0D] xl:w-[940px]'
      >
        <div
          className={
            'flex h-fit w-64 flex-col items-center gap-3 border-r border-slate-200 p-6'
          }
        >
          <Button
            className={`!flex !w-full !flex-row !justify-start !gap-2 !rounded-lg !border-none !bg-blue-50 !p-6 !text-base !font-semibold !text-primary`}
            onClick={() => router.push('/beranda')}
          >
            <HiChevronDoubleLeft className={'text-xl'} />
            Beranda
          </Button>
          {activeSection.map((value, index) => (
            <div
              key={index}
              className={'flex w-full flex-row text-base font-medium'}
            >
              <Link
                href={`#${value.id}`}
                className={`${value.isActive ? 'text-secondary' : 'text-slate-400'} flex flex-row items-center gap-x-2 p-4 hover:text-secondary`}
              >
                {value.icon}
                <p>{value.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div
          className={
            'no-scrollbar flex h-auto w-[812px] flex-col gap-4 overflow-y-auto'
          }
        >
          <Heading val={'Informasi Paket'} />
          <div className={'flex flex-col gap-2'}>
            <div
              className={
                'flex flex-row items-center gap-6 rounded-xl border border-slate-200 px-6 py-3'
              }
            >
              <Image
                src={initialValues?.data?.paket?.photo ?? '/emptyImg.svg'}
                alt={'Paket'}
                width={64}
                height={64}
              />
              <div className={'flex w-full flex-col gap-1'}>
                <p className={'text-xs font-medium text-slate-500'}>
                  {initialValues?.data?.paket?.name}
                </p>{' '}
                <p className={'text-base font-bold text-primary'}>
                  {formatRupiah(initialValues?.data?.paket?.price ?? 0, {
                    withPrefix: true
                  })}
                  /Bulan
                </p>
              </div>
              <div className={'flex w-full justify-end'}>
                <Chip text={initialValues?.data.status ?? ''} />
              </div>
            </div>
            <Desc
              text={initialValues?.data.status ?? ''}
              dueDate={initialValues?.data.subscription.due_date}
            />
          </div>
          <Form
            requiredMark={false}
            layout='vertical'
            className='auth-form'
            form={form}
            // onFinish={handleFinish}
            initialValues={{
              provinsi: 'Jawa Barat',
              kota_kabupaten: 'Kabupaten Bekasi',
              kecamatan: 'Babelan'
            }}
          >
            <Form.Item
              label={'Upload Bukti Pembayaran'}
              name={'buktiPembayaran'}
              preserve={true}
              validateDebounce={500}
              rules={[
                { required: true, message: 'Bukti pembayaran wajib diisi' }
              ]}
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
                      alt={'bukti pembayaran'}
                      className='min-h-40 w-full max-w-full rounded-lg object-contain'
                    />
                    <Button
                      onClick={() => {
                        setFileList([])
                        form.setFieldsValue({ buktiPembayaran: null })
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
            <Heading val={'Data Pribadi'} className={'mb-4'} />
            <StepInformasi
              key={0}
              isEditMode
              alamat={initialValues?.data?.alamat}
              isDetailMode
            />
          </Form>
          <Heading val={'History Transaksi'} />
          <DataTable
            dataSource={PaymentsUser}
            columns={columns}
            limit={10}
            isLoading={isLoading}
            totalData={detailUser?.data.payments.count}
          />
          <BaseModal
            title='Bukti Pembayaran'
            open={openModal}
            onClose={() => {
              setOpenModal(false)
              setSelectedImage(null)
            }}
          >
            <div className='flex items-center justify-center'>
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt='Bukti Pembayaran'
                  width={472}
                  height={472}
                  className='rounded-lg object-contain'
                />
              ) : (
                <EmptyImg />
              )}
            </div>
          </BaseModal>
        </div>
      </motion.div>
    </div>
  )
}

export default Detail
