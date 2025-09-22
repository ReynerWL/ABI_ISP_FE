import { DatePicker, Form, Input } from 'antd'
import { HiOutlineEyeOff } from 'react-icons/hi'
import { HiOutlineCalendar, HiOutlineEye, HiXMark } from 'react-icons/hi2'

const StepInformasi = () => {
  return (
    <>
      <Form.Item name={'id'} label='ID Pelanggan' preserve={true}>
        <Input disabled />
      </Form.Item>
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
          { required: true, message: 'No. Telp wajib diisi', min: 10, max: 15 },
          { pattern: /^[0-9]+$/, message: 'No. Telp hanya boleh angka' }
        ]}
      >
        <Input placeholder='Masukkan no. telp' />
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
          />
          <p className='m-0 text-[10px] italic text-slate-400'>
            * Mohon pastikan alamat Anda berada di Kecamatan Babelan dan
            sertakan informasi kelurahannya.
          </p>
        </div>
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
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
    </>
  )
}

export default StepInformasi
