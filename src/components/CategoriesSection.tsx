import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/showroomData';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="tw-section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="tw-container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
          <div className="tw-eyebrow">
            <span className="tw-eyebrow-dot"></span>
            <span>Curated Product Architecture</span>
          </div>
          <h2 className="tw-section-title">
            Explore our collections by space &amp; application.
          </h2>
          <p className="tw-section-subtitle">
            From seamless double-charge vitrified slabs to handcrafted wall highlighters and complete sanitaryware, every surface is chosen for durability and refined aesthetics.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem'
          }}
          className="tw-category-asymmetric-grid"
        >
          {PRODUCT_CATEGORIES.map((cat, index) => {
            // Asymmetrical grid column spans for high-end editorial pacing
            // Item 0: 7 cols, Item 1: 5 cols, Item 2: 4 cols, Item 3: 4 cols, Item 4: 4 cols, Item 5: 12 cols (feature banner)
            const colSpan =
              index === 0
                ? 'span 7'
                : index === 1
                ? 'span 5'
                : index === 5
                ? 'span 12'
                : 'span 4';

            const isWide = index === 0 || index === 5;

            return (
              <div
                key={cat.id}
                style={{
                  gridColumn: colSpan,
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: isWide && index === 5 ? 'row' : 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)',
                  cursor: 'pointer'
                }}
                className="tw-category-card"
                onClick={() => onSelectCategory(cat.id)}
              >
                {/* Media Container with controlled zoom */}
                <div
                  style={{
                    position: 'relative',
                    width: isWide && index === 5 ? '50%' : '100%',
                    height: isWide && index === 5 ? 'auto' : isWide ? '340px' : '260px',
                    minHeight: isWide && index === 5 ? '320px' : undefined,
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-surface-subtle)'
                  }}
                  className="tw-cat-media-wrap"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform var(--transition-slow)'
                    }}
                    className="tw-cat-img"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '0.35rem 0.75rem',
                      backgroundColor: 'rgba(20, 19, 18, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    {cat.badge}
                  </div>
                </div>

                {/* Content Details */}
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
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        lineHeight: 1.25,
                        color: 'var(--color-text-main)',
                        marginBottom: '0.625rem'
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem'
                      }}
                    >
                      {cat.description}
                    </p>

                    {/* Highlights bullet tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1.5rem'
                      }}
                    >
                      {cat.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.625rem',
                            backgroundColor: 'var(--color-surface-subtle)',
                            color: 'var(--color-text-muted)',
                            borderRadius: 'var(--radius-xs)',
                            border: '1px solid var(--color-border-subtle)'
                          }}
                        >
                          <Check size={12} color="var(--color-bronze)" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exploration CTA link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        transition: 'color var(--transition-fast)'
                      }}
                      className="tw-cat-link"
                    >
                      <span>Explore In Showroom</span>
                      <ArrowUpRight size={15} color="var(--color-bronze)" />
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
                      Available in Governorpet &bull; Chilakaluripeta
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .tw-category-card:hover {
          border-color: var(--color-border-active);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .tw-category-card:hover .tw-cat-img {
          transform: scale(1.05);
        }
        .tw-category-card:hover .tw-cat-link {
          color: var(--color-bronze);
        }

        @media (max-width: 1024px) {
          .tw-category-asymmetric-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tw-category-card {
            grid-column: span 1 !important;
            flex-direction: column !important;
          }
          .tw-cat-media-wrap {
            width: 100% !important;
            height: 240px !important;
          }
        }

        @media (max-width: 640px) {
          .tw-category-asymmetric-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
