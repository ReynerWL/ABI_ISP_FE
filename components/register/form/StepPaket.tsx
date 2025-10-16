import { Paket, paketRepository } from '#/repository/paket'
import { formatRupiah, formatSpeed } from '#/utils/formatter'
import { Form, Radio, Skeleton } from 'antd'
import Image from 'next/image'

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
      validateDebounce={1000}
      preserve={false}
      rules={[{ required: true, message: 'Pilih salah satu jenis paket' }]}
    >
      <Radio.Group
        className='paket-register-radio'
        name='paket'
        options={pakets?.map((val: Paket) => ({
          label: (
            <div className='flex items-center gap-6'>
              <Image src={val.photo} alt='10mbps' width={55} height={55} />
              <div className='space-y-1'>
                <p className='text-xs font-medium text-slate-500'>{val.name}</p>
                <h1 className='text-base font-bold text-primary'>
                  {formatRupiah(val.price ?? '', { withPrefix: true })}
                  /Bulan
                </h1>
              </div>
            </div>
          ),
          value: formatSpeed(val.speed)
        }))}
      />
    </Form.Item>
  )
}

export default StepPaket
