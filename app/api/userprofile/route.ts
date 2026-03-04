// app/api/userprofile/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "https://api.somtammarket.com").replace(/\/$/, "");
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = (await cookies()).get("access_token")?.value;

    const djangoRes = await fetch(`${API_BASE}/api/food/userprofile/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    const raw = await djangoRes.text();
    let data: any = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = raw; }

    return NextResponse.json(data ?? {}, { status: djangoRes.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
     