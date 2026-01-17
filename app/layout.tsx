import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cruxtor - High Frequency Screen',
  description: 'High Frequency Screen - fine screening technology used widely in M Sand Plant and Sugar Grader',
  icons: {
    icon: '/cruxtor.png',
    shortcut: '/cruxtor.png',
    apple: '/cruxtor.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cruxtor.com',
    siteName: 'Cruxtor',
    title: 'Cruxtor - High Frequency Screen',
    description: 'High Frequency Screen - fine screening technology used widely in M Sand Plant and Sugar Grader',
    images: ['/cruxtor.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cruxtor - High Frequency Screen',
    description: 'High Frequency Screen - fine screening technology used widely in M Sand Plant and Sugar Grader',
    images: ['/cruxtor.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
