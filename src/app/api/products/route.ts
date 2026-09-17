import { NextResponse } from 'next/server';
import { getProducts } from '@/data/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');

  let products = await getProducts();

  if (category && category.toLowerCase() !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }

  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(products);
}
