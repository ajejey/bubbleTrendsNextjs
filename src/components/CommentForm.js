'use client'

import { useFormState } from 'react-dom'
import { submitComment, getCommentTokenInfo } from '@/app/blog/[slug]/actions'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const initialState = {
  message: '',
  errors: {},
  success: false
}

export default function CommentForm() {
  const { slug } = useParams()
  const [state, formAction] = useFormState(submitComment, initialState)
  
  // State for managing form display and user info
  const [savedUserInfo, setSavedUserInfo] = useState(null)
  const [isEditingName, setIsEditingName] = useState(false)

  // Effect to load saved user info
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getCommentTokenInfo()
        console.log('Fetched user info:', userInfo)
        if (userInfo) {
          setSavedUserInfo(userInfo)
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  // Render name input fields if no saved user info or explicitly editing
  if (!savedUserInfo || isEditingName) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Leave a Comment
        </h3>
        
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="postSlug" value={slug} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Name (Optional)
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your Name" 
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                           dark:text-white dark:placeholder-gray-400"
              />
              {state.errors?.name && (
                <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email (Optional)
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Your Email" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                           dark:text-white dark:placeholder-gray-400"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Comment
            </label>
            <textarea 
              id="content" 
              name="content" 
              required 
              placeholder="Share your thoughts..."
              maxLength={500}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                         dark:text-white dark:placeholder-gray-400"
            />
            {state.errors?.content && (
              <p className="text-red-500 text-xs mt-1">{state.errors.content}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Submit Comment
            </button>
          </div>

          {state.message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              state.success 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {state.message}
            </div>
          )}
        </form>
      </div>
    )
  }

  // Render comment form with saved user info
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Leave a Comment
        </h3>
        <button 
          onClick={() => setIsEditingName(true)}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Change Name
        </button>
      </div>
      
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="postSlug" value={slug} />
        <input type="hidden" name="name" value={savedUserInfo.name} />
        {savedUserInfo.email && (
          <input type="hidden" name="email" value={savedUserInfo.email} />
        )}
        
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">
            Commenting as <span className="font-semibold">{savedUserInfo.name}</span>
          </p>
        </div>

        <div>
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Comment
          </label>
          <textarea 
            id="content" 
            name="content" 
            required 
            placeholder="Share your thoughts..."
            maxLength={500}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                       dark:text-white dark:placeholder-gray-400"
          />
          {state.errors?.content && (
            <p className="text-red-500 text-xs mt-1">{state.errors.content}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition duration-300 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </div>

        {state.message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            state.success 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  )
}
