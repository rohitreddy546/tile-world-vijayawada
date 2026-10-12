import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, MessageSquare, ArrowUpRight } from 'lucide-react';
import { SHOWROOMS, Showroom } from '../data/showroomData';

export const ShowroomsSection: React.FC = () => {
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom>(SHOWROOMS[0]);

  return (
    <section id="showrooms" className="tw-section" style={{ backgroundColor: 'transparent' }}>
      <div className="tw-container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
          <div className="tw-eyebrow">
            <span className="tw-eyebrow-dot"></span>
            <span>Visit Us In Person</span>
          </div>
          <h2 className="tw-section-title">
            Our Showroom Network
          </h2>
          <p className="tw-section-subtitle">
            Experience our complete collections in person under natural and architectural showroom lighting. Three convenient locations across Vijayawada and Guntur district.
          </p>
        </div>

        {/* 3 Showroom Location Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {SHOWROOMS.map((s) => {
            const isSelected = selectedShowroom.id === s.id;
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${s.name}, ${s.address}, ${s.city} ${s.pincode}`
            )}`;
            const waUrl = `https://wa.me/919908686789?text=${encodeURIComponent(
              `Hi Tile World, I plan to visit your ${s.name} showroom. Please share directions and timings.`
            )}`;

            return (
              <div
                key={s.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '1.5px solid var(--color-bronze)' : '1px solid var(--color-border)',
                  overflow: 'hidden',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-normal)'
                }}
                className="tw-branch-box"
                onClick={() => setSelectedShowroom(s)}
              >
                {/* Showroom Photo Banner */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '210px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-surface-sunken)'
                  }}
                >
                  <img
                    src={s.image}
                    alt={`${s.name} showroom storefront`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    loading="lazy"
                  />
                  {s.isMain && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.25rem 0.625rem',
                        backgroundColor: 'var(--color-bronze)',
                        color: '#FFFFFF',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      Flagship Showroom
                    </div>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      padding: '0.25rem 0.625rem',
                      backgroundColor: 'rgba(8, 12, 22, 0.80)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    {s.area}
                  </div>
                </div>

                {/* Showroom Info */}
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
                        fontSize: '1.45rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        lineHeight: 1.25,
                        marginBottom: '0.75rem'
                      }}
                    >
                      {s.name}
                    </h3>

                    {/* Address item */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.625rem',
                        marginBottom: '0.875rem'
                      }}
                    >
                      <MapPin size={16} color="var(--color-bronze)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                        {s.address}, {s.city} {s.pincode}
                      </p>
                    </div>

                    {/* Hours item */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        marginBottom: '0.875rem'
                      }}
                    >
                      <Clock size={16} color="var(--color-bronze)" style={{ flexShrink: 0 }} />
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                        Mon–Sat: 9:00 AM – 9:00 PM &bull; Sunday Closed
                      </p>
                    </div>

                    {/* Phone item */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <Phone size={16} color="var(--color-bronze)" style={{ flexShrink: 0 }} />
                      <a
                        href={`tel:${s.phone}`}
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'var(--color-text-main)',
                          textDecoration: 'none'
                        }}
                      >
                        {s.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tw-btn tw-btn-secondary"
                      style={{ padding: '0.625rem', fontSize: '0.8125rem' }}
                    >
                      <Navigation size={14} color="var(--color-bronze)" />
                      <span>Get Directions</span>
                    </a>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tw-btn tw-btn-whatsapp"
                      style={{ padding: '0.625rem', fontSize: '0.8125rem' }}
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Google Maps Interactive Embed for Governorpet Flagship */}
        <div
          style={{
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            backgroundColor: 'var(--color-surface)',
            padding: '1.25rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: 0
                }}
              >
                Tile World Showroom Map Location
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Prakasam Road, Governorpet, Vijayawada 520002
              </p>
            </div>

            <a
              href="https://www.google.com/maps?q=Tile%20World%2C%20D.No%2027-6-5%2C%20Prakasam%20Road%2C%20Governorpet%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520002"
              target="_blank"
              rel="noopener noreferrer"
              className="tw-btn tw-btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}
            >
              <span>Open in Google Maps App</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div
            style={{
              width: '100%',
              height: '380px',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-subtle)'
            }}
          >
            <iframe
              title="Tile World showroom location, Governorpet, Vijayawada"
              src="https://www.google.com/maps?q=Tile%20World%2C%20D.No%2027-6-5%2C%20Prakasam%20Road%2C%20Governorpet%2C%20Vijayawada%2C%20Andhra%20Pradesh%20520002&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style>{`
        .tw-branch-box:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
