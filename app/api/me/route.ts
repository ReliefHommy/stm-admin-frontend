// app/api/me/route.ts
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://api.somtammarket.com"

const TOKEN_COOKIE = process.env.NEXT_PUBLIC_STM_TOKEN_COOKIE || "access_token"

async function readJsonSafe(res: Response) {
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : null
  } catch {
    return { raw: text }
  }
}

export async function GET() {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const res = await fetch(`${API_URL}/api/my-profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    })

    const data = await readJsonSafe(res)

    if (!res.ok) {
      return NextResponse.json(
        { error: (data as any)?.detail || "Failed to fetch profile", data },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}