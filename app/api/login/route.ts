//app/api/login/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()
 

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,  // ✅ using email as username
      password: password,

      
    }
  ),
  })



  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }


 // ✅ Use NextResponse to set cookie
  const res = NextResponse.json({ success: true })

  res.cookies.set('access_token', data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60,
    path: '/',
  });  

  return res
}

export async function GET() {
  const cookieStore = cookies()
  const token = (await cookieStore).get('access_token')

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true })
}