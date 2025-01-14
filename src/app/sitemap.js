import { getPosts } from '../utils/getPosts'

export default async function sitemap() {
  // Fetch all blog posts
  const posts = getPosts()

  // Create blog post entries for sitemap
  const blogPosts = posts.map((post) => ({
    url: `https://www.thebubbletrends.com/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Static pages
  const routes = ['', '/blog', '/about', '/contact'].map((route) => ({
    url: `https://www.thebubbletrends.com${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 1,
  }))

  return [...routes, ...blogPosts]
}
