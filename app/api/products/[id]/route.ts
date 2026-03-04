import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'https://api.somtammarket.com';
export const dynamic = 'force-dynamic';

// ✅ GET one product (prefill edit form)
export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const djangoRes = await fetch(`${API_URL}/api/food/products/${ctx.params.id}/`, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    const raw = await djangoRes.text();
    let data: any = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }

    return NextResponse.json(data ?? {}, { status: djangoRes.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}

// ✅ PATCH update product (save edit form)
export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const contentType = req.headers.get('content-type') || '';
    let djangoRes: Response;

    if (contentType.includes('multipart/form-data')) {
      const headers = new Headers(req.headers);
      headers.delete('host');

      if (token) headers.set('Authorization', `Bearer ${token}`);

      djangoRes = await fetch(`${API_URL}/api/food/products/${ctx.params.id}/`, {
        method: 'PATCH',
        headers,
        body: req.body,
      } as any);
    } else {
      const json = await req.json();
      djangoRes = await fetch(`${API_URL}/api/food/products/${ctx.params.id}/`, {
        method: 'PATCH',
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

    return NextResponse.json(data ?? {}, { status: djangoRes.status });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}