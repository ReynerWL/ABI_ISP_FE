const descText: Record<string, { desc: string }> = {
  baru: {
    desc: '*Paket anda dalam proses. Menunggu konfirmasi dan aktivasi dari admin.'
  },
  aktif: { desc: '' },
  pra_aktif: {
    desc: 'Mohon dilakukan pembayaran sebelum tanggal jatuh tempo untuk menghindari masa tenggang, tepatnya pada tanggal {due_date}.'
  },
  nonaktif: {
    desc: '*Paket berada pada masa tenggang sejak {due_date}. Pastikan segera lakukan perpanjangan dengan upload bukti pembayaran.'
  },
  ditolak: {
    desc: '*Paket Anda ditolak karena terdapat ketidaksesuaian data atau di luar jangkauan layanan. Terima kasih.'
  }
}

export default descText
