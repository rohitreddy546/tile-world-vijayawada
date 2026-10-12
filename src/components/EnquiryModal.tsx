import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO, SHOWROOMS } from '../data/showroomData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialSqFt?: string;
  initialMessage?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCategory,
  initialSqFt,
  initialMessage
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(initialCategory || 'Flooring & Vitrified Tiles');
  const [preferredShowroom, setPreferredShowroom] = useState('Tile World — Governorpet');
  const [approxSqFt, setApproxSqFt] = useState(initialSqFt || '');
  const [message, setMessage] = useState(initialMessage || '');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
    if (initialSqFt) setApproxSqFt(initialSqFt);
    if (initialMessage) setMessage(initialMessage);
  }, [initialCategory, initialSqFt, initialMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!phone.trim()) {
      newErrors.phone = 'Please provide your phone number';
    } else if (!/^[0-9+\s-]{10,14}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Format text for WhatsApp dispatch
    const waText = encodeURIComponent(
      `*New Showroom Enquiry — Tile World Vijayawada*\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Interested Category:* ${category}\n` +
      `*Preferred Showroom:* ${preferredShowroom}\n` +
      (approxSqFt ? `*Approx. Area:* ${approxSqFt} sq. ft.\n` : '') +
      (message ? `*Notes:* ${message}\n` : '')
    );

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Automatically open WhatsApp with verified number
      window.open(`https://wa.me/919908686789?text=${waText}`, '_blank');
    }, 450);
  };

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
        animation: 'twFadeIn 200ms ease'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-enquiry-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '580px',
          maxHeight: '92vh',
          backgroundColor: 'var(--color-bg)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          overflowY: 'auto',
          position: 'relative',
          padding: '2.25rem 2rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-main)'
          }}
          aria-label="Close enquiry modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(37, 211, 102, 0.15)',
                color: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.875rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                marginBottom: '0.75rem'
              }}
            >
              Enquiry Prepared for WhatsApp
            </h3>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                maxWidth: '440px',
                margin: '0 auto 2rem'
              }}
            >
              Your requirements have been formatted and dispatched to Tile World’s consultation desk. Our team will review stock and specifications to provide tailored recommendations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="tw-btn tw-btn-primary"
                style={{ width: '100%', padding: '0.875rem' }}
              >
                <Phone size={15} />
                <span>Call Showroom Immediately ({BUSINESS_INFO.primaryPhoneDisplay})</span>
              </a>

              <button
                onClick={onClose}
                className="tw-btn tw-btn-secondary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <span>Return to Showroom Website</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="tw-eyebrow">
              <span className="tw-eyebrow-dot"></span>
              <span>Architectural Advisory</span>
            </div>

            <h3
              id="modal-enquiry-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                lineHeight: 1.2,
                marginBottom: '0.5rem'
              }}
            >
              Request Showroom Consultation &amp; Quote
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.55,
                marginBottom: '1.75rem'
              }}
            >
              Share your project requirements to check tile batches, slab dimensions, bathware fittings, or book an in-person showroom walkthrough.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="enquiry-name"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '0.35rem',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Rajesh Reddy"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: errors.name ? '1.5px solid #E53E3E' : '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-main)',
                      outline: 'none'
                    }}
                  />
                  {errors.name && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#E53E3E', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '0.35rem',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    Mobile Number (WhatsApp Preferred) *
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="e.g. 99086 86789"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: errors.phone ? '1.5px solid #E53E3E' : '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-main)',
                      outline: 'none'
                    }}
                  />
                  {errors.phone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#E53E3E', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      <AlertCircle size={12} /> {errors.phone}
                    </span>
                  )}
                </div>

                {/* Category & Showroom Selector Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="tw-form-row">
                  <div>
                    <label
                      htmlFor="enquiry-category"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        marginBottom: '0.35rem',
                        color: 'var(--color-text-main)'
                      }}
                    >
                      Interested In
                    </label>
                    <select
                      id="enquiry-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.875rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-main)',
                        outline: 'none'
                      }}
                    >
                      <option value="Flooring & Vitrified Tiles">Flooring &amp; Vitrified Slabs</option>
                      <option value="Designer Bathroom Tiles">Designer Bathroom Tiles</option>
                      <option value="Complete Bathware & Faucets">Complete Bathware &amp; Fittings</option>
                      <option value="Kitchen Wall Tiles">Kitchen Wall Backsplashes</option>
                      <option value="Outdoor & Parking Tiles">Outdoor &amp; Parking Tiles</option>
                      <option value="Full House / Villa Package">Full House / Villa Package</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-showroom"
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        marginBottom: '0.35rem',
                        color: 'var(--color-text-main)'
                      }}
                    >
                      Preferred Showroom
                    </label>
                    <select
                      id="enquiry-showroom"
                      value={preferredShowroom}
                      onChange={(e) => setPreferredShowroom(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 0.875rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-main)',
                        outline: 'none'
                      }}
                    >
                      {SHOWROOMS.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Approximate Area & Optional Notes */}
                <div>
                  <label
                    htmlFor="enquiry-sqft"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '0.35rem',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    Estimated Area (Optional Sq. Ft.)
                  </label>
                  <input
                    id="enquiry-sqft"
                    type="text"
                    value={approxSqFt}
                    onChange={(e) => setApproxSqFt(e.target.value)}
                    placeholder="e.g. 1500 sq ft or 3 bathrooms"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-main)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '0.35rem',
                      color: 'var(--color-text-main)'
                    }}
                  >
                    Additional Notes or Specific Brands (Optional)
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Looking for Italian marble look in 600x1200mm, Kajaria or Simpolo vitrified..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)',
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-main)',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="tw-btn tw-btn-whatsapp"
                  style={{
                    width: '100%',
                    padding: '0.9375rem',
                    fontSize: '0.9375rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>{submitting ? 'Connecting...' : 'Send Enquiry via WhatsApp'}</span>
                </button>

                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', textAlign: 'center', margin: 0 }}>
                  Direct connection to Tile World Showroom staff &bull; No automated chatbots &bull; Privacy protected
                </p>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 520px) {
          .tw-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
