// app/admindashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";

type UserProfile = {
  id: number;

  user_id?: number | null;
  email?: string | null;

  is_vendor?: boolean;
  is_customer?: boolean;

  phone?: string | null;
  avatar?: string | null;
  address?: string | null;
};




import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  TrendingDown,
  Store,
  Package,
  FileText,
  ArrowUpRight,
  UserX2Icon,
} from 'lucide-react'

// Mock data
const stats = [
  { title: 'Stores', value: 24, change: 12, changeType: 'increase' as const, icon: Store },
  { title: 'Products', value: 156, change: -3, changeType: 'decrease' as const, icon: Package },
  { title: 'Users', value: 89, change: 8, changeType: 'increase' as const, icon: UserX2Icon },
  { title: 'Posts', value: 42, change: 15, changeType: 'increase' as const, icon: FileText },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', status: 'Completed', amount: '$129.99' },
  { id: 'ORD-002', customer: 'Jane Smith', status: 'Pending', amount: '$79.50' },
  { id: 'ORD-003', customer: 'Bob Johnson', status: 'Shipped', amount: '$299.99' },
  { id: 'ORD-004', customer: 'Alice Brown', status: 'Processing', amount: '$49.99' },
]

const recentItems = [
  { id: '1', title: 'Wireless Headphones', type: 'Product', image: '/placeholder.jpg' },
  { id: '2', title: 'Summer Sale Post', type: 'Post', image: '/placeholder.jpg' },
  { id: '3', title: 'Smart Watch', type: 'Product', image: '/placeholder.jpg' },
  { id: '4', title: 'New Collection', type: 'Post', image: '/placeholder.jpg' },
]

function statusBadgeClass(status: string) {
  // Warm orange theme + calm neutrals (like modern admin templates)
  switch (status) {
    case 'Completed':
      return 'bg-lime-50 text-lime-700 border-lime-200'
    case 'Pending':
      return 'bg-lime-50 text-amber-800 border-lime-200'
    case 'Shipped':
      return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'Processing':
      return 'bg-orange-50 text-lime-800 border-lime-200'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

export default async function AdminSTMDashboard() {
  const token = (await cookies()).get('access_token');
  const users: UserProfile[] = [];
  const loading = false;
  const error: string | null = null;
  

 if (!token?.value) redirect('/login');

  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/me/`, {
   
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
     cache: 'no-store',
    // If you need credentials, add: credentials: 'include'
  });

  if (!res.ok) redirect('/login');

  const user = await res.json();












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
                (Foods)
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

        {/* Quick Stat Tiles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const isUp = stat.changeType === 'increase'
            return (
              <Card
                key={stat.title}
                className="group relative overflow-hidden border-lime-100/70 bg-white/70 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                {/* subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-200 opacity-70" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-700">
                    {stat.title}
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-lime-100 bg-lime-50 text-lime-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    {isUp ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-rose-600" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>

                    <div
                      className={[
                        'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold',
                        isUp
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-rose-200 bg-rose-50 text-rose-700',
                      ].join(' ')}
                    >
                      <span>{stat.change > 0 ? '+' : ''}{stat.change}%</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">Compared to last month</p>

                  {/* mini progress bar vibe */}
                  <div className="h-2 w-full rounded-full bg-lime-100/60">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-lime-600 to-lime-400"
                      style={{
                        width: `${Math.min(100, Math.max(8, Math.abs(stat.change) * 6))}%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity Feed */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Latest Orders */}
          <Card className="border-orange-100/70 bg-white/70 shadow-sm backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Users
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-orange-50/70 hover:bg-orange-50/70">
                      <TableHead className="text-slate-700">User ID</TableHead>
                      <TableHead className="text-slate-700">Customer</TableHead>
                      <TableHead className="text-slate-700">Status</TableHead>
                      <TableHead className="text-right text-slate-700">Amount</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={user.id} className="hover:bg-orange-50/40">
                        <TableCell className="font-semibold text-slate-900">
                          {user.id}
                        </TableCell>
                        <TableCell className="text-slate-700">{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={[
                              'rounded-full px-2.5 py-1 text-xs font-semibold',
                              statusBadgeClass(order.status),
                            ].join(' ')}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-slate-900">
                          {order.amount}
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

          {/* Latest Products/Posts */}
          <Card className="border-orange-100/70 bg-white/70 shadow-sm backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                   My Profile - @{user.email}
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Last 7 days</span>
            </CardHeader>

                     <CardContent className="space-y-4">

         
                       {/* Small “callout” panel like admin templates */}
                       <div className="rounded-2xl border border-orange-200/80 bg-gradient-to-r from-orange-50 to-amber-50 p-4">
                         <p className="text-sm font-semibold text-slate-900">
                           My Infomations: @{user.email} ✨
                         </p>
             <p className="text-gray-600">My ID: {user.id}</p>
              <p className="text-gray-600">Partner: {user.is_partner ? 'Yes' : 'No'} My Shop ID{user.id}</p>
              <p className="text-gray-600">Customer: {user.is_customer ? 'Yes' : 'No'}</p>
                         <p className="mt-1 text-sm text-slate-600">
                           My Store Address
                         </p>
                       </div>
                     </CardContent>
          </Card>
        </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
     <Card className="border-orange-100/70 bg-white/70 shadow-sm backdrop-blur">    
                    <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Latest Orders
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </CardHeader>
     <CardContent>
      <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead className="text-left">User Rolle</TableHead>
            <TableHead>Profile ID</TableHead>
           
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

    <TableBody>
  {loading && (
    <TableRow>
      <TableCell colSpan={6}>Loading…</TableCell>
    </TableRow>
  )}

  {!loading && error && (
    <TableRow>
      <TableCell colSpan={6} className="text-red-600">
        {error}
      </TableCell>
    </TableRow>
  )}

  {!loading && !error && users.length === 0 && (
    <TableRow>
      <TableCell colSpan={6}>No profiles found.</TableCell>
    </TableRow>
  )}

  {!loading && !error && users.map((p) => (
    <TableRow key={p.id}>
      {/* Avatar */}
      <TableCell>
        {p.avatar ? (
          <img
            src={p.avatar}
            alt={`profile-${p.id}`}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 rounded bg-gray-100" />
        )}
      </TableCell>

      {/* User ID */}
      <TableCell>{p.user_id ?? "-"}</TableCell>

      {/* Email */}
      <TableCell>{p.email ?? "-"}</TableCell>

      {/* Roles (simple text) */}
      <TableCell>
        <div className="text-sm text-gray-600">
          Vendor: {p.is_vendor ? "Yes" : "No"} <br />
          Customer: {p.is_customer ? "Yes" : "No"}
        </div>
      </TableCell>

      {/* Profile ID */}
      <TableCell className="text-right">{p.id}</TableCell>

      {/* Actions */}
      <TableCell className="text-center space-x-2">
        <Button variant="ghost" size="sm">Edit</Button>
        <Button variant="ghost" size="sm">Delete</Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    
    
    </div></CardContent> 
    </Card>

    
    
     </div>
      </div>
    </div>
  )
}
