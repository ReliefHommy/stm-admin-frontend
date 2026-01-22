// app/admindashboard/layout.tsx
import { AdminProvider } from '@/lib/admin-context'
import { Sidebar } from '@/components/admin/sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
      
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}