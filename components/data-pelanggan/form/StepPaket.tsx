'use client'

import { Paket, paketRepository } from '#/repository/paket'
import { formatSpeed } from '#/utils/formatter'
import { Form, Radio, Skeleton } from 'antd'

const StepPaket = () => {
  const { data, isLoading } = paketRepository.hooks.useGetPaket()

  const pakets: Paket[] = data?.data

  if (isLoading) {
    return (
      <div className='mb-2 flex flex-col gap-4'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton.Button
            key={idx}
            style={{ width: '100%', height: 50, borderRadius: 8 }}
            active
          />
        ))}
      </div>
    )
  }

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
        options={pakets?.map((paket: Paket) => ({
          label: formatSpeed(paket.speed),
          value: paket.id
        }))}
      />
    </Form.Item>
  )
}

export default StepPaket
