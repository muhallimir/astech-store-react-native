import { getZoomLevel, calculateZoomPosition, isZoomActive, resetZoom, getZoomStyle } from '../utils/imageZoom';

describe('Image Zoom - ASTECH Feature 12', () => {
  test('getZoomLevel clamps value', () => {
    expect(getZoomLevel(0.5)).toBe(1);
    expect(getZoomLevel(2)).toBe(2);
    expect(getZoomLevel(5)).toBe(4);
  });

  test('calculateZoomPosition clamps to container', () => {
    const pos = calculateZoomPosition(100, 200, 50, 50);
    expect(pos.x).toBe(50);
    expect(pos.y).toBe(50);
  });

  test('isZoomActive checks scale', () => {
    expect(isZoomActive(1)).toBe(false);
    expect(isZoomActive(2)).toBe(true);
  });

  test('resetZoom returns default', () => {
    expect(resetZoom()).toEqual({ scale: 1, x: 0, y: 0 });
  });

  test('getZoomStyle returns transform', () => {
    const style = getZoomStyle(2, 10, 20);
    expect(style.transform).toHaveLength(3);
  });
});