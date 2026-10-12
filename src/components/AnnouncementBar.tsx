import React from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/showroomData';

export const AnnouncementBar: React.FC = () => {
  return (
    <div style={{
      backgroundColor: 'var(--color-dark-bg)',
      color: 'var(--color-text-inverse)',
      fontSize: '0.8125rem',
      padding: '0.5rem 1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 101,
      overflow: 'hidden'
    }}>
      <div className="tw-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: 0
      }}>
        {/* Left: Location & Heritage */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#E2E8F0' }}>
            <MapPin size={13} color="var(--color-blue)" />
            <span>Governorpet &bull; Chilakaluripeta, AP</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#94A3B8' }} className="tw-hide-mobile">
            <Clock size={13} color="var(--color-blue)" />
            <span>Mon–Sat: 9:00 AM – 9:00 PM</span>
          </span>
        </div>

        {/* Right: Verified Direct Contact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ color: '#E2E8F0', fontSize: '0.75rem', letterSpacing: '0.04em' }} className="tw-hide-mobile">
            Trusted in Vijayawada Since 2004
          </span>
          <a
            href={`tel:${BUSINESS_INFO.primaryPhone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              color: '#FFFFFF',
              fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'color var(--transition-fast)'
            }}
            aria-label={`Call Tile World Showroom at ${BUSINESS_INFO.primaryPhoneDisplay}`}
          >
            <Phone size={13} color="var(--color-blue)" />
            <span>{BUSINESS_INFO.primaryPhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
