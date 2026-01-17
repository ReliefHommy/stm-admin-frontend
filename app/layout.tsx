//app/layout.tsx
import React from 'react'

import './globals.css'


export const metadata = {
  metadataBase: new URL("https://admin.somtammarket.com/"),
   alternates: {
    canonical: "/",
  },
  
  
  title: 'admin.somtammarket.com',
  description: 'STM Marketplace for Thai culture - food, games, wellness.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {





 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}