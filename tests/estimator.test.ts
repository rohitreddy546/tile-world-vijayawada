import { describe, it, expect } from 'vitest';
import { calculateTileRequirements, TILE_FORMATS } from '../src/components/TileEstimatorCalculator';

describe('Tile Coverage & Packaging Estimator Math', () => {
  it('correctly calculates 600x1200mm slab coverage for a 16x14 ft room with 10% wastage', () => {
    const format = TILE_FORMATS.find((f) => f.id === '600x1200')!;
    expect(format).toBeDefined();
    expect(format.sqFtPerBox).toBe(15.50);
    expect(format.pcsPerBox).toBe(2);

    const result = calculateTileRequirements(
      16,
      14,
      'feet',
      format.sqFtPerBox,
      format.pcsPerBox,
      10
    );

    expect(result.netSqFt).toBe(224);
    expect(result.wastageSqFt).toBeCloseTo(22.4, 2);
    expect(result.grossSqFt).toBeCloseTo(246.4, 2);
    // ceil(246.4 / 15.5) = 16 boxes
    expect(result.boxesNeeded).toBe(16);
    expect(result.totalPieces).toBe(32);
    expect(result.totalCoveredSqFt).toBeCloseTo(248.0, 2);
  });

  it('correctly calculates 600x600mm vitrified tiles with 5% wastage', () => {
    const format = TILE_FORMATS.find((f) => f.id === '600x600')!;
    expect(format.sqFtPerBox).toBe(15.50);
    expect(format.pcsPerBox).toBe(4);

    const result = calculateTileRequirements(
      12,
      10,
      'feet',
      format.sqFtPerBox,
      format.pcsPerBox,
      5
    );

    expect(result.netSqFt).toBe(120);
    expect(result.grossSqFt).toBeCloseTo(126, 2);
    // ceil(126 / 15.5) = 9 boxes
    expect(result.boxesNeeded).toBe(9);
    expect(result.totalPieces).toBe(36);
  });

  it('correctly calculates 200x1200mm wood planks at 10.33 sq ft/box', () => {
    const format = TILE_FORMATS.find((f) => f.id === '200x1200')!;
    expect(format.sqFtPerBox).toBe(10.33);
    expect(format.pcsPerBox).toBe(4);

    const result = calculateTileRequirements(
      10,
      10,
      'feet',
      format.sqFtPerBox,
      format.pcsPerBox,
      10
    );

    expect(result.netSqFt).toBe(100);
    expect(result.grossSqFt).toBeCloseTo(110, 2);
    // ceil(110 / 10.33) = 11 boxes
    expect(result.boxesNeeded).toBe(11);
    expect(result.totalPieces).toBe(44);
  });

  it('correctly calculates 400x400mm parking tiles at 8.61 sq ft/box', () => {
    const format = TILE_FORMATS.find((f) => f.id === '400x400')!;
    expect(format.sqFtPerBox).toBe(8.61);
    expect(format.pcsPerBox).toBe(5);

    const result = calculateTileRequirements(
      15,
      10,
      'feet',
      format.sqFtPerBox,
      format.pcsPerBox,
      15
    );

    expect(result.netSqFt).toBe(150);
    expect(result.grossSqFt).toBeCloseTo(172.5, 2);
    // ceil(172.5 / 8.61) = 21 boxes
    expect(result.boxesNeeded).toBe(21);
    expect(result.totalPieces).toBe(105);
  });

  it('converts meters to square feet accurately (1 sq m = 10.7639 sq ft)', () => {
    const format = TILE_FORMATS.find((f) => f.id === '600x1200')!;

    const result = calculateTileRequirements(
      4,
      3,
      'meters',
      format.sqFtPerBox,
      format.pcsPerBox,
      10
    );

    // 4 x 3 = 12 sq meters => 12 * 10.7639 = 129.1668 sq ft
    expect(result.netSqFt).toBeCloseTo(129.1668, 2);
    expect(result.netSqM).toBeCloseTo(12, 2);
    expect(result.grossSqFt).toBeCloseTo(142.0835, 2);
    // ceil(142.0835 / 15.5) = 10 boxes
    expect(result.boxesNeeded).toBe(10);
  });

  it('handles zero or negative dimensions safely with zero boxes required', () => {
    const format = TILE_FORMATS[0];

    const zeroResult = calculateTileRequirements(0, 10, 'feet', format.sqFtPerBox, format.pcsPerBox, 10);
    expect(zeroResult.netSqFt).toBe(0);
    expect(zeroResult.boxesNeeded).toBe(0);
    expect(zeroResult.totalPieces).toBe(0);

    const negativeResult = calculateTileRequirements(-5, -10, 'feet', format.sqFtPerBox, format.pcsPerBox, 10);
    expect(negativeResult.netSqFt).toBe(0);
    expect(negativeResult.boxesNeeded).toBe(0);
  });

  it('handles 0% wastage without additional padding', () => {
    const format = TILE_FORMATS[0];

    const result = calculateTileRequirements(10, 10, 'feet', format.sqFtPerBox, format.pcsPerBox, 0);
    expect(result.netSqFt).toBe(100);
    expect(result.wastageSqFt).toBe(0);
    expect(result.grossSqFt).toBe(100);
  });
});
