import { Paket } from '#/repository/paket'
import { formatRupiah } from '#/utils/formatter'
import { Form, Radio, Skeleton } from 'antd'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface StepPaketProps {
  pakets: Paket[]
  isLoading: boolean
  setSelectedPaket: Dispatch<SetStateAction<Paket | null>>
}

const StepPaket = ({ pakets, isLoading, setSelectedPaket }: StepPaketProps) => {
  const handlePaketChange = (paketId: string) => {
    const selected = pakets?.find((p: Paket) => p.id === paketId)
    setSelectedPaket(selected || null)
  }

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
        onChange={(e) => handlePaketChange(e.target.value)}
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
          value: val.id
        }))}
      />
    </Form.Item>
  )
}

export default StepPaket
