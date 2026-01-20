//app/admindashboard/vendor-products/page.tsx


import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';




import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'









export default async function VendorProduct() {
      const cookieStore = await cookies()
  const token = cookieStore.get('access_token')
  const API_URL = process.env.API_URL || 'https://api.somtammarket.com';


  if (!token?.value) {
    redirect('/login')
  }

  type Product = {
    id: string | number
    title?: string
    description?: string
    price?: number
    image?: string
  }

  type User = {
    id: string | number
    email: string
  }

let products: Product[] = []
let user: User | null = null
let fetchError: string | null = null


  try {
    const res = await fetch(`${API_URL}/api/food/products/`, {
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
      console.error('Products fetch failed', res.status, txt)
      // Avoid redirecting to a non-existent /dashboard route (causes 307 -> 404).
      // Surface a friendly error message and render an empty list so the page doesn't break.
      fetchError = `Unable to fetch products (server returned ${res.status})`
      products = []
    }

    const data = await res.json().catch(() => null)
    if (Array.isArray(data)) {
      products = data
    } else {
      console.warn('Unexpected products response', data)
      products = []
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
      user = await userRes.json()
    }
  } catch (err) {
    console.error('Error fetching user data', err)
  }








  return (
    <div className="relative">
      {/* Soft warm background like your STM orange vibe */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/70 via-white to-white" />
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Admin • Overview</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
              <span className="ml-2 align-middle text-sm font-semibold text-orange-700/90">
                (STM-Admin)
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              A quick look at Admin User, Vendors, Creators, Partner and Roles & Permissions.
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
            <button className="rounded-full border border-orange-200 bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700">
              This month
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Recent Products */}
          <Card className="border-orange-100/70 bg-white/70 shadow-sm backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Recent Products
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
                <Table>
                  <TableHeader>
                <TableRow className="bg-orange-50/70 hover:bg-orange-50/70">
                      <TableHead className="text-slate-700">Product ID</TableHead>
                      <TableHead className="text-slate-700">name</TableHead>
                      <TableHead className="text-slate-700">Price</TableHead>
                      <TableHead className="text-slate-700">Stocks</TableHead>
                 
                    </TableRow>
                  </TableHeader>

        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.user_id}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.title || "-"}</TableCell>
              <TableCell>
                {product.description
                  ? product.description.slice(0, 60) +
                    (product.description.length > 60 ? "..." : "")
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                {product.price}
              </TableCell>
              <TableCell className="text-center space-x-2">
{product.user_email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                Tip: Click an order to open details (we can wire routing next).
              </div>
            </CardContent>
          </Card>


         
         
        </div>
      </div>
    </div>
  )
}