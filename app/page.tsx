// app/page.tsx

import LoginForm from "@/components/admin/LoginForm";


export default function RootPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-50">
      {/* Optional: Add your brand background/logo here */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">STM Admin</h1>
          <p className="text-gray-500 mt-2">Please sign in to your account</p>
        </div>
        
        {/* Render the actual form, not a link! */}
        <LoginForm />
      </div>
    </main>
  );
}