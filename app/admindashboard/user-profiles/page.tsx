//app/foo-d-dashboard/products/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'



export default async function UserProfileDashboard() {
      const cookieStore = await cookies()
  const token = cookieStore.get('access_token')
  const API_URL = process.env.API_URL || 'https://api.somtammarket.com';


  if (!token?.value) {
    redirect('/login')
  }



  type User = {
    id: string | number
    email: string
  }

let users: User[] = []
let fetchError: string | null = null


  try {
    const res = await fetch(`${API_URL}api/food/userprofiles/`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      cache: 'no-store',
    })

    if (res.status === 401) {
      // token invalid/expired
      redirect('/login')
    }

    if (!res.ok) {
      // Log server error body for debugging (don't leak to UI)
      const txt = await res.text().catch(() => '')
      console.error('Users fetch failed', res.status, txt)
      // Avoid redirecting to a non-existent /dashboard route (causes 307 -> 404).
      // Surface a friendly error message and render an empty list so the page doesn't break.
      fetchError = `Unable to fetch products (server returned ${res.status})`
      users = []
    }

    const data = await res.json().catch(() => null)
    if (Array.isArray(data)) {
      users = data
    } else {
      console.warn('Unexpected products response', data)
      users = []
    }
  } catch (err) {
    console.error('Network error fetching products', err)
    fetchError = 'Network error fetching products'
  }

  // Fetch user data
  try {
    const userRes = await fetch(`${API_URL}/api/me/`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      cache: 'no-store',
    })

    if (userRes.ok) {
    }
  } catch (err) {
    console.error('Error fetching user data', err)
  }






  return (
    <div className="relative">
      {/* Soft warm background like your STM orange vibe */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-lime-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-lime-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-lime-50/70 via-white to-white" />
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Admin • Overview</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
              <span className="ml-2 align-middle text-sm font-semibold text-lime-700/90">
                (My Products)
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              A quick look at stores, restaurangs,products, orders, and content performance.
            </p>
          </div>

          {/* Simple “filter pills” (no extra component needed) */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-full border border-orange-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white">
              Today
            </button>
            <button className="rounded-full border border-orange-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white">
              This week
            </button>
            <button className="rounded-full border border-orange-200 bg-lime-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700">
              This month
            </button>
          </div>
        </div>



        {/* Recent Activity Feed */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Latest Orders */}
          <Card className="border-orange-100/70 bg-white/70 shadow-sm backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                User Lists
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </CardHeader>



  
            {/* User Profile Data */}

                                    <CardContent>
              <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
                <Table>
                            <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>user</TableHead>
            <TableHead>email</TableHead>
            <TableHead className="text-right">ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>
                <img
                  src={user.avatar}
                  alt={user.id}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{user.id || "-"}</TableCell>
              <TableCell>
                {user.email
                  ? user.bio.slice(0, 40) +
                    (user.bio.length > 40 ? "..." : "")
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                {user.id}
              </TableCell>
              <TableCell className="text-center space-x-2">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="icon">
                
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

                </Table>
              </div>


            </CardContent>



          </Card>


        </div>
      </div>
    </div>
  )
}