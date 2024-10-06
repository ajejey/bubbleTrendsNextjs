'use client';
import { useState } from 'react';
import { Star, Heart, ExternalLink } from 'lucide-react';
import AdSection from './AdSection';

const TrendsHeroSection = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-[#E21F26]">Today's Trending Keywords</h1>
            <p className="text-lg mb-6">
              The BubbleTrends tool lists the keywords currently trending on Redbubble. 
              Increase your sales potential by designing for these popular keywords!
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowDonateModal(true)}
                className="bg-[#E21F26] text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
              >
                <Heart className="inline-block mr-2" size={18} />
                Support Us
              </button>
              <a 
                href="https://g.page/r/your-google-review-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-yellow-400 text-gray-800 py-2 px-4 rounded hover:bg-yellow-500 transition duration-300"
              >
                <Star className="inline-block mr-2" size={18} />
                Leave a Review
              </a>
            </div>
          </div>

          <AdSection />

        </div>
      </div>
      
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Support BubbleTrends</h2>
            <p className="mb-4">Your donation helps us maintain and improve our services. Thank you for your support!</p>
            <div className="flex justify-around mb-4">
                <a href='https://paypal.me/bubbletrends/5USD' target="_blank" rel="noopener noreferrer" >
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">$5</button>
                </a>
                <a href='https://paypal.me/bubbletrends/10USD' target="_blank" rel="noopener noreferrer" >
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">$10</button>
                </a>
                <a href='https://paypal.me/bubbletrends/20USD' target="_blank" rel="noopener noreferrer" >
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">$20</button>
                </a>
            </div>
            <button 
              onClick={() => setShowDonateModal(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsHeroSection;