'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

const PAGE_SIZE = 24

export default function HomeClient({ allPosts, categories }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let results = allPosts
    if (selectedCategory) results = results.filter(p => p.category === selectedCategory)
    if (query) {
      const q = query.toLowerCase().trim()
      results = results.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    }
    const sorted = [...results]
    if (sortBy === 'oldest') sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
    else if (sortBy === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title))
    else sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    return sorted
  }, [allPosts, selectedCategory, query, sortBy])

  const visiblePosts = filtered.slice(0, visibleCount)
  const canLoadMore = visibleCount < filtered.length

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 16px 60px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', backgroundColor: '#000000', minHeight: '100vh' }}>
      {/* Hero - IMPROVED */}
      <div style={{ 
        textAlign: 'center', 
        padding: '56px 32px', 
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)', 
        borderRadius: '20px', 
        marginBottom: '24px', 
        border: '1px solid #2a2a2a',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '6px 16px', 
          background: 'rgba(255,215,0,0.1)', 
          border: '1px solid rgba(255,215,0,0.3)', 
          borderRadius: '20px',
          marginBottom: '16px'
        }}>
          <span style={{ color: '#FFD700', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>ADAPTIVE HYERTROPHY ENGINE</span>
        </div>
        
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
          <span style={{ color: '#FFD700' }}>JACKED</span>
        </h1>
        
        <p style={{ margin: '0 auto 28px', maxWidth: '520px', color: '#999', fontSize: '1.15rem', lineHeight: 1.6 }}>Auto-progression and fatigue management built in. Every session has a clear next step — no guessing, no plateaus.</p>
        
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <a href="https://apps.apple.com/us/app/jacked/id6757132605?utm_source=jacked_blog&utm_medium=hero_cta" style={{ 
            display: 'inline-block', 
            padding: '16px 36px', 
            borderRadius: '12px', 
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', 
            color: '#000', 
            fontWeight: 700, 
            textDecoration: 'none', 
            fontSize: '1rem', 
            boxShadow: '0 4px 24px rgba(255,215,0,0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 32px rgba(255,215,0,0.35)'; }}
          onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 24px rgba(255,215,0,0.25)'; }}
          >Start Free Trial</a>
          <a href="#articles" style={{ 
            display: 'inline-block', 
            padding: '16px 36px', 
            borderRadius: '12px', 
            border: '1px solid #3a3a3a', 
            color: '#ccc', 
            textDecoration: 'none', 
            fontWeight: 600, 
            fontSize: '1rem',
            transition: 'border-color 0.2s, background 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.borderColor = '#555'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
          onMouseOut={(e) => { e.target.style.borderColor = '#3a3a3a'; e.target.style.background = 'transparent'; }}
          >Browse Science Library</a>
        </div>
        
        <p style={{ margin: '0', color: '#666', fontSize: '0.85rem' }}>
          <span style={{ color: '#4ade80' }}>✓</span> $3.99 via App Store &nbsp;•&nbsp; Pro features $9.99/yr
        </p>
      </div>

      {/* Stats Credibility Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '32px', 
        marginBottom: '32px', 
        flexWrap: 'wrap',
        padding: '20px',
        background: '#0d0d0d',
        borderRadius: '12px',
        border: '1px solid #1a1a1a'
      }}>
        {[
          ['245+', 'Science Articles'],
          ['Auto-Progression', 'Engine Built-In'],
          ['10min', 'In-Gym Logging']
        ].map(([num, label], i) => (
          <div key={label} style={{ textAlign: 'center', padding: '0 16px', borderRight: i < 2 ? '1px solid #222' : 'none' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{num}</div>
            <div style={{ fontSize: '0.8rem', color: '#777', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '14px', 
        marginBottom: '28px' 
      }}>
        {[
          ['Adaptive Progression', 'Weights increase when you hit your targets — never guess. Stop spinning wheels.', '📈'],
          ['Fatigue Management', 'Know exactly when to push and when to deload based on performance data.', '⚡'],
          ['Volume Targeting', 'Hit the optimal weekly sets for each muscle group automatically.', '🎯'],
          ['In-Gym Speed', 'Log fast, train hard, done in 10 minutes. No app clutter.', '⏱️']
        ].map(([title, desc, icon]) => (
          <div key={title} style={{ 
            padding: '20px', 
            background: '#0f0f0f', 
            borderRadius: '14px', 
            border: '1px solid #1a1a1a',
            transition: 'border-color 0.2s, transform 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{icon}</div>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', fontSize: '0.95rem' }}>{title}</div>
            <div style={{ color: '#666', fontSize: '0.82rem', lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>


      <div style={{ 
        marginBottom: '28px', 
        padding: '20px', 
        borderRadius: '14px', 
        border: '1px solid #1a1a1a', 
        background: '#0a0a0a' 
      }}>
        <p style={{ margin: '0 0 14px', color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
          <span style={{ color: '#FFD700', marginRight: '6px' }}>◆</span> Start here (free):
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            ['/blog/ultimate-science-muscle-hypertrophy-guide', 'Hypertrophy Guide (13k words)'],
            ['/blog/how-to-progress-gym-framework', 'Progress Framework'],
            ['/blog/best-supplements-strength-athletes', 'Supplements Rankings']
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, background: '#1a1a1a', border: '1px solid #333', color: '#ddd' }}>{label}</a>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div id="articles">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Science Library ({allPosts.length} articles)</h2>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{filtered.length} articles</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE) }}
            style={{ flex: '1 1 200px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '0.9rem' }}
          />
          <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setVisibleCount(PAGE_SIZE) }} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: '#ddd', fontSize: '0.9rem' }}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">A-Z</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button onClick={() => { setSelectedCategory(''); setVisibleCount(PAGE_SIZE) }} style={{ padding: '6px 14px', borderRadius: '20px', border: selectedCategory === '' ? '2px solid #FFD700' : '1px solid #333', background: selectedCategory === '' ? '#FFD700' : '#111', color: selectedCategory === '' ? '#111' : '#888', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>All</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setVisibleCount(PAGE_SIZE) }} style={{ padding: '6px 14px', borderRadius: '20px', border: selectedCategory === cat ? '2px solid #FFD700' : '1px solid #333', background: selectedCategory === cat ? '#FFD700' : '#111', color: selectedCategory === cat ? '#111' : '#888', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {visiblePosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article style={{ background: '#141414', borderRadius: '10px', padding: '16px', border: '1px solid #2a2a2a', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', background: '#FFD700', color: '#111', fontWeight: 700, fontSize: '0.7rem', alignSelf: 'flex-start', marginBottom: '10px' }}>{post.category}</span>
                <h3 style={{ margin: '0 0 8px', color: '#fff', fontSize: '1rem', lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>{post.date}</p>
              </article>
            </Link>
          ))}
        </div>

        {canLoadMore && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button onClick={() => setVisibleCount(c => c + PAGE_SIZE)} style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #444', background: '#111', color: '#ddd', cursor: 'pointer', fontWeight: 600 }}>Load more</button>
          </div>
        )}

        {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>No articles found.</p>}
      </div>

      {/* Final Conversion CTA */}
      <div style={{ marginTop: '28px', padding: '18px', borderRadius: '12px', border: '1px solid #3a2f00', background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,165,0,0.08))', textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', color: '#FFD700', fontWeight: 800, fontSize: '1rem' }}>Done reading? Start your 7-day Jacked trial.</p>
        <p style={{ margin: '0 0 14px', color: '#aaa', fontSize: '0.88rem' }}>Get adaptive progression, fatigue management, and a clear plan for every session.</p>
        <a href="https://apps.apple.com/us/app/jacked/id6757132605?utm_source=jacked_blog&utm_medium=final_cta" style={{ display: 'inline-block', padding: '12px 22px', borderRadius: '10px', background: '#FFD700', color: '#111', fontWeight: 800, textDecoration: 'none', fontSize: '0.95rem' }}>Start Free iPhone Trial</a>
      </div>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #222', textAlign: 'center', color: '#555', fontSize: '0.85rem' }}>
        <p>© 2026 Jacked.coach</p>
      </footer>
    </div>
  )
}
