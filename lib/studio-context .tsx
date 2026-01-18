//app/lib/admin-context.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Store {
  id: string
  name: string
}

interface AdminContextType {
  currentStore: Store | null
  setCurrentStore: (store: Store | null) => void
  stores: Store[]
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentStore, setCurrentStore] = useState<Store | null>(null)
  const [stores] = useState<Store[]>([
    { id: '1', name: 'Store A' },
    { id: '2', name: 'Store B' },
    { id: '3', name: 'Store C' },
  ]) // Mock data

  return (
    <AdminContext.Provider value={{ currentStore, setCurrentStore, stores }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}