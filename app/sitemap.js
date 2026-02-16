import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDir = path.join(__dirname, '..', 'content', 'blog')
  const baseUrl = 'https://jacked-blog.vercel.app'
  
  const posts = [
    { slug: 'autoprogression-future-of-hypertrophy', date: '2026-02-14' },
    { slug: 'volume-equivalence-principle', date: '2026-02-13' },
    { slug: 'protein-timing-myth', date: '2026-02-12' }
  ]
  
  // Try to read actual posts
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
    posts.length = 0
    files.forEach(file => {
      const slug = file.replace('.md', '')
      const fullPath = path.join(postsDir, file)
      const contents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(contents)
      posts.push({ slug, date: data.date || '2026-01-01' })
    })
  }
  
  const blogPosts = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...blogPosts,
  ]
}
