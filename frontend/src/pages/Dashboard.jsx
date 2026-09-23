import React, { useEffect, useState } from 'react';
import { User, ShieldCheck, Star, ShoppingBag, Award, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getMyOrders();
        if (res.data.success) setOrders(res.data.data);
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div style={{ paddingTop: '2rem', color: '#94a3b8' }}>Please sign in to view your dashboard.</div>;

  return (
    <div style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>User Dashboard</h1>
        <p style={{ color: '#94a3b8' }}>Manage profile verification, order history, and seller reputation.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {/* Profile Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#3b82f620', border: '1px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={28} color="#60a5fa" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {user.fullName}
                {user.verified && <ShieldCheck size={18} color="#10b981" title="Verified Campus Identity" />}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{user.email}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Account Type:</span>
              <span className="badge badge-student">{user.role}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Verification Status:</span>
              <span style={{ color: user.verified ? '#34d399' : '#fbbf24', fontWeight: 700 }}>
                {user.verified ? 'Verified (Uni Email)' : 'Pending Verification'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Affiliation / Business:</span>
              <span style={{ color: 'white' }}>{user.institutionOrBusiness || 'General'}</span>
            </div>
          </div>
        </div>

        {/* Reputation & Gamification Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <Award size={24} color="#fbbf24" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Seller Trust & Badges</h3>
          </div>

          <div style={{ textAlign: 'center', background: '#0f172a', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155', marginBottom: '1rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Star fill="#fbbf24" size={32} /> {user.rating ? user.rating.toFixed(1) : '5.0'}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Community Rating ({user.totalRatings || 0} reviews)</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-eco">Campus Trader</span>
            <span className="badge badge-verified">Verified ID</span>
            <span className="badge badge-vendor">Punctual Seller</span>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag color="#60a5fa" /> Order History
        </h2>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading order history...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: '#94a3b8' }}>
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order) => (
              <div key={order.id} className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #334155', paddingBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontWeight: 800, color: '#60a5fa' }}>Order #{order.id}</span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</span>
                  </div>
                  <span className="badge badge-verified">{order.status}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span>{item.product.title} x {item.quantity}</span>
                      <span style={{ fontWeight: 700 }}>R {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid #334155', fontWeight: 700 }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Payment Method: {order.paymentMethod}</span>
                  <span style={{ fontSize: '1.1rem', color: '#34d399' }}>Total: R {order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
