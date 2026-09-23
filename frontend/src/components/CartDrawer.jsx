import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('SNAPSCAN');
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to complete checkout.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        paymentMethod,
      };
      const res = await orderApi.create(payload);
      if (res.data.success) {
        setSuccessOrder(res.data.data);
        clearCart();
      }
    } catch (err) {
      alert('Checkout failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 250,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={22} color="#3b82f6" /> Your Cart
          </h2>
          <button onClick={() => { setIsCartOpen(false); setSuccessOrder(null); }} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
            <X size={20} />
          </button>
        </div>

        {successOrder ? (
          <div style={{ textAlignment: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle2 size={54} color="#10b981" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Order Confirmed!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>
              Order ID: #{successOrder.id}<br />
              Total Paid: <strong>R {successOrder.totalAmount.toFixed(2)}</strong> via {successOrder.paymentMethod}
            </p>
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155', width: '100%', fontSize: '0.85rem', color: '#34d399' }}>
              <ShieldCheck size={16} /> Protected by Campus Escrow Protection
            </div>
            <button onClick={() => { setIsCartOpen(false); setSuccessOrder(null); }} className="btn btn-primary" style={{ width: '100%' }}>
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            <ShoppingBag size={48} strokeWidth={1} style={{ marginBottom: '1rem' }} />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.25rem' }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '0.85rem', background: '#0f172a', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155' }}>
                  <img src={item.product.imageUrl} alt={item.product.title} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.product.title}</h4>
                    <p style={{ color: '#60a5fa', fontWeight: 700, fontSize: '0.875rem' }}>R {item.product.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="btn btn-secondary" style={{ padding: '0.1rem 0.4rem', fontSize: '0.8rem' }}>-</button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="btn btn-secondary" style={{ padding: '0.1rem 0.4rem', fontSize: '0.8rem' }}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} style={{ color: '#ef4444', alignSelf: 'flex-start' }} title="Remove">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #334155', paddingTop: '1.25rem', marginTop: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>Payment Gateway</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="input-field">
                  <option value="SNAPSCAN">SnapScan QR</option>
                  <option value="PAYFAST">PayFast Gateway</option>
                  <option value="CASH_ON_PICKUP">Cash / Campus Pick-up</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
                <span>Total:</span>
                <span style={{ color: '#60a5fa' }}>R {cartTotal.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                {loading ? 'Processing...' : 'Complete Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
