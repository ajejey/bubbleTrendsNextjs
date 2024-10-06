import { ExternalLink } from 'lucide-react'
import React from 'react'

const AdSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transform">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#E21F26]">Free Redbubble Automation Tool</h2>
            <div className="text-center">
              <a 
                href="https://auuptools.com?utm_campaign=bubbletrends" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl font-bold text-blue-600 hover:text-blue-800 transition duration-300"
              >
                AuupTools.com
                <ExternalLink className="inline-block ml-2" size={24} />
              </a>
            </div>
            <div className="my-6 text-center">
              <span className="text-lg font-semibold">Coupon Code:</span>
              <span className="ml-2 text-2xl font-bold text-[#E21F26] bg-red-100 px-3 py-1 rounded">BUBBLETRENDS</span>
            </div>
            <p className="text-xl font-bold text-center text-green-600 mb-4">10% Off</p>
            <p className="text-lg text-center mb-4">
              Unlimited Automation for Only $8/month
            </p>
            <div className="text-center">
              <a 
                href="https://auuptools.com?utm_campaign=bubbletrends" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Try it now!
              </a>
            </div>
          </div>
  )
}

export default AdSection