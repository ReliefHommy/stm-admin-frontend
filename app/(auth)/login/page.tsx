//app/(auth)/login/page.tsx
'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'


export default function LoginPage() {
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')

    if (!email || !password) {
      alert('Please enter email and password.')
      return
    }

    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (r.ok) {
      router.replace('/stm-admin/AdminDashboard')
      return
    }

    const msg = await r.text()
    alert(msg || 'Login failed.')
  }

  const heroSrc = '/images/hero_slide-1.png' // put this file in /public/images/

  return (
    <main className="min-h-screen bg-slate-950 text-white">
    

      <section className="relative min-h-[calc(100vh-64px)] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroSrc})` }}
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

        {/* Content */}
        <div className="relative w-full">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Hero text */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Superuser only
                </div>

                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  STM Admin Dashboard
                </h1>

                <p className="max-w-prose text-white/85">
                  Sign in to manage Products, Partner Stores, Locations, Orders, and Studio CMS
                  content—fast and efficient.
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-white/90">
                  <span className="rounded bg-white/10 px-2 py-1">Products</span>
                  <span className="rounded bg-white/10 px-2 py-1">Stores</span>
                  <span className="rounded bg-white/10 px-2 py-1">Locations</span>
                  <span className="rounded bg-white/10 px-2 py-1">Campaigns</span>
                  <span className="rounded bg-white/10 px-2 py-1">Design Templates</span>
                </div>
              </div>

              {/* Form card */}
              <div className="lg:flex lg:justify-end">
                <div className="w-full max-w-md rounded-2xl bg-black/30 p-6 backdrop-blur-md ring-1 ring-white/15">
                  <h2 className="text-xl font-semibold">Sign in</h2>
                  <p className="mt-1 text-sm text-grey/75">
                    Use your superuser email and password.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-white/90">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@domain.com"
                        className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm text-white/90">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-white px-3 py-2 font-medium text-slate-900 hover:bg-white/90"
                    >
                      Login → Admin
                    </button>

                    <p className="text-xs text-white/60">
                      Trouble signing in? Verify you’re using a superuser account.
                    </p>
                  </form>
                </div>
              </div>
              {/* /Form card */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
