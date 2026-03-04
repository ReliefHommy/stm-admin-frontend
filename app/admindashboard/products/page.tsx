//app/admindashboard/products/page.tsx



import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} 
from "@/components/ui/table"


import Link from "next/link"
import { Button } from '@/components/ui/button'
import { Trash2 } from "lucide-react"

//import { Pencil } from "lucide-react"


export default async function VendorProducts() {
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
  <div className="p-6">
    {fetchError ? (
      <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
        {fetchError}. Please try again later.
      </div>
    ) : null}
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-600">
       {user ? `${user.id}:${user.email}'s Products` : 'Products'}
      </h1>

      <Link
        href="/admindashboard/products/new"
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        + Add Product
      </Link>
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Img</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.title}
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
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>


  </div>
);
}