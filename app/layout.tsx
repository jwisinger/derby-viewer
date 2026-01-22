import './globals.css'
import { Inter, Fredoka } from 'next/font/google'
import { AuthProvider } from '@/context/auth-context'

export const metadata = {
  metadataBase: new URL('https://derbyviewer.vercel.app'),
  title: 'Derby Viewer',
  description:
    'Viewer for Trefoil Derby database.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={``}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
