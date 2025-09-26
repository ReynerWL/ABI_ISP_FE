import { DatePicker, Form, Input, Select } from 'antd'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineCalendar, HiOutlineEye, HiXMark } from 'react-icons/hi2'

const StepInformasi = ({
  isEditMode,
  alamat
}: {
  isEditMode: boolean
  alamat?: string
}) => {
  return (
    <>
      {isEditMode && (
        <Form.Item name={'customerId'} label='ID Pelanggan' preserve={true}>
          <Input disabled />
        </Form.Item>
      )}
      <Form.Item
        name={'tanggal_berlangganan'}
        label='Tanggal Berlangganan'
        validateDebounce={500}
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
              className='text-lg text-slate-400 transition duration-200'
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
      <Form.Item
        name={'name'}
        label='Nama Pelanggan'
        validateDebounce={500}
        preserve={true}
        rules={[{ required: true, message: 'Nama pelanggan wajib diisi' }]}
      >
        <Input placeholder='Masukkan nama pelanggan' />
      </Form.Item>
      <Form.Item
        name={'birth_date'}
        label='Tanggal lahir'
        validateDebounce={500}
        preserve={true}
        rules={[{ required: true, message: 'Tanggal lahir wajib diisi' }]}
      >
        <DatePicker
          placeholder='Masukkan Tanggal Lahir'
          format={'DD-MM-YYYY'}
          suffixIcon={
            <HiOutlineCalendar
              className='text-lg text-slate-400 transition duration-200'
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
      <Form.Item
        name={'email'}
        label='Email'
        validateDebounce={500}
        preserve={true}
        rules={[
          { required: true, message: 'Email wajib diisi', type: 'email' }
        ]}
      >
        <Input placeholder='Masukkan email' type='email' />
      </Form.Item>
      <Form.Item
        name={'phone_number'}
        label='No. Telp'
        validateDebounce={500}
        preserve={true}
        rules={[
          { required: true, message: 'Nomor Telpon wajib diisi' },
          { pattern: /^8\d{8,10}$/, message: 'Nomor Telpon tidak valid' }
        ]}
      >
        <div className='flex flex-col gap-2'>
          <div className='flex gap-3'>
            <div className='rounded-lg border border-slate-200 p-1 px-2 font-medium text-slate-500'>
              +62
            </div>
            <Input placeholder='8xxxxxxxxxx' autoComplete='off' />
          </div>
          <p className='m-0 text-xs font-medium italic text-slate-400'>
            *Pastikan nomor ponsel masih aktif.
          </p>
        </div>
      </Form.Item>
      <Form.Item
        name={'kelurahan'}
        label='Kelurahan'
        validateDebounce={500}
        preserve={true}
        rules={[{ required: true, message: 'Kelurahan wajib diisi' }]}
      >
        <Select
          options={[{ value: 'Babelan', label: 'Babelan' }]}
          placeholder='Pilih Kelurahan'
        />
      </Form.Item>
      <Form.Item
        name={'alamat'}
        label='Alamat'
        validateDebounce={500}
        preserve={true}
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
      {!isEditMode && (
        <Form.Item
          label='Password'
          name='password'
          validateDebounce={500}
          rules={[{ required: true, message: 'Password wajib diisi' }]}
        >
          <Input.Password
            placeholder='Masukkan password'
            type='password'
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
    </>
  )
}

export default StepInformasi
