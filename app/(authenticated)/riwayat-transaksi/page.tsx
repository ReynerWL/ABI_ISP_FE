'use client'

import BaseModal from '#/components/reusable/BaseModal'
import Chip from '#/components/reusable/Chip'
import DataTable from '#/components/reusable/DataTable'
import { EmptyImg } from '#/components/reusable/EmptyImg'
import Desc from '#/components/riwayat/DescStatus'
import { Heading } from '#/components/riwayat/Heading'
import usePageTitle from '#/hooks/usePageTitle'
import { formatRupiah } from '#/utils/formatter'
import { TokenUtil } from '#/utils/token'
import {
  Button,
  Form,
  Image,
  TableProps,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import Dragger from 'antd/es/upload/Dragger'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { HiChevronDoubleLeft } from 'react-icons/hi'
import {
  HiCheckCircle,
  HiDocumentMagnifyingGlass,
  HiPhoto
} from 'react-icons/hi2'
import { PiTrash } from 'react-icons/pi'
import { toast } from 'sonner'
import { MenuItem } from '../layout'
import InfoPelanggan, {
  DataPelanggan
} from '#/components/transaksi/InfoPelanggan'
import { transakasiRepository } from '#/repository/transaksi'
import { generalRepository } from '#/repository/general'

const listMenu: MenuItem[] = [
  {
    name: 'Transaksi',
    isActive: false,
    id: 'History_Transaksi',
    icon: <HiDocumentMagnifyingGlass className={'text-xl'} />
  }
]
const Detail = () => {
  TokenUtil.loadToken()
  usePageTitle('Detail')
  const router = useRouter()
  const [form] = useForm()
  const [activeSection, setActiveSection] = useState<MenuItem[]>(listMenu)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [buktiPembayaran, setBuktiPembayaran] = useState<string | null>(null)
  const [isloading, setIsLoading] = useState<boolean>(false)

  const { data, mutate, isLoading } =
    transakasiRepository.hooks.useGetAllTransaksiByUser({})

  const transaksiUser = data?.data?.[0]

  useEffect(() => {
    if (transaksiUser?.buktiPembayaran) {
      setFileList([
        {
          uid: '-1',
          name: 'buktiPembayaran.png',
          status: 'done',
          url: transaksiUser?.buktiPembayaran
        }
      ])
    }
  }, [transaksiUser?.buktiPembayaran])

  useEffect(() => {
    toast.dismiss()
    const handleScroll = () => {
      const scrollY = window.scrollY

      setActiveSection((prev) =>
        prev.map((item) => {
          const el = document.getElementById(item.id)
          if (el) {
            const offsetTop = el.offsetTop
            const offsetHeight = el.offsetHeight

            if (
              scrollY >= offsetTop - 150 &&
              scrollY < offsetTop + offsetHeight - 150
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

  const DataPelanggan: DataPelanggan | null = {
    idPelanggan: transaksiUser?.user?.customerId,
    alamat: transaksiUser?.user?.alamat,
    email: transaksiUser?.user?.email,
    kelurahan: transaksiUser?.user?.kelurahan,
    namaPelanggan: transaksiUser?.user?.name,
    noTelp: transaksiUser?.user?.phone_number,
    tanggalBerlangganan: transaksiUser?.user?.createdAt,
    tanggalLahir: transaksiUser?.user?.birth_date
  }

  const handleUpload = async (file: File) => {
    if (isloading) return
    setIsLoading(true)

    try {
      const data = new FormData()
      data.append('file', file)
      data.append('type', 'buktiPembayaran')

      const { body } = await generalRepository.api.uploadFile(data)

      const uploadURL = body?.data?.url

      setBuktiPembayaran(uploadURL)

      const { error } = await transakasiRepository.api.updateTransaksi(
        transaksiUser?.id,
        { buktiPembayaran: uploadURL }
      )
      if (!error) {
        toast.success('Bukti Pembayaran berhasil diunggah!')
        mutate()
      }
    } catch (error) {
      if (error) {
        toast.error('Terjadi kesalahan saat upload bukti pembayaran!')
      }
    } finally {
      setIsLoading(false)
    }
  }

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
      return true
    },
    onChange: handleChange
  }

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
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value) =>
        value ? dayjs(value).format('DD/MM/YYYY, HH:mm') : '-',
      sorter: (a, b) => dayjs(a?.updatedAt).unix() - dayjs(b?.updatedAt).unix()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Chip text={status} />
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
              setBuktiPembayaran(value)
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
    <div className='mt-10 flex h-screen w-full items-center justify-center bg-white px-4 md:bg-slate-50'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex h-full !w-fit flex-row gap-6 rounded-3xl bg-white p-6 sm:w-[770px] md:shadow-[4px_4px_48px_0px_#0068FF0D] xl:w-[940px]'
      >
        <div
          className={
            'h-fill flex w-64 flex-col items-center gap-3 border-r border-slate-200 p-6'
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
          <div className={'flex flex-col gap-2 px-2'}>
            <div
              className={
                'flex flex-row items-center gap-6 rounded-xl border border-slate-200 px-6 py-3'
              }
            >
              <Image
                src={transaksiUser?.paket?.photo ?? '/emptyImg.svg'}
                alt={'Paket'}
                preview={false}
                className={'!w-44'}
              />
              <div className={'flex w-full flex-col gap-1'}>
                <p className={'text-xs font-medium text-slate-500'}>
                  {transaksiUser?.paket?.name}
                </p>{' '}
                <p className={'text-base font-bold text-primary'}>
                  {formatRupiah(transaksiUser?.paket?.price ?? 0, {
                    withPrefix: true
                  })}
                  /Bulan
                </p>
              </div>
              <div className={'flex w-full justify-end'}>
                <Chip text={transaksiUser?.user?.status ?? ''} />
              </div>
            </div>
            <Desc
              text={transaksiUser?.status}
              dueDate={transaksiUser?.due_date}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Heading val={'Bukti Pembayaran'} />
            <p
              className={
                transaksiUser?.status.toLowerCase() === 'reject'
                  ? 'flex text-xs font-normal text-red-500'
                  : 'hidden'
              }
            >
              Bukti pembayaran Anda tidak valid atau tidak dapat diverifikasi,
              dengan alasan {transaksiUser?.reason}. Mohon unggah ulang bukti
              pembayaran yang sesuai.
            </p>
          </div>
          {transaksiUser?.status.toLowerCase() === 'confirm' ? (
            <div className='flex flex-col items-center justify-center gap-3 rounded-lg bg-blue-50 p-10 text-primary'>
              <HiCheckCircle className={'text-6xl'} />
              <h1 className='text-base font-semibold'>
                Pembayaran Anda telah kami verifikasi.
              </h1>
            </div>
          ) : (
            <Form
              requiredMark={false}
              layout='vertical'
              className='auth-form'
              form={form}
            >
              <Form.Item
                name={'buktiPembayaran'}
                preserve={true}
                validateDebounce={500}
                rules={[
                  { required: true, message: 'Bukti pembayaran wajib diisi' }
                ]}
                className={'!px-2'}
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
                        className='max-h-80 min-h-40 w-full max-w-full rounded-lg object-contain'
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
            </Form>
          )}
          <Heading val={'Data Pribadi'} />
          <div className={'rounded-lg bg-slate-50 p-6'}>
            <InfoPelanggan data={DataPelanggan} />
          </div>
          <Heading val={'History Transaksi'} />
          <DataTable
            id='History_Transaksi'
            dataSource={data?.data}
            columns={columns}
            limit={10}
            isLoading={isLoading}
            totalData={data?.total}
            className={'!-scroll-mt-28'}
          />
          <BaseModal
            title='Bukti Pembayaran'
            open={openModal}
            onClose={() => {
              setOpenModal(false)
              setBuktiPembayaran(null)
            }}
          >
            <div className='flex items-center justify-center'>
              {buktiPembayaran ? (
                <Image
                  src={buktiPembayaran}
                  alt='Bukti Pembayaran'
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
