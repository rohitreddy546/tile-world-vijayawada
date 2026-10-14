import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getLenis } from '../hooks/useSmoothScroll';

export interface LightboxImage {
  src: string;
  title: string;
  subtitle: string;
  category: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    if (currentIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      getLenis()?.stop();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null) return null;
  const currentImage = images[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-lightbox)',
        backgroundColor: 'rgba(7, 10, 18, 0.96)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        animation: 'twFadeIn 200ms ease'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Bar Controls */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF',
          zIndex: 20
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <span
            style={{
              padding: '0.25rem 0.625rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}
          >
            {currentImage.category}
          </span>
          <span style={{ fontSize: '0.875rem', color: '#E2E8F0' }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color var(--transition-fast)'
          }}
          aria-label="Close Lightbox (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="tw-lightbox-btn tw-lightbox-prev"
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          transition: 'all var(--transition-fast)'
        }}
        aria-label="Previous image (Left Arrow)"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="tw-lightbox-btn tw-lightbox-next"
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          transition: 'all var(--transition-fast)'
        }}
        aria-label="Next image (Right Arrow)"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image Stage */}
      <div
        style={{
          maxWidth: '1100px',
          maxHeight: '76vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.title}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}
        />

        {/* Caption */}
        <div
          style={{
            marginTop: '1.25rem',
            textAlign: 'center',
            color: '#FFFFFF',
            maxWidth: '700px'
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              fontWeight: 500,
              marginBottom: '0.25rem'
            }}
          >
            {currentImage.title}
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: 0 }}>
            {currentImage.subtitle}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .tw-lightbox-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .tw-lightbox-prev {
            left: 0.5rem !important;
          }
          .tw-lightbox-next {
            right: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};
