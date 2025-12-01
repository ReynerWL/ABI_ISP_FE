export const config = {
  baseUrl:
    (typeof window !== 'undefined'
      ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL
      : '') ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://172.17.0.186:3222' ||
    'https://api.mbinet.click',
  fileUrl: 'https://file.bangun-kreatif.com:443/abiisp'
}
