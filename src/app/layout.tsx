import '@/styles/tailwind.css'

import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import clsx from 'clsx'
import localFont from 'next/font/local'

export { metadata } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  weight: '200 900',
})

export default function RootLayout(
  { children }: { children: React.ReactNode}
) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, monaSans.variable)}
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
