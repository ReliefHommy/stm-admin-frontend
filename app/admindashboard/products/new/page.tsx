//app/admindashboard/products/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormState = {
  title: string;
  description: string;
  price: string;
  stock: string;
  image: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  // ✅ Simple validation
  const validate = () => {
    if (!form.title.trim()) return 'Name is required.';
    if (!form.image.trim()) return 'Image URL is required.';

    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum <= 0)
      return 'Price must be a positive number.';

    const stockNum = Number(form.stock);
    if (!Number.isInteger(stockNum) || stockNum < 0)
      return 'Stock must be a non-negative integer.';

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    setError(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ensure browser sends httpOnly cookies to the API route
        credentials: 'include',
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: Number(form.price),
          stock_quantity: Number(form.stock),
          image: form.image,
        }),
      });

      if (res.status === 401) {
        setError('Unauthorized — you must be logged in.')
        router.push('/login')
        return
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data?.error || 'Failed to add product');
        return;
      }

      router.push('/admindashboard/products/');
    } catch (err: any) {
      setError(err?.message || 'An error occurred while saving the product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-green-900"
            value={form.title}
            onChange={onChange('title')}
            placeholder="e.g., Mae Ploy Sweet Chili Sauce"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full text-green-900 rounded-md border px-3 py-2 min-h-[100px]"
            value={form.description}
            onChange={onChange('description')}
            placeholder="Optional short description"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (SEK) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full rounded-md border px-3 py-2 text-green-900"
              value={form.price}
              onChange={onChange('price')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-md border px-3 py-2 text-green-900"
              value={form.stock}
              onChange={onChange('stock')}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL *</label>
          <input
            type="url"
            className="w-full rounded-md border px-3 py-2 text-green-900"
            value={form.image}
            onChange={onChange('image')}
            placeholder="https://example.com/image.jpg"
            required
          />

          {form.image && (
            <div className="mt-3">
              <img
                src={form.image}
                alt="Preview"
                className="h-28 w-auto rounded-md border"
              />
            </div>
          )}

          <p className="mt-1 text-xs text-gray-500">
            Paste a hosted image URL. (Cloudflare R2, S3, CDN, etc.)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Create Product'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/vendor/products/')}
            className="rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}