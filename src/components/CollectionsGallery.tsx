import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { VERIFIED_PRODUCTS, TileProduct } from '../data/showroomData';
import { CollectionModal } from './CollectionModal';

interface CollectionsGalleryProps {
  onOpenConsultation: (productName: string) => void;
}

export const CollectionsGallery: React.FC<CollectionsGalleryProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<TileProduct | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Collections' },
    { id: 'marble', label: 'Marble Surfaces' },
    { id: 'wood', label: 'Wood Planks' },
    { id: 'highlight', label: 'Highlighters & Glazes' },
    { id: 'mosaic', label: 'Finger Mosaics' },
    { id: 'concrete', label: 'Concrete & Stone' },
    { id: 'terrazzo', label: 'Terrazzo' }
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? VERIFIED_PRODUCTS
      : VERIFIED_PRODUCTS.filter((p) => p.typeCategory === selectedCategory);

  return (
    <section id="collections" className="tw-section" style={{ backgroundColor: 'var(--color-surface-subtle)' }}>
      <div className="tw-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div className="tw-eyebrow">
              <span className="tw-eyebrow-dot"></span>
              <span>Architectural Catalogue</span>
            </div>
            <h2 className="tw-section-title">
              Featured Tile Collections
            </h2>
            <p className="tw-section-subtitle">
              Authentic vitrified floor slabs, Italian marble aesthetics, artisanal wall highlighters, and tactile finger mosaics available across our Vijayawada showrooms.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-subtle)', fontSize: '0.8125rem' }}>
            <Sparkles size={15} color="var(--color-bronze)" />
            <span>10 Verified Collections On Display</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none'
          }}
          role="tablist"
          aria-label="Filter products by surface type"
        >
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                role="tab"
                aria-selected={isActive}
                style={{
                  padding: '0.5625rem 1.125rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  borderRadius: 'var(--radius-pill)',
                  border: isActive ? '1px solid var(--color-dark-bg)' : '1px solid var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-dark-bg)' : 'var(--color-surface)',
                  color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-main)',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer'
              }}
              className="tw-product-card"
              onClick={() => setActiveProduct(product)}
            >
              {/* Product Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3.2',
                  backgroundColor: 'var(--color-surface-subtle)',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={product.image}
                  alt={`${product.name} tile surface`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-slow)'
                  }}
                  className="tw-prod-img"
                  loading="lazy"
                />

                {/* Category Pill Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.875rem',
                    left: '0.875rem',
                    padding: '0.3rem 0.65rem',
                    backgroundColor: 'rgba(20, 19, 18, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {product.category}
                </div>

                {/* Dimensions Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.875rem',
                    right: '0.875rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {product.size}
                </div>
              </div>

              {/* Product Info */}
              <div
                style={{
                  padding: '1.25rem',
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
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: 1.25,
                      color: 'var(--color-text-main)',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-bronze)',
                      fontWeight: 600,
                      marginBottom: '0.625rem'
                    }}
                  >
                    {product.finish}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.875rem',
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
                      gap: '0.25rem'
                    }}
                    className="tw-card-cta"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight size={14} color="var(--color-bronze)" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const msg = encodeURIComponent(`Hi Tile World, I'd like to check price and stock for ${product.name} (${product.size})`);
                      window.open(`https://wa.me/919908686789?text=${msg}`, '_blank');
                    }}
                    style={{
                      padding: '0.4rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--color-surface-subtle)',
                      color: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Enquire on WhatsApp"
                    aria-label={`Enquire about ${product.name} on WhatsApp`}
                  >
                    <MessageSquare size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <CollectionModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onOpenConsultation={onOpenConsultation}
      />

      <style>{`
        .tw-product-card:hover {
          border-color: var(--color-border-active);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .tw-product-card:hover .tw-prod-img {
          transform: scale(1.06);
        }
        .tw-product-card:hover .tw-card-cta {
          color: var(--color-bronze);
        }
      `}</style>
    </section>
  );
};
