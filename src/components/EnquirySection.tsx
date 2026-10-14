import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/showroomData';

interface EnquirySectionProps {
  onOpenEnquiry: () => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="contact" className="tw-section" style={{ backgroundColor: 'transparent' }}>
      <div className="tw-container">
        <div
          style={{
            backgroundColor: 'var(--color-dark-bg)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.75rem, 5vw, 4rem)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Subtle Background architectural glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(8, 12, 22, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: 'clamp(2rem, 5vw, 3.5rem)',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}
            className="tw-contact-grid"
          >
            {/* Left Column */}
            <div>
              <div
                className="tw-eyebrow"
                style={{ color: 'var(--color-bronze-light)', marginBottom: '1rem' }}
              >
                <span
                  className="tw-eyebrow-dot"
                  style={{ backgroundColor: 'var(--color-bronze)' }}
                ></span>
                <span>Get In Touch</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                  color: '#FFFFFF'
                }}
              >
                Planning your next space? <br />
                <span style={{ fontStyle: 'italic', color: 'var(--color-blue)' }}>
                  Consult our material specialists.
                </span>
              </h2>

              <p
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: '#E2E8F0',
                  marginBottom: '2rem',
                  maxWidth: '540px'
                }}
              >
                Bring your floor plan, architect’s elevations, or bathroom mood board. We will calculate tile square footage, verify current factory batch availability, and recommend matching bath fittings.
              </p>

              <div
                className="tw-contact-cta-group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  flexWrap: 'wrap'
                }}
              >
                <button
                  onClick={onOpenEnquiry}
                  className="tw-btn tw-btn-bronze"
                  style={{ padding: '0.9375rem 2rem', fontSize: '0.9375rem' }}
                >
                  <Calendar size={16} />
                  <span>Request Showroom Quote</span>
                </button>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-btn tw-btn-whatsapp"
                  style={{ padding: '0.9375rem 1.75rem', fontSize: '0.9375rem' }}
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Direct Contact Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-sm)',
                padding: '2rem',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  color: '#FFFFFF'
                }}
              >
                Immediate Contact Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>
                    Primary Showroom Hotline
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.primaryPhone}`}
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Phone size={18} color="var(--color-blue)" />
                    <span>{BUSINESS_INFO.primaryPhoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>
                    Alternative Showroom Mobile
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                    style={{
                      fontSize: '1.125rem',
                      fontFamily: 'var(--font-serif)',
                      color: '#E2E8F0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Phone size={16} color="var(--color-blue)" />
                    <span>{BUSINESS_INFO.secondaryPhoneDisplay}</span>
                  </a>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>
                    Sri Vasavi Tiles Branch Landline
                  </span>
                  <span
                    style={{
                      fontSize: '1.0625rem',
                      fontFamily: 'var(--font-serif)',
                      color: '#E2E8F0'
                    }}
                  >
                    {BUSINESS_INFO.landlineDisplay}
                  </span>
                </div>

                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', display: 'block', marginBottom: '0.25rem' }}>
                    Working Hours
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#FFFFFF' }}>
                    {BUSINESS_INFO.hoursWeekday} &bull; {BUSINESS_INFO.hoursSunday}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .tw-contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .tw-contact-cta-group button,
          .tw-contact-cta-group a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
