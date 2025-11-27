'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react' // Import useState
import { HiPlus } from 'react-icons/hi2'
import { CardBank } from './CardBank'
import { Bank } from '#/repository/bank'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import BaseModal from '../reusable/BaseModal'

export type BankOption = { label: string; value: string }

type Props = {
  datas: Bank[]
  handleFinish: any
  loading: boolean
  open: boolean
  setOpen: (val: boolean) => void
}

const CustomBankSelect: React.FC<Props> = ({
  datas,
  handleFinish,
  loading,
  open,
  setOpen
}) => {
  const [form] = useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const bank = searchParams?.get('bank') || ''
  const [selectedBank, setSelectedBank] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    if (bank) setSelectedBank(bank)
    else setSelectedBank(undefined)
  }, [bank])

  const handleBankChange = (val?: string) => {
    setSelectedBank(val)
    const queryParams = new URLSearchParams(searchParams?.toString() || '')
    if (val) queryParams.set('bank', val)
    else queryParams.delete('bank')
    router.replace(`?${queryParams.toString()}`)
  }

  return (
    <div className={'grid grid-cols-4 gap-6'}>
      {datas?.map((value, index) => (
        <CardBank
          key={index}
          bankName={value?.bank_name}
          owner={value?.owner}
          noRekening={value?.no_rekening}
          active={selectedBank === bank}
          onClick={(val) => handleBankChange(val ?? '')}
        />
      ))}
      <div
        className={
          'ktp-upload col-span-1 flex w-full cursor-pointer items-center justify-center gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-100 p-6 text-slate-500'
        }
        onClick={() => setOpen(true)}
      >
        <HiPlus className='text-xl text-slate-800' />
        Tambah
      </div>
      <BaseModal
        title='Tambah Bank'
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Form
          form={form}
          layout='vertical'
          requiredMark={false}
          onFinish={handleFinish}
        >
          <Form.Item
            name={'bank_name'}
            label='Nama Bank'
            validateDebounce={1000}
            preserve={true}
            rules={[{ required: true, message: 'Nama bank wajib diisi' }]}
          >
            <Input placeholder='Masukkan nama bank' />
          </Form.Item>
          <Form.Item
            name={'no_rekening'}
            label='Nomor Rekening'
            validateDebounce={1000}
            preserve={true}
            rules={[
              { required: true, message: 'Nomor rekening wajib diisi' },
              {
                pattern: /^[0-9]{8,20}$/,
                message: 'Nomor rekening tidak valid'
              }
            ]}
          >
            <Input type='number' placeholder='Masukkan nomor rekening' />
          </Form.Item>
          <Form.Item
            name={'owner'}
            label='Owner'
            validateDebounce={1000}
            preserve={true}
            rules={[{ required: true, message: 'Nama owner wajib diisi' }]}
          >
            <Input placeholder='Masukkan nama owner' />
          </Form.Item>
          <div className='flex w-full gap-4 pt-2'>
            <Button
              className='!h-[44px] !w-full !border-slate-200 text-base !font-medium tracking-wide !text-slate-500 hover:!bg-slate-100'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className='!h-[44px] !w-full text-base !font-medium tracking-wide !shadow-none'
              type='primary'
              htmlType='submit'
              loading={loading}
            >
              Save
            </Button>
          </div>
        </Form>
      </BaseModal>
    </div>
  )
}

export default CustomBankSelect
