import { Poppins } from 'next/font/google';
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'


const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'] })

export const metadata = {
  title: 'FREE Keywords on Redbubble | FREE AI IMAGE GENERATOR',
  description: 'Discover trending keywords on Redbubble with Bubble Trends. Now generate AI images with Bubble Trends.',
  canonical: 'https://www.thebubbletrends.com/',
  openGraph: {
    title: 'FREE Keywords on Redbubble | FREE AI IMAGE GENERATOR',
    description: 'Discover trending keywords on Redbubble with Bubble Trends. Now generate AI images with Bubble Trends.',
    url: 'https://www.thebubbletrends.com/',
    siteName: 'Bubble Trends',
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
  },
  // viewport: 'width=device-width, initial-scale=1, theme-color=#E21F26',
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E21F26",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="UA-173651785-1" />
      <body
        className={` ${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
