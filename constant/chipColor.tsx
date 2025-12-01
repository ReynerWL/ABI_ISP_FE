export const chipColor: Record<string, { bgColor: string; textColor: string }> =
  {
    baru: { bgColor: '#eff6ff', textColor: '#3B82F6' },
    pending: { bgColor: '#eff6ff', textColor: '#3B82F6' },
    aktif: { bgColor: '#f0fdf4', textColor: '#22C55E' },
    confirmed: { bgColor: '#f0fdf4', textColor: '#22C55E' },
    pra_aktif: { bgColor: '#FFF7ED', textColor: '#F97316' },
    nonaktif: { bgColor: '#fef2f2', textColor: '#EF4444' },
    ditolak: { bgColor: '#F8FAFC', textColor: '#64748B' },
    reject: { bgColor: '#F8FAFC', textColor: '#64748B' }
  }

export const chipColorMethod: Record<
  string,
  { bgColor: string; textColor: string }
> = {
  get: { bgColor: '#eff6ff', textColor: '#3B82F6' }, // blue
  post: { bgColor: '#f0fdf4', textColor: '#22C55E' }, // green
  put: { bgColor: '#fefce8', textColor: '#EAB308' }, // yellow
  patch: { bgColor: '#fff7ed', textColor: '#F97316' }, // orange
  delete: { bgColor: '#fef2f2', textColor: '#EF4444' } // red
}

export const chipColorStatus: Record<
  string,
  { bgColor: string; textColor: string }
> = {
  success: { bgColor: '#f0fdf4', textColor: '#22C55E' }, // 2xx
  redirect: { bgColor: '#eff6ff', textColor: '#3B82F6' }, // 3xx
  client_error: { bgColor: '#fefce8', textColor: '#EAB308' }, // 4xx
  server_error: { bgColor: '#fef2f2', textColor: '#EF4444' } // 5xx
}
