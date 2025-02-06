'use client';

import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent) => {
    localStorage.setItem('cookieConsent', consent);
    setIsVisible(false);
    
    if (consent === 'accept') {
      // Initialize Google AdSense or other tracking
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'YOUR_ADSENSE_CLIENT_ID'); // Replace with your AdSense client ID
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <p>Bubble Trends uses cookies to improve user experience and analyze traffic. Some cookies may be used for advertising purposes.</p>
        <div className="flex space-x-4">
          <button 
            onClick={() => handleConsent('accept')} 
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Accept All Cookies
          </button>
          <button 
            onClick={() => handleConsent('reject')} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Reject Non-Essential Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
