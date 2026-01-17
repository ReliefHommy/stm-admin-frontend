// lib/api.ts
export type ApiError = Error & { status?: number; details?: any }

export async function apiFetch<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string> | undefined),
    },
    ...init,
  })

  if (res.status === 204) return undefined as unknown as T

  const text = await res.text().catch(() => '')
  let data: any = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const err = new Error(data?.error || data?.message || `Request failed with status ${res.status}`) as ApiError
    err.status = res.status
    err.details = data
    throw err
  }

  return data as T
}