import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

 
export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    </QueryClientProvider>
  )
 
}