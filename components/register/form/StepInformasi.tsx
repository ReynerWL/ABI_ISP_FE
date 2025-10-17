import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineCalendar, HiOutlineEye, HiXMark } from 'react-icons/hi2'

const StepInformasi = () => {
  return (
    <>
      <Form.Item
        label='Email'
        name='email'
        validateDebounce={1000}
        rules={[
          { required: true, message: 'Email wajib diisi' },
          { type: 'email', message: 'Format email tidak valid' }
        ]}
      >
        <Input placeholder='Masukkan emailmu' type='email' autoComplete='off' />
      </Form.Item>
      <Form.Item
        label='Nomor Ponsel'
        name='phone_number'
        validateDebounce={1000}
        rules={[
          { required: true, message: 'Nomor Ponsel wajib diisi' },
          {
            pattern: /^8\d{8,11}$/,
            message: 'Silakan masukkan nomor ponsel yang valid'
          }
        ]}
      >
        <div className='flex flex-col gap-2'>
          <div className='flex gap-3'>
            <div className='rounded-lg border border-slate-200 p-2 px-3 font-medium text-slate-500'>
              +62
            </div>
            <Input placeholder='8xxxxxxxxxx' autoComplete='off' />
          </div>
          <p className='m-0 text-xs font-medium italic text-slate-400'>
            *Pastikan nomor ponsel Anda masih aktif.
          </p>
        </div>
      </Form.Item>
      <Form.Item
        label='Nama'
        name='name'
        validateDebounce={1000}
        rules={[{ required: true, message: 'Nama wajib diisi' }]}
      >
        <Input placeholder='Masukkan nama lengkapmu' autoComplete='off' />
      </Form.Item>
      <Form.Item
        label='Tanggal Lahir'
        name='birth_date'
        validateDebounce={1000}
        rules={[{ required: true, message: 'Tanggal lahir wajib diisi' }]}
      >
        <DatePicker
          placeholder='Masukkan Tanggal Lahir'
          format={'DD-MM-YYYY'}
          maxDate={dayjs()}
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
        label='Password'
        name='password'
        validateDebounce={1000}
        rules={[
          { required: true, message: 'Password wajib diisi' },
          { min: 8, message: 'Password minimal 8 karakter' }
        ]}
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
    </>
  )
}

export default StepInformasi
