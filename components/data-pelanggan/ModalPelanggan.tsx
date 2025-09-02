'use client'

import { Steps } from 'antd'
import BaseModal from '../reusable/BaseModal'

interface ModalPelangganProps {
  open: boolean
  onClose: () => void
}

const ModalPelanggan = ({ open, onClose }: ModalPelangganProps) => {
  // const [form] = useForm()
  return (
    <BaseModal
      open={open}
      title='Tambah Data'
      onClose={onClose}
      titleBorder={false}
    >
      <div className='flex flex-col gap-4'>
        <Steps
          size='small'
          current={0}
          items={[
            { title: 'Informasi Pelanggan' },
            { title: 'KTP' },
            { title: 'Paket' }
          ]}
          className='tambah-pengguna-steps'
        />
      </div>
    </BaseModal>
  )
}

export default ModalPelanggan
