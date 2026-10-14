import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Sun, 
  Moon, 
  Sparkles, 
  ArrowUpRight, 
  MessageSquare, 
  Check, 
  Compass, 
  Info,
  SlidersHorizontal,
  Split
} from 'lucide-react';
import { VERIFIED_PRODUCTS, TileProduct } from '../data/showroomData';
import { CollectionModal } from './CollectionModal';

interface RoomSurfacePreviewerProps {
  onOpenConsultation: (spaceOrTile: string) => void;
}

interface RoomScene {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  defaultFloorId: string;
  defaultWallId: string;
  floorHotspot: { x: number; y: number; label: string };
  wallHotspot: { x: number; y: number; label: string };
}

export const RoomSurfacePreviewer: React.FC<RoomSurfacePreviewerProps> = ({ onOpenConsultation }) => {
  // Preset room environments
  const roomScenes: RoomScene[] = [
    {
      id: 'living',
      name: 'Grand Reception Living',
      subtitle: 'Open-plan luxury living with double-height windows and continuous vitrified planes',
      image: '/images/hero-living-room.jpg',
      defaultFloorId: 'statuario-gold',
      defaultWallId: 'agatha-decor',
      floorHotspot: { x: 48, y: 82, label: 'Continuous Floor Plane' },
      wallHotspot: { x: 74, y: 38, label: 'Architectural Feature Wall' }
    },
    {
      id: 'bathroom',
      name: 'Master Spa Bathroom',
      subtitle: 'Zero-threshold master bath pairing textured highlighter mosaics with anti-skid floor surfaces',
      image: '/images/hero-bathroom.jpg',
      defaultFloorId: 'urban-grey',
      defaultWallId: 'kitkat-mosaic',
      floorHotspot: { x: 42, y: 88, label: 'Anti-Skid Shower Base' },
      wallHotspot: { x: 55, y: 32, label: 'Tactile Feature Wall' }
    },
    {
      id: 'kitchen',
      name: 'Contemporary Kitchen',
      subtitle: 'Gourmet cooking island and dining zone with stain-resistant flooring and reflective backsplash',
      image: '/images/hero-kitchen.jpg',
      defaultFloorId: 'natural-oak',
      defaultWallId: 'emerald-gloss',
      floorHotspot: { x: 46, y: 85, label: 'Warm Wood Vitrified Plank' },
      wallHotspot: { x: 62, y: 44, label: 'Artisanal Glazed Splash' }
    }
  ];

  // State management
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeZone, setActiveZone] = useState<'floor' | 'wall'>('floor');
  const [selectedFloorId, setSelectedFloorId] = useState<string>('statuario-gold');
  const [selectedWallId, setSelectedWallId] = useState<string>('agatha-decor');
  const [lightingMode, setLightingMode] = useState<'daylight' | 'warm' | 'evening'>('warm');
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState<TileProduct | null>(null);

  const activeRoom = roomScenes[activeRoomIndex];

  // Lookup products
  const selectedFloorProduct = VERIFIED_PRODUCTS.find((p) => p.id === selectedFloorId) || VERIFIED_PRODUCTS[0];
  const selectedWallProduct = VERIFIED_PRODUCTS.find((p) => p.id === selectedWallId) || VERIFIED_PRODUCTS[1];
  const activeSurfaceProduct = activeZone === 'floor' ? selectedFloorProduct : selectedWallProduct;

  // Filter swatches suitable for flooring vs walls
  const floorSwatches = VERIFIED_PRODUCTS.filter(
    (p) => p.typeCategory === 'marble' || p.typeCategory === 'wood' || p.typeCategory === 'concrete' || p.typeCategory === 'terrazzo'
  );
  const wallSwatches = VERIFIED_PRODUCTS.filter(
    (p) => p.typeCategory === 'highlight' || p.typeCategory === 'mosaic' || p.typeCategory === 'marble' || p.typeCategory === 'concrete'
  );

  const currentSwatches = activeZone === 'floor' ? floorSwatches : wallSwatches;
  const currentSelectedId = activeZone === 'floor' ? selectedFloorId : selectedWallId;

  const handleSelectSwatch = (productId: string) => {
    if (activeZone === 'floor') {
      setSelectedFloorId(productId);
    } else {
      setSelectedWallId(productId);
    }
  };

  // Lighting overlay styling
  const getLightingOverlayStyle = () => {
    switch (lightingMode) {
      case 'warm':
        return {
          background: 'linear-gradient(135deg, rgba(230, 175, 102, 0.15) 0%, rgba(180, 115, 45, 0.12) 100%)',
          mixBlendMode: 'soft-light' as const
        };
      case 'evening':
        return {
          background: 'linear-gradient(180deg, rgba(40, 25, 15, 0.28) 0%, rgba(15, 12, 10, 0.4) 100%)',
          mixBlendMode: 'multiply' as const
        };
      case 'daylight':
      default:
        return {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(200, 220, 240, 0.05) 100%)',
          mixBlendMode: 'screen' as const
        };
    }
  };

  const handleRoomChange = (idx: number) => {
    setActiveRoomIndex(idx);
    setSelectedFloorId(roomScenes[idx].defaultFloorId);
    setSelectedWallId(roomScenes[idx].defaultWallId);
  };

  const waInquiryMsg = encodeURIComponent(
    `Hello Tile World Vijayawada, I visualized my space using your Room Surface Previewer for ${activeRoom.name}. Selected Floor: "${selectedFloorProduct.name}" (${selectedFloorProduct.size}) and Accent Wall: "${selectedWallProduct.name}" (${selectedWallProduct.size}). Please check showroom availability and provide an estimate.`
  );
  const waInquiryUrl = `https://wa.me/919908686789?text=${waInquiryMsg}`;

  return (
    <section 
      id="room-previewer" 
      className="tw-section" 
      style={{ 
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-label="Architectural Room Surface Previewer"
    >
      {/* Subtle architectural ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="tw-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
          <div className="tw-eyebrow" style={{ color: 'var(--color-blue-light)' }}>
            <span className="tw-eyebrow-dot" style={{ backgroundColor: 'var(--color-blue)' }}></span>
            <span>Interactive Visualizer &bull; Architectural Surface Studio</span>
          </div>
          <h2 className="tw-section-title" style={{ color: '#FFFFFF', fontSize: 'clamp(2.15rem, 3.8vw, 3.25rem)' }}>
            Visualise Tiles in Architectural Spaces
          </h2>
          <p className="tw-section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.0625rem' }}>
            Switch room environments, test contrasting floor slabs with designer wall highlighters, and test daylight vs warm showroom lighting before visiting our Vijayawada showrooms.
          </p>
        </div>

        {/* Room Preset Selector Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'none'
          }}
          role="tablist"
          aria-label="Room Preset Selector"
        >
          {roomScenes.map((room, idx) => {
            const isActive = activeRoomIndex === idx;
            return (
              <button
                key={room.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleRoomChange(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.75rem 1.375rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: isActive ? 'var(--color-blue)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                  border: isActive ? '1px solid var(--color-blue-subtle)' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isActive ? '0 8px 20px rgba(37, 99, 235, 0.35)' : 'none'
                }}
              >
                <Compass size={16} />
                <span>{room.name}</span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            MAIN STUDIO WORKSPACE: 2D ROOM SCENE + INTERACTIVE SURFACE CONTROLS
            ================================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 0.75fr',
            gap: '2rem',
            alignItems: 'start'
          }}
          className="tw-previewer-grid"
        >
          {/* Left Column: Interactive Visualizer Canvas */}
          <div
            style={{
              backgroundColor: 'var(--color-dark-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
              position: 'relative'
            }}
          >
            {/* Visualizer Top Bar Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1.25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Scene:
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {activeRoom.name}
                </span>
              </div>

              {/* Lighting Simulator Toggles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '0.25rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <button
                  type="button"
                  onClick={() => setLightingMode('daylight')}
                  title="5500K Crisp Daylight"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.3rem 0.625rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: lightingMode === 'daylight' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                    color: lightingMode === 'daylight' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Sun size={13} color={lightingMode === 'daylight' ? '#F7C948' : 'currentColor'} />
                  <span>Daylight</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightingMode('warm')}
                  title="3000K Warm Showroom Light"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.3rem 0.625rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: lightingMode === 'warm' ? 'rgba(230, 175, 102, 0.25)' : 'transparent',
                    color: lightingMode === 'warm' ? '#F7D070' : 'rgba(255, 255, 255, 0.6)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Sparkles size={13} color={lightingMode === 'warm' ? '#F7D070' : 'currentColor'} />
                  <span>Warm 3000K</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightingMode('evening')}
                  title="2700K Evening Mood"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.3rem 0.625rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: lightingMode === 'evening' ? 'rgba(120, 90, 60, 0.35)' : 'transparent',
                    color: lightingMode === 'evening' ? '#E2B883' : 'rgba(255, 255, 255, 0.6)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <Moon size={13} color={lightingMode === 'evening' ? '#E2B883' : 'currentColor'} />
                  <span>Evening</span>
                </button>
              </div>

              {/* Split Mode Toggle Button */}
              <button
                type="button"
                onClick={() => setIsSplitMode(!isSplitMode)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: isSplitMode ? 'var(--color-bronze)' : 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Split size={13} />
                <span>{isSplitMode ? 'Single View' : 'Split Comparison'}</span>
              </button>
            </div>

            {/* Room Canvas Viewport */}
            <div
              style={{
                position: 'relative',
                minHeight: '440px',
                height: '480px',
                overflow: 'hidden',
                backgroundColor: '#050811'
              }}
              className="tw-previewer-canvas"
            >
              {/* Room Photography Background */}
              <img
                src={activeRoom.image}
                alt={activeRoom.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'filter 320ms ease, transform 400ms ease'
                }}
              />

              {/* Dynamic Lighting Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  transition: 'background 400ms ease',
                  ...getLightingOverlayStyle()
                }}
              />

              {/* Split Mode Comparison Overlay (Right Half Texture Swatch Comparison) */}
              {isSplitMode && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '100%',
                    borderLeft: '2px solid #FFFFFF',
                    overflow: 'hidden',
                    boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.6)',
                    backgroundColor: 'var(--color-dark-surface)'
                  }}
                >
                  <img
                    src={activeZone === 'floor' ? selectedFloorProduct.image : selectedWallProduct.image}
                    alt={activeSurfaceProduct.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.4rem 0.8rem',
                      backgroundColor: 'rgba(8, 12, 22, 0.90)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-blue-light)',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    100% Tile Texture Grain
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(7, 10, 18, 0.90)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-xs)',
                      color: '#FFFFFF'
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-bronze-light)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Active Texture Spec
                    </span>
                    <p style={{ margin: '0.15rem 0 0', fontSize: '0.8125rem', fontWeight: 600 }}>
                      {activeSurfaceProduct.name} &bull; {activeSurfaceProduct.size}
                    </p>
                  </div>
                </div>
              )}

              {/* Interactive Hotspot 1: Flooring Pin with Sonar Radar Wave */}
              <div
                style={{
                  position: 'absolute',
                  left: `${activeRoom.floorHotspot.x}%`,
                  top: `${activeRoom.floorHotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="tw-hotspot-ripple" />
                <button
                  type="button"
                  onClick={() => setActiveZone('floor')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: activeZone === 'floor' ? 'var(--color-bronze)' : 'rgba(7, 10, 18, 0.88)',
                    color: '#FFFFFF',
                    border: activeZone === 'floor' ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  aria-label="Select Flooring Surface Zone"
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: activeZone === 'floor' ? '#FFFFFF' : 'var(--color-bronze)',
                      animation: 'twBeaconPulse 2s infinite'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    Flooring: {selectedFloorProduct.name.split(' ')[0]}
                  </span>
                </button>
              </div>

              {/* Interactive Hotspot 2: Wall Pin with Sonar Radar Wave */}
              <div
                style={{
                  position: 'absolute',
                  left: `${activeRoom.wallHotspot.x}%`,
                  top: `${activeRoom.wallHotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="tw-hotspot-ripple" />
                <button
                  type="button"
                  onClick={() => setActiveZone('wall')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: activeZone === 'wall' ? 'var(--color-bronze)' : 'rgba(7, 10, 18, 0.88)',
                    color: '#FFFFFF',
                    border: activeZone === 'wall' ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  aria-label="Select Wall Surface Zone"
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: activeZone === 'wall' ? '#FFFFFF' : 'var(--color-bronze)',
                      animation: 'twBeaconPulse 2s infinite'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    Wall: {selectedWallProduct.name.split(' ')[0]}
                  </span>
                </button>
              </div>

              {/* Bottom Surface Badge Strip */}
              <div
                className="tw-previewer-badge-strip"
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  zIndex: 5,
                  pointerEvents: 'none'
                }}
              >
                <div
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(7, 10, 18, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '0.75rem',
                    pointerEvents: 'auto'
                  }}
                >
                  <span style={{ color: 'var(--color-bronze-light)', fontWeight: 600 }}>Floor: </span>
                  <span style={{ color: '#FFFFFF' }}>{selectedFloorProduct.name} ({selectedFloorProduct.size})</span>
                </div>
                <div
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(7, 10, 18, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '0.75rem',
                    pointerEvents: 'auto'
                  }}
                >
                  <span style={{ color: 'var(--color-bronze-light)', fontWeight: 600 }}>Wall: </span>
                  <span style={{ color: '#FFFFFF' }}>{selectedWallProduct.name} ({selectedWallProduct.size})</span>
                </div>
              </div>
            </div>

            {/* Room Description Footer */}
            <div
              style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.8125rem',
                color: 'rgba(251, 249, 245, 0.7)',
                lineHeight: 1.6
              }}
            >
              {activeRoom.subtitle}
            </div>
          </div>

          {/* Right Column: Surface Customizer & Swatch Deck */}
          <div
            style={{
              backgroundColor: 'var(--color-dark-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)'
            }}
          >
            {/* Zone Selector Tabs (Flooring vs Accent Wall) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(251, 249, 245, 0.6)',
                  marginBottom: '0.5rem'
                }}
              >
                1. Select Surface Plane to Customize
              </span>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '0.3rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveZone('floor')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)',
                    backgroundColor: activeZone === 'floor' ? 'var(--color-bronze)' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  <Layers size={14} />
                  <span>Flooring Slab</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveZone('wall')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)',
                    backgroundColor: activeZone === 'wall' ? 'var(--color-bronze)' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  <SlidersHorizontal size={14} />
                  <span>Accent / Wall</span>
                </button>
              </div>
            </div>

            {/* 2. Real Tile Texture Swatches */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'rgba(251, 249, 245, 0.6)'
                  }}
                >
                  2. Choose {activeZone === 'floor' ? 'Flooring' : 'Wall'} Texture Swatch
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-bronze-light)' }}>
                  {currentSwatches.length} Swatches Available
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '0.625rem'
                }}
              >
                {currentSwatches.map((swatch) => {
                  const isSelected = swatch.id === currentSelectedId;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => handleSelectSwatch(swatch.id)}
                      style={{
                        position: 'relative',
                        height: '76px',
                        borderRadius: 'var(--radius-xs)',
                        overflow: 'hidden',
                        border: isSelected ? '2px solid var(--color-blue)' : '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: isSelected ? '0 0 16px rgba(37, 99, 235, 0.6)' : 'none',
                        transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        padding: 0
                      }}
                      title={`${swatch.name} (${swatch.size})`}
                    >
                      <img
                        src={swatch.image}
                        alt={swatch.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(37, 99, 235, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-blue)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#FFFFFF'
                            }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Active Tile Specification Summary Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.125rem',
                marginBottom: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--color-bronze-light)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '0.2rem'
                    }}
                  >
                    {activeSurfaceProduct.category}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}>
                    {activeSurfaceProduct.name}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProduct(activeSurfaceProduct)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)'
                  }}
                  title="View full dimensions, box packaging, and technical specifications"
                >
                  <Info size={12} />
                  <span>Full Specs</span>
                </button>
              </div>

              {/* Technical Specifications Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.625rem',
                  fontSize: '0.75rem'
                }}
              >
                <div>
                  <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>Format Dimension:</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{activeSurfaceProduct.size}</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>Surface Finish:</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{activeSurfaceProduct.finish}</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>Body Material:</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{activeSurfaceProduct.material}</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>Recommended Application:</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{activeSurfaceProduct.ideal.split(',')[0]}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-btn tw-btn-whatsapp"
                style={{ width: '100%', padding: '0.8125rem', fontSize: '0.875rem', justifyContent: 'center' }}
              >
                <MessageSquare size={16} />
                <span>Consult Showroom on WhatsApp</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => onOpenConsultation(`${activeRoom.name} (${selectedFloorProduct.name} + ${selectedWallProduct.name})`)}
                  className="tw-btn"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '0.75rem',
                    fontSize: '0.75rem',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowUpRight size={13} />
                  <span>Request Quote</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalProduct(activeSurfaceProduct)}
                  className="tw-btn"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.75rem',
                    fontSize: '0.75rem',
                    justifyContent: 'center'
                  }}
                >
                  <Eye size={13} />
                  <span>Inspect Swatch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Product Specification Modal */}
      <CollectionModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onOpenConsultation={(pName) => {
          setActiveModalProduct(null);
          onOpenConsultation(pName);
        }}
      />

      <style>{`
        @media (max-width: 960px) {
          .tw-previewer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .tw-previewer-canvas {
            height: 380px !important;
            min-height: 340px !important;
          }
        }
        @media (max-width: 600px) {
          .tw-previewer-canvas {
            height: 320px !important;
            min-height: 280px !important;
          }
          .tw-previewer-badge-strip {
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            right: 0.75rem !important;
            gap: 0.35rem !important;
          }
          .tw-previewer-badge-strip div {
            font-size: 0.6875rem !important;
            padding: 0.25rem 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
