import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const FinishesVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const finishesList = [
    { name: 'Mirror-Gloss Vitrified', desc: 'Reflective crystal glaze for bright, spacious living rooms', tag: 'High-Gloss' },
    { name: 'Satin & Smooth Matt', desc: 'Soft-touch non-reflective texture with anti-glare finish', tag: 'Satin' },
    { name: 'Embossed Wood Grain', desc: 'Tactile natural timber relief with vitrified water resistance', tag: 'Textured' },
    { name: 'Handcrafted Wavy Glaze', desc: 'Artisanal organic surface reflecting natural daylight', tag: 'Glazed' },
    { name: 'Anti-Skid Outdoor Gres', desc: 'High-friction grip designed for vehicle driveways and wet areas', tag: 'R10/R11 Slip Grip' }
  ];

  return (
    <section id="finishes" className="tw-section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="tw-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <div className="tw-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="tw-eyebrow-dot"></span>
            <span>Tactile Materiality</span>
          </div>
          <h2 className="tw-section-title">
            See our finishes in motion on floors and walls.
          </h2>
          <p className="tw-section-subtitle" style={{ margin: '0 auto' }}>
            Tiles are physical, architectural elements that interact with lighting and movement. Experience how our glazed surfaces, polished marble textures, and textured mosaics perform in real spaces.
          </p>
        </div>

        {/* Video Player Showcase with Custom Controls */}
        <div
          style={{
            position: 'relative',
            maxWidth: '1020px',
            margin: '0 auto 3.5rem',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: '#000000',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--color-border)'
          }}
        >
          <video
            ref={videoRef}
            src="/videos/tile-range.mp4"
            poster="/images/tile-range-poster.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '580px',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Player Custom Overlay Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              right: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              zIndex: 10
            }}
          >
            <button
              onClick={togglePlay}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(20, 19, 18, 0.75)',
                backdropFilter: 'blur(6px)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all var(--transition-fast)'
              }}
              aria-label={isPlaying ? 'Pause finishes video' : 'Play finishes video'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={toggleMute}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(20, 19, 18, 0.75)',
                backdropFilter: 'blur(6px)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all var(--transition-fast)'
              }}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              backgroundColor: 'rgba(20, 19, 18, 0.75)',
              backdropFilter: 'blur(6px)',
              borderRadius: 'var(--radius-xs)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#25D366'
              }}
            />
            <span>Showroom Range In Motion</span>
          </div>
        </div>

        {/* Tactile Surface Attributes Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1180px',
            margin: '0 auto'
          }}
        >
          {finishesList.map((f, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--color-bronze)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem'
                }}
              >
                {f.tag}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1875rem',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                  marginBottom: '0.35rem'
                }}
              >
                {f.name}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
