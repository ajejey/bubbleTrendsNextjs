import React from 'react'
import Header from '../AppHeader'
import TrendsHeroSection from './HeroContent'
import BubbleTrendsTable from './TrendsTable'
import TrendsFilter from './TrendsFilter'
import { getPosts } from '@/utils/getPosts'
import Link from 'next/link'
import { AD_SLOTS } from '@/components/ads/adConstants';
import { AdPlaceholder } from '@/components/ads/AdPlaceholder';
import { AdUnit } from '@/components/ads/AdUnit';

const AdComponent = process.env.NODE_ENV === "development" ? AdPlaceholder : AdUnit;

const Trends = () => {
    const latestPosts = getPosts().slice(0, 3);

    return (
        <div>
            <Header />
            <TrendsHeroSection latestPosts={latestPosts} />
            
            {/* Main content with side ads */}
            <div className="relative max-w-[1600px] mx-auto">
                {/* Left Sticky Ad - Desktop Only */}
                <div className="hidden xl:block absolute left-0 top-0 h-full">
                    <div className="sticky top-16 left-0 pt-10">
                        <AdComponent adSlot={AD_SLOTS.MULTIPLEX_VERTICAL_AD} adFormat="vertical" />
                    </div>
                </div>

                {/* Right Sticky Ad - Desktop Only */}
                <div className="hidden xl:block absolute right-0 top-0 h-full">
                    <div className="sticky top-16 right-0 pt-10">
                        <AdComponent adSlot={AD_SLOTS.MULTIPLEX_VERTICAL_AD} adFormat="vertical" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto px-8 py-8">
                    <div className="hidden md:flex w-full justify-center pb-4">
                        <AdComponent adSlot={AD_SLOTS.HEADER_AD} adFormat="horizontal" />
                    </div>
                    <div className="flex md:hidden justify-center pb-4">
                        <AdComponent adSlot={AD_SLOTS.SQUARE_RESPONSIVE_AD} adFormat="rectangle" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">BubbleTrends</h1>
                    <TrendsFilter />
                    <BubbleTrendsTable />
                </div>
            </div>

            {/* Bottom Ad */}
            <div className="hidden md:flex w-full justify-center pb-4">
                <AdComponent adSlot={AD_SLOTS.HEADER_AD} adFormat="horizontal" />
            </div>
            <div className="flex md:hidden justify-center pb-4">
                <AdComponent adSlot={AD_SLOTS.SQUARE_RESPONSIVE_AD} adFormat="rectangle" />
            </div>

            <footer className="w-full text-center py-6 mt-auto bg-[#E21F26]">
                <div className="flex justify-center space-x-6 mb-4">
                    <Link href="/about" className="hover:underline transition-colors">About</Link>
                    <Link href="/privacy" className="hover:underline transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:underline transition-colors">Terms</Link>
                </div>
                <p> Bubble Trends {new Date().getFullYear()} 
                </p>
            </footer>
        </div>
    );
}

export default Trends