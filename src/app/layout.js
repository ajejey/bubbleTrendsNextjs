import { Poppins } from 'next/font/google';
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Suspense } from 'react';
import CookieConsent from '@/components/CookieConsent'

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'] })

export const metadata = {
  title: 'FREE Keywords on Redbubble | FREE AI IMAGE GENERATOR',
  description: 'Discover trending keywords on Redbubble with Bubble Trends. Now generate AI images with Bubble Trends.',
  canonical: 'https://www.thebubbletrends.com/',
  other: {
    'p:domain_verify': '558f976b5c3862b8ad3d2ef815d51108'
  },
  openGraph: {
    title: 'FREE Keywords on Redbubble | FREE AI IMAGE GENERATOR',
    description: 'Discover trending keywords on Redbubble with Bubble Trends. Now generate AI images with Bubble Trends.',
    url: 'https://www.thebubbletrends.com/',
    siteName: 'FREE Keywords on Redbubble | FREE AI IMAGE GENERATOR',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREE Keywords Trending on Redbubble | Bubble Trends',
    description: 'Discover trending keywords on Redbubble with Bubble Trends',
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
  verification: {
    google: '558f976b5c3862b8ad3d2ef815d51108',
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E21F26",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3613850686549619" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.thebubbletrends.com" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3613850686549619" 
          crossOrigin="anonymous"
        ></script>
      </head>
      {/* <GoogleTagManager gtmId="UA-173651785-1" /> */}
      <GoogleAnalytics gaId="G-LESFVC18KW" />
      <body
        className={` ${poppins.className} antialiased`}
      >
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
      {/* <CookieConsent /> */}
      </body>
    </html>
  );
}
