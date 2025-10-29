import UploadField from '#/components/reusable/UploadField'
import { Bank, bankRepository } from '#/repository/bank'
import { Paket, paketRepository } from '#/repository/paket'
import { formatRupiah, formatSpeed } from '#/utils/formatter'
import { Form, FormInstance, Input, Segmented, Select, Skeleton } from 'antd'
import { HiChevronDown, HiXMark } from 'react-icons/hi2'

interface EditFormProps {
  form: FormInstance
  initialPaketId?: string
}

const EditForm = ({ form, initialPaketId }: EditFormProps) => {
  const { data: paketResponse, isLoading: isLoadingPaket } =
    paketRepository.hooks.useGetPaket()
  const pakets: Paket[] = paketResponse?.data

  const { data: bankResponse, isLoading: isLoadingBank } =
    bankRepository.hooks.useGetBanks()
  const bankOptions = bankResponse?.data?.map((bank: Bank) => ({
    label: bank.bank_name,
    value: bank.id
  }))

  const handleChange = (value: string) => {
    form.setFieldsValue({ banksId: value })
  }

  // Watch the paket field value
  const currentPaketId = Form.useWatch('paket', form)
  console.log(currentPaketId)
  console.log(initialPaketId)

  // Check if paket has changed from initial value
  const isPaketChanged = currentPaketId && currentPaketId !== initialPaketId

  // Clear bank and payment fields when paket changes back to initial value
  const handlePaketChange = (value: any) => {
    if (value === initialPaketId) {
      form.setFieldsValue({ banksId: undefined, bukti_pembayaran: undefined })
    }
  }

  return (
    <div className='grid grid-cols-2 gap-x-4 gap-y-0'>
      {/* ID Pelanggan */}
      <Form.Item
        name={'customerId'}
        label='ID Pelanggan'
        preserve={true}
        className='col-span-2 sm:col-span-1'
      >
        <Input disabled />
      </Form.Item>

      {/* Email */}
      <Form.Item
        className='col-span-2 sm:col-span-1'
        name={'email'}
        label='Email'
        validateDebounce={1000}
        preserve={true}
        rules={[
          { required: true, message: 'Email wajib diisi', type: 'email' }
        ]}
      >
        <Input placeholder='Masukkan email' type='email' />
      </Form.Item>

      {/* Nomor Telepon */}
      <Form.Item
        label='No. Telp'
        validateDebounce={1000}
        preserve={true}
        className='col-span-2 sm:col-span-1'
      >
        <div className='flex flex-col gap-2'>
          <div className='flex gap-3'>
            <div className='rounded-lg border border-slate-200 px-2.5 py-1.5 font-semibold text-slate-500'>
              +62
            </div>
            <Form.Item
              noStyle
              name='phone_number'
              validateDebounce={1000}
              rules={[
                { required: true, message: 'Nomor Telpon wajib diisi' },
                { pattern: /^8\d{8,10}$/, message: 'Nomor Telpon tidak valid' }
              ]}
            >
              <Input placeholder='8xxxxxxxxxx' autoComplete='off' />
            </Form.Item>
          </div>
        </div>
      </Form.Item>

      {/* Status */}
      <Form.Item
        className='col-span-2 sm:col-span-1'
        name={'status'}
        label='Status'
        validateDebounce={1000}
        preserve={true}
        rules={[{ required: true, message: 'status wajib diisi' }]}
      >
        <Select
          options={[
            {
              value: 'Baru',
              label: <p className='font-semibold text-slate-500'>Baru</p>
            },
            {
              value: 'Aktif',
              label: <p className='font-semibold text-slate-500'>Aktif</p>
            },
            {
              value: 'Nonaktif',
              label: <p className='font-semibold text-slate-500'>Nonaktif</p>
            }
          ]}
          placeholder='Pilih Status'
          showSearch
          allowClear={{
            clearIcon: (
              <HiXMark
                className='size-5 bg-white text-slate-400 transition duration-200 hover:text-slate-500'
                strokeWidth={0.5}
              />
            )
          }}
          suffixIcon={
            <HiChevronDown
              className='text-slate-300'
              size={20}
              strokeWidth={1}
            />
          }
        />
      </Form.Item>

      {/* Paket */}
      <Form.Item
        name={'paket'}
        label='Paket'
        validateDebounce={1000}
        preserve={true}
        className={`col-span-2`}
        rules={[{ required: true, message: 'Paket wajib diisi' }]}
      >
        <Select
          loading={isLoadingPaket}
          options={pakets?.map((paket: Paket) => ({
            value: paket.id,
            label: (
              <div className='flex w-full items-center justify-between pe-2 font-semibold'>
                <p className='text-slate-500'>
                  {paket.name} - ({formatSpeed(paket.speed)})
                </p>
                <p className='text-primary'>
                  {formatRupiah(paket.price, { withPrefix: true })}
                </p>
              </div>
            )
          }))}
          placeholder='Pilih Paket'
          showSearch
          allowClear={{
            clearIcon: (
              <HiXMark
                className='size-5 bg-white text-slate-400 transition duration-200 hover:text-slate-500'
                strokeWidth={0.5}
              />
            )
          }}
          suffixIcon={
            <HiChevronDown
              className='text-slate-300'
              size={20}
              strokeWidth={1}
            />
          }
          onChange={handlePaketChange}
        />
      </Form.Item>

      {/* Bank & Payment - Only show if paket changed */}
      {isPaketChanged && (
        <div className='col-span-2 w-full'>
          {/* Bank */}
          <Form.Item
            name={'banksId'}
            validateDebounce={1000}
            rules={[{ required: true, message: 'Bank wajib dipilih' }]}
          >
            {isLoadingBank ? (
              <Skeleton.Button
                className='!h-[44px] !w-full !rounded-lg'
                active
              />
            ) : (
              <Segmented options={bankOptions} onChange={handleChange} />
            )}
          </Form.Item>

          {/* Pembayaran */}
          <UploadField
            form={form}
            name='bukti_pembayaran'
            label='Bukti Pembayaran'
            requiredMessage='Bukti Pembayaran wajib diisi'
            successMessage='Bukti Pembayaran berhasil diunggah!'
          />
        </div>
      )}
    </div>
  )
}

export default EditForm
