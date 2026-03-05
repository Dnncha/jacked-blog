import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content', 'blog')

function getPosts() {
  if (!fs.existsSync(postsDir)) {
    return []
  }
  
  const files = fs.readdirSync(postsDir)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(postsDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return {
        slug: file.replace('.md', ''),
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '2026-01-01',
        category: data.category || 'Fitness'
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 50) // Latest 50 posts
}

export async function GET() {
  const posts = getPosts()
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jacked | Science-Based Fitness</title>
    <link>https://jacked.coach</link>
    <description>Evidence-based insights on muscle building, progression, and optimal training. No fluff. Just science.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://jacked.coach/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://jacked.coach/blog/${post.slug}</link>
      <guid>https://jacked.coach/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
    </item>`).join('')}
  </channel>
</rss>`
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}
