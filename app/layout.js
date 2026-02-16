import Link from 'next/link'

export const metadata = {
  title: 'Jacked | Science-Based Fitness',
  description: 'The science of optimal muscle building. Evidence-based insights for maximizing hypertrophy.',
  openGraph: {
    title: 'Jacked | Science-Based Fitness',
    description: 'The science of optimal muscle building. Evidence-based insights for maximizing hypertrophy.',
    url: 'https://jacked-blog.vercel.app',
    siteName: 'Jacked',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jacked | Science-Based Fitness',
    description: 'The science of optimal muscle building. Evidence-based insights for maximizing hypertrophy.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.6,
        color: '#333',
        backgroundColor: '#fafafa'
      }}>
        <header style={{
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <nav style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
              🏋️ Jacked
            </Link>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</Link>
              <a href="https://apps.apple.com" target="_blank" style={{ color: '#ccc', textDecoration: 'none' }}>App</a>
            </div>
          </nav>
        </header>
        <main style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem 1rem',
          minHeight: 'calc(100vh - 200px)'
        }}>
          {children}
        </main>
        <footer style={{
          backgroundColor: '#1a1a1a',
          color: '#666',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <p>© 2026 Jacked. Science-backed fitness.</p>
        </footer>
      </body>
    </html>
  )
}
