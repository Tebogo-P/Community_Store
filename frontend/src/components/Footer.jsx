import React from 'react';
import { Store, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#090d16', borderTop: '1px solid var(--color-border)', padding: '3rem 0 1.5rem', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
        <div>
          <div className="brand-logo" style={{ marginBottom: '1rem' }}>
            <Store size={24} color="#3b82f6" />
            <span>CommunityStore</span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Connecting campus students, faculty, local vendors, and residents in a trusted, sustainable marketplace ecosystem.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Marketplace</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <li>Textbooks & Study Material</li>
            <li>Electronics & Laptops</li>
            <li>Eco-Friendly Products</li>
            <li>Tutoring & Local Services</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Trust & Safety</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#10b981" /> Verified Student Accounts
            </li>
            <li>Vendor Business Verification</li>
            <li>Secure SnapScan & PayFast</li>
            <li>Escrow Protection</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1rem' }}>Academic Project</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            PRM370/371/372S 2026 Specification Project.<br />
            Built with Spring Boot 3 & React.
          </p>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid #1e293b', marginTop: '2.5rem', paddingTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        © 2026 CommunityStore. Designed for Campus Sustainability.
      </div>
    </footer>
  );
};

export default Footer;
