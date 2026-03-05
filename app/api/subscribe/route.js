async function parseRequest(request) {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const data = await request.json()
    return {
      email: data?.email,
      source: data?.source || 'jacked-blog',
      campaign: data?.campaign || 'default',
    }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const form = await request.formData()
    return {
      email: form.get('email')?.toString(),
      source: form.get('source')?.toString() || 'jacked-blog',
      campaign: form.get('campaign')?.toString() || 'default',
    }
  }

  return { email: null, source: 'jacked-blog', campaign: 'unknown' }
}

export async function POST(request) {
  try {
    const { email, source, campaign } = await parseRequest(request)

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }

    try {
      await fetch('http://100.69.16.54:18900/subscriber', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, campaign }),
        signal: AbortSignal.timeout(5000),
      })
    } catch (e) {
      console.log(`[NEWSLETTER] New subscriber: ${email} source=${source} campaign=${campaign}`)
    }

    return Response.json({ success: true, message: 'Subscribed!' })
  } catch (error) {
    return Response.json({ error: 'Unable to process subscription' }, { status: 500 })
  }
}
