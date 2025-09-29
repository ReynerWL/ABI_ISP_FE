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

export function formatSpeed(
  speed: string,
  style: 'lower' | 'capital' | 'upper' = 'capital'
) {
  const match = speed.match(/^(\d+)\s*([a-zA-Z]+)$/)
  if (!match) return speed

  switch (style) {
    case 'lower':
      return `${match[1]} ${match[2].toLowerCase()}`
    case 'upper':
      return `${match[1]} ${match[2].toUpperCase()}`
    default:
      return `${match[1]} ${match[2].charAt(0).toUpperCase()}${match[2].slice(1).toLowerCase()}`
  }
}
