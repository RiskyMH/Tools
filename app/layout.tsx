import './globals.css'

import Navbar from '#/components/Navbar.client'
import type { Metadata } from 'next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
  },
  
  title: {
    default: 'Tools',
    template: '%s | Tools',
  },
  description: 'Some random things that you can use!',
}