import React from 'react'
import Header from '../AppHeader'
import TrendsHeroSection from './HeroContent'
import BubbleTrendsTable from './TrendsTable'
import TrendsFilter from './TrendsFilter'
import { getPosts } from '@/utils/getPosts'

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
        </div>
    )
}

export default Trends