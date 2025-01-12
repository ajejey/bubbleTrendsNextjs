'use client'

import { useState, useEffect } from 'react'
import { toggleLike, getLikeCount } from '@/app/blog/[slug]/actions'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid'

export default function LikeButton({ postSlug }) {
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial like count and status
  useEffect(() => {
    async function fetchLikeInfo() {
      try {
        const result = await getLikeCount(postSlug)
        if (result.success) {
          setLikeCount(result.count)
          setIsLiked(result.liked)
        }
      } catch (error) {
        console.error('Error fetching like info:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLikeInfo()
  }, [postSlug])

  // Handle like/unlike action
  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const result = await toggleLike(postSlug)
      
      if (result.success) {
        setIsLiked(result.liked)
        setLikeCount(prev => result.liked ? prev + 1 : prev - 1)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 flex items-center space-x-3 border border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleLike}
          disabled={isLoading}
          className={`
            transition-colors duration-200 ease-in-out
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-600'}
          `}
        >
          {isLiked ? (
            <SolidHeartIcon className="h-8 w-8 text-red-600" />
          ) : (
            <HeartIcon className="h-8 w-8" />
          )}
        </button>
        <span className="text-md font-semibold text-gray-700 dark:text-gray-300">
          {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
        </span>
      </div>
    </div>
  )
}
