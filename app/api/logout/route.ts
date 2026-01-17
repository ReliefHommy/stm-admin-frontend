// /app/api/logout/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')  // 🔐 Delete the token cookie

  return NextResponse.json({ success: true })
}