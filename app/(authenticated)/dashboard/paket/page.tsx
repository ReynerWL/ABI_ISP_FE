'use client'

import ModalPaket from '#/components/paket/ModalPaket'
import AlertDialog from '#/components/reusable/AlertDialog'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import colorPallete from '#/constant/enums/colorPallete'
import { useUser } from '#/context/UserContext'
import usePageTitle from '#/hooks/usePageTitle'
import { Paket, paketRepository } from '#/repository/paket'
import { formatSpeed } from '#/utils/formatter'
import { Button, Switch, TableProps } from 'antd'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import {
  HiMiniPencilSquare,
  HiOutlineExclamationCircle,
  HiOutlineTrash
} from 'react-icons/hi2'
import { toast } from 'sonner'

const SpeedPage = () => {
  usePageTitle('Data Speed')

  const searchParams = useSearchParams()
  const { user } = useUser()

  const search = searchParams?.get('search') || null
  const page = Number(searchParams?.get('page') || 1)
  const limit = Number(searchParams?.get('limit') || 10)
  const [openModal, setOpenModal] = useState(false)
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null)
  const [loadingStatusId, setLoadingStatusId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { data, isLoading, mutate } = paketRepository.hooks.useGetPaket({
    query: search,
    order: 'ASC',
    page,
    limit
  })

  const speeds: Paket[] = data?.data || []

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    try {
      setLoadingStatusId(id)

      if (newStatus) {
        // Aktifkan paket
        await paketRepository.api.paketActive(id)
      } else {
        // Nonaktifkan paket
        await paketRepository.api.paketInactive(id)
      }

      mutate()
      toast.success(
        `Status paket berhasil diperbarui menjadi ${newStatus ? 'Aktif' : 'Nonaktif'}`
      )
    } catch (err) {
      console.error('Gagal update status paket', err)
    } finally {
      setLoadingStatusId(null)
    }
  }

  const columns: TableProps['columns'] = [
    { title: 'Nama Paket', dataIndex: 'name', key: 'name' },
    {
      title: 'Speed',
      dataIndex: 'speed',
      key: 'speed',
      render: (speed: string) => formatSpeed(speed)
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `Rp ${price.toLocaleString('id-ID')}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        const isActive = record?.status === true
        return (
          <div
            className={
              'flex items-center gap-2 text-sm font-semibold text-slate-500'
            }
          >
            <span>Nonaktif</span>
            <Switch
              onChange={(val) => handleStatusChange(record?.id, val)}
              checked={isActive}
              loading={loadingStatusId === record.id}
              style={{
                backgroundColor: isActive
                  ? colorPallete.Green500
                  : colorPallete.Slate200
              }}
            />

            <span>Aktif</span>
          </div>
        )
      }
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, record) => (
        <div className='flex gap-2'>
          <Button
            className={
              user?.role.toLowerCase() === 'superadmin'
                ? '!rounded-lg !border-slate-100 !p-2 !font-semibold !text-secondary !shadow-none hover:!bg-slate-50'
                : '!hidden'
            }
            onClick={() => {
              setOpenModal(true)
              setSelectedPaket(record as Paket)
            }}
          >
            <HiMiniPencilSquare className='text-lg' />
            Edit
          </Button>
          <Button
            className={
              user?.role.toLowerCase() === 'superadmin'
                ? '!rounded-lg !border-slate-100 !p-2 !font-semibold !text-red-600 !shadow-none hover:!bg-red-50'
                : '!hidden'
            }
            onClick={() => {
              setShowDeleteConfirm(true)
              setSelectedPaket(record as Paket)
            }}
          >
            <HiOutlineTrash className='text-lg' />
            Hapus
          </Button>
        </div>
      )
    }
  ]

  const handleDelete = async () => {
    try {
      if (selectedPaket) {
        await paketRepository.api.deletePaket(selectedPaket.id)
        toast.success('Paket berhasil dihapus!')
        setSelectedPaket(null)
        setShowDeleteConfirm(false)
        mutate()
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus paket!')
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      {/* Title */}
      <div className='flex items-center justify-between'>
        <Title>Data Paket</Title>
      </div>

      {/* Content Wrapper */}
      <div className='flex flex-col gap-6 rounded-2xl bg-white p-4 md:p-6'>
        {/* Search */}
        <div className='flex gap-6'>
          <InputSearch />
          <Button
            className='!h-full !w-full !rounded-lg !px-4 !py-2 !text-base !font-medium !shadow-none md:!w-fit'
            type='primary'
            onClick={() => setOpenModal(true)}
          >
            <HiPlus className='text-xl' />
            Tambah
          </Button>
        </div>

        {/* Table */}
        <DataTable
          dataSource={speeds}
          columns={columns}
          isLoading={isLoading}
          page={page}
          limit={limit}
          totalData={speeds?.length || 0}
          totalPage={1}
        />

        <ModalPaket
          open={openModal}
          initialValues={selectedPaket}
          onClose={() => {
            setSelectedPaket(null)
            setOpenModal(false)
          }}
          mutate={mutate}
        />
      </div>
      <AlertDialog
        icon={HiOutlineExclamationCircle}
        open={showDeleteConfirm}
        title='Hapus Paket'
        description={`Apakah Anda yakin ingin menghapus paket ${selectedPaket?.name}?`}
        danger
        confirmText='Hapus'
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteConfirm(false)
          setSelectedPaket(null)
        }}
      />
    </div>
  )
}

export default SpeedPage
