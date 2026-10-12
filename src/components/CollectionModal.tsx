import React, { useEffect } from 'react';
import { X, MessageSquare, Phone, ShieldCheck, Ruler, Sparkles, Building2 } from 'lucide-react';
import { TileProduct, BUSINESS_INFO } from '../data/showroomData';

interface CollectionModalProps {
  product: TileProduct | null;
  onClose: () => void;
  onOpenConsultation: (productName: string) => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  product,
  onClose,
  onOpenConsultation
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Tile World Vijayawada, I am interested in viewing ${product.name} (${product.size}, Finish: ${product.finish}). Please share availability and showroom quote.`
  );
  const whatsappUrl = `https://wa.me/919908686789?text=${whatsappMessage}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)',
        backgroundColor: 'rgba(20, 19, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        animation: 'twFadeIn 180ms ease'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          backgroundColor: 'var(--color-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          animation: 'twScaleReveal 240ms var(--ease-editorial)'
        }}
        className="tw-modal-grid"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-main)',
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-label="Close product details"
        >
          <X size={18} />
        </button>

        {/* Left: Product Image */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--color-surface-subtle)',
            minHeight: '380px'
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              padding: '0.35rem 0.75rem',
              backgroundColor: 'rgba(20, 19, 18, 0.8)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-xs)',
              letterSpacing: '0.04em'
            }}
          >
            {product.category}
          </div>
        </div>

        {/* Right: Technical Specifications & Enquiries */}
        <div
          style={{
            padding: '2.25rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div className="tw-eyebrow" style={{ marginBottom: '0.5rem' }}>
              <span className="tw-eyebrow-dot"></span>
              <span>Verified Specification</span>
            </div>

            <h3
              id="modal-product-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                lineHeight: 1.2,
                marginBottom: '0.875rem'
              }}
            >
              {product.name}
            </h3>

            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.65,
                marginBottom: '1.75rem'
              }}
            >
              {product.description}
            </p>

            {/* Spec Attributes Table */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.875rem',
                padding: '1.25rem',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                marginBottom: '1.75rem'
              }}
            >
              <div>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-subtle)',
                    marginBottom: '0.25rem'
                  }}
                >
                  <Ruler size={12} color="var(--color-bronze)" />
                  <span>Dimensions</span>
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {product.size}
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-subtle)',
                    marginBottom: '0.25rem'
                  }}
                >
                  <Sparkles size={12} color="var(--color-bronze)" />
                  <span>Surface Finish</span>
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {product.finish}
                </span>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-subtle)',
                    marginBottom: '0.25rem'
                  }}
                >
                  <Building2 size={12} color="var(--color-bronze)" />
                  <span>Ideal Spaces</span>
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {product.ideal}
                </span>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-subtle)',
                    marginBottom: '0.25rem'
                  }}
                >
                  <ShieldCheck size={12} color="var(--color-bronze)" />
                  <span>Material Composition</span>
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {product.material}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-btn tw-btn-whatsapp"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              <MessageSquare size={16} />
              <span>Enquire Availability on WhatsApp</span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation(product.name);
                }}
                className="tw-btn tw-btn-primary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <span>Request Sample</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="tw-btn tw-btn-secondary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <Phone size={14} />
                <span>Call Showroom</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tw-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
