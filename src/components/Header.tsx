import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/showroomData';

interface HeaderProps {
  onOpenEnquiry: (category?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Collections', href: '#collections' },
    { label: 'Room Studio', href: '#room-previewer' },
    { label: 'Estimator', href: '#calculator' },
    { label: 'Categories', href: '#categories' },
    { label: 'Finishes', href: '#finishes' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Showrooms', href: '#showrooms' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-header)',
          backgroundColor: isScrolled ? 'rgba(251, 249, 245, 0.95)' : 'var(--color-bg)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 4px 20px rgba(26, 25, 24, 0.05)' : 'none',
          transition: 'all 240ms ease'
        }}
      >
        <div
          className="tw-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px'
          }}
        >
          {/* Brand Logo & Wordmark */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              textDecoration: 'none'
            }}
            aria-label="Tile World Vijayawada - Home"
          >
            <img
              src="/images/tile_world_logo.png"
              alt="Tile World Logo"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  color: 'var(--color-text-main)'
                }}
              >
                TILE WORLD
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bronze)',
                  fontWeight: 600
                }}
              >
                Vijayawada &bull; Est. 2004
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem'
            }}
            className="tw-desktop-nav"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.01em',
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  padding: '0.25rem 0'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-btn tw-btn-whatsapp tw-hide-mobile"
              style={{
                padding: '0.625rem 1.125rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--radius-xs)'
              }}
              aria-label="Chat on WhatsApp with Tile World"
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenEnquiry()}
              className="tw-btn tw-btn-primary"
              style={{
                padding: '0.625rem 1.25rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--radius-xs)'
              }}
              id="header-enquire-btn"
            >
              <span>Enquire Now</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="tw-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-main)'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-drawer)',
            backgroundColor: 'rgba(20, 19, 18, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'twFadeIn 200ms ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '380px',
              height: '100%',
              backgroundColor: 'var(--color-bg)',
              borderLeft: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-xl)',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em'
                  }}
                >
                  TILE WORLD
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-bronze)' }}>
                  Vijayawada Showroom
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.5rem',
                  color: 'var(--color-text-main)'
                }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  style={{
                    fontSize: '1.125rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    color: 'var(--color-text-main)',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--color-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} color="var(--color-text-subtle)" />
                </a>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="tw-btn tw-btn-primary"
                style={{ width: '100%', padding: '0.875rem' }}
              >
                <span>Request Quotation</span>
                <ArrowUpRight size={16} />
              </button>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-btn tw-btn-whatsapp"
                style={{ width: '100%', padding: '0.875rem' }}
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="tw-btn tw-btn-secondary"
                style={{ width: '100%', padding: '0.875rem' }}
              >
                <Phone size={16} />
                <span>Call {BUSINESS_INFO.primaryPhoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Style for mobile nav toggle */}
      <style>{`
        @media (max-width: 960px) {
          .tw-desktop-nav {
            display: none !important;
          }
          .tw-mobile-toggle {
            display: inline-flex !important;
          }
          .tw-hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
