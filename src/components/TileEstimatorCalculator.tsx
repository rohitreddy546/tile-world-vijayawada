import React, { useState, useId } from 'react';
import { MessageSquare, ArrowUpRight, Box } from 'lucide-react';
import { BUSINESS_INFO } from '../data/showroomData';

export interface TileFormat {
  id: string;
  name: string;
  dimensionsMm: string;
  sqFtPerBox: number;
  pcsPerBox: number;
  idealFor: string;
}

export const TILE_FORMATS: TileFormat[] = [
  {
    id: '600x1200',
    name: '600 × 1200 mm (Large Slabs)',
    dimensionsMm: '600 x 1200 mm',
    sqFtPerBox: 15.50,
    pcsPerBox: 2,
    idealFor: 'Living Rooms, Master Bedrooms & Grand Foyers'
  },
  {
    id: '600x600',
    name: '600 × 600 mm (Standard Vitrified)',
    dimensionsMm: '600 x 600 mm',
    sqFtPerBox: 15.50,
    pcsPerBox: 4,
    idealFor: 'Bedrooms, Kitchen Floors & Commercial Spaces'
  },
  {
    id: '300x600',
    name: '300 × 600 mm (Glazed Wall & Bath)',
    dimensionsMm: '300 x 600 mm',
    sqFtPerBox: 15.50,
    pcsPerBox: 8,
    idealFor: 'Bathroom Walls & Kitchen Backsplashes'
  },
  {
    id: '200x1200',
    name: '200 × 1200 mm (Vitrified Wood Planks)',
    dimensionsMm: '200 x 1200 mm',
    sqFtPerBox: 10.33,
    pcsPerBox: 4,
    idealFor: 'Bedroom Floors, Balconies & Accent Walls'
  },
  {
    id: '400x400',
    name: '400 × 400 mm (Anti-Skid Outdoor)',
    dimensionsMm: '400 x 400 mm',
    sqFtPerBox: 8.61,
    pcsPerBox: 5,
    idealFor: 'Parking Driveways, Verandahs & Walkways'
  },
  {
    id: '75x300',
    name: '75 × 300 mm (Artisanal Subway)',
    dimensionsMm: '75 x 300 mm',
    sqFtPerBox: 10.65,
    pcsPerBox: 44,
    idealFor: 'Kitchen Counterfronts & Shower Niches'
  }
];

export interface CalculationResult {
  netSqFt: number;
  netSqM: number;
  wastageSqFt: number;
  grossSqFt: number;
  boxesNeeded: number;
  totalPieces: number;
  totalCoveredSqFt: number;
}

export function calculateTileRequirements(
  length: number,
  width: number,
  unit: 'feet' | 'meters',
  sqFtPerBox: number,
  pcsPerBox: number,
  wastagePercent: number
): CalculationResult {
  const safeLength = Math.max(0, Number.isFinite(length) ? length : 0);
  const safeWidth = Math.max(0, Number.isFinite(width) ? width : 0);
  let netSqFt = 0;
  if (unit === 'feet') {
    netSqFt = safeLength * safeWidth;
  } else {
    const netSqM = safeLength * safeWidth;
    netSqFt = netSqM * 10.7639;
  }
  const netSqM = netSqFt / 10.7639;
  const safeWastage = Math.max(0, Number.isFinite(wastagePercent) ? wastagePercent : 0);
  const wastageSqFt = netSqFt * (safeWastage / 100);
  const grossSqFt = netSqFt + wastageSqFt;
  const boxesNeeded = grossSqFt > 0 && sqFtPerBox > 0 ? Math.ceil(grossSqFt / sqFtPerBox) : 0;
  const totalPieces = boxesNeeded * pcsPerBox;
  const totalCoveredSqFt = boxesNeeded * sqFtPerBox;

  return {
    netSqFt,
    netSqM,
    wastageSqFt,
    grossSqFt,
    boxesNeeded,
    totalPieces,
    totalCoveredSqFt
  };
}

interface TileEstimatorProps {
  onOpenConsultationWithEstimate: (estimateSummary: string, approxSqFt: string) => void;
}

export const TileEstimatorCalculator: React.FC<TileEstimatorProps> = ({
  onOpenConsultationWithEstimate
}) => {
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [length, setLength] = useState<string>('16');
  const [width, setWidth] = useState<string>('14');
  const [selectedFormatId, setSelectedFormatId] = useState<string>('600x1200');
  const [wastagePercent, setWastagePercent] = useState<number>(10);

  // Generate unique IDs for form controls
  const lengthInputId = useId();
  const widthInputId = useId();
  const formatSelectId = useId();

  // Preset room dimensions (in feet)
  const roomPresets = [
    { label: 'Living Room (16 × 20 ft)', l: '20', w: '16', format: '600x1200' },
    { label: 'Master Bed (14 × 16 ft)', l: '16', w: '14', format: '600x1200' },
    { label: 'Bathroom (8 × 10 ft)', l: '10', w: '8', format: '300x600' },
    { label: 'Kitchen (10 × 12 ft)', l: '12', w: '10', format: '600x600' },
    { label: 'Balcony (6 × 12 ft)', l: '12', w: '6', format: '400x400' }
  ];

  const applyPreset = (preset: typeof roomPresets[0]) => {
    setUnit('feet');
    setLength(preset.l);
    setWidth(preset.w);
    setSelectedFormatId(preset.format);
  };

  const selectedFormat = TILE_FORMATS.find((f) => f.id === selectedFormatId) || TILE_FORMATS[0];

  // Mathematical Calculations
  const numLength = parseFloat(length) || 0;
  const numWidth = parseFloat(width) || 0;

  const {
    netSqFt,
    netSqM,
    wastageSqFt,
    grossSqFt,
    boxesNeeded,
    totalPieces,
    totalCoveredSqFt
  } = calculateTileRequirements(
    numLength,
    numWidth,
    unit,
    selectedFormat.sqFtPerBox,
    selectedFormat.pcsPerBox,
    wastagePercent
  );

  // WhatsApp Enquiry string
  const waEstimateMessage = encodeURIComponent(
    `*Tile World Vijayawada — Room Tile Estimate*\n` +
    `• Room Size: ${length} × ${width} ${unit === 'feet' ? 'ft' : 'm'} (${Math.round(netSqFt)} sq. ft.)\n` +
    `• Selected Tile Format: ${selectedFormat.name}\n` +
    `• Cutting Wastage Margin: ${wastagePercent}%\n` +
    `• Total Required Area: ~${Math.round(grossSqFt)} sq. ft.\n` +
    `• Estimated Boxes: ${boxesNeeded} Boxes (${totalPieces} tiles)\n` +
    `Please check stock availability and current showroom price per box.`
  );
  const waUrl = `${BUSINESS_INFO.whatsappUrl}?text=${waEstimateMessage}`;

  const estimateSummaryText = `${boxesNeeded} Boxes of ${selectedFormat.dimensionsMm} (${Math.round(grossSqFt)} sq. ft. incl. ${wastagePercent}% wastage)`;

  return (
    <section id="calculator" className="tw-section" style={{ backgroundColor: 'transparent' }}>
      <div className="tw-container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
          <div className="tw-eyebrow">
            <span className="tw-eyebrow-dot"></span>
            <span>Architectural Planning Tool</span>
          </div>
          <h2 className="tw-section-title">
            Interactive Tile Coverage &amp; Box Estimator
          </h2>
          <p className="tw-section-subtitle">
            Calculate exact square footage, tile piece counts, and packaging boxes for your floor or wall area. Factored with standard factory box coverage and recommended cutting wastage.
          </p>
        </div>

        {/* Quick Room Presets */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            overflowX: 'auto',
            paddingBottom: '0.875rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none'
          }}
          aria-label="Room presets"
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            Quick Presets:
          </span>
          {roomPresets.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              style={{
                padding: '0.45rem 0.875rem',
                fontSize: '0.8125rem',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--color-text-main)',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
              className="tw-preset-btn"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Main Calculator Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '2.5rem',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-md)'
          }}
          className="tw-calc-grid"
        >
          {/* Left Column: Interactive Inputs */}
          <div>
            {/* Unit Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                Measurement Unit:
              </span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '3px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <button
                  onClick={() => setUnit('feet')}
                  style={{
                    padding: '0.35rem 0.875rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: unit === 'feet' ? 'var(--color-dark-bg)' : 'transparent',
                    color: unit === 'feet' ? '#FFFFFF' : 'var(--color-text-muted)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Feet (ft)
                </button>
                <button
                  onClick={() => setUnit('meters')}
                  style={{
                    padding: '0.35rem 0.875rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: unit === 'meters' ? 'var(--color-dark-bg)' : 'transparent',
                    color: unit === 'meters' ? '#FFFFFF' : 'var(--color-text-muted)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  Meters (m)
                </button>
              </div>
            </div>

            {/* Room Length and Width Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }} className="tw-dim-row">
              <div>
                <label
                  htmlFor={lengthInputId}
                  style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}
                >
                  Length ({unit === 'feet' ? 'Feet' : 'Meters'})
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id={lengthInputId}
                    type="number"
                    min="1"
                    step="0.5"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      outline: 'none'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-subtle)', fontSize: '0.8125rem' }}>
                    {unit === 'feet' ? 'ft' : 'm'}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={widthInputId}
                  style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}
                >
                  Width ({unit === 'feet' ? 'Feet' : 'Meters'})
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id={widthInputId}
                    type="number"
                    min="1"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      outline: 'none'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-subtle)', fontSize: '0.8125rem' }}>
                    {unit === 'feet' ? 'ft' : 'm'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tile Format Selector */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label
                htmlFor={formatSelectId}
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}
              >
                Tile Slab Format
              </label>
              <select
                id={formatSelectId}
                value={selectedFormatId}
                onChange={(e) => setSelectedFormatId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'var(--color-text-main)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {TILE_FORMATS.map((tf) => (
                  <option key={tf.id} value={tf.id}>
                    {tf.name} — {tf.pcsPerBox} pcs / box ({tf.sqFtPerBox} sq ft)
                  </option>
                ))}
              </select>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-bronze)', marginTop: '0.35rem' }}>
                Ideal for: {selectedFormat.idealFor}
              </span>
            </div>

            {/* Cutting & Layout Wastage Margin */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  Cutting Wastage &amp; Breakage Buffer:
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-bronze)' }}>
                  +{wastagePercent}%
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { pct: 5, label: '5% Minimal', sub: 'Straight walls' },
                  { pct: 10, label: '10% Recommended', sub: 'Standard rooms' },
                  { pct: 15, label: '15% Complex', sub: 'Diagonal / Niches' }
                ].map((item) => (
                  <button
                    key={item.pct}
                    onClick={() => setWastagePercent(item.pct)}
                    style={{
                      padding: '0.625rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      border: wastagePercent === item.pct ? '1.5px solid var(--color-bronze)' : '1px solid var(--color-border)',
                      backgroundColor: wastagePercent === item.pct ? 'var(--color-bronze-light)' : 'var(--color-bg)',
                      textAlign: 'center',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {item.label}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Output Summary Card */}
          <div
            style={{
              backgroundColor: 'var(--color-dark-bg)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-sm)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-blue-light)', fontWeight: 600 }}>
                  Estimated Requirements
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Coverage Model
                </span>
              </div>

              {/* Primary Metric: Total Boxes */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Box size={22} color="var(--color-blue)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '3rem',
                      fontWeight: 600,
                      lineHeight: 1,
                      color: '#FFFFFF'
                    }}
                  >
                    {boxesNeeded}
                  </span>
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-blue-light)' }}>
                  Total Packing Boxes Required
                </span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                  ({totalPieces} total tiles &bull; ~{Math.round(totalCoveredSqFt)} sq. ft. supplied)
                </span>
              </div>

              {/* Key Calculations Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span style={{ color: '#94A3B8' }}>Net Floor/Wall Area:</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                    {Math.round(netSqFt)} sq. ft. ({netSqM.toFixed(1)} m²)
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span style={{ color: '#94A3B8' }}>Cutting Wastage ({wastagePercent}%):</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                    +{Math.round(wastageSqFt)} sq. ft.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#E2E8F0' }}>Gross Area with Buffer:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>
                    {Math.round(grossSqFt)} sq. ft.
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-btn tw-btn-whatsapp"
                style={{ width: '100%', padding: '0.8125rem', fontSize: '0.875rem' }}
              >
                <MessageSquare size={16} />
                <span>Enquire This Estimate on WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenConsultationWithEstimate(estimateSummaryText, `${Math.round(grossSqFt)} sq ft (${boxesNeeded} boxes)`)}
                className="tw-btn tw-btn-secondary"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.8125rem',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.25)'
                }}
              >
                <span>Request Showroom Quotation</span>
                <ArrowUpRight size={14} color="var(--color-bronze)" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tw-preset-btn:hover {
          border-color: var(--color-border-active);
          background-color: var(--color-surface-subtle);
        }
        @media (max-width: 960px) {
          .tw-calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .tw-dim-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
