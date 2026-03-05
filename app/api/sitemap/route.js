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
      const { data } = matter(fileContents)
      return {
        slug: file.replace('.md', ''),
        date: data.date || '2026-01-01'
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function GET() {
  const posts = getPosts()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jacked.coach/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jacked.coach/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>https://jacked.coach/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}
