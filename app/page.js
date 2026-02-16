import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

// ESM compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get posts at build time
export function getPosts() {
  const postsDir = path.join(__dirname, '..', 'content', 'blog')
  
  // Return sample posts if directory doesn't exist
  if (!fs.existsSync(postsDir)) {
    return [
      {
        slug: 'autoprogression-future-of-hypertrophy',
        title: 'Why Autoprogression is the Future of Hypertrophy Training',
        excerpt: 'Traditional linear progression is inefficient. Auto-regulation and autoprogression could double your gains.',
        date: 'February 14, 2026'
      },
      {
        slug: 'volume-equivalence-principle',
        title: 'The Volume Equivalence Principle: Myth or Science?',
        excerpt: 'Does it really matter how you split your volume? A deep dive into the research on mechanical tension and metabolic stress.',
        date: 'February 13, 2026'
      },
      {
        slug: 'protein-timing-myth',
        title: 'Protein Timing: What the Science Actually Says',
        excerpt: 'The anabolic window is much larger than you think. Here\'s what matters for muscle protein synthesis.',
        date: 'February 12, 2026'
      }
    ]
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
        date: data.date || ''
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Generate static params for SSG
export function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Home() {
  const posts = getPosts()
  
  return (
    <div>
      <section style={{ marginBottom: '3rem', textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>
          The Science of Getting Jacked
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Evidence-based insights on muscle building, progression, and optimal training.
          No fluff. Just science.
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {posts.map((post) => (
          <article key={post.slug} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s',
          }}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.5rem', color: '#1a1a1a' }}>
                {post.title}
              </h2>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#999', fontSize: '0.9rem' }}>{post.date}</span>
                <span style={{ color: '#0066cc', fontSize: '0.9rem', fontWeight: '500' }}>Read more →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
