import React from 'react';

export interface OrderSlipProps {
  orderId: string;
  paymentMethod: string;
  amountPaid: number;
  date: string;
  customerName: string;
  address: string;
}

export const OrderSlip = React.forwardRef<HTMLDivElement, OrderSlipProps>(
  ({ orderId, paymentMethod, amountPaid, date, customerName, address }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '600px',
          padding: '40px',
          backgroundColor: '#ffffff',
          fontFamily: 'sans-serif',
          color: '#1f2937',
        }}
        className="bg-white"
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#16a34a', margin: '0 0 10px 0' }}>Bangla Store</h1>
          <p style={{ margin: '0', color: '#6b7280' }}>Authentic Bangladeshi Products</p>
        </div>

        <div style={{ borderBottom: '2px solid #f3f4f6', marginBottom: '20px', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>Payment Receipt</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#6b7280', fontWeight: 'bold' }}>Order ID:</span>
            <span style={{ fontWeight: 'bold' }}>{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#6b7280', fontWeight: 'bold' }}>Date:</span>
            <span>{date}</span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', color: '#6b7280', marginBottom: '10px' }}>Billed To:</h3>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{customerName}</p>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5' }}>{address}</p>
        </div>

        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ color: '#6b7280' }}>Payment Method</span>
            <span style={{ fontWeight: '500' }}>{paymentMethod}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Total Amount Paid</span>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#16a34a' }}>€{amountPaid.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '40px' }}>
          <p>Thank you for shopping with Bangla Store!</p>
          <p>If you have any questions about this receipt, please contact support.</p>
        </div>
      </div>
    );
  }
);

OrderSlip.displayName = 'OrderSlip';
