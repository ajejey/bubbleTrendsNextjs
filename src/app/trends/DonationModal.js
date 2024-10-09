'use client';
import React, { useState } from 'react';
import { Heart, X, Coffee, Rocket, DollarSign } from 'lucide-react';

const DonationModal = ({ setShowDonateModal }) => {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleDonation = (amount) => {
    window.open(`https://paypal.me/bubbletrends/${amount}USD`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Support BubbleTrends</h2>
            <button onClick={() => setShowDonateModal(false)} className="text-white hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <p className="mt-2">Help us keep the bubbles floating!</p>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">Your support keeps BubbleTrends free for everyone. Choose an amount to power our mission:</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[5, 10, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-3 px-4 rounded-full text-center transition-all ${
                  selectedAmount === amount
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="customAmount"
                id="customAmount"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
            </div>
          </div>
          
          <button
            onClick={() => handleDonation(selectedAmount || customAmount)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={!selectedAmount && !customAmount}
          >
            <Heart className="mr-2" size={20} /> Donate Now
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your donation helps us:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <div className="flex items-center">
                <Coffee className="text-yellow-500 mr-1" size={16} /> Stay caffeinated
              </div>
              <div className="flex items-center">
                <Rocket className="text-red-500 mr-1" size={16} /> Improve features
              </div>
              <div className="flex items-center">
                <DollarSign className="text-green-500 mr-1" size={16} /> Keep it free
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;