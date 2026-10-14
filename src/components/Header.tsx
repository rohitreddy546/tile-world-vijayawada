import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare, Sun, Moon } from 'lucide-react';
import { BUSINESS_INFO } from '../data/showroomData';
import { getLenis } from '../hooks/useSmoothScroll';

interface HeaderProps {
  onOpenEnquiry: (category?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tw-theme') as 'dark' | 'light' | null;
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tw-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
      getLenis()?.stop();
    } else {
      document.body.style.overflow = '';
      getLenis()?.start();
    }
  }, [mobileMenuOpen]);

  // Full navigation links for mobile drawer
  const allNavLinks = [
    { label: 'Home', href: '#' },
    { label: 'Cinematic Story', href: '#cinematic-story' },
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

  // Curated, uncluttered primary anchors for desktop navigation
  const desktopNavLinks = [
    { label: 'Slab Journey', href: '#cinematic-story' },
    { label: 'Collections', href: '#collections' },
    { label: 'Room Studio', href: '#room-previewer' },
    { label: 'Estimator', href: '#calculator' },
    { label: 'Showcase', href: '#showcase' },
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
          backgroundColor: isScrolled ? 'var(--color-header-bg)' : 'var(--color-bg)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
          transition: 'all 240ms ease'
        }}
      >
        <div
          className="tw-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px',
            gap: '1rem'
          }}
        >
          {/* Brand Logo & Wordmark - Protected flexShrink: 0 */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              textDecoration: 'none',
              flexShrink: 0,
              minWidth: 'max-content'
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
                  fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  color: 'var(--color-text-main)'
                }}
              >
                TILE WORLD
              </span>
              <span
                className="tw-header-est"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-blue)',
                  fontWeight: 600
                }}
              >
                Vijayawada &bull; Est. 2004
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Animated Micro-Interaction */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 1.4vw, 1.5rem)',
              flexShrink: 1,
              margin: '0 0.5rem'
            }}
            className="tw-desktop-nav"
            aria-label="Primary Navigation"
          >
            {desktopNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="tw-nav-link-item"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tw-btn tw-btn-whatsapp tw-hide-laptop"
              style={{
                padding: '0.625rem 1rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--radius-xs)',
                gap: '0.45rem'
              }}
              aria-label="Chat on WhatsApp with Tile World"
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </a>

            {/* Theme Switcher Toggle Button */}
            <button
              onClick={toggleTheme}
              className="tw-theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to Gallery Light Mode' : 'Switch to Obsidian Dark Mode'}
              title={theme === 'dark' ? 'Switch to Gallery Light Mode' : 'Switch to Obsidian Dark Mode'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {theme === 'dark' ? <Sun size={17} color="#60A5FA" /> : <Moon size={17} color="#1D4ED8" />}
            </button>

            <button
              onClick={() => onOpenEnquiry()}
              className="tw-btn tw-btn-primary"
              style={{
                padding: '0.625rem 1.125rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--radius-xs)',
                gap: '0.45rem'
              }}
              id="header-enquire-btn"
            >
              <span>Enquire Now</span>
              <ArrowUpRight size={14} />
            </button>
            {/* Mobile Hamburger Menu Toggle Button */}
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
            backgroundColor: 'rgba(8, 12, 22, 0.70)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'twFadeIn 200ms ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            data-lenis-prevent
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
                <span style={{ fontSize: '0.75rem', color: 'var(--color-blue)', fontWeight: 600 }}>
                  Vijayawada Showroom
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={toggleTheme}
                  style={{
                    padding: '0.45rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-main)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label={theme === 'dark' ? 'Switch to Gallery Light Mode' : 'Switch to Obsidian Dark Mode'}
                  title={theme === 'dark' ? 'Switch to Gallery Light Mode' : 'Switch to Obsidian Dark Mode'}
                >
                  {theme === 'dark' ? <Sun size={18} color="#60A5FA" /> : <Moon size={18} color="#1D4ED8" />}
                </button>
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
              {allNavLinks.map((link) => (
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

      {/* Responsive Breakpoints & Desktop Navigation Preservation */}
      <style>{`
        @media (max-width: 1080px) {
          .tw-desktop-nav {
            display: none !important;
          }
          .tw-mobile-toggle {
            display: inline-flex !important;
          }
        }
        @media (max-width: 1240px) {
          .tw-hide-laptop {
            display: none !important;
          }
        }
        @media (max-width: 580px) {
          #header-enquire-btn {
            display: none !important;
          }
        }
        @media (max-width: 380px) {
          .tw-header-est {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
