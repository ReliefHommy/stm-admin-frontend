"use client";

import * as React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PartnerStoreProfile = {
  id: number;

  user_id: number;
  email: string;

  is_vendor: boolean;
  is_customer: boolean;

  store_name: string;
  slug: string;

  description: string | null;
  logo: string | null;

  contact_email: string;
  website: string | null;
};


export default function StoreProfilesPage() {
  const [users, setUsers] = React.useState<PartnerStoreProfile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const r = await fetch("/api/stores", { method: "GET" });
        const data = await r.json();

        if (!r.ok) {
          setError(data?.detail || data?.error || "Failed to load store profiles");
          setUsers([]);
          return;
        }

        // Expecting a list from Django ListAPIView
        setUsers(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
     <Card className="border-orange-100/70 bg-white/70 shadow-sm backdrop-blur">    
                    <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Stores
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </CardHeader>
     <CardContent>
      <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Store name</TableHead>
            <TableHead className="text-left">Products</TableHead>
         
            <TableHead>store ID</TableHead>
           
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
        {p.logo ? (
          <img
            src={p.logo}
            alt={`profile-${p.id}`}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 rounded bg-gray-100" />
        )}
      </TableCell>

      {/* User ID */}
      <TableCell>{p.store_name ?? "-"}</TableCell>

      {/* Email */}
      <TableCell>{p.description ?? "-"}</TableCell>

      {/* Roles (simple text) */}


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
    
  );
}