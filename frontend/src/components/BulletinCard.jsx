import React from 'react';
import { Calendar, User, Tag, ShieldCheck, Megaphone } from 'lucide-react';

const BulletinCard = ({ post }) => {
  const getPostTypeColor = (type) => {
    switch (type) {
      case 'EVENT': return '#10b981';
      case 'ANNOUNCEMENT': return '#3b82f6';
      case 'SERVICE_OFFER': return '#8b5cf6';
      case 'FUNDRAISER': return '#f59e0b';
      default: return '#64748b';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
        <span
          style={{
            background: `${getPostTypeColor(post.postType)}20`,
            color: getPostTypeColor(post.postType),
            border: `1px solid ${getPostTypeColor(post.postType)}50`,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <Megaphone size={12} /> {post.postType}
        </span>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}
        </span>
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.65rem', color: 'white' }}>
        {post.title}
      </h3>

      <p style={{ color: '#cbd5e1', fontSize: '0.925rem', marginBottom: '1.25rem', flex: 1, whiteSpace: 'pre-line' }}>
        {post.content}
      </p>

      {post.eventDate && (
        <div style={{ background: '#0f172a', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.85rem' }}>
          <Calendar size={16} />
          <span>Event Date: <strong>{new Date(post.eventDate).toLocaleString()}</strong></span>
        </div>
      )}

      <div style={{ borderTop: '1px solid #334155', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <User size={14} />
          <span>Posted by: <strong style={{ color: '#f8fafc' }}>{post.author.fullName}</strong></span>
          {post.author.verified && <ShieldCheck size={14} color="#10b981" />}
        </div>
        {post.tags && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#64748b' }}>
            <Tag size={12} /> #{post.tags.split(',')[0]}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulletinCard;
