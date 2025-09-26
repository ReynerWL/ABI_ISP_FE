import { Form, Input } from 'antd'

const StepAlamat = () => {
  return (
    <>
      <Form.Item label='Provinsi' name='province'>
        <Input placeholder='Jawa Barat' disabled value={'Jawa Barat'} />
      </Form.Item>
      <Form.Item label='Kota/Kabupaten' name='city'>
        <Input
          placeholder='Kabupaten Bekasi'
          disabled
          value={'Kabupaten Bekasi'}
        />
      </Form.Item>
      <Form.Item label='Kecamatan' name='district'>
        <Input placeholder='Kabupaten Bekasi' disabled value={'Babelan'} />
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
            placeholder='Masukkan alamatmu'
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <p className='m-0 text-xs font-medium italic text-slate-400'>
            * Mohon pastikan alamat yang Anda masukkan berada di wilayah
            Babelan.
          </p>
        </div>
      </Form.Item>
    </>
  )
}

export default StepAlamat
