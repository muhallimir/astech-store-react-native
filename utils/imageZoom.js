// ASTECH Feature 12: Product Image Zoom utilities

export function getZoomLevel(scale) {
  if (!scale || scale < 1) return 1;
  if (scale > 4) return 4;
  return scale;
}

export function calculateZoomPosition(x, y, containerWidth, containerHeight) {
  const zoomX = Math.max(0, Math.min(x, containerWidth));
  const zoomY = Math.max(0, Math.min(y, containerHeight));
  return { x: zoomX, y: zoomY };
}

export function isZoomActive(scale) {
  return scale > 1;
}

export function resetZoom() {
  return { scale: 1, x: 0, y: 0 };
}

export function getZoomStyle(scale, x, y) {
  return {
    transform: [{ scale }, { translateX: x }, { translateY: y }],
  };
}