const crypto = require('crypto')
const { cookies } = require('next/headers')

function generateUniqueToken() {
  return crypto.randomBytes(32).toString('hex')
}

function setUserTokenCookie(userInfo = {}) {
  const token = generateUniqueToken()
  
  cookies().set('user_token', JSON.stringify({
    token,
    ...userInfo
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })

  return token
}

function getUserTokenFromServerCookies() {
  try {
    const cookieValue = cookies().get('user_token')?.value
    return cookieValue ? JSON.parse(cookieValue) : null
  } catch {
    return null
  }
}

module.exports = {
  generateUniqueToken,
  setUserTokenCookie,
  getUserTokenFromServerCookies
}
