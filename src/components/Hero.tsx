import React from 'react';
import { ArrowDown, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '3rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)'
      }}
      aria-label="Welcome to Tile World Vijayawada"
    >
      <div className="tw-container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}
          className="tw-hero-grid"
        >
          {/* Left Column: Editorial Headline & Actions */}
          <div style={{ maxWidth: '640px' }}>
            <div className="tw-eyebrow" style={{ marginBottom: '1.25rem' }}>
              <span className="tw-eyebrow-dot"></span>
              <span>Architectural Surfaces &bull; Complete Bathware</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                fontWeight: 500,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: 'var(--color-text-main)',
                marginBottom: '1.5rem'
              }}
            >
              Transform Spaces. <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-bronze)' }}>
                Elevate Living.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
                lineHeight: 1.65,
                color: 'var(--color-text-muted)',
                marginBottom: '2.5rem',
                fontWeight: 400
              }}
            >
              Discover vitrified flooring, large-format slabs, and complete bathware curated to bring your architectural vision to life. Trusted by homeowners and builders in Vijayawada since 2004.
            </p>

            {/* Calls to Action */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '3.5rem'
              }}
            >
              <a
                href="#collections"
                className="tw-btn tw-btn-primary"
                style={{ padding: '0.9375rem 2rem', fontSize: '0.9375rem' }}
              >
                <span>Explore Collections</span>
                <ArrowDown size={16} />
              </a>

              <a
                href="#showrooms"
                className="tw-btn tw-btn-secondary"
                style={{ padding: '0.9375rem 1.75rem', fontSize: '0.9375rem' }}
              >
                <MapPin size={16} color="var(--color-bronze)" />
                <span>Visit Showrooms</span>
              </a>
            </div>

            {/* Verified Heritage & Trust Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--color-border)'
              }}
              className="tw-hero-badges"
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    lineHeight: 1
                  }}
                >
                  20+
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                  Years in Vijayawada
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    lineHeight: 1
                  }}
                >
                  3
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                  Physical Showrooms
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--color-text-main)',
                    lineHeight: 1
                  }}
                >
                  10+
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                  Authorized Brands
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography Collage */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                backgroundColor: 'var(--color-surface-subtle)',
                aspectRatio: '4 / 3.4'
              }}
            >
              <img
                src="/images/hero-living-room.jpg"
                alt="Contemporary architectural living space with premium vitrified flooring and warm natural lighting"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                loading="eager"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 19, 18, 0.5) 0%, rgba(20, 19, 18, 0) 50%)'
                }}
              />
              {/* Subtle architectural caption */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#FFFFFF'
                }}
              >
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.02em', margin: 0 }}>
                    Modern Living Surfaces
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                    Available in 600&times;1200mm Vitrified Slabs
                  </p>
                </div>
                <button
                  onClick={onOpenEnquiry}
                  style={{
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.02em'
                  }}
                >
                  Consult Showroom
                </button>
              </div>
            </div>

            {/* Overlapping Tactile Detail Floating Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '-2rem',
                backgroundColor: 'var(--color-surface)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                maxWidth: '280px'
              }}
              className="tw-floating-card"
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                <img
                  src="/images/collection/statuario.jpg"
                  alt="Statuario Gold marble texture"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: 0, color: 'var(--color-text-main)' }}>
                  Statuario Gold Finish
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  High-Gloss Polished Vitrified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Grid Rules */}
      <style>{`
        @media (max-width: 960px) {
          .tw-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .tw-floating-card {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .tw-hero-badges {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
