import React, { useState } from 'react';
import { Maximize2, ArrowUpRight, MessageSquare, Layers } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data/showroomData';
import { Lightbox, LightboxImage } from './Lightbox';

interface ShowcaseGalleryProps {
  onOpenConsultation: (space: string) => void;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ onOpenConsultation }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Gallery array for the fullscreen lightbox viewer
  const galleryItems: LightboxImage[] = [
    {
      src: '/images/showcase-feature-wall.jpg',
      title: 'Feature walls that carry the room',
      subtitle: 'Marble-look highlighters, glossy waves and textured panels fitted floor-to-ceiling for a striking architectural focus.',
      category: 'Living Room Feature'
    },
    {
      src: '/images/showcase-bathroom.jpg',
      title: 'A full bathroom, sorted in one place',
      subtitle: 'Wall and floor tiles curated to sit seamlessly with brushed brass faucets, rainfall showers, and designer basins.',
      category: 'Master Bath'
    },
    {
      src: '/images/showcase-parking.jpg',
      title: 'Outdoor and parking that lasts',
      subtitle: 'Heavy-duty anti-skid parking and pathway tiles engineered to bear vehicle loads and tropical weathering.',
      category: 'Driveway & Verandah'
    },
    {
      src: '/images/shoppable-room.jpg',
      title: 'Seamless open-plan residential flooring',
      subtitle: 'Large-format 600x1200mm mirror-polished vitrified slabs creating flowing, continuous floor planes with minimal grout lines.',
      category: 'Vitrified Slabs'
    },
    {
      src: '/images/hero-kitchen.jpg',
      title: 'Artisanal Culinary Backsplash',
      subtitle: 'Glazed, heat-resistant subway tiles offering easy maintenance and tactile reflections.',
      category: 'Kitchen Backsplash'
    },
    {
      src: '/images/hero-living-room.jpg',
      title: 'Grand Reception Living Space',
      subtitle: 'High-gloss Italian Statuario marble-look vitrified surfaces reflecting natural sunlight.',
      category: 'Living Area'
    }
  ];

  return (
    <section id="showcase" className="tw-section" style={{ backgroundColor: 'transparent', position: 'relative' }}>
      <div className="tw-container">
        {/* Section Header */}
        <div style={{ maxWidth: '760px', marginBottom: '3.5rem' }}>
          <div className="tw-eyebrow">
            <span className="tw-eyebrow-dot"></span>
            <span>Realised Spaces &bull; The Tile World Showcase</span>
          </div>
          <h2 className="tw-section-title">
            Architectural Interior Applications
          </h2>
          <p className="tw-section-subtitle">
            Scroll through our signature installations. Each card showcases how our vitrified slabs, textured highlighters, and bath fittings come together in actual residences and projects across Vijayawada and Guntur district.
          </p>
        </div>

        {/* =================================================================
            SIGNATURE STACKING CARDS EFFECT
            Each card stays sticky as you scroll, sliding over like a deck of cards
            ================================================================= */}
        <div className="tw-stacking-track" style={{ position: 'relative', marginBottom: '5rem' }}>
          {SHOWCASE_PROJECTS.map((proj, idx) => {
            // Staggered top offset so top headers of previous cards remain visible like a stacked deck
            const topOffset = `calc(92px + ${idx * 28}px)`;
            const cardNumber = String(idx + 1).padStart(2, '0');
            const totalCards = String(SHOWCASE_PROJECTS.length).padStart(2, '0');

            const waProjectMsg = encodeURIComponent(
              `Hello Tile World Vijayawada, I was inspired by your "${proj.title}" showcase project. I would like to consult with your showroom team regarding tiles and bathware for my space.`
            );
            const waUrl = `https://wa.me/919908686789?text=${waProjectMsg}`;

            return (
              <article
                key={proj.id}
                style={{
                  position: 'sticky',
                  top: topOffset,
                  zIndex: idx + 1,
                  marginBottom: idx === SHOWCASE_PROJECTS.length - 1 ? '0' : '4.5rem',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 16px 44px rgba(8, 12, 22, 0.08)',
                  overflow: 'hidden',
                  transition: 'transform 240ms ease, box-shadow 240ms ease'
                }}
                className="tw-stack-card"
                aria-label={`Showcase Project ${idx + 1}: ${proj.title}`}
              >
                {/* Card Top Banner / Deck Header Strip */}
                <div
                  style={{
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '0.875rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--color-bronze)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {cardNumber} <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-subtle)', fontWeight: 400 }}>/ {totalCards}</span>
                    </span>
                    <span
                      style={{
                        height: '14px',
                        width: '1px',
                        backgroundColor: 'var(--color-border)'
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        color: 'var(--color-text-main)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {proj.spaceType}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-subtle)', fontSize: '0.75rem' }}>
                    <Layers size={13} color="var(--color-bronze)" />
                    <span>The Tile World Deck</span>
                  </div>
                </div>

                {/* Card Main Body Grid: Photo & Editorial Specifications */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.15fr 0.85fr',
                    alignItems: 'stretch'
                  }}
                  className="tw-stack-body-grid"
                >
                  {/* Left Column: High-Resolution Architectural Photography */}
                  <div
                    style={{
                      position: 'relative',
                      minHeight: '380px',
                      backgroundColor: 'var(--color-surface-sunken)',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                    onClick={() => setLightboxIndex(idx)}
                    title="Click to view high-resolution photography in lightbox"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform var(--transition-slow)'
                      }}
                      className="tw-stack-img"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for photo contrast */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(8, 12, 22, 0.5) 0%, rgba(8, 12, 22, 0) 40%)'
                      }}
                    />

                    {/* Fullscreen Expansion Hint Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.25rem',
                        right: '1.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--color-text-main)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <Maximize2 size={13} color="var(--color-bronze)" />
                      <span>Fullscreen View</span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.25rem',
                        left: '1.25rem',
                        color: '#FFFFFF'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                        {proj.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Editorial Details & Actions */}
                  <div
                    style={{
                      padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  >
                    <div>
                      <div className="tw-eyebrow" style={{ marginBottom: '0.5rem' }}>
                        <span className="tw-eyebrow-dot"></span>
                        <span>{proj.tagline}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.6rem, 2.3vw, 2.15rem)',
                          fontWeight: 600,
                          color: 'var(--color-text-main)',
                          lineHeight: 1.2,
                          marginBottom: '1rem'
                        }}
                      >
                        {proj.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '0.9375rem',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.7,
                          marginBottom: '1.75rem'
                        }}
                      >
                        {proj.description}
                      </p>

                      {/* Architectural Highlights Attributes */}
                      <div
                        style={{
                          padding: '1rem',
                          backgroundColor: 'var(--color-surface-subtle)',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--color-border)',
                          marginBottom: '2rem'
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: 'var(--color-text-subtle)',
                            marginBottom: '0.35rem'
                          }}
                        >
                          Curated Surface Execution
                        </span>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-main)', margin: 0, fontWeight: 500 }}>
                          Available for direct inspection across our Governorpet &amp; Chilakaluripeta showrooms with batch verification.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <button
                          onClick={() => onOpenConsultation(proj.title)}
                          className="tw-btn tw-btn-primary"
                          style={{ width: '100%', padding: '0.8125rem', fontSize: '0.8125rem' }}
                        >
                          <span>Plan Similar Space</span>
                          <ArrowUpRight size={14} />
                        </button>

                        <button
                          onClick={() => setLightboxIndex(idx)}
                          className="tw-btn tw-btn-secondary"
                          style={{ width: '100%', padding: '0.8125rem', fontSize: '0.8125rem' }}
                        >
                          <span>Inspect Photo</span>
                        </button>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-btn tw-btn-whatsapp"
                        style={{ width: '100%', padding: '0.75rem', fontSize: '0.8125rem' }}
                      >
                        <MessageSquare size={14} />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary Architectural Angles Gallery */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  margin: 0
                }}
              >
                More Space Inspirations
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0' }}>
                Kitchens, grand foyers, and master living suites
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
              Click any photo to launch fullscreen viewer
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {galleryItems.slice(4).map((item, subIdx) => {
              const actualIdx = subIdx + 4;
              return (
                <div
                  key={item.title}
                  style={{
                    position: 'relative',
                    height: '210px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-subtle)'
                  }}
                  className="tw-gallery-thumb"
                  onClick={() => setLightboxIndex(actualIdx)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-slow)'
                    }}
                    className="tw-thumb-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(8, 12, 22, 0.8) 0%, rgba(8, 12, 22, 0) 55%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '1.125rem',
                      color: '#FFFFFF'
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-bronze-light)', fontWeight: 600, letterSpacing: '0.04em' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 600, marginTop: '0.2rem' }}>
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        images={galleryItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Styles for Stacking Cards & Hover Zooms */}
      <style>{`
        .tw-stack-card:hover {
          box-shadow: 0 24px 50px rgba(8, 12, 22, 0.14) !important;
        }
        .tw-stack-card:hover .tw-stack-img {
          transform: scale(1.04);
        }
        .tw-gallery-thumb:hover .tw-thumb-img {
          transform: scale(1.08);
        }

        @media (max-width: 960px) {
          .tw-stack-body-grid {
            grid-template-columns: 1fr !important;
          }
          .tw-stack-card {
            margin-bottom: 3.5rem !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tw-stack-card {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
