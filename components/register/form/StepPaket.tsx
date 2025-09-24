import { Form, Radio } from 'antd'
import Image from 'next/image'

const StepPaket = () => {
  return (
    <Form.Item
      name={'paket'}
      validateDebounce={500}
      preserve={false}
      rules={[{ required: true, message: 'Pilih salah satu jenis paket' }]}
    >
      <Radio.Group
        className='paket-register-radio'
        name='paket'
        options={[
          {
            label: (
              <div className='flex items-center gap-6'>
                <Image
                  src='/paket/10_MBPS.png'
                  alt='10mbps'
                  width={55}
                  height={55}
                />
                <div className='space-y-1'>
                  <p className='text-xs font-medium text-slate-500'>
                    Basic Plan
                  </p>
                  <h1 className='text-base font-bold text-primary'>
                    Rp 150,000/Bulan
                  </h1>
                </div>
              </div>
            ),
            value: '10mbps'
          },
          {
            label: (
              <div className='flex items-center gap-6'>
                <Image
                  src='/paket/15_MBPS.png'
                  alt='15mbps'
                  width={55}
                  height={55}
                />
                <div className='space-y-1'>
                  <p className='text-xs font-medium text-slate-500'>
                    Standard Plan
                  </p>
                  <h1 className='text-base font-bold text-primary'>
                    Rp 160,000/Bulan
                  </h1>
                </div>
              </div>
            ),
            value: '15mbps'
          },
          {
            label: (
              <div className='flex items-center gap-6'>
                <Image
                  src='/paket/20_MBPS.png'
                  alt='20mbps'
                  width={55}
                  height={55}
                />
                <div className='space-y-1'>
                  <p className='text-xs font-medium text-slate-500'>
                    Smart Plan
                  </p>
                  <h1 className='text-base font-bold text-primary'>
                    Rp 166,500/Bulan
                  </h1>
                </div>
              </div>
            ),
            value: '20mbps'
          },
          {
            label: (
              <div className='flex items-center gap-6'>
                <Image
                  src='/paket/30_MBPS.png'
                  alt='30mbps'
                  width={55}
                  height={55}
                />
                <div className='space-y-1'>
                  <p className='text-xs font-medium text-slate-500'>
                    Premium Plan
                  </p>
                  <h1 className='text-base font-bold text-primary'>
                    Rp 220,000/Bulan
                  </h1>
                </div>
              </div>
            ),
            value: '30mbps'
          },
          {
            label: (
              <div className='flex items-center gap-6'>
                <Image
                  src='/paket/40_MBPS.png'
                  alt='40mbps'
                  width={55}
                  height={55}
                />
                <div className='space-y-1'>
                  <p className='text-xs font-medium text-slate-500'>
                    Ultimate Plan
                  </p>
                  <h1 className='text-base font-bold text-primary'>
                    Rp 310,000/Bulan
                  </h1>
                </div>
              </div>
            ),
            value: '40mbps'
          }
        ]}
      />
    </Form.Item>
  )
}

export default StepPaket
