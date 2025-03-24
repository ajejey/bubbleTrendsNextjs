import React from 'react'
import Header from '../AppHeader'
import Link from 'next/link'

export const metadata = {
  title: 'AI Image Generator | BubbleTrends',
  description: ' Now generate AI images with Bubble Trends with Flux 1.0 models.',
}

const layout = ({ children }) => {
  return (
    <div>
        <Header />
      {children}
      <footer className="w-full text-center py-6 mt-auto  bg-[#E21F26]">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="hover:underline transition-colors">About</Link>
          <Link href="/contact" className="hover:underline transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:underline transition-colors">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:underline transition-colors">Terms of Service</Link>
        </div>
        <p>
          Bubble Trends © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default layout