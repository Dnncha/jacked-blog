export const metadata = {
  title: 'About | Jacked',
  description: 'The science behind muscle building, progression, and optimal training.',
}

export default function About() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
        About Jacked
      </h1>
      
      <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#555', marginBottom: '2rem' }}>
        Jacked is an evidence-based fitness platform helping you build muscle, get stronger, and optimize your training through science — not hype.
      </p>
      
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>Our Mission</h2>
      <p style={{ lineHeight: '1.7', color: '#555' }}>
        The fitness industry is full of misinformation, expensive supplements, and fad diets that don't work. 
        We're here to cut through the noise and give you evidence-based insights you can actually trust.
      </p>
      
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>What We Cover</h2>
      <ul style={{ lineHeight: '1.9', color: '#555', paddingLeft: '1.5rem' }}>
        <li>Muscle building science and hypertrophy research</li>
        <li>Training methodology and periodization</li>
        <li>Nutrition and supplement evidence reviews</li>
        <li>Recovery and sleep optimization</li>
        <li>Training tools and technology</li>
      </ul>
      
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem' }}>The App</h2>
      <p style={{ lineHeight: '1.7', color: '#555' }}>
        Our iOS app uses autoprogression — automatically adjusting your training load based on your actual performance. 
        No more guessing, no more plateaus.
      </p>
      
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', 
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(255,107,53,0.3)'
      }}>
        <h3 style={{ marginTop: 0, color: '#fff', fontSize: '1.5Ready to get jrem' }}>acked?</h3>
        <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.95)' }}>
          Join thousands of lifters using adaptive progression to break plateaus.
        </p>
        <a 
          href="https://apps.apple.com/us/app/jacked/id6757132605?utm_source=jacked_coach&utm_medium=about_page&utm_campaign=ios_install"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: '#fff',
            color: '#FFA500',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem'
          }}
        >
          Start Free Trial — $3.99/mo
        </a>
        <p style={{ marginTop: '0.75rem', marginBottom: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
          Free 7-day trial via App Store • Cancel anytime
        </p>
      </div>
      
      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
        <p>© 2026 Jacked.coach — Science-based fitness insights</p>
      </footer>
    </div>
  )
}
