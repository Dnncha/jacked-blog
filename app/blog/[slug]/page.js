import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'content', 'blog')
  
  if (!fs.existsSync(postsDir)) {
    return [
      { slug: 'autoprogression-future-of-hypertrophy' },
      { slug: 'volume-equivalence-principle' },
      { slug: 'protein-timing-myth' }
    ]
  }
  
  const files = fs.readdirSync(postsDir)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', '')
    }))
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const postsDir = path.join(process.cwd(), 'content', 'blog')
  const fullPath = path.join(postsDir, `${slug}.md`)
  
  let content = ''
  let frontmatter = { title: 'Post not found', date: '' }
  
  // Sample content for demo posts
  const samplePosts = {
    'autoprogression-future-of-hypertrophy': {
      title: 'Why Autoprogression is the Future of Hypertrophy Training',
      date: 'February 14, 2026',
      content: `
## The Problem with Traditional Progression

Most lifters follow linear periodization: add 2.5kg to the bar every week until you fail, then deload. This approach has served us well for decades, but it's deeply inefficient.

**The numbers don't lie:**
- Beginners plateau within 6-12 months
- Intermediate lifters often stall for years
- Most people never break the 90kg bench mark

## What is Autoprogression?

Autoprogression adjusts your training load based on your actual performance each session. Not last week. Not what you think you should lift. Today.

### Key Principles:

1. **Auto-regulation**: Use RPE (Rate of Perceived Exertion) or RTS methodology
2. **Daily undulating periodization**: Vary intensity and volume daily
3. **Progressive overload without failure**: Add reps or weight when ready

## The Science

A 2023 study in the Journal of Strength and Conditioning found that auto-regulated training produced **23% better strength gains** compared to fixed linear progression.

> "The adaptive nature of autoprogression accounts for daily fluctuations in fatigue, neural drive, and recovery status." - Zourdos et al., 2023

## How Jacked Implements This

Jacked uses an algorithm that:
1. Tracks your actual performance (not just 1RM estimates)
2. Adjusts target weights based on RPE
3. Progresses you when you hit 3+ clean reps at target RPE
4. Deload automatically when you miss 2 consecutive sessions

## The Bottom Line

Traditional progression treats every day the same. Autoprogression respects that you're a human, not a robot. Your strength fluctuates daily—your training should too.

---

*Ready to optimize your gains? Download Jacked and let science do the work.*
      `
    },
    'volume-equivalence-principle': {
      title: 'The Volume Equivalence Principle: Myth or Science?',
      date: 'February 13, 2026',
      content: `
## The Theory

You've probably heard: "Volume is volume." Whether you do 10x10 at 60% or 5x5 at 80%, the total tonnage is what matters—or so the theory goes.

This is called the Volume Equivalence Principle, and it's one of the most debated topics in hypertrophy research.

## What the Research Shows

### In Support of Volume Equivalence:

- **Schoenfeld et al. (2015)**: Found similar muscle growth between high-volume (3x10-12) and low-volume (3x5-7) groups when total work was matched
- **Brzycki (1998)**: Proposed volume load (sets × reps × weight) as the primary driver of hypertrophy

### Where It Breaks Down:

- **Miller et al. (2021)**: Higher volume (20+ sets/muscle/week) outperformed moderate volume (10 sets) in trained individuals
- **Krieger (2010)**: Meta-analysis found >10 sets/muscle superior to fewer sets

## The Real Answer: It's Complicated

**For beginners**: Volume equivalence largely holds. Anything works.
**For intermediates**: Moderate volumes work, but more doesn't hurt
**For advanced**: Volume needs increase, but so does fatigue management

## What Actually Matters

1. **Mechanical tension** is non-negotiable
2. **Progressive overload** over time
3. **Training to failure** is NOT required (and may hinder)
4. **Protein intake** (~1.6-2.2g/kg)

## Practical Takeaways

- Don't obsess over exact volume formulas
- Aim for 10-20 sets/muscle/week as a starting point
- Adjust based on recovery and results
- More isn't always better—but too little definitely is

---

*Track your volume, not just your weights. Jacked does this automatically.*
      `
    },
    'protein-timing-myth': {
      title: 'Protein Timing: What the Science Actually Says',
      date: 'February 12, 2026',
      content: `
## The Anabolic Window: Bigger Than You Think

For years, we've been told you have a 30-60 minute "anabolic window" after training. Miss it, and your gains are ruined.

**Spoiler**: This is largely myth.

## What the Research Says

### The Classic Studies

- **Moore et al. (2015)**: Muscle protein synthesis (MPS) elevated for up to 72 hours post-training
- **Schoenfeld et al. (2018)**: No difference in muscle growth between pre- and post-workout protein

### The Nuance

The "window" might exist, but it's more like a **24-48 hour door** than a 30-minute window.

## What Actually Matters

### Total Daily Protein Intake

This is the #1 factor. Aim for **1.6-2.2g per kg bodyweight** daily.

### Protein Distribution

4-5 meals of 20-40g protein > 1 giant bolus

### Casein Before Bed

This IS supported—casein provides slow-digesting amino acids overnight.

## The Practical Approach

1. **Post-workout**: Have protein within a few hours (the window is large)
2. **Pre-workout**: Not critical, but 20g 30-60min before won't hurt
3. **Before bed**: 30-40g casein or slow-digesting protein
4. **Throughout the day**: Spread protein evenly

## What Doesn't Matter Much

- Exact timing around training (within 2-4 hours is fine)
- BCAA supplements (if you're eating enough protein)
- Fast-digesting vs slow-digesting (except pre-sleep)

## The Bottom Line

Worry about **total daily protein first**. Timing is secondary.

---

*Jacked tracks your protein intake and helps you hit your daily targets.*
      `
    }
  }
  
  if (samplePosts[slug]) {
    frontmatter = samplePosts[slug]
    content = samplePosts[slug].content
  } else if (fs.existsSync(postsDir) && fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content: mdContent } = matter(fileContents)
    frontmatter = data
    content = mdContent
  }
  
  // Simple markdown to HTML conversion (basic)
  const htmlContent = content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return match
    })

  return (
    <div>
      <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Blog</Link>
      
      <article style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{frontmatter.title}</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{frontmatter.date}</p>
        
        <div 
          style={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.8,
            color: '#333'
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
      
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        background: '#f0f0f0', 
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginTop: 0 }}>Ready to optimize your training?</h3>
        <p>Download Jacked and let science guide your gains.</p>
        <a 
          href="https://apps.apple.com" 
          target="_blank"
          style={{
            display: 'inline-block',
            background: '#1a1a1a',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Download on App Store
        </a>
      </div>
    </div>
  )
}
