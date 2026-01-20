// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';


const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'https://api.somtammarket.com';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const contentType = req.headers.get('content-type') || '';
    let djangoRes: Response;

    if (contentType.includes('multipart/form-data')) {
            // Forward the raw body and headers (except host)
      const headers = new Headers(req.headers);
      headers.delete('host'); // Remove host header if present

      if (token) headers.set('Authorization', `Bearer ${token}`);

      djangoRes = await fetch(`${API_URL}/api/food/products/`, {
        method: 'POST',
        headers,
        body: req.body,
      } as any);
    } else {
      // JSON request
      const json = await req.json();
      djangoRes = await fetch(`${API_URL}/api/food/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(json),
      });
    }

    const raw = await djangoRes.text();
    let data: any = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }

    if (!djangoRes.ok) {
      
      return NextResponse.json(data ?? {}, { status: djangoRes.status });
    }

    return NextResponse.json(data ?? {}, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}