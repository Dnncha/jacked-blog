import HomeClient from './page.client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getPosts() {
  const postsDir = path.join(process.cwd(), 'content', 'blog')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }
  
  const files = fs.readdirSync(postsDir)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '')
      const fullPath = path.join(postsDir, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || 'General'
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function getCategories() {
  const posts = getPosts()
  const categories = [...new Set(posts.map(p => p.category))]
  return categories.sort()
}

export default function Home() {
  const posts = getPosts()
  const categories = getCategories()
  
  return <HomeClient allPosts={posts} categories={categories} />
}
