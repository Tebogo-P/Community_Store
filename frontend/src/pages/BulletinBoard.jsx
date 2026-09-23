import React, { useEffect, useState } from 'react';
import { Megaphone, Plus, Calendar, Tag } from 'lucide-react';
import BulletinCard from '../components/BulletinCard';
import { bulletinApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BulletinBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    postType: 'ANNOUNCEMENT',
    tags: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await bulletinApi.getAll();
      if (res.data.success) setPosts(res.data.data);
    } catch (err) {
      console.error('Failed to load bulletin posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await bulletinApi.create(formData);
      if (res.data.success) {
        setShowCreateModal(false);
        setFormData({ title: '', content: '', postType: 'ANNOUNCEMENT', tags: '' });
        fetchPosts();
      }
    } catch (err) {
      alert('Failed to create post: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Megaphone color="#3b82f6" /> Community Bulletin Board
          </h1>
          <p style={{ color: '#94a3b8' }}>Campus announcements, club fundraisers, skill-share services, and events.</p>
        </div>

        {user && (
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
            <Plus size={18} /> Post Announcement
          </button>
        )}
      </div>

      {loading ? (
        <p style={{ color: '#94a3b8' }}>Loading bulletin posts...</p>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8' }}>
          <p>No bulletin announcements found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {posts.map((post) => (
            <BulletinCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>New Bulletin Post</h2>
            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label>Post Title</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Textbook Swap Meet this Friday"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  className="input-field"
                  value={formData.postType}
                  onChange={(e) => setFormData({ ...formData, postType: e.target.value })}
                >
                  <option value="ANNOUNCEMENT">General Announcement</option>
                  <option value="EVENT">Campus Event</option>
                  <option value="SERVICE_OFFER">Service Offer / Tutoring</option>
                  <option value="FUNDRAISER">Club Fundraiser</option>
                </select>
              </div>

              <div className="form-group">
                <label>Content Details</label>
                <textarea
                  required
                  rows={4}
                  className="input-field"
                  placeholder="Describe your event or announcement..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Events,Textbooks,Tutoring"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulletinBoard;
