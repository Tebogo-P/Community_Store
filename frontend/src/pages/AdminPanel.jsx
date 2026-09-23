import React, { useEffect, useState } from 'react';
import { ShieldCheck, UserCheck, AlertTriangle } from 'lucide-react';
import { userApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    setLoading(true);
    try {
      const res = await userApi.getPendingVerifications();
      if (res.data.success) setPendingUsers(res.data.data);
    } catch (err) {
      console.error('Failed to load pending verifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId) => {
    try {
      const res = await userApi.verifyUser(userId);
      if (res.data.success) {
        alert('User verification approved!');
        fetchPendingVerifications();
      }
    } catch (err) {
      alert('Verification action failed.');
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return <div style={{ paddingTop: '2rem', color: '#ef4444' }}>Access Denied. Administrator privileges required.</div>;
  }

  return (
    <div style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShieldCheck color="#fbbf24" /> Administration & Moderation Panel
        </h1>
        <p style={{ color: '#94a3b8' }}>Review user identity verifications and maintain trust and safety.</p>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserCheck size={20} color="#60a5fa" /> Pending User Identity Verifications
        </h2>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading verification queue...</p>
        ) : pendingUsers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            <p>No pending verification requests at this time.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pendingUsers.map((pendingUser) => (
              <div key={pendingUser.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{pendingUser.fullName}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{pendingUser.email}</div>
                  <div style={{ fontSize: '0.8rem', color: '#60a5fa', marginTop: '0.2rem' }}>
                    Role: {pendingUser.role} | Org/Biz: {pendingUser.institutionOrBusiness || 'N/A'}
                  </div>
                </div>

                <button onClick={() => handleVerify(pendingUser.id)} className="btn btn-accent" style={{ padding: '0.5rem 1rem' }}>
                  Approve Verification
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
