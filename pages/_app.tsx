import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

import { SWRConfig } from 'swr'

import { lightTheme } from '@/themes'
import { AuthProvider, CartProvider, UIProvider } from '@/context'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      > 
        <AuthProvider>
          <CartProvider>
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline/>
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
