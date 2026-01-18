//components/studio/sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Package,
  Store,
  MapPin,
  ShoppingCart,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  DoorOpen
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/entry-doorway', icon: Home },
  { name: 'Internal Admins', href: '/admindashboard', icon: DoorOpen },
  { name: 'Partner Stores', href: '/stm-admin/stores', icon: Store },
  { name: 'Store Locations', href: '/stm-admin/stores/locations', icon: MapPin },
  { name: 'Orders', href: '/stm-admin/orders', icon: ShoppingCart },
  { name: 'Posts', href: '/stm-admin/posts', icon: FileText },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col bg-teal-600 text-white transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h2 className="text-lg font-semibold">Studio</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-800"
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
                  "w-full justify-start text-white hover:bg-teal-700",
                  collapsed ? "px-2" : "px-4",
                  isActive && "bg-gray-700"
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