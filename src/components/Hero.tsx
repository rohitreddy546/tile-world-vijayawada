import React from 'react';
import { ArrowDown, MapPin, Sparkles, Play } from 'lucide-react';

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
        backgroundColor: 'transparent'
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
          <div style={{ maxWidth: '640px' }} className="tw-reveal is-visible">
            {/* Motion Graphics HUD Telemetry Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: 'var(--radius-pill)',
                marginBottom: '1.25rem',
                fontFamily: 'monospace',
                fontSize: '0.6875rem',
                color: 'var(--color-blue-vibrant)',
                letterSpacing: '0.08em'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blue)',
                  animation: 'twBeaconPulse 1.8s infinite'
                }}
              />
              <span>SURFACES MATRIX &bull; VIJAYAWADA &bull; EST. 2004</span>
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
              <span className="tw-shimmer-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
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

              {onOpenEnquiry && (
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="tw-btn tw-btn-bronze"
                  style={{ padding: '0.9375rem 1.75rem', fontSize: '0.9375rem', gap: '0.5rem' }}
                >
                  <Sparkles size={16} />
                  <span>Request Consultation</span>
                </button>
              )}

              <a
                href="#cinematic-story"
                className="tw-btn tw-btn-secondary"
                style={{ padding: '0.9375rem 1.75rem', fontSize: '0.9375rem' }}
              >
                <MapPin size={16} color="var(--color-blue)" />
                <span>Cinematic Story</span>
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

          {/* Right Column: Architectural Living Space Photography */}
          <div style={{ position: 'relative' }} className="tw-reveal is-visible">
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                backgroundColor: 'var(--color-surface-subtle)',
                aspectRatio: '4 / 3.4'
              }}
              className="tw-motion-card-glow"
            >
              <img
                src="/images/hero-living-room.jpg"
                alt="Contemporary architectural living space with premium vitrified flooring and warm natural lighting"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="tw-hero-main-img"
                loading="eager"
              />

              {/* Clean Lower-Third Caption Strip */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.75rem 1.75rem 1.5rem',
                  background: 'linear-gradient(to top, rgba(7, 10, 18, 0.88) 0%, rgba(7, 10, 18, 0.4) 65%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#FFFFFF'
                }}
              >
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.02em', margin: 0 }}>
                    Modern Living Spaces
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', margin: '0.2rem 0 0' }}>
                    Available in 600&times;1200mm Vitrified Slabs
                  </p>
                </div>
                <a
                  href="#cinematic-story"
                  style={{
                    padding: '0.55rem 0.95rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#070A12',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.02em',
                    transition: 'all var(--transition-fast)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                  }}
                >
                  <Play size={12} fill="currentColor" color="var(--color-blue)" />
                  <span>Cinematic Film</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Discovery Indicator */}
      <a
        href="#collections"
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'var(--color-text-subtle)',
          fontSize: '0.6875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontWeight: 600,
          textDecoration: 'none',
          zIndex: 4,
          transition: 'color var(--transition-fast)'
        }}
        className="tw-hero-scroll-indicator"
        aria-label="Scroll down to browse collections"
      >
        <span>Explore Surfaces</span>
        <div style={{ animation: 'twScrollBounce 2.2s ease infinite' }}>
          <ArrowDown size={14} color="var(--color-blue)" />
        </div>
      </a>

      {/* Responsive Grid Rules */}
      <style>{`
        @media (max-width: 960px) {
          .tw-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .tw-hero-scroll-indicator {
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
