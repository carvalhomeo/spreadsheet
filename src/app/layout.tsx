import { ReactNode } from 'react'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Providers from '@/providers'

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
