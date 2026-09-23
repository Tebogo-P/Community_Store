import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Leaf, Star, MapPin, ArrowLeft, User } from 'lucide-react';
import { productApi } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getById(id);
        if (res.data.success) setProduct(res.data.data);
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ paddingTop: '2rem', color: '#94a3b8' }}>Loading product details...</div>;
  if (!product) return <div style={{ paddingTop: '2rem', color: '#ef4444' }}>Product not found.</div>;

  return (
    <div style={{ paddingTop: '2rem' }}>
      <Link to="/marketplace" style={{ color: '#60a5fa', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', fontWeight: 600 }}>
        <ArrowLeft size={18} /> Back to Marketplace
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ width: '100%', borderRadius: 'var(--radius-md)', maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="badge badge-student">{product.category}</span>
            {product.ecoFriendly && (
              <span className="badge badge-eco"><Leaf size={12} /> Eco-Friendly</span>
            )}
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>{product.title}</h1>

          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#60a5fa', marginBottom: '1.25rem' }}>
            R {product.price.toFixed(2)}
          </div>

          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
            {product.description}
          </p>

          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>SELLER INFORMATION</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <User size={20} color="#60a5fa" />
                <div>
                  <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {product.seller.fullName}
                    {product.seller.verified && <ShieldCheck size={16} color="#10b981" title="Verified Campus Identity" />}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {product.seller.institutionOrBusiness || product.seller.role}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontWeight: 700 }}>
                <Star size={16} fill="#fbbf24" /> {product.seller.rating.toFixed(1)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ flex: 1, padding: '0.85rem', fontSize: '1rem' }}>
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
