import React from 'react';
import { Instagram } from 'lucide-react';
import { BUSINESS_INFO, SHOWROOMS, BRAND_PARTNERS } from '../data/showroomData';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-bg)',
        color: '#D4CEBE',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div className="tw-container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.6fr',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '4rem'
          }}
          className="tw-footer-main-grid"
        >
          {/* Column 1: Brand & Heritage */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
              <img
                src="/images/tile_world_logo.png"
                alt="Tile World"
                style={{ height: '40px', width: 'auto' }}
              />
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    letterSpacing: '0.04em',
                    lineHeight: 1
                  }}
                >
                  TILE WORLD
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-bronze)',
                    marginTop: '0.2rem'
                  }}
                >
                  Vijayawada &bull; Est. 2004
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: '#9E978C', marginBottom: '1.5rem' }}>
              Specialists in premium vitrified flooring, large-format wall slabs, and complete coordinated bathware. Three multi-brand showrooms serving Vijayawada, Guntur, and coastal Andhra Pradesh.
            </p>

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '0.5rem 0.875rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              aria-label="Follow Tile World on Instagram"
            >
              <Instagram size={15} color="var(--color-bronze)" />
              <span>{BUSINESS_INFO.instagramHandle}</span>
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1875rem',
                color: '#FFFFFF',
                marginBottom: '1.25rem',
                fontWeight: 600
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { label: 'Home', href: '#' },
                { label: 'Featured Collections', href: '#collections' },
                { label: 'Product Architecture', href: '#categories' },
                { label: 'Finishes In Motion', href: '#finishes' },
                { label: 'Interior Showcase', href: '#showcase' },
                { label: 'Why Tile World', href: '#why-us' },
                { label: 'Showroom Locations', href: '#showrooms' },
                { label: 'Contact & Enquiries', href: '#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: '#9E978C',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9E978C')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Authorized Brands */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1875rem',
                color: '#FFFFFF',
                marginBottom: '1.25rem',
                fontWeight: 600
              }}
            >
              Authorized Brands
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {BRAND_PARTNERS.slice(0, 7).map((b) => (
                <li key={b.name} style={{ fontSize: '0.875rem', color: '#9E978C' }}>
                  {b.name}
                </li>
              ))}
              <li style={{ fontSize: '0.75rem', color: 'var(--color-bronze)', marginTop: '0.25rem' }}>
                &amp; more authorized partnerships
              </li>
            </ul>
          </div>

          {/* Column 4: Showrooms Directory */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1875rem',
                color: '#FFFFFF',
                marginBottom: '1.25rem',
                fontWeight: 600
              }}
            >
              Our Showrooms
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {SHOWROOMS.map((s) => (
                <div key={s.id}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {s.name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#9E978C', margin: '0.15rem 0' }}>
                    {s.address}, {s.city}
                  </p>
                  <a
                    href={`tel:${s.phone}`}
                    style={{ fontSize: '0.75rem', color: 'var(--color-bronze)', fontWeight: 600 }}
                  >
                    {s.phoneDisplay}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location Badge */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#7A756D'
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} Tile World Vijayawada. All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Prakasam Road, Governorpet, Vijayawada, AP 520002</span>
            <span>&bull;</span>
            <span>Mon–Sat: 9:00 AM – 9:00 PM</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .tw-footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .tw-footer-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
