'use client'

import BaseModal from '#/components/reusable/BaseModal'
import DataTable from '#/components/reusable/DataTable'
import InputSearch from '#/components/reusable/InputSearch'
import Title from '#/components/reusable/Title'
import WAButton from '#/components/reusable/WAButton'
import colorPallete from '#/constant/enums/colorPallete'
import usePageTitle from '#/hooks/usePageTitle'
import { User, userRepository } from '#/repository/user'
import { Button, Form, Input, Switch, TableProps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineEye, HiPlus } from 'react-icons/hi2'
import { toast } from 'sonner'

const ManajemenAdmin = () => {
  usePageTitle('Manajemen Admin')
  const searchParams = useSearchParams()
  const search = searchParams?.get('search') || null
  const page = searchParams?.get('page') || 1
  const limit = searchParams?.get('limit') || 10
  const [form] = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data, isLoading, mutate } = userRepository.hooks.useGetUser({
    search,
    role: 'Admin',
    page: Number(page),
    limit: Number(limit)
  })

  const users: User[] = data?.data

  const handleFinish = async (values: any) => {
    if (loading) return

    try {
      setLoading(true)

      const data = {
        email: values.email,
        name: values.name,
        phone_number: values.phone_number,
        password: values.password,
        status: 'Aktif'
      }

      const { error } = await userRepository.api.createAdmin(data)

      if (!error) {
        toast.success('Berhasil menambahkan data admin!')

        setOpen(false)
        mutate()
      }
    } catch (error: any) {
      const message = error?.response?.body?.message

      console.log(message)

      if (message) {
        toast.error(message)
        return
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = async (id: string, currentStatus: boolean) => {
    try {
      await userRepository.api.updateStatus(id)
      mutate()
      toast.success(
        `Status pengguna berhasil diperbarui menjadi ${currentStatus ? 'Aktif' : 'Nonaktif'}`
      )
    } catch (error) {
      toast.error('Gagal memperbarui status pengguna')
      console.log(error)
    }
  }

  const handleClose = () => {
    form.resetFields()
    setOpen(!open)
  }

  const columns: TableProps['columns'] = [
    { title: 'Nama', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'No. Telp',
      dataIndex: 'phone_number',
      key: 'phone_number',
      render: (text) => <WAButton phoneNumber={text} className={'!w-48'} />
    },
    {
      title: 'Terakhir Login',
      dataIndex: 'last_login',
      key: 'last_login',
      render: (text) => (text ? dayjs(text).format('DD/MM/YYYY') : '-')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        const isActive = record?.status === 'Aktif'
        return (
          <div
            className={
              'flex items-center gap-2 text-sm font-semibold text-slate-500'
            }
          >
            <span>Nonaktif</span>
            <Switch
              onChange={(val) => handleChange(record?.id, val)}
              checked={isActive}
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
    }
  ]

  return (
    <div className='flex flex-col gap-8'>
      <Title>Manajemen Admin</Title>
      <div className='flex flex-col gap-6 text-nowrap rounded-2xl bg-white p-4 md:p-6'>
        <div className='grid h-fit grid-cols-10 gap-4 lg:gap-6 xl:flex xl:h-11 xl:flex-row'>
          <InputSearch className={'!col-span-8'} />
          <Button
            className='!h-full !w-full !rounded-lg !px-4 !py-2 !text-base !font-medium !shadow-none md:!w-fit'
            type='primary'
            onClick={() => setOpen(true)}
          >
            <HiPlus className='text-xl' />
            Tambah
          </Button>
        </div>
        <DataTable
          dataSource={users}
          columns={columns}
          page={data?.pagination?.page}
          limit={data?.pagination?.limit}
          totalData={data?.pagination?.total}
          totalPage={data?.pagination?.totalPages}
          isLoading={isLoading}
        />
        <BaseModal
          open={open}
          title='Tambah Data'
          onClose={handleClose}
          titleBorder={false}
        >
          <Form
            form={form}
            layout='vertical'
            requiredMark={false}
            onFinish={handleFinish}
          >
            <Form.Item
              name={'name'}
              label='Nama'
              validateDebounce={1000}
              preserve={true}
              rules={[{ required: true, message: 'Nama wajib diisi' }]}
            >
              <Input placeholder='Masukkan nama' />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name={'email'}
              label='Email'
              validateDebounce={1000}
              preserve={true}
              rules={[
                { required: true, message: 'Email wajib diisi', type: 'email' }
              ]}
            >
              <Input placeholder='Masukkan email' type='email' />
            </Form.Item>

            {/* Nomor Telepon */}
            <Form.Item label='No. Telp' validateDebounce={1000} preserve={true}>
              <div className='flex flex-col gap-2'>
                <div className='flex gap-3'>
                  <div className='rounded-lg border border-slate-200 px-2.5 py-1.5 font-semibold text-slate-500'>
                    +62
                  </div>
                  <Form.Item
                    noStyle
                    name='phone_number'
                    validateDebounce={1000}
                    rules={[
                      { required: true, message: 'Nomor Telpon wajib diisi' },
                      {
                        pattern: /^8\d{8,10}$/,
                        message: 'Nomor Telpon tidak valid'
                      }
                    ]}
                  >
                    <Input placeholder='8xxxxxxxxxx' autoComplete='off' />
                  </Form.Item>
                </div>
                <p
                  className={
                    'm-0 text-[10px] font-medium italic text-slate-400'
                  }
                >
                  *Pastikan nomor ponsel masih aktif.
                </p>
              </div>
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              validateDebounce={1000}
              rules={[{ required: true, message: 'Password wajib diisi' }]}
            >
              <Input.Password
                placeholder='Masukkan password'
                iconRender={(visible) =>
                  visible ? (
                    <HiOutlineEye
                      style={{
                        fontSize: '18px',
                        color: '#94A3B8',
                        strokeWidth: 2.2,
                        cursor: 'pointer'
                      }}
                    />
                  ) : (
                    <HiOutlineEyeOff
                      style={{
                        fontSize: '18px',
                        color: '#94A3B8',
                        strokeWidth: 2.2,
                        cursor: 'pointer'
                      }}
                    />
                  )
                }
              />
            </Form.Item>
            <div className='flex w-full gap-4 pt-2'>
              <Button
                className='!h-[44px] !w-full !border-slate-200 text-base !font-medium tracking-wide !text-slate-500 hover:!bg-slate-100'
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className='!h-[44px] !w-full text-base !font-medium tracking-wide !shadow-none'
                type='primary'
                htmlType='submit'
                loading={loading}
              >
                Save
              </Button>
            </div>
          </Form>
        </BaseModal>
      </div>
    </div>
  )
}

export default ManajemenAdmin
