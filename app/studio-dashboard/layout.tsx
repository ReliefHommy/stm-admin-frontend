// app/studio-dashboard/layout.tsx

import { Sidebar } from "@/components/studio/sidebar"
import { AdminProvider } from "@/lib/studio-context "



export default function StudioLayout({
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