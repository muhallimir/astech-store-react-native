import { getTopRatedProducts, getSpotlightBadge, isTopRated } from '../utils/topRated';

describe('Top Rated - ASTECH Feature 22', () => {
  const products = [
    { _id: '1', name: 'Laptop', rating: 4.8, numReviews: 100 },
    { _id: '2', name: 'Mouse', rating: 3.5, numReviews: 50 },
    { _id: '3', name: 'Keyboard', rating: 4.2, numReviews: 80 },
  ];

  test('getTopRatedProducts returns top rated', () => {
    const top = getTopRatedProducts(products, 2);
    expect(top).toHaveLength(2);
    expect(top[0]._id).toBe('1');
  });

  test('getSpotlightBadge returns badge', () => {
    const badge = getSpotlightBadge(products[0]);
    expect(badge.text).toBe('Top Rated');
  });

  test('isTopRated checks threshold', () => {
    expect(isTopRated(products[0])).toBe(true);
    expect(isTopRated(products[1])).toBe(false);
  });
});