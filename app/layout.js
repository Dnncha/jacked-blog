import Link from 'next/link'

export const metadata = {
  metadataBase: new URL('https://jacked.coach'),
  title: {
    default: 'Jacked | Intelligent Training',
    template: '%s | Jacked'
  },
  description: 'AI-powered training. No guesswork. No plateaus. The smartest way to build muscle.',
  keywords: ['fitness', 'muscle building', 'hypertrophy', 'ai training', 'workout', 'gym'],
  authors: [{ name: 'Jacked' }],
  creator: 'Jacked',
  publisher: 'Jacked',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jacked.coach',
    siteName: 'Jacked',
    title: 'Jacked | Intelligent Training',
    description: 'AI-powered training. No guesswork. No plateaus.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jacked - Intelligent Training'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jacked | Intelligent Training',
    description: 'AI-powered training. No guesswork. No plateaus.',
    images: ['/og-image.png'],
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Jacked',
          operatingSystem: 'iOS',
          applicationCategory: 'HealthApplication',
          offers: {
            '@type': 'Offer',
            price: '2.99',
            priceCurrency: 'USD'
          },
          url: 'https://jacked.coach',
          downloadUrl: 'https://apps.apple.com/us/app/jacked/id6757132605'
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Who is Jacked for?',
              acceptedAnswer: { '@type': 'Answer', text: 'Jacked is built for intermediate and advanced lifters focused on hypertrophy who want clear progression without guesswork.' }
            },
            {
              '@type': 'Question',
              name: 'Is Jacked free?',
              acceptedAnswer: { '@type': 'Answer', text: 'No. Jacked is a paid iOS app with pricing starting at $3.99 via App Store via App Store subscription.' }
            },
            {
              '@type': 'Question',
              name: 'Does Jacked adapt my training?',
              acceptedAnswer: { '@type': 'Answer', text: 'Yes. Jacked adapts progression and workload from your logged training performance and recovery signals.' }
            }
          ]
        }) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);mixpanel.init('32b861825d2e0b1beca8b2a1ae0f52c1',{autocapture:true,record_sessions_percent:100,api_host:'https://api-eu.mixpanel.com'});`
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('click',function(e){const a=e.target.closest('[data-nav-section]');if(a){window.mixpanel?.track?.('nav_click',{section:a.getAttribute('data-nav-section')||'unknown'});}const c=e.target.closest('[data-global-cta]');if(c){window.mixpanel?.track?.('cta_click',{placement:c.getAttribute('data-global-cta')||'unknown',target:'app_store'});}});` }} />
      </head>
      <body style={{
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: 1.6,
        color: '#e5e5e5',
        backgroundColor: '#000000'
      }}>
        <header style={{
          backgroundColor: '#000000',
          borderBottom: '1px solid #333',
          color: 'white',
          padding: '1rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <nav style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <Link href="/" style={{ color: '#FFD700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ 
                fontSize: '1.5rem', 
                fontWeight: '900', 
                letterSpacing: '0.15em', 
                fontStyle: 'normal',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                JACKED
              </span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/#articles" style={{ color: '#888', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Science Library</a>
              <a href="https://apps.apple.com/us/app/jacked/id6757132605?utm_source=jacked_blog&utm_medium=header_cta" target="_blank" rel="noopener noreferrer" style={{ 
                color: '#111', 
                textDecoration: 'none', 
                fontWeight: '700',
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 8px rgba(255,215,0,0.3)',
                display: 'inline-block'
              }} onMouseOver="this.style.transform='scale(1.05)'" onMouseOut="this.style.transform='scale(1)'">Start Free Trial →</a>
            </div>
          </nav>
        </header>
        <main style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem 1rem',
          minHeight: 'calc(100vh - 200px)',
          backgroundColor: '#000000'
        }}>
          {children}
        </main>
        <footer style={{
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid #222',
          color: '#666',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>© 2026 Jacked. Intelligent training.</p>
        </footer>
      </body>
    </html>
  )
}
