'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const wrapperRef = useRef(null)
  const router = useRouter()
  
  // Load posts on mount
  useEffect(() => {
    fetch('/api/search')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to load search index:', err))
  }, [])
  
  // Search when query changes
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    
    const q = query.toLowerCase()
    const filtered = posts
      .filter(post => 
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q)
      )
      .slice(0, 5)
    
    setResults(filtered)
    setIsOpen(true)
  }, [query, posts])
  
  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleSelect = (slug) => {
    setQuery('')
    setIsOpen(false)
    router.push(`/blog/${slug}`)
  }
  
  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
        style={{
          width: '100%',
          padding: '10px 16px',
          fontSize: '15px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '10px',
          outline: 'none',
          transition: 'border-color 0.2s, background 0.2s',
          background: 'rgba(255,255,255,0.15)',
          color: 'white',
          fontWeight: '500'
        }}
      />
      
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          marginTop: '8px',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          {results.map(post => (
            <button
              key={post.slug}
              onClick={() => handleSelect(post.slug)}
              style={{
                width: '100%',
                padding: '14px 16px',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: '1px solid #ffebe0',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#fff5f0'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px', color: '#FFD700' }}>
                {post.title}
              </div>
              <div style={{ fontSize: '13px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {post.excerpt || post.content.slice(0, 80)}...
              </div>
            </button>
          ))}
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          marginTop: '8px',
          padding: '16px',
          textAlign: 'center',
          color: '#666',
          fontWeight: '500'
        }}>
          No articles found for "{query}"
        </div>
      )}
    </div>
  )
}
