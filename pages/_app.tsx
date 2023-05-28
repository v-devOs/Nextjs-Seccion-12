import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    > 
      <ThemeProvider theme={lightTheme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}
