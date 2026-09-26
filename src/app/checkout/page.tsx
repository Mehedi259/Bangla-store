'use client';

import React, { useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StripePaymentForm from '@/components/StripePaymentForm';
import { CheckCircle2, Truck, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { OrderSlip } from '@/components/OrderSlip';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type DeliveryMethod = 'home' | 'store';

interface OrderConfirmInfo {
  orderId: string;
  paymentMethod: string;
  amountPaid: number;
  date: string;
  customerName: string;
  address: string;
}

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card'>('card');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('home');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingDone, setShippingDone] = useState(false);
  const [orderConfirmInfo, setOrderConfirmInfo] = useState<OrderConfirmInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postal: '',
  });

  const shippingCost = deliveryMethod === 'home' ? 5 : 0;
  const totalAmount = cartTotal + (cartTotal > 0 ? shippingCost : 0);

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
      status: 'Processing',
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://167.233.34.127:8000/api';
      await fetch(`${apiUrl}/orders/`, {
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
    setOrderConfirmInfo({ 
      orderId, 
      paymentMethod: 'Credit / Debit Card',
      amountPaid: totalAmount,
      date: new Date().toLocaleDateString(),
      customerName: `${formData.firstName} ${formData.lastName}`,
      address: deliveryMethod === 'store' ? 'Store Pickup' : `${formData.address}, ${formData.city} ${formData.postal}`
    });
    clearCart();
    setIsSubmitted(true);
  };

  // Step 2b removed

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
                <span className="font-bold text-primary">€{orderConfirmInfo.amountPaid.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6">Save your Order ID to track your delivery status</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {orderConfirmInfo.address === 'Store Pickup' ? (
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Eerste+Oosterparkstraat+172,+1091+HJ+Amsterdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-xl transition text-center flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Get Directions
                </a>
              ) : (
                <Link
                  href={`/track`}
                  className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-xl transition text-center"
                >
                  Track Order
                </Link>
              )}
              <Link
                href="/"
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition text-center"
              >
                Continue Shopping
              </Link>
              <button
                onClick={async () => {
                  if (!slipRef.current) return;
                  setDownloadingPdf(true);
                  try {
                    const canvas = await html2canvas(slipRef.current, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                      orientation: 'portrait',
                      unit: 'px',
                      format: [canvas.width / 2, canvas.height / 2]
                    });
                    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
                    pdf.save(`BanglaStore_Receipt_${orderConfirmInfo.orderId}.pdf`);
                  } catch (err) {
                    console.error('Error generating PDF', err);
                  } finally {
                    setDownloadingPdf(false);
                  }
                }}
                disabled={downloadingPdf}
                className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-xl transition text-center disabled:opacity-50"
              >
                {downloadingPdf ? 'Downloading...' : 'Download Slip'}
              </button>
            </div>
            
            {/* Hidden Order Slip for PDF generation */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
              <OrderSlip
                ref={slipRef}
                orderId={orderConfirmInfo.orderId}
                paymentMethod={orderConfirmInfo.paymentMethod}
                amountPaid={orderConfirmInfo.amountPaid}
                date={orderConfirmInfo.date}
                customerName={orderConfirmInfo.customerName}
                address={orderConfirmInfo.address}
              />
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
                  {/* Delivery Method Selection */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Delivery Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('home')}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition text-left ${
                          deliveryMethod === 'home'
                            ? 'border-primary bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${deliveryMethod === 'home' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Home Delivery</p>
                          <p className="text-xs text-gray-500">€5.00 Delivery Charge</p>
                        </div>
                        {deliveryMethod === 'home' && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('store')}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition text-left ${
                          deliveryMethod === 'store'
                            ? 'border-primary bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${deliveryMethod === 'store' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Store Visit</p>
                          <p className="text-xs text-gray-500">Pick up from store (Free)</p>
                        </div>
                        {deliveryMethod === 'store' && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

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

                  {deliveryMethod === 'home' && (
                    <>
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
                    </>
                  )}



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
                  {deliveryMethod === 'home' ? (
                    <p><span className="text-gray-400">Address:</span> {formData.address}, {formData.city} {formData.postal}</p>
                  ) : (
                    <p><span className="text-gray-400">Delivery:</span> Store Pickup (Eerste Oosterparkstraat 172)</p>
                  )}
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
                  <span>{shippingCost > 0 ? `€${shippingCost.toFixed(2)}` : 'Free'}</span>
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

              {deliveryMethod === 'store' && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">Store Location</h3>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5684784968393!2d4.912648711463168!3d52.35919634800366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6099b248a8eb5%3A0x673edc96d986b245!2sEerste%20Oosterparkstraat%20172%2C%201091%20HJ%20Amsterdam%2C%20Netherlands!5e0!3m2!1sen!2sbd!4v1727339739502!5m2!1sen!2sbd"
                    width="100%"
                    height="180"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bangla Store Location"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
