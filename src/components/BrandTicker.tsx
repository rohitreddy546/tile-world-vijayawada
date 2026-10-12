import React from 'react';
import { BRAND_PARTNERS } from '../data/showroomData';

export const BrandTicker: React.FC = () => {
  // Double array for continuous seamless infinite loop
  const brandsList = [...BRAND_PARTNERS, ...BRAND_PARTNERS];

  return (
    <section
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '3rem',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden'
      }}
      aria-label="Authorized Brand Partners"
    >
      <div className="tw-container" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <p
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--color-text-subtle)',
            margin: 0
          }}
        >
          Authorized Dealer &bull; Industry Leading Brands
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          position: 'relative',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div
          className="tw-ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
            width: 'max-content',
            animation: 'twTickerSlide 36s linear infinite'
          }}
        >
          {brandsList.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                minWidth: '170px',
                height: '64px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
              className="tw-brand-pill"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} official logo`}
                style={{
                  height: '28px',
                  width: 'auto',
                  maxWidth: '90px',
                  objectFit: 'contain',
                  filter: 'var(--brand-logo-filter)',
                  transition: 'filter var(--transition-fast)'
                }}
                className="tw-brand-logo-img"
              />
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap'
                }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tw-brand-pill:hover {
          border-color: var(--color-border-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .tw-brand-pill:hover .tw-brand-logo-img {
          filter: none !important;
          opacity: 1 !important;
        }
        .tw-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
