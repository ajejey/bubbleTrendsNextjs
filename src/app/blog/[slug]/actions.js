'use server'

import Comment from '@/models/Comment'
import Like from '@/models/Like'
import { 
  generateUniqueToken, 
  setUserTokenCookie, 
  getUserTokenFromServerCookies 
} from '@/utils/commentToken'
import { connectToMongoDB } from '@/utils/db'
import { revalidatePath } from 'next/cache'

// Custom validation function
function validateCommentInput(data) {
  const errors = {}

  // Validate post slug
  if (!data.postSlug || data.postSlug.trim() === '') {
    errors.postSlug = 'Post slug is required'
  }

  // Validate content
  if (!data.content || data.content.trim() === '') {
    errors.content = 'Comment cannot be empty'
  } else if (data.content.length > 500) {
    errors.content = 'Comment is too long (max 500 characters)'
  }

  // Validate email if provided
  if (data.email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email'
    }
  }

  // Validate name length
  if (data.name && data.name.length > 50) {
    errors.name = 'Name is too long (max 50 characters)'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export async function submitComment(prevState, formData) {
  await connectToMongoDB()

  try {
    // Check for existing user info from cookies
    const existingUserInfo = getUserTokenFromServerCookies()
    
    // Prepare input data
    const inputData = {
      postSlug: formData.get('postSlug')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      name: formData.get('name')?.toString() || existingUserInfo?.name || 'Anonymous',
      email: formData.get('email')?.toString() || existingUserInfo?.email || null
    }

    // Validate input
    const validationResult = validateCommentInput(inputData)

    // Handle validation errors
    if (!validationResult.isValid) {
      return {
        errors: validationResult.errors,
        message: 'Failed to submit comment',
        success: false
      }
    }

    // Generate or use existing token
    const temporaryToken = existingUserInfo?.token || generateUniqueToken()

    // Create new comment
    const newComment = new Comment({
      postSlug: inputData.postSlug,
      content: inputData.content,
      status: 'approved',
      author: {
        name: inputData.name,
        email: inputData.email,
        temporaryToken
      }
    })

    // Save comment
    await newComment.save()

    // Set cookie with token and user info
    setUserTokenCookie(temporaryToken, {
      name: inputData.name,
      email: inputData.email
    })

    // Revalidate the current path to show new comment
    revalidatePath(`/blog/${inputData.postSlug}`)

    return { 
      message: 'Comment submitted successfully',
      success: true,
      errors: {}
    }
  } catch (error) {
    console.error('Comment submission error:', error)
    return { 
      message: 'Failed to submit comment',
      success: false,
      errors: {}
    }
  }
}

export async function getCommentTokenInfo() {
  'use server'
  
  try {
    const existingUserInfo = getUserTokenFromServerCookies()
    return existingUserInfo ? {
      name: existingUserInfo.name,
      email: existingUserInfo.email
    } : null
  } catch (error) {
    console.error('Error retrieving comment token:', error)
    return null
  }
}

export async function toggleLike(postSlug) {
  'use server'
  
  try {
    // Get or create user token
    let userInfo = getUserTokenFromServerCookies()
    
    if (!userInfo) {
      // Generate new token if no existing token
      const newToken = setUserTokenCookie()
      userInfo = { token: newToken }
    }

    const userId = userInfo.token

    // Check if user has already liked the post
    const existingLike = await Like.findOne({ postSlug, userId })

    if (existingLike) {
      // Unlike the post
      await Like.deleteOne({ postSlug, userId })
      return { 
        success: true, 
        liked: false,
        message: 'Post unliked' 
      }
    } else {
      // Like the post
      await Like.create({ postSlug, userId })
      return { 
        success: true, 
        liked: true,
        message: 'Post liked' 
      }
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return { 
      success: false, 
      message: 'Failed to toggle like' 
    }
  }
}

export async function getLikeCount(postSlug) {
  'use server'
  
  try {
    const likeCount = await Like.countDocuments({ postSlug })
    
    // Check if current user has liked the post
    const userInfo = getUserTokenFromServerCookies()
    const userLiked = userInfo?.token 
      ? await Like.exists({ postSlug, userId: userInfo.token }) 
      : false

    return { 
      success: true, 
      count: likeCount,
      liked: !!userLiked
    }
  } catch (error) {
    console.error('Error getting like count:', error)
    return { 
      success: false, 
      count: 0,
      liked: false 
    }
  }
}
