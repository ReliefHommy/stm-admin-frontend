'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Package,
  Store,
 
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Home,
  DoorOpen,
  Paintbrush,
  UserCheck,

} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/admindashboard', icon: Home },
  { name: 'Userprofiles', href: 'admindashboard/user-profiles', icon: UserCheck },
  { name: 'Creators', href: '/admindashboard', icon: Paintbrush },
  { name: 'Vendors Stores', href: '/admindashboard', icon: Store },
  { name: 'Vendor Products', href: '/admindashboard/products', icon: Package},
  { name: 'Customers', href: '/admindashboard', icon: ShoppingCart },
  { name: 'Roles & Permissions', href: '/admindashboard', icon: DoorOpen },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col bg-amber-700 text-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-lime-700">
        {!collapsed && <h2 className="text-lg font-semibold">Admin</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-amber-900"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white hover:bg-amber-800",
                  collapsed ? "px-2" : "px-4",
                  isActive && "bg-amber-700"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}