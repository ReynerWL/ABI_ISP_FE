export const RoleAccess = [
  { path: /^\/dashboard(\/.*)?$/, role: ['admin'] },
  { path: /^\/dashboard\/data-pelanggan(\/.*)?$/, role: ['admin'] },
  { path: /^\/dashboard\/transaksi(\/.*)?$/, role: ['admin'] },
  { path: /^\/riwayat-transaksi(\/.*)?$/, role: ['user'] },
  { path: /^\/beranda(\/.*)?$/, role: ['user'] }
]
