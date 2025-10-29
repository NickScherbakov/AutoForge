import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import DemoBanner from '@/components/DemoBanner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DemoBanner />
      <Component {...pageProps} />
    </>
  )
}
