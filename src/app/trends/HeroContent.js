'use client';
import { useState } from 'react';
import { Star, Heart, ExternalLink, Image, BookOpen } from 'lucide-react';
import DonationModal from './DonationModal';
import Link from 'next/link';
import BlogPromoSection from './BlogPromoSection';


const TrendsHeroSection = ({ latestPosts }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-[#E21F26]">Today&apos;s Trending Keywords</h1>
            <p className="text-lg mb-6">
              The BubbleTrends tool lists the keywords currently trending on Redbubble.
              Increase your sales potential by designing for these popular keywords!
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-xl ">
              <button
                onClick={() => setShowDonateModal(true)}
                className="flex items-center justify-center bg-[#E21F26] text-white py-3 px-4 rounded hover:bg-red-700 transition duration-300 w-full"
              >
                <Heart className="mr-2" size={18} />
                <span>Support Us</span>
              </button>
              <Link
                href="https://g.page/r/CZC7Pj19TRloEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-yellow-400 text-gray-800 py-3 px-4 rounded hover:bg-yellow-500 transition duration-300 w-full"
              >
                <Star className="mr-2" size={18} />
                <span>Leave a Review</span>
              </Link>
              <Link
                href="/ai-image-generator"
                className="flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-300 w-full col-span-2 ai-button-pulse"
              >
                <Image className="mr-2" size={18} />
                <span>Try AI Image Generator</span>
              </Link>
            </div>
            <div>
              <p className="text-sm mt-6 text-gray-600">For queries and suggestions, <br/><a className="text-[#E21F26] hover:underline" href="mailto:thebubbletrends@gmail.com">contact : thebubbletrends@gmail.com</a></p>
            </div>
          </div>

          <BlogPromoSection latestPosts={latestPosts} />
        </div>
      </div>

      {showDonateModal && <DonationModal setShowDonateModal={setShowDonateModal} />}
    </div>
  );
};

export default TrendsHeroSection;