import { Form, Radio } from 'antd'

const StepPaket = () => {
  return (
    <Form.Item
      name={'paket'}
      validateDebounce={500}
      preserve={true}
      rules={[{ required: true, message: 'Pilih salah satu jenis paket' }]}
    >
      <Radio.Group
        className='paket-radio-group'
        name='paket'
        options={[
          { label: '10 Mbps', value: '10 Mbps' },
          { label: '15 Mbps', value: '15 Mbps' },
          { label: '20 Mbps', value: '20 Mbps' },
          { label: '30 Mbps', value: '30 Mbps' },
          { label: '40 Mbps', value: '40 Mbps' }
        ]}
      />
    </Form.Item>
  )
}

export default StepPaket
