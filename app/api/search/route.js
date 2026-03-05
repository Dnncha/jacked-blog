import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content', 'blog')

export async function GET() {
  if (!fs.existsSync(postsDir)) {
    return Response.json([])
  }
  
  const files = fs.readdirSync(postsDir)
  const posts = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(postsDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Extract first 200 chars of content for search preview
      const plainContent = content
        .replace(/^#.*$/gm, '')
        .replace(/^##.*$/gm, '')
        .replace(/^###.*$/gm, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`]/g, '')
        .slice(0, 200)
      
      return {
        slug: file.replace('.md', ''),
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        content: plainContent,
        category: data.category || ''
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return Response.json(posts)
}
