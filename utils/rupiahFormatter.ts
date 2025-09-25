export function formatRupiah(
  value: number | string,
  options?: { withPrefix?: boolean; withSuffix?: boolean }
): string {
  const { withPrefix = false, withSuffix = false } = options || {}

  const numberValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numberValue)) return '0'

  let formatted = numberValue.toLocaleString('id-ID')

  if (withPrefix) {
    formatted = `Rp. ${formatted}`
  }

  if (withSuffix) {
    formatted = `${formatted},00`
  }

  return formatted
}
