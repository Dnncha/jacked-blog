import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import Link from 'next/link'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function generateMetadata({ params }) {
  const { slug } = await params
  const postsDir = path.join(__dirname, '..', '..', '..', 'content', 'blog')
  const fullPath = path.join(postsDir, `${slug}.md`)
  
  let frontmatter = { title: 'Post not found', excerpt: '', date: '2026-01-01' }
  
  if (fs.existsSync(postsDir) && fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    frontmatter = { title: data.title, excerpt: data.excerpt || '', date: data.date || '2026-01-01' }
  }
  
  return {
    title: `${frontmatter.title} | Jacked`,
    description: frontmatter.excerpt,
    alternates: {
      canonical: `https://jacked.coach/blog/${slug}`,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      url: `https://jacked.coach/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const postsDir = path.join(__dirname, '..', '..', '..', 'content', 'blog')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }
  
  const files = fs.readdirSync(postsDir)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', '')
    }))
}

function getPosts() {
  const postsDir = path.join(__dirname, '..', '..', '..', 'content', 'blog')
  
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
        date: data.date,
        category: data.category || 'General',
        excerpt: data.excerpt || ''
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function relatedPosts(posts, currentSlug, currentTitle, currentExcerpt, currentCategory) {
  const terms = new Set(
    `${currentTitle || ''} ${currentExcerpt || ''}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(w => w.length > 3)
  )

  return posts
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const hay = `${p.title || ''} ${p.excerpt || ''}`.toLowerCase()
      let overlap = 0
      for (const t of terms) {
        if (hay.includes(t)) overlap++
      }
      const categoryBoost = p.category === currentCategory ? 2 : 0
      const recencyBoost = p.date ? (Date.now() - new Date(p.date).getTime() < 1000 * 60 * 60 * 24 * 30 ? 1 : 0) : 0
      return { ...p, _score: overlap + categoryBoost + recencyBoost }
    })
    .sort((a, b) => b._score - a._score || new Date(b.date) - new Date(a.date))
    .slice(0, 4)
}

// Simple markdown to HTML with diagram support
function parseContent(content) {
  // Extract mermaid blocks and convert to images using mermaid.ink
  const mermaidBlocks = []
  let mermaidIndex = 0
  
  const contentWithMarkers = content.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    const index = mermaidIndex++
    // Encode for mermaid.ink API using base64
    const encoded = Buffer.from(code.trim()).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    mermaidBlocks.push(encoded)
    return `<<MERMAID-IMG-${index}>>`
  })
  
  // Replace mermaid markers with img tags
  let html = contentWithMarkers
    .replace(/<<MERMAID-IMG-(\d+)>>/g, (match, index) => {
      const encoded = mermaidBlocks[index]
      return `<img src="https://mermaid.ink/img/${encoded}" alt="Diagram" class="mermaid-diagram" />`
    })
    // Hormonal cascade diagram
    .replace(/\{\{hormone-cascade\}\}/g, `
      <div class="diagram">
        <h4>🧬 Hormonal Response Cascade</h4>
        <svg viewBox="0 0 400 200" class="cascade-diagram">
          <rect x="20" y="80" width="80" height="40" rx="8" fill="#e3f2fd"/>
          <text x="60" y="105" text-anchor="middle" font-size="12">Training</text>
          <path d="M 100 100 L 140 100" stroke="#1976d2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <rect x="140" y="70" width="90" height="60" rx="8" fill="#fff3e0"/>
          <text x="185" y="95" text-anchor="middle" font-size="11">CNS Activation</text>
          <path d="M 230 100 L 270 100" stroke="#1976d2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <rect x="270" y="60" width="110" height="80" rx="8" fill="#f3e5f5"/>
          <text x="325" y="85" text-anchor="middle" font-size="12">HPA Axis</text>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#1976d2"/>
            </marker>
          </defs>
        </svg>
      </div>
    `)
    // Recovery pyramid
    .replace(/\{\{recovery-pyramid\}\}/g, `
      <div class="diagram">
        <h4>🏗️ Recovery Priority Pyramid</h4>
        <svg viewBox="0 0 300 220" class="pyramid-diagram">
          <polygon points="150,20 250,180 50,180" fill="none" stroke="#222" stroke-width="2"/>
          <text x="150" y="50" text-anchor="middle" font-size="11" font-weight="600">Sleep 40%</text>
          <line x1="80" y1="100" x2="220" y2="100" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
          <text x="150" y="95" text-anchor="middle" font-size="11" font-weight="600">Nutrition 30%</text>
          <line x1="100" y1="140" x2="200" y2="140" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
          <text x="150" y="135" text-anchor="middle" font-size="11" font-weight="600">Training 20%</text>
          <line x1="120" y1="170" x2="180" y2="170" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
          <text x="150" y="165" text-anchor="middle" font-size="11" font-weight="600">Supplements 10%</text>
        </svg>
      </div>
    `)
  
  // Auto-link URLs in text
  let text = html.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>')
  
  // Standard markdown conversion
  text = text
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return `<p>${match}</p>`
    })
  
  return text
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const postsDir = path.join(__dirname, '..', '..', '..', 'content', 'blog')
  const fullPath = path.join(postsDir, `${slug}.md`)
  
  let content = ''
  let frontmatter = { title: 'Post not found', date: '' }
  
  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content: markdown } = matter(fileContents)
    frontmatter = { title: data.title, date: data.date, excerpt: data.excerpt, category: data.category || 'General' }
    content = parseContent(markdown)
  }
  
  const allPosts = relatedPosts(
    getPosts(),
    slug,
    frontmatter.title,
    frontmatter.excerpt,
    frontmatter.category || 'General'
  )
  
  const shareUrl = `https://jacked.coach/blog/${slug}`
  const shareText = encodeURIComponent(frontmatter.title)
  
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Organization',
      name: 'Jacked'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jacked',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jacked.coach/og-image.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': shareUrl
    },
    image: 'https://jacked.coach/og-image.png',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://jacked.coach/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://jacked.coach/'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: frontmatter.title,
          item: shareUrl
        }
      ]
    }
  }
  
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem', background: '#000000', minHeight: '100vh', color: '#e5e5e5' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        body { background: #000000 !important; }
        .diagram {
          margin: 2rem 0;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
        }
        .diagram h4 {
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
          color: #FF6B35;
          font-weight: 700;
        }
        .diagram svg {
          width: 100%;
          max-width: 400px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        .mermaid-diagram {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border-radius: 8px;
        }
        article h2 {
          color: #e5e5e5;
          font-weight: 700;
          margin-top: 2.5rem;
          border-left: 4px solid #FFD700;
          padding-left: 1rem;
        }
        article h3 {
          color: #ccc;
          font-weight: 600;
        }
        article p {
          color: #ccc !important;
          line-height: 1.8;
        }
        article a {
          color: #FFD700;
          text-decoration: underline;
        }
        article strong {
          color: #fff;
        }
        article ul, article ol {
          color: #ccc;
          padding-left: 1.5rem;
        }
        article li {
          color: #ccc;
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        article blockquote {
          border-left: 3px solid #FFD700;
          padding-left: 1rem;
          margin-left: 0;
          color: #aaa;
          font-style: italic;
        }
        article code {
          background: #222;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
        }
        article pre {
          background: #111;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
        }
        article table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        article th, article td {
          border: 1px solid #333;
          padding: 0.75rem;
          text-align: left;
        }
        article th {
          background: #1a1a1a;
          font-weight: 600;
        }
        article img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1rem 0;
        }
      `}</style>
      
      <Link href="/" style={{ color: '#FFD700', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600' }}>
        ← Back to all articles
      </Link>
      
      <header style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.3', color: '#ffffff', letterSpacing: '-0.02em' }}>
          {frontmatter.title}
        </h1>
        <a
          href={`https://apps.apple.com/us/app/jacked/id6757132605?utm_source=jacked_blog&utm_medium=article_top_cta&utm_campaign=ios_install&utm_content=${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: '0.35rem', padding: '0.6rem 0.95rem', borderRadius: '9px', textDecoration: 'none', fontWeight: '700', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#111' }}
        >
          Get the Jacked App ($3.99/mo)
        </a>
        <p style={{ marginTop: '0.45rem', marginBottom: 0, color: '#888', fontSize: '0.84rem' }}>
          Use adaptive progression + fatigue management so this strategy is applied consistently, not guessed.
        </p>
      </header>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid #333' }}>
        <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', background: '#000000', color: '#FFD700', borderRadius: '8px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #333' }}>Share on X</a>
      </div>
      
      <article style={{ lineHeight: '1.9', fontSize: '1.08rem', color: '#ccc' }}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      
      {allPosts.length > 0 && (
        <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #333' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: '700', color: '#ffffff' }}>Related Articles</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {allPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: 'block', padding: '1rem', background: '#1a1a1a', borderRadius: '10px', textDecoration: 'none', color: 'inherit', border: '1px solid #333', transition: 'all 0.2s' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#FFD700' }}>{post.title}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      <section style={{ marginTop: '3rem', padding: '2.5rem', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', borderRadius: '16px', color: 'white', textAlign: 'center', boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)' }}>
        <h3 style={{ marginTop: 0, fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.01em' }}>Ready to apply this in the gym?</h3>
        <p style={{ opacity: 0.95, marginBottom: '1.5rem', fontSize: '1.05rem' }}>Open Jacked and get an adaptive hypertrophy plan with progression and fatigue management built in.</p>
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ opacity: 0.95, marginBottom: '0.75rem', fontWeight: '600' }}>📱 Also available:</p>
          <a href={`https://apps.apple.com/us/app/jacked/id6757132605?utm_source=jacked_blog&utm_medium=article_cta&utm_campaign=ios_install&utm_content=${slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.85rem 1.5rem', background: 'white', color: '#FFD700', borderRadius: '10px', textDecoration: 'none', fontWeight: '700' }}>
            Start Free Trial in Jacked
          </a>
          <p style={{ marginTop: '0.65rem', marginBottom: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>
            Adaptive hypertrophy programming with progression + fatigue management.
          </p>
        </div>
      </section>
    </div>
  )
}
