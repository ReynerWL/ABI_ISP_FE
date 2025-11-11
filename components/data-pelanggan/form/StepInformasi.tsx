import { DatePicker, Form, Input } from 'antd'
import { HiOutlineCalendar, HiXMark } from 'react-icons/hi2'

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
        <Input.TextArea
          placeholder='Masukkan alamat'
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
    </>
  )
}

export default StepInformasi
