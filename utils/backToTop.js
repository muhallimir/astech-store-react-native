// ASTECH Feature 25: Back to Top utilities

export function shouldShowBackToTop(scrollY, threshold = 300) {
  return scrollY > threshold;
}

export function getScrollToTopAnimation() {
  return { duration: 300, easing: 'ease-in-out' };
}

export function calculateScrollPosition(currentY, targetY = 0) {
  return Math.max(0, currentY - targetY);
}