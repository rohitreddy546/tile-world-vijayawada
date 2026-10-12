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
