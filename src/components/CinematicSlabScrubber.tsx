import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  ArrowUpRight,
  Scan
} from 'lucide-react';

export interface CinematicChapter {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technicalSpecs: { label: string; value: string }[];
  highlightTag: string;
}

export const CINEMATIC_CHAPTERS: CinematicChapter[] = [
  {
    id: 'origin',
    step: '01',
    title: 'Apuan Quarry Genesis',
    subtitle: 'Selected White Statuario Crystalline Block',
    description: 'Extracted from high-altitude quarry veins with natural charcoal fissures and golden calcite spider veining. Hand-inspected for structural density and zero micro-fractures.',
    image: '/images/cinematic/chapter-1-origin.jpg',
    highlightTag: 'Raw Mineral Extraction',
    technicalSpecs: [
      { label: 'Origin', value: 'Carrara Marble Matrix' },
      { label: 'Raw Density', value: '2,710 kg/m³' },
      { label: 'Mineral Base', value: '98.5% Calcite Purity' }
    ]
  },
  {
    id: 'cutting',
    step: '02',
    title: 'Diamond Laser Rectification',
    subtitle: 'Precision Slicing to Exact 600×1200mm Planes',
    description: 'High-pressure continuous water cooling mist absorbs thermal expansion as industrial diamond blades carve razor-straight edges with ±0.08mm dimensional accuracy for near-invisible grout lines.',
    image: '/images/cinematic/chapter-2-cutting.jpg',
    highlightTag: 'Industrial Tolerance: ±0.08mm',
    technicalSpecs: [
      { label: 'Cut Tolerance', value: '±0.08 mm Orthogonal' },
      { label: 'Format Slicing', value: '600 × 1200 mm' },
      { label: 'Edge Profile', value: '90° Rectified Bevel' }
    ]
  },
  {
    id: 'polish',
    step: '03',
    title: 'Mirror Glaze & Nano-Sealing',
    subtitle: 'Oscillating Diamond Polishing to 95+ Gloss Level',
    description: 'Successive abrasive stages polish the vitreous enamel glaze into a liquid-mirror finish with hydrophobic nano-barrier technology, achieving zero water absorption (<0.05%) and stain resistance.',
    image: '/images/cinematic/chapter-3-polish.jpg',
    highlightTag: 'Liquid Mirror: 98 GU Gloss',
    technicalSpecs: [
      { label: 'Gloss Reflection', value: '> 95 GU Reflectance' },
      { label: 'Water Porosity', value: '< 0.05% Vitrified' },
      { label: 'Surface Hardness', value: 'Mohs Scale 8+' }
    ]
  },
  {
    id: 'living',
    step: '04',
    title: 'Architectural Villa Living',
    subtitle: 'Continuous Floor Planes in Grand Residence',
    description: 'Installed in a double-height luxury villa living room, reflecting soft sunlight and garden foliage. The large-format 600×1200mm slabs create an uninterrupted seamless floor horizon.',
    image: '/images/cinematic/chapter-4-living.jpg',
    highlightTag: 'Residential Installation',
    technicalSpecs: [
      { label: 'Installed Area', value: 'Living & Grand Foyers' },
      { label: 'Grout Gap', value: '1.5 mm Architectural' },
      { label: 'Reflective Gain', value: '+40% Ambient Daylight' }
    ]
  }
];

interface CinematicSlabScrubberProps {
  onOpenConsultation?: (topic: string) => void;
}

export const CinematicSlabScrubber: React.FC<CinematicSlabScrubberProps> = ({ onOpenConsultation }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 1
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playTimerRef = useRef<number | null>(null);

  const activeChapter = CINEMATIC_CHAPTERS[activeChapterIndex];

  // Auto-play timeline progression
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.008;
          if (next >= 1) {
            // Loop back to start
            return 0;
          }
          return next;
        });
      }, 50);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying]);

  // Synchronize active chapter based on scrub progress
  useEffect(() => {
    const chapterCount = CINEMATIC_CHAPTERS.length;
    const computedIndex = Math.min(
      chapterCount - 1,
      Math.floor(progress * chapterCount)
    );
    if (computedIndex !== activeChapterIndex) {
      setActiveChapterIndex(computedIndex);
    }
  }, [progress, activeChapterIndex]);

  // Direct manual chapter selection
  const selectChapter = (index: number) => {
    setActiveChapterIndex(index);
    const chapterWidth = 1 / CINEMATIC_CHAPTERS.length;
    setProgress(index * chapterWidth + chapterWidth * 0.1);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="cinematic-story"
      className="tw-section"
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}
      aria-label="Cinematic Slab Journey: From Quarry to Living Space"
    >
      {/* Ambient Architectural Lighting Bloom */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.15) 0%, rgba(7, 10, 18, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="tw-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
          <div className="tw-eyebrow">
            <span className="tw-eyebrow-dot" style={{ animation: 'twBeaconPulse 2s infinite' }}></span>
            <span>Flagship Cinematic Visualization</span>
          </div>
          <h2 className="tw-section-title">
            The Architectural Journey of a Tile Slab
          </h2>
          <p className="tw-section-subtitle">
            From raw Italian quarry monoliths to laser-rectified diamond cutting and mirror-polished villa floors. Scrub through the manufacturing transformation that defines Tile World craftsmanship.
          </p>
        </div>

        {/* =================================================================
            FLAGSHIP CINEMATIC THEATRE VIEWPORT
            ================================================================= */}
        <div
          ref={containerRef}
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.28fr 0.72fr',
            gap: 0
          }}
          className="tw-cinematic-theatre-grid"
        >
          {/* Left Column: 16:9 Cinematic Viewport Screen */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#000000',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'crosshair'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Multi-Layer Crossfading Cinema Frames */}
            {CINEMATIC_CHAPTERS.map((chapter, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <div
                  key={chapter.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden',
                    transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isActive 
                      ? isHovering 
                        ? `scale(1.04) translate(${(mousePos.x - 50) * -0.04}%, ${(mousePos.y - 50) * -0.04}%)`
                        : 'scale(1)'
                      : 'scale(0.97)'
                  }}
                >
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    loading="eager"
                  />
                  {/* Subtle Cinematic Vignette & Shadow Grading */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(4,6,11,0.7) 100%)'
                    }}
                  />
                </div>
              );
            })}

            {/* Cinematic Camera Frame HUD Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-xs)',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0.875rem'
              }}
            >
              {/* HUD Top Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(7, 10, 18, 0.82)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(255, 255, 255, 0.14)'
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isPlaying ? '#25D366' : 'var(--color-blue)',
                      animation: isPlaying ? 'twBeaconPulse 1.5s infinite' : 'none'
                    }}
                  />
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.08em' }}>
                    {isPlaying ? 'LIVE SCRUB SEQUENCE' : 'CINEMATIC INSPECTION'}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(7, 10, 18, 0.82)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em'
                  }}
                >
                  FRAME {String(activeChapterIndex + 1).padStart(2, '0')} / 04 &bull; {Math.round(progress * 100)}%
                </div>
              </div>

              {/* HUD Center Crosshair */}
              <div
                style={{
                  alignSelf: 'center',
                  opacity: isHovering ? 0.85 : 0.25,
                  transition: 'opacity 300ms ease',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              >
                <Scan size={26} strokeWidth={1.5} />
              </div>

              {/* HUD Bottom Bar: Active Chapter Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(7, 10, 18, 0.85)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.5rem 0.875rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-blue)', fontWeight: 700, display: 'block' }}>
                    {activeChapter.highlightTag}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
                    {activeChapter.title}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.6875rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    backgroundColor: 'rgba(7, 10, 18, 0.8)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  4K Master &bull; 60 FPS
                </div>
              </div>
            </div>

            {/* Quick Play/Pause Center Floating Control */}
            <button
              onClick={togglePlay}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(7, 10, 18, 0.85)',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                opacity: isHovering || !isPlaying ? 1 : 0,
                transition: 'all 240ms ease',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
              }}
              className="tw-cinematic-play-btn"
              aria-label={isPlaying ? 'Pause cinematic reel' : 'Play cinematic reel'}
            >
              {isPlaying ? <Pause size={24} color="var(--color-blue)" /> : <Play size={24} style={{ marginLeft: '3px' }} color="#FFFFFF" />}
            </button>
          </div>

          {/* Right Column: Architectural Narrative & Technical Specs */}
          <div
            style={{
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--color-surface)',
              borderLeft: '1px solid var(--color-border)'
            }}
          >
            <div>
              {/* Step indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--color-blue)',
                    backgroundColor: 'var(--color-blue-light)',
                    padding: '0.25rem 0.625rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  PHASE {activeChapter.step}
                </span>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
                  Craftsmanship Timeline
                </span>
              </div>

              {/* Title and Subtitle */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.65rem, 2.4vw, 2.2rem)',
                  fontWeight: 600,
                  lineHeight: 1.18,
                  color: 'var(--color-text-main)',
                  marginBottom: '0.5rem'
                }}
              >
                {activeChapter.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-blue)', fontWeight: 600, marginBottom: '1.25rem' }}>
                {activeChapter.subtitle}
              </p>

              {/* Description */}
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', lineHeight: 1.68, marginBottom: '2rem' }}>
                {activeChapter.description}
              </p>

              {/* Technical Specifications Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  padding: '1.25rem',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '2rem'
                }}
              >
                {activeChapter.technicalSpecs.map((spec, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                      {spec.label}
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenConsultation && onOpenConsultation(activeChapter.title)}
                className="tw-btn tw-btn-primary"
                style={{ flex: 1, padding: '0.75rem 1.25rem', fontSize: '0.875rem' }}
              >
                <span>Enquire Statuario Slabs</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                onClick={togglePlay}
                className="tw-btn tw-btn-secondary"
                style={{ padding: '0.75rem 1.25rem', fontSize: '0.875rem', gap: '0.5rem' }}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                <span>{isPlaying ? 'Pause Film' : 'Play Sequence'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================
            INTERACTIVE SCRUBBER TIMELINE CONTROLLER
            ================================================================= */}
        <div
          style={{
            marginTop: '1.75rem',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* Timeline Continuous Scrub Range */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-subtle)' }}>
                Continuous Scrub Control
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-blue)', fontWeight: 700 }}>
                {Math.round(progress * 100)}% COMPLETE
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={progress}
              onChange={handleSliderChange}
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundColor: 'var(--color-surface-sunken)',
                accentColor: 'var(--color-blue)',
                cursor: 'pointer',
                outline: 'none'
              }}
              aria-label="Cinematic timeline scrubber"
            />
          </div>

          {/* 4 Interactive Chapter Stepper Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem'
            }}
            className="tw-cinematic-chapters-grid"
          >
            {CINEMATIC_CHAPTERS.map((ch, idx) => {
              const isSelected = activeChapterIndex === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => selectChapter(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: isSelected ? 'var(--color-surface-subtle)' : 'transparent',
                    border: isSelected ? '1.5px solid var(--color-blue)' : '1px solid var(--color-border)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="tw-chapter-card"
                  aria-selected={isSelected}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: isSelected ? 'var(--color-blue)' : 'var(--color-text-subtle)',
                      lineHeight: 1
                    }}
                  >
                    {ch.step}
                  </span>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: isSelected ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {ch.title}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.6875rem',
                        color: 'var(--color-text-subtle)',
                        lineHeight: 1.3
                      }}
                    >
                      {ch.highlightTag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive Stylesheet */}
      <style>{`
        .tw-cinematic-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
          background-color: var(--color-blue) !important;
          border-color: var(--color-blue) !important;
        }
        .tw-chapter-card:hover {
          border-color: var(--color-blue) !important;
          background-color: var(--color-surface-subtle) !important;
        }
        @media (max-width: 960px) {
          .tw-cinematic-theatre-grid {
            grid-template-columns: 1fr !important;
          }
          .tw-cinematic-chapters-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .tw-cinematic-chapters-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
