import { generalRepository, Kelurahan } from '#/repository/general'
import { toProperCase } from '#/utils/formatter'
import { Form, Input, Select } from 'antd'
import { HiChevronDown, HiXMark } from 'react-icons/hi2'

const StepAlamat = () => {
  const { data, isLoading } = generalRepository.hooks.useGetKelurahanBabelan()

  const kelurahanOptions = data?.map((kelurahan: Kelurahan) => ({
    value: toProperCase(kelurahan.name),
    label: (
      <p className='font-semibold text-slate-500'>
        {toProperCase(kelurahan.name)}
      </p>
    )
  }))

  return (
    <>
      <Form.Item label='Provinsi' name='provinsi'>
        <Input placeholder='Jawa Barat' disabled value={'Jawa Barat'} />
      </Form.Item>
      <Form.Item label='Kota/Kabupaten' name='kota'>
        <Input
          placeholder='Kabupaten Bekasi'
          disabled
          value={'Kabupaten Bekasi'}
        />
      </Form.Item>
      <Form.Item label='Kecamatan' name='kecamatan'>
        <Input placeholder='Kabupaten Bekasi' disabled value={'Babelan'} />
      </Form.Item>
      <Form.Item
        name={'kelurahan'}
        label='Kelurahan'
        validateDebounce={1000}
        preserve={true}
        rules={[{ required: true, message: 'Kelurahan wajib diisi' }]}
      >
        <Select
          loading={isLoading}
          options={kelurahanOptions}
          placeholder='Pilih Kelurahan'
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
      <Form.Item
        name={'alamat'}
        label='Alamat'
        validateDebounce={1000}
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
