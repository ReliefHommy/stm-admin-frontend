"use client";

import * as React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type UserProfile = {
  id: number;

  user_id?: number | null;
  email?: string | null;

  is_partner?: boolean;
  is_customer?: boolean;

  phone?: string | null;
  avatar?: string | null;
  address?: string | null;
};


export default function UserProfilesPage() {
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const r = await fetch("/api/userprofile", { method: "GET" });
        const data = await r.json();

        if (!r.ok) {
          setError(data?.detail || data?.error || "Failed to load user profiles");
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
    <div className="overflow-hidden rounded-xl border border-orange-100 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead className="text-right">Profile ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Rolle</TableHead>
           
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
            <TableRow key={p.user_id}>
                {/* Avatar Cell */}
              <TableCell>
                {p.avatar ? (
                  <img
                    src={p.avatar}
                    alt={`profile-${p.user_id}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 rounded bg-gray-100" />
                )}
              </TableCell>
  {/* user_id Cell */}
             <TableCell>{p.user_id ?? "-"}</TableCell>
  {/* profile:id cell */}

              <TableCell className="text-right">{p.id}</TableCell>
    {/* email Cell */}
              <TableCell>{p.email ?? "-"}</TableCell>
  {/* Boolean */}

              <TableCell>{ p.user_id} </TableCell>


              <TableCell className="text-center space-x-2">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
    
    </div>
    
  );
}
