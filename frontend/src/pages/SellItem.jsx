import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Leaf, Image, DollarSign, MapPin } from 'lucide-react';
import { productApi } from '../services/api';

const SellItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'TEXTBOOKS',
    conditionName: 'Used - Good',
    ecoFriendly: false,
    imageUrl: '',
    location: 'Campus Main',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };
      const res = await productApi.create(payload);
      if (res.data.success) {
        alert('Listing published successfully!');
        navigate('/marketplace');
      }
    } catch (err) {
      alert('Failed to publish listing: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '2rem', maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle color="#34d399" /> Create New Item Listing
        </h1>
        <p style={{ color: '#94a3b8' }}>Sell products or offer services to campus peers & local community.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
        <div className="form-group">
          <label>Item Title *</label>
          <input
            type="text"
            required
            className="input-field"
            placeholder="e.g. Data Structures & Algorithms Textbook (4th Ed)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Price (ZAR R) *</label>
            <input
              type="number"
              step="0.01"
              required
              className="input-field"
              placeholder="e.g. 250.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              className="input-field"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="TEXTBOOKS">Textbooks</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="SERVICES">Services / Tutoring</option>
              <option value="CLOTHING">Clothing</option>
              <option value="ECO_FRIENDLY">Eco-Friendly</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Condition</label>
            <select
              className="input-field"
              value={formData.conditionName}
              onChange={(e) => setFormData({ ...formData, conditionName: e.target.value })}
            >
              <option value="New">Brand New</option>
              <option value="Used - Excellent">Used - Excellent</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pick-up Location</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Main Library / Student Res B"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL (Optional)</label>
          <input
            type="url"
            className="input-field"
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Detailed Description</label>
          <textarea
            rows={4}
            className="input-field"
            placeholder="Provide condition, features, or edition notes..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ background: '#0f172a', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #334155' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', color: '#34d399', fontWeight: 700, margin: 0 }}>
            <input
              type="checkbox"
              checked={formData.ecoFriendly}
              onChange={(e) => setFormData({ ...formData, ecoFriendly: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
            />
            <Leaf size={20} /> Mark as Eco-Friendly / Sustainable Item
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
          {loading ? 'Publishing...' : 'Publish Item Listing'}
        </button>
      </form>
    </div>
  );
};

export default SellItem;
