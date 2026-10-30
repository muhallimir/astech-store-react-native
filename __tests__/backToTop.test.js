import { shouldShowBackToTop, getScrollToTopAnimation, calculateScrollPosition } from '../utils/backToTop';

describe('Back to Top - ASTECH Feature 25', () => {
  test('shouldShowBackToTop checks threshold', () => {
    expect(shouldShowBackToTop(400)).toBe(true);
    expect(shouldShowBackToTop(100)).toBe(false);
  });

  test('getScrollToTopAnimation returns config', () => {
    const anim = getScrollToTopAnimation();
    expect(anim.duration).toBe(300);
  });

  test('calculateScrollPosition calculates', () => {
    expect(calculateScrollPosition(500, 0)).toBe(500);
  });
});