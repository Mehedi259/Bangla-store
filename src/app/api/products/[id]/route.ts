import { NextResponse } from 'next/server';
import { featuredProducts } from '@/data/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = featuredProducts.find(p => p.id === id);

  await new Promise(resolve => setTimeout(resolve, 300));

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
