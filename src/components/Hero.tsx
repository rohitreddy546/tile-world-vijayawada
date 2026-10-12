import React from 'react';
import { ArrowDown, MapPin, Sparkles, Play } from 'lucide-react';
import { HeroMotionCanvas } from './HeroMotionCanvas';

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
      {/* GPU-Accelerated Architectural Motion Graphics Background Animation */}
      <HeroMotionCanvas />

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

              <a
                href="#cinematic-story"
                className="tw-btn tw-btn-bronze"
                style={{ padding: '0.9375rem 1.75rem', fontSize: '0.9375rem', gap: '0.5rem' }}
              >
                <Sparkles size={16} />
                <span>Cinematic Slab Story</span>
              </a>

              <a
                href="#showrooms"
                className="tw-btn tw-btn-secondary"
                style={{ padding: '0.9375rem 1.75rem', fontSize: '0.9375rem' }}
              >
                <MapPin size={16} color="var(--color-blue)" />
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

          {/* Right Column: Architectural Photography Collage with Dynamic Floating Elements */}
          <div style={{ position: 'relative' }} className="tw-reveal is-visible">
            {/* Top-Right Floating Trust Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(8, 12, 22, 0.92)',
                backdropFilter: 'blur(10px)',
                padding: '0.625rem 1.125rem',
                borderRadius: 'var(--radius-pill)',
                boxShadow: '0 12px 30px rgba(8, 12, 22, 0.35)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                zIndex: 5,
                animation: 'twFloatDelayed 6s ease-in-out infinite'
              }}
              className="tw-floating-top-badge"
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  animation: 'twBeaconPulse 2s infinite'
                }}
              />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                Authorized Partner &bull; Kajaria &bull; Simpolo
              </span>
            </div>

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
              {/* Motion Graphics Telemetry Stamp */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(7, 10, 18, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  fontFamily: 'monospace',
                  fontSize: '0.6875rem',
                  color: '#E2E8F0',
                  letterSpacing: '0.04em',
                  zIndex: 3
                }}
              >
                SPEC 600&times;1200MM // RECTIFIED // 98 GU
              </div>

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
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 10, 18, 0.7) 0%, rgba(7, 10, 18, 0) 50%)'
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
                <a
                  href="#cinematic-story"
                  style={{
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#070A12',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.02em',
                    transition: 'transform var(--transition-fast)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Play size={12} fill="currentColor" color="var(--color-blue)" />
                  <span>Cinematic Film</span>
                </a>
              </div>
            </div>

            {/* Overlapping Tactile Detail Floating Card with Organic Bobbing Animation */}
            <div
              onClick={() => onOpenEnquiry()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenEnquiry();
              }}
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '-2rem',
                backgroundColor: 'var(--color-surface)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 20px 40px rgba(8, 12, 22, 0.12)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                maxWidth: '280px',
                zIndex: 6,
                cursor: 'pointer',
                animation: 'twFloatSlow 5s ease-in-out infinite'
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
          .tw-floating-card {
            display: none !important;
          }
          .tw-floating-top-badge {
            display: none !important;
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
