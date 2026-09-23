import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'STUDENT',
    institutionOrBusiness: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await register(formData);
        if (res.success) {
          alert('Registration successful! Please sign in.');
          setIsRegister(false);
        } else {
          setError(res.message || 'Registration failed');
        }
      } else {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          onClose();
        } else {
          setError(res.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#94a3b8' }}>
          <X size={20} />
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {isRegister ? 'Join the campus & community marketplace' : 'Sign in to access your listings and cart'}
        </p>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g. Sarah Jenkins"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder={isRegister ? "student@campus.ac.za" : "your.email@campus.ac.za"}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Account Role</label>
                <select
                  className="input-field"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="STUDENT">Student (Uni Email Auto-Verify)</option>
                  <option value="FACULTY">Faculty / Staff</option>
                  <option value="VENDOR">Local Vendor / Business</option>
                  <option value="RESIDENT">Community Resident</option>
                </select>
              </div>

              <div className="form-group">
                <label>Department / Business Reg</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Faculty of IT / Reg No"
                  value={formData.institutionOrBusiness}
                  onChange={(e) => setFormData({ ...formData, institutionOrBusiness: e.target.value })}
                />
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
            {loading ? 'Please wait...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#94a3b8' }}>
          {isRegister ? (
            <span>Already have an account? <button onClick={() => setIsRegister(false)} style={{ color: '#60a5fa', fontWeight: 600 }}>Sign In</button></span>
          ) : (
            <span>Need an account? <button onClick={() => setIsRegister(true)} style={{ color: '#60a5fa', fontWeight: 600 }}>Register</button></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
