import UploadField from '#/components/reusable/UploadField'
import { Bank, bankRepository } from '#/repository/bank'
import { DatePicker, Form, FormInstance, Segmented, Skeleton } from 'antd'
import { HiOutlineCalendar, HiXMark } from 'react-icons/hi2'

interface StepPaymentProps {
  form: FormInstance
}

const StepPayment = ({ form }: StepPaymentProps) => {
  const { data, isLoading } = bankRepository.hooks.useGetBanks()
  const bankOptions = data?.data?.map((bank: Bank) => ({
    label: bank.bank_name,
    value: bank.id
  }))

  const handleChange = (value: string) => {
    form.setFieldsValue({ banksId: value })
  }

  return (
    <>
      {form?.getFieldValue('is_pelanggan_lama') ? (
        <div className='grid grid-cols-1 gap-x-4 gap-y-0 md:grid-cols-2'>
          {/* Tanggal Mulai */}
          <Form.Item
            name={'start_date'}
            label='Tanggal Mulai'
            validateDebounce={1000}
            preserve={true}
            rules={[{ required: true, message: 'Tanggal mulai wajib diisi' }]}
          >
            <DatePicker
              placeholder='Masukkan Tanggal Mulai'
              format={'DD-MM-YYYY'}
              suffixIcon={
                <HiOutlineCalendar
                  className='text-lg text-slate-400'
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
            name={'end_date'}
            label='Tanggal Berakhir'
            validateDebounce={1000}
            preserve={true}
            rules={[
              { required: true, message: 'Tanggal berakhir wajib diisi' }
            ]}
          >
            <DatePicker
              placeholder='Masukkan Tanggal Berakhir'
              format={'DD-MM-YYYY'}
              suffixIcon={
                <HiOutlineCalendar
                  className='text-lg text-slate-400'
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
            name={'paid_at'}
            label='Tanggal Pembayaran'
            validateDebounce={1000}
            preserve={true}
            className='col-span-1 md:col-span-2'
          >
            <DatePicker
              placeholder='Masukkan Tanggal Pembayaran'
              format={'DD-MM-YYYY'}
              suffixIcon={
                <HiOutlineCalendar
                  className='text-lg text-slate-400'
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
        </div>
      ) : (
        <>
          <Form.Item name={'banksId'} validateDebounce={1000}>
            {isLoading ? (
              <Skeleton.Button
                className='!h-[44px] !w-full !rounded-lg'
                active
              />
            ) : (
              <Segmented options={bankOptions} onChange={handleChange} />
            )}
          </Form.Item>
          <UploadField
            form={form}
            name='bukti_pembayaran'
            folder='Bukti_Pembayaran'
            label='Bukti Pembayaran'
            requiredMessage='Bukti Pembayaran wajib diisi'
            successMessage='Bukti Pembayaran berhasil diunggah!'
          />
        </>
      )}
    </>
  )
}

export default StepPayment
