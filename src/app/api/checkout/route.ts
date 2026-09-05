import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simulate payment processing and order creation
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
      message: 'Order processed successfully'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
