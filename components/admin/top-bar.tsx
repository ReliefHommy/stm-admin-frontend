'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/lib/admin-context'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Search, ChevronDown, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export function TopBar() {
  const { currentStore, setCurrentStore, stores } = useAdmin()
  const [searchOpen, setSearchOpen] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLogout = () => {
    // Clear token
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/login')
  }

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <Button
          variant="outline"
          className="w-full justify-start text-sm text-muted-foreground"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search everything...
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Context Selector */}
      <div className="mx-4">
        <Popover open={storeOpen} onOpenChange={setStoreOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between">
              {currentStore ? currentStore.name : 'All Stores'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <Command>
              <CommandInput placeholder="Search stores..." />
              <CommandList>
                <CommandEmpty>No stores found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setCurrentStore(null)
                      setStoreOpen(false)
                    }}
                  >
                    All Stores
                  </CommandItem>
                  {stores.map((store) => (
                    <CommandItem
                      key={store.id}
                      onSelect={() => {
                        setCurrentStore(store)
                        setStoreOpen(false)
                      }}
                    >
                      {store.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span className="text-sm">Admin User</span>
          <Badge variant="default" className="bg-yellow-500 text-black">
            Superuser
          </Badge>
        </div>
        <Link href={'/logout'}>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </Link>
       
      </div>

      {/* Global Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="p-0">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Search products...</CommandItem>
                <CommandItem>Search orders...</CommandItem>
                <CommandItem>Search stores...</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}