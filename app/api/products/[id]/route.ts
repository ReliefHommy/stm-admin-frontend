import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'https://api.somtammarket.com';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

// ✅ GET one product
export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const djangoRes = await fetch(`${API_URL}/api/food/products/${id}/`, {
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

// ✅ PATCH update product
export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const contentType = req.headers.get('content-type') || '';
    let djangoRes: Response;

    if (contentType.includes('multipart/form-data')) {
      const headers = new Headers(req.headers);
      headers.delete('host');

      if (token) headers.set('Authorization', `Bearer ${token}`);

      djangoRes = await fetch(`${API_URL}/api/food/products/${id}/`, {
        method: 'PATCH',
        headers,
        body: req.body,
      } as any);
    } else {
      const json = await req.json();
      djangoRes = await fetch(`${API_URL}/api/food/products/${id}/`, {
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
