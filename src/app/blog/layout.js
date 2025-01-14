import React from 'react'
import Header from '../AppHeader'
import Breadcrumbs from '@/components/Breadcrumbs'

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <Breadcrumbs />
        {children}
        </div>
  )
}

export const metadata = {
  metadataBase: new URL('https://www.thebubbletrends.com'),
  title: {
    default: 'Bubble Trends - Actionable Business Insights',
    template: '%s | Bubble Trends'
  },
  description: 'Discover trending keywords, AI image generation, and practical advice for entrepreneurs, freelancers, and digital creators seeking sustainable income strategies',
  canonical: 'https://www.thebubbletrends.com/blog',
  openGraph: {
    title: 'Bubble Trends - Actionable Business Insights',
    description: 'Discover trending keywords, AI image generation, and practical advice for entrepreneurs, freelancers, and digital creators seeking sustainable income strategies',
    url: 'https://www.thebubbletrends.com/blog',
    siteName: 'Bubble Trends',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bubble Trends - Actionable Business Insights',
    description: 'Discover trending keywords, AI image generation, and practical advice for entrepreneurs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default layout