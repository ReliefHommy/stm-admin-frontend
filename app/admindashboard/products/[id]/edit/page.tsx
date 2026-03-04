'use client';

import ProductForm from '@/components/admin/ProductForm';
import { useParams } from 'next/navigation';


export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  return <ProductForm mode="edit" productId={params.id} />;
}