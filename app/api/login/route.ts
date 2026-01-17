// app/api/login/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE
  if (!apiBase) {
    return NextResponse.json({ error: 'Missing API base URL' }, { status: 500 })
  }

  const response = await fetch(`${apiBase}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      password,
    }),
  })

  const text = await response.text()
  let data: any = {}
  try {
    data = text ? JSON.parse(text) : {}
  } catch {}

  if (!response.ok) {
    // helpful for debugging: pass through detail
    return NextResponse.json(
      { error: data?.detail || data || 'Invalid credentials' },
      { status: response.status || 401 }
    )
  }

  if (!data?.access) {
    return NextResponse.json({ error: 'Token missing in response' }, { status: 500 })
  }

  const res = NextResponse.json({ success: true })

  res.cookies.set('access_token', data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60,
    path: '/',
  })

  return res
}

export async function GET() {
  const token = cookies().get('access_token')?.value
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })
  return NextResponse.json({ authenticated: true })
}

