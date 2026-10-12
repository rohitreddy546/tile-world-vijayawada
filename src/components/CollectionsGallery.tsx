import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, Search, X, RotateCcw, PackageSearch } from 'lucide-react';
import { VERIFIED_PRODUCTS, TileProduct } from '../data/showroomData';
import { CollectionModal } from './CollectionModal';

interface CollectionsGalleryProps {
  onOpenConsultation: (productName: string) => void;
}

export const CollectionsGallery: React.FC<CollectionsGalleryProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProduct, setActiveProduct] = useState<TileProduct | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Surfaces' },
    { id: 'marble', label: 'Marble Surfaces' },
    { id: 'wood', label: 'Wood Planks' },
    { id: 'highlight', label: 'Highlighters & Glazes' },
    { id: 'mosaic', label: 'Finger Mosaics' },
    { id: 'concrete', label: 'Concrete & Stone' },
    { id: 'terrazzo', label: 'Terrazzo' }
  ];

  const dimensionChips = [
    { id: 'all', label: 'All Sizes' },
    { id: '600 x 1200 mm', label: '600 × 1200 mm' },
    { id: '600 x 600 mm', label: '600 × 600 mm' },
    { id: '300 x 600 mm', label: '300 × 600 mm' },
    { id: '200 x 1200 mm', label: '200 × 1200 mm' },
    { id: '400 x 400 mm', label: '400 × 400 mm' },
    { id: '75 x 300 mm', label: '75 × 300 mm' },
    { id: '300 x 300 mm Sheet', label: '300 × 300 mm' }
  ];

  // Combined Multi-Dimensional Filtering
  const filteredProducts = VERIFIED_PRODUCTS.filter((product) => {
    // 1. Surface Category Filter
    if (selectedCategory !== 'all' && product.typeCategory !== selectedCategory) {
      return false;
    }
    // 2. Dimension Filter
    if (selectedDimension !== 'all' && product.size !== selectedDimension) {
      return false;
    }
    // 3. Keyword Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchFinish = product.finish.toLowerCase().includes(q);
      const matchIdeal = product.ideal.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchSize = product.size.toLowerCase().includes(q);
      const matchMaterial = product.material.toLowerCase().includes(q);
      return matchName || matchDesc || matchFinish || matchIdeal || matchCat || matchSize || matchMaterial;
    }
    return true;
  });

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedDimension('all');
    setSearchQuery('');
  };

  const isFiltered = selectedCategory !== 'all' || selectedDimension !== 'all' || searchQuery.trim().length > 0;

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
            marginBottom: '2.5rem'
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-main)'
              }}
            >
              <Sparkles size={14} color="var(--color-bronze)" />
              <span>Showing {filteredProducts.length} of {VERIFIED_PRODUCTS.length} Collections</span>
            </span>

            {isFiltered && (
              <button
                onClick={resetAllFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-bronze)'
                }}
                title="Reset all search & filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar: Search & Selectors */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            padding: '1.25rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Real-Time Keyword Search Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              color="var(--color-text-subtle)"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tile name, finish, size, or room (e.g. Statuario, Bathroom, Oak, Gloss)..."
              style={{
                width: '100%',
                padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                fontSize: '0.9375rem',
                color: 'var(--color-text-main)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              className="tw-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '0.25rem',
                  color: 'var(--color-text-subtle)'
                }}
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Row 1: Surface Types */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '0.25rem'
            }}
            role="tablist"
            aria-label="Filter products by surface type"
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-subtle)', whiteSpace: 'nowrap', marginRight: '0.25rem' }}>
              Surface:
            </span>
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  style={{
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
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

          {/* Row 2: Dimensions Filter Chips */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--color-border-subtle)'
            }}
            aria-label="Filter products by dimension"
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-subtle)', whiteSpace: 'nowrap', marginRight: '0.25rem' }}>
              Dimensions:
            </span>
            {dimensionChips.map((chip) => {
              const isActive = selectedDimension === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedDimension(chip.id)}
                  style={{
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    border: isActive ? '1px solid var(--color-bronze)' : '1px solid var(--color-border)',
                    backgroundColor: isActive ? 'var(--color-bronze-light)' : 'var(--color-surface-subtle)',
                    color: isActive ? 'var(--color-bronze-dark)' : 'var(--color-text-muted)',
                    transition: 'all var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {filteredProducts.map((product, pIdx) => (
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
                  cursor: 'pointer',
                  transitionDelay: `${(pIdx % 4) * 60}ms`
                }}
                className="tw-product-card tw-interactive-card tw-reveal is-visible"
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
                      backgroundColor: 'rgba(8, 12, 22, 0.80)',
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
        ) : (
          /* Empty State Recovery */
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px dashed var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-bronze)',
                marginBottom: '1.25rem'
              }}
            >
              <PackageSearch size={28} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                marginBottom: '0.5rem'
              }}
            >
              No matching tile collections found
            </h3>

            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', maxWidth: '480px', marginBottom: '2rem' }}>
              We could not find surfaces matching "{searchQuery}" with the current filters. We have over 500+ additional catalogue designs available in our showrooms.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={resetAllFilters}
                className="tw-btn tw-btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
              >
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>

              <button
                onClick={() => onOpenConsultation(`Custom Tile Search Query: "${searchQuery}"`)}
                className="tw-btn tw-btn-secondary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
              >
                <span>Request Custom Sourcing</span>
                <ArrowUpRight size={15} color="var(--color-bronze)" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <CollectionModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onOpenConsultation={onOpenConsultation}
      />

      <style>{`
        .tw-search-input:focus {
          border-color: var(--color-bronze) !important;
        }
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
