'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export default function SearchablePosts({ allPosts, categories }) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const filtered = useMemo(() => {
    let results = allPosts
    
    if (selectedCategory) {
      results = results.filter(p => p.category === selectedCategory)
    }
    
    if (query) {
      const q = query.toLowerCase()
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
      )
    }
    
    return results.slice(0, 20)
  }, [allPosts, query, selectedCategory])
  
  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '1rem'
          }}
        />
        
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: selectedCategory === '' ? '2px solid #1a1a1a' : '1px solid #ddd',
              background: selectedCategory === '' ? '#1a1a1a' : 'white',
              color: selectedCategory === '' ? 'white' : '#555',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: selectedCategory === cat ? '2px solid #1a1a1a' : '1px solid #ddd',
                background: selectedCategory === cat ? '#1a1a1a' : 'white',
                color: selectedCategory === cat ? 'white' : '#555',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results Count */}
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>
        {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
      </p>
      
      {/* Results Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filtered.map(post => (
          <article key={post.slug} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #eee'
          }}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span style={{ 
                display: 'inline-block',
                padding: '0.25rem 0.5rem',
                background: '#f0f0f0',
                borderRadius: '4px',
                fontSize: '0.75rem',
                color: '#666',
                marginBottom: '0.5rem'
              }}>
                {post.category}
              </span>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
                {post.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: '1.5' }}>
                {post.excerpt}
              </p>
              <span style={{ color: '#888', fontSize: '0.8rem' }}>{post.date}</span>
            </Link>
          </article>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
          No articles found. Try a different search term.
        </p>
      )}
    </div>
  )
}
