'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StripePaymentForm from '@/components/StripePaymentForm';
import { CheckCircle2, CreditCard, Truck, Banknote, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type PaymentMethod = 'card' | 'cash';

interface OrderConfirmInfo {
  orderId: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingDone, setShippingDone] = useState(false);
  const [orderConfirmInfo, setOrderConfirmInfo] = useState<OrderConfirmInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postal: '',
  });

  const totalAmount = cartTotal + (cartTotal > 0 ? 5 : 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save order to backend
  const saveOrderToBackend = async (orderId: string, method: string, paymentIntentId?: string) => {
    const orderData = {
      id: orderId,
      customer_name: `${formData.firstName} ${formData.lastName}`,
      amount: totalAmount,
      payment_method: method,
      status: method === 'Cash on Delivery' ? 'Pending' : 'Processing',
    };

    try {
      await fetch('http://167.233.34.127:8000/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.error('Failed to save order:', err);
    }
  };

  // Step 1: Handle shipping form submit
  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (paymentMethod === 'card') {
      // Create PaymentIntent for card payments
      setShippingLoading(true);
      try {
        const orderId = `#BS-${Math.floor(100000 + Math.random() * 900000)}`;
        const res = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            currency: 'eur',
            orderId,
            customerName: `${formData.firstName} ${formData.lastName}`,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setErrorMsg(data.error || 'Could not initialize payment. Please check your Stripe keys in .env.local');
          setShippingLoading(false);
          return;
        }

        setClientSecret(data.clientSecret);
        // Store orderId for use after payment
        sessionStorage.setItem('pendingOrderId', orderId);
      } catch (err) {
        setErrorMsg('Payment initialization failed. Please try again.');
        setShippingLoading(false);
        return;
      }
      setShippingLoading(false);
    }

    setShippingDone(true);
  };

  // Step 2a: Card payment success
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    const orderId = sessionStorage.getItem('pendingOrderId') || `#BS-${Math.floor(100000 + Math.random() * 900000)}`;
    await saveOrderToBackend(orderId, 'Credit / Debit Card', paymentIntentId);
    sessionStorage.removeItem('pendingOrderId');
    setOrderConfirmInfo({ orderId, paymentMethod: 'Credit / Debit Card' });
    clearCart();
    setIsSubmitted(true);
  };

  // Step 2b: Cash on delivery submit
  const handleCashOnDelivery = async () => {
    setIsLoading(true);
    const orderId = `#BS-${Math.floor(100000 + Math.random() * 900000)}`;
    await saveOrderToBackend(orderId, 'Cash on Delivery');
    setOrderConfirmInfo({ orderId, paymentMethod: 'Cash on Delivery' });
    clearCart();
    setIsSubmitted(true);
    setIsLoading(false);
  };

  // Order confirmed screen
  if (isSubmitted && orderConfirmInfo) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed! 🎉</h1>
            <p className="text-gray-500 mb-4">Thank you for shopping at Bangla Store.</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="font-bold text-gray-800">{orderConfirmInfo.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment</span>
                <span className="font-medium text-gray-800">{orderConfirmInfo.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-bold text-primary">€{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6">Save your Order ID to track your delivery status</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/track`}
                className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-xl transition text-center"
              >
                Track Order
              </Link>
              <Link
                href="/"
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8 flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-500" />
          Secure checkout powered by Stripe
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Shipping + Payment */}
          <div className="lg:w-2/3 space-y-6">

            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                <h2 className="text-xl font-bold">Shipping Information</h2>
                {shippingDone && <span className="ml-auto text-green-500 text-sm font-medium">✓ Saved</span>}
              </div>

              {!shippingDone ? (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input required name="firstName" type="text" value={formData.firstName} onChange={handleFormChange}
                        className="w-full border border-gray-300 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input required name="lastName" type="text" value={formData.lastName} onChange={handleFormChange}
                        className="w-full border border-gray-300 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input required name="email" type="email" value={formData.email} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input required name="address" type="text" value={formData.address} onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input required name="city" type="text" value={formData.city} onChange={handleFormChange}
                        className="w-full border border-gray-300 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                      <input required name="postal" type="text" value={formData.postal} onChange={handleFormChange}
                        className="w-full border border-gray-300 rounded-xl py-2.5 px-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition" />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mt-6">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition text-left ${
                          paymentMethod === 'card'
                            ? 'border-primary bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Credit / Debit Card</p>
                          <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition text-left ${
                          paymentMethod === 'cash'
                            ? 'border-primary bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Cash on Delivery</p>
                          <p className="text-xs text-gray-500">Pay when you receive</p>
                        </div>
                        {paymentMethod === 'cash' && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={cart.length === 0 || shippingLoading}
                    className="w-full mt-2 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    {shippingLoading ? 'Preparing...' : paymentMethod === 'card' ? 'Continue to Payment →' : 'Place Order'}
                  </button>
                </form>
              ) : (
                <div className="text-sm text-gray-700 space-y-1">
                  <p><span className="text-gray-400">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="text-gray-400">Email:</span> {formData.email}</p>
                  <p><span className="text-gray-400">Address:</span> {formData.address}, {formData.city} {formData.postal}</p>
                  <button onClick={() => setShippingDone(false)} className="text-primary text-xs font-medium hover:underline mt-2 block">
                    Edit shipping info
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            {shippingDone && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h2 className="text-xl font-bold">Payment</h2>
                </div>

                {paymentMethod === 'card' && clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#16a34a',
                          borderRadius: '12px',
                          fontFamily: 'Inter, system-ui, sans-serif',
                        },
                      },
                    }}
                  >
                    <StripePaymentForm
                      amount={totalAmount}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => setErrorMsg(err)}
                    />
                  </Elements>
                ) : paymentMethod === 'cash' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <Banknote size={32} className="text-amber-600 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">You will pay <strong>€{totalAmount.toFixed(2)}</strong> in cash when your order arrives.</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCashOnDelivery}
                      disabled={shippingLoading}
                      className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      {shippingLoading ? 'Placing Order...' : `Confirm Order — €${totalAmount.toFixed(2)}`}
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center">{item.quantity}</span>
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>€5.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t text-gray-800">
                  <span>Total</span>
                  <span>€{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                  <Lock size={12} />
                  <span>256-bit SSL encryption</span>
                  <span>•</span>
                  <ShieldCheck size={12} className="text-green-500" />
                  <span>Stripe Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
