import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SocketIOProvider } from '../src/contexts/socketio-context'

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "rgb(237, 237, 237)",
            },
            html: {
                height: "100%"
            }
        }
    }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  )
}
