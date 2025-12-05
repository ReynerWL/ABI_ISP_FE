export default function Head() {
  return (
    <head>
      <title>MBINet - Solusi Digital Terdepan untuk Bisnis Modern</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta
        name='description'
        content='Solusi Digital Terdepan untuk Bisnis Modern'
      />
      <link rel='icon' href='/favicon.ico' />
      <link
        rel='preload'
        href='/fonts/Inter.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'InternetServiceProvider',
            name: 'MBINet',
            url: 'https://mbinet.click',
            logo: 'https://mbinet.click/logo.png',
            description:
              'Layanan internet fiber optic cepat dan stabil dari PT Media Buana Informatika.',
            parentOrganization: {
              '@type': 'Organization',
              name: 'PT Media Buana Informatika'
            }
          })
        }}
      />
    </head>
  )
}
