import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Amplify } from 'aws-amplify'
import config from '@/aws-exports'

Amplify.configure(config)
export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
