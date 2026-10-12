import React, { useState } from 'react';
import { Maximize2, ArrowUpRight } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data/showroomData';
import { Lightbox, LightboxImage } from './Lightbox';

interface ShowcaseGalleryProps {
  onOpenConsultation: (space: string) => void;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ onOpenConsultation }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Gallery array including verified installations + extra room spaces
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
      src: '/images/hero-living-room.jpg',
      title: 'Seamless Open-Plan Flooring',
      subtitle: 'Large format 600x1200mm polished vitrified slabs creating continuous floor planes with minimal grout lines.',
      category: 'Interior Flooring'
    },
    {
      src: '/images/hero-kitchen.jpg',
      title: 'Artisanal Culinary Backsplash',
      subtitle: 'Glazed, heat-resistant subway tiles offering easy maintenance and tactile reflections.',
      category: 'Kitchen Backsplash'
    },
    {
      src: '/images/shoppable-room.jpg',
      title: 'Modern Architectural Residence',
      subtitle: 'Integrated tile and bathware consultation executed for luxury residential apartments in Vijayawada.',
      category: 'Complete Project'
    }
  ];

  return (
    <section id="showcase" className="tw-section" style={{ backgroundColor: 'var(--color-surface-subtle)' }}>
      <div className="tw-container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
          <div className="tw-eyebrow">
            <span className="tw-eyebrow-dot"></span>
            <span>Realised Spaces</span>
          </div>
          <h2 className="tw-section-title">
            Architectural Interior Applications
          </h2>
          <p className="tw-section-subtitle">
            See how Tile World’s vitrified surfaces and bath fittings come together in real residences, villas, and commercial projects across Vijayawada and Guntur district.
          </p>
        </div>

        {/* 3 Featured Signature Case Studies */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
        >
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-normal)'
              }}
              className="tw-showcase-card"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-surface-sunken)'
                }}
                onClick={() => setLightboxIndex(idx)}
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
                  className="tw-showcase-img"
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.3rem 0.65rem',
                    backgroundColor: 'rgba(20, 19, 18, 0.75)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {proj.spaceType}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-main)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  }}
                  title="Expand to Fullscreen"
                >
                  <Maximize2 size={16} />
                </div>
              </div>

              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      color: 'var(--color-bronze)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {proj.tagline}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      lineHeight: 1.25,
                      marginBottom: '0.75rem'
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem'
                    }}
                  >
                    {proj.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border-subtle)'
                  }}
                >
                  <button
                    onClick={() => setLightboxIndex(idx)}
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem'
                    }}
                  >
                    <span>View In Gallery</span>
                    <ArrowUpRight size={14} color="var(--color-bronze)" />
                  </button>

                  <button
                    onClick={() => onOpenConsultation(proj.title)}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-bronze)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    Plan Similar Space
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extended Gallery Grid of Additional Angles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem'
          }}
          className="tw-extra-gallery-grid"
        >
          {galleryItems.slice(3).map((item, subIdx) => {
            const actualIdx = subIdx + 3;
            return (
              <div
                key={item.title}
                style={{
                  position: 'relative',
                  height: '220px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)'
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
                    background: 'linear-gradient(to top, rgba(20, 19, 18, 0.75) 0%, rgba(20, 19, 18, 0) 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1rem',
                    color: '#FFFFFF'
                  }}
                >
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-bronze-light)', fontWeight: 600 }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, marginTop: '0.15rem' }}>
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        images={galleryItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      <style>{`
        .tw-showcase-card:hover {
          border-color: var(--color-border-active);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .tw-showcase-card:hover .tw-showcase-img {
          transform: scale(1.05);
        }
        .tw-gallery-thumb:hover .tw-thumb-img {
          transform: scale(1.08);
        }
        @media (max-width: 768px) {
          .tw-extra-gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
