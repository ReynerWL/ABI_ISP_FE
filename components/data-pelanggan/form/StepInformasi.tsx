'use client'

import { generalRepository, Kelurahan } from '#/repository/general'
import { DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'
import { HiOutlineEyeOff } from 'react-icons/hi'
import {
  HiChevronDown,
  HiOutlineCalendar,
  HiOutlineEye,
  HiXMark
} from 'react-icons/hi2'

const StepInformasi = ({
  isEditMode,
  alamat
}: {
  isEditMode: boolean
  alamat?: string
}) => {
  const { data, isLoading } = generalRepository.hooks.useGetKelurahanBabelan()

  const kelurahanOptions = data?.map((kelurahan: Kelurahan) => ({
    value: kelurahan.name,
    label: <p className='font-semibold text-slate-500'>{kelurahan.name}</p>
  }))

  return (
    <>
      <div className='grid grid-cols-1 gap-x-4 gap-y-0 md:grid-cols-2'>
        {isEditMode && (
          <Form.Item
            name={'customerId'}
            label='ID Pelanggan'
            preserve={true}
            className='col-span-1 md:col-span-2'
          >
            <Input disabled />
          </Form.Item>
        )}

        {/* Nama Pelanggan */}
        <Form.Item
          name={'name'}
          label='Nama Pelanggan'
          validateDebounce={1000}
          preserve={true}
          rules={[{ required: true, message: 'Nama pelanggan wajib diisi' }]}
        >
          <Input placeholder='Masukkan nama pelanggan' />
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
            <p className='m-0 text-[10px] font-medium italic text-slate-400'>
              *Pastikan nomor ponsel masih aktif.
            </p>
          </div>
        </Form.Item>

        {/* Tanggal Lahir */}
        <Form.Item
          name={'birth_date'}
          label='Tanggal Lahir'
          validateDebounce={1000}
          preserve={true}
          rules={[{ required: true, message: 'Tanggal lahir wajib diisi' }]}
        >
          <DatePicker
            placeholder='Masukkan Tanggal Lahir'
            format={'DD-MM-YYYY'}
            maxDate={dayjs()}
            suffixIcon={
              <HiOutlineCalendar
                className='text-lg text-slate-400'
                strokeWidth={1.8}
              />
            }
            allowClear={{
              clearIcon: (
                <HiXMark
                  className='size-[18px] text-slate-400 transition duration-200 hover:brightness-50'
                  strokeWidth={0.4}
                />
              )
            }}
          />
        </Form.Item>

        {/* Password (only if not edit mode) */}
        {!isEditMode && (
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
        )}

        {/* Tanggal Berlangganan */}
        <Form.Item
          name={'tanggal_berlangganan'}
          label='Tanggal Berlangganan'
          validateDebounce={1000}
          preserve={true}
          rules={[
            { required: true, message: 'Tanggal berlangganan wajib diisi' }
          ]}
        >
          <DatePicker
            placeholder='Masukkan Tanggal Berlangganan'
            format={'DD-MM-YYYY'}
            suffixIcon={
              <HiOutlineCalendar
                className='text-lg text-slate-400'
                strokeWidth={1.8}
              />
            }
            allowClear={{
              clearIcon: (
                <HiXMark
                  className='size-[18px] text-slate-400 transition duration-200 hover:brightness-50'
                  strokeWidth={0.4}
                />
              )
            }}
          />
        </Form.Item>

        {/* Kelurahan */}
        <Form.Item
          name={'kelurahan'}
          label='Kelurahan'
          validateDebounce={1000}
          preserve={true}
          className='col-span-1 md:col-span-2'
          rules={[{ required: true, message: 'Kelurahan wajib diisi' }]}
        >
          <Select
            loading={isLoading}
            options={kelurahanOptions}
            placeholder='Pilih Kelurahan'
            showSearch
            allowClear={{
              clearIcon: (
                <HiXMark
                  className='size-5 bg-white text-slate-400 transition duration-200 hover:text-slate-500'
                  strokeWidth={0.5}
                />
              )
            }}
            suffixIcon={
              <HiChevronDown
                className='text-slate-300'
                size={20}
                strokeWidth={1}
              />
            }
          />
        </Form.Item>

        {/* Alamat (full width) */}
        <Form.Item
          name={'alamat'}
          label='Alamat'
          validateDebounce={1000}
          preserve={true}
          className='col-span-1 md:col-span-2'
          rules={[{ required: true, message: 'Alamat wajib diisi' }]}
        >
          <div className='flex flex-col gap-2'>
            <Input.TextArea
              placeholder='Masukkan alamat'
              autoSize={{ minRows: 3, maxRows: 5 }}
              value={alamat}
            />
            <p className='m-0 text-[10px] italic text-slate-400'>
              * Mohon pastikan alamat yang Anda masukkan berada di wilayah
              Babelan.
            </p>
          </div>
        </Form.Item>
      </div>
    </>
  )
}

export default StepInformasi
