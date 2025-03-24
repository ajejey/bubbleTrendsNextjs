import React from 'react'
import Header from '../AppHeader'
import TrendsHeroSection from './HeroContent'
import BubbleTrendsTable from './TrendsTable'
import TrendsFilter from './TrendsFilter'
import { getPosts } from '@/utils/getPosts'
import Link from 'next/link'

const Trends = () => {
    const latestPosts = getPosts().slice(0, 3);

    return (
        <div>
            <Header />
            <TrendsHeroSection latestPosts={latestPosts} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">BubbleTrends</h1>
                <TrendsFilter />
                <BubbleTrendsTable />
            </div>
            <footer className="w-full text-center py-6 mt-auto bg-[#E21F26]">
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

export default Trends