import { Form, Segmented } from 'antd'

const StepPayment = () => {
  return (
    <>
      <Form.Item
        name={'banksId'}
        validateDebounce={500}
        rules={[
          { required: true, message: 'Pilih salah satu metode pembayaran' }
        ]}
      >
        <Segmented
          options={[
            { label: 'Qris', value: 'qris' },
            { label: 'BCA', value: 'bca' },
            { label: 'Mandiri', value: 'mandiri' }
          ]}
          onChange={(e) => console.log(e)}
        />
      </Form.Item>
    </>
  )
}

export default StepPayment
