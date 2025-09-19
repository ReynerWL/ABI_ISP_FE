import { Form, Input } from 'antd'

const StepAlamat = () => {
  return (
    <>
      <Form.Item
        label='Provinsi'
        name='province'
        validateDebounce={500}
        rules={[{ required: true, message: 'Provinsi wajib diisi' }]}
      >
        <Input placeholder='Jawa Barat' disabled value={'Jawa Barat'} />
      </Form.Item>
      <Form.Item
        label='Kota/Kabupaten'
        name='city'
        validateDebounce={500}
        rules={[{ required: true, message: 'Kota/Kabupaten wajib diisi' }]}
      >
        <Input
          placeholder='Kabupaten Bekasi'
          disabled
          value={'Kabupaten Bekasi'}
        />
      </Form.Item>
      <Form.Item
        label='Kecamatan'
        name='label'
        validateDebounce={500}
        rules={[{ required: true, message: 'Kecamatan wajib diisi' }]}
      >
        <Input placeholder='Kabupaten Bekasi' disabled value={'Babelan'} />
      </Form.Item>
      <Form.Item
        name={'alamat'}
        label='Alamat'
        validateDebounce={500}
        preserve={true}
        rules={[{ required: true, message: 'Alamat wajib diisi' }]}
      >
        <Input.TextArea
          placeholder='Masukkan alamatmu'
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>
    </>
  )
}

export default StepAlamat
