import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Leaf, Star, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'STUDENT': return 'badge-student';
      case 'VENDOR': return 'badge-vendor';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {product.ecoFriendly && (
          <span className="badge badge-eco" style={{ position: 'absolute', top: '10px', left: '10px' }}>
            <Leaf size={12} /> Eco-Friendly
          </span>
        )}
        <span
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(4px)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#60a5fa',
          }}
        >
          R {product.price.toFixed(2)}
        </span>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
            {product.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#cbd5e1', background: '#334155', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
            {product.conditionName}
          </span>
        </div>

        <Link to={`/products/${product.id}`} style={{ color: 'white', textDecoration: 'none' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: '1.3' }}>
            {product.title}
          </h3>
        </Link>

        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>{product.seller.fullName}</span>
              {product.seller.verified && <ShieldCheck size={14} color="#10b981" title="Verified User" />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#94a3b8' }}>
              <Star size={12} color="#fbbf24" fill="#fbbf24" />
              <span>{product.seller.rating.toFixed(1)}</span>
              <span>•</span>
              <span className={`badge ${getRoleBadgeClass(product.seller.role)}`}>
                {product.seller.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary"
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            title="Add to Cart"
          >
            <ShoppingBag size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
