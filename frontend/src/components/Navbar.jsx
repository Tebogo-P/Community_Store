import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, MessageSquare, PlusCircle, ShieldCheck, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="brand-logo">
            <Store size={28} color="#3b82f6" />
            <span>CommunityStore</span>
          </Link>

          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/marketplace" className="nav-link">Marketplace</Link>
              </li>
              <li>
                <Link to="/bulletin" className="nav-link">Bulletin Board</Link>
              </li>
              {user && (
                <li>
                  <Link to="/sell" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#34d399' }}>
                    <PlusCircle size={18} /> Sell / Post
                  </Link>
                </li>
              )}
              {user && user.role === 'ADMIN' && (
                <li>
                  <Link to="/admin" className="nav-link" style={{ color: '#fbbf24' }}>
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-secondary"
              style={{ position: 'relative', padding: '0.5rem 0.85rem' }}
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {totalCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#3b82f6',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem' }}>
                  <User size={18} />
                  <span style={{ fontSize: '0.85rem' }}>{user.fullName.split(' ')[0]}</span>
                  {user.verified && <ShieldCheck size={16} color="#10b981" />}
                </Link>
                <button onClick={logout} className="btn btn-secondary" title="Logout" style={{ padding: '0.5rem 0.75rem' }}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="btn btn-primary">
                <LogIn size={18} /> Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Navbar;
