import React, { useEffect, useState } from 'react';
import { Search, Filter, Leaf, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productApi } from '../services/api';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [ecoFilter, setEcoFilter] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let res;
      if (selectedCategory !== 'ALL') {
        res = await productApi.getByCategory(selectedCategory);
      } else {
        res = await productApi.getAll();
      }
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    setLoading(true);
    try {
      const res = await productApi.search(searchQuery);
      if (res.data.success) setProducts(res.data.data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (ecoFilter && !p.ecoFriendly) return false;
    return true;
  });

  return (
    <div style={{ paddingTop: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Campus Marketplace</h1>
        <p style={{ color: '#94a3b8' }}>Browse textbook exchanges, electronics, services, and local vendor offers.</p>
      </div>

      {/* Search & Filters Controls */}
      <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: '2.8rem' }}
              placeholder="Search textbooks, laptops, tutoring services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['ALL', 'TEXTBOOKS', 'ELECTRONICS', 'SERVICES', 'ECO_FRIENDLY', 'CLOTHING', 'OTHER'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem' }}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#34d399', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={ecoFilter}
              onChange={(e) => setEcoFilter(e.target.checked)}
              style={{ accentColor: '#10b981' }}
            />
            <Leaf size={16} /> Eco-Friendly Only
          </label>
        </div>
      </div>

      {/* Product List */}
      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading marketplace listings...</p>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
          <p style={{ fontSize: '1.1rem' }}>No products found matching your filters.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
