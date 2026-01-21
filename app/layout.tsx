import './globals.css'
import { Inter, Fredoka } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'

export const metadata = {
  metadataBase: new URL('https://postgres-starter.vercel.app'),
  title: 'Derby Viewer',
  description:
    'Viewer for Trefoil Derby database.'
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fredoka.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
