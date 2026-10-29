import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Products from '../components/Products';

// Mock redux
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: (selector) => selector({
    productList: {
      loading: false,
      error: null,
      products: [
        { _id: 1, name: 'Acer Nitro 5', category: 'Electronics', price: 875.05 },
        { _id: 2, name: 'Acer Predator Helios', category: 'Electronics', price: 1325.29 },
        { _id: 3, name: 'Adidas Premium Pants', category: 'Pants', price: 150.0 },
        { _id: 4, name: 'Adidas Stripe Shirt', category: 'Shirts', price: 140.0 },
        { _id: 5, name: 'ASUS ROG Strix Scar 15', category: 'Electronics', price: 799.59 },
      ],
    },
  }),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return { PanGestureHandler: View, TapGestureHandler: View, State: {} };
});

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({ params: {} }),
    NavigationContainer: ({ children }) => children,
  };
});

describe('Products Component - Feature 1: Product Search with Debounce', () => {
  const renderProducts = (props = {}) => {
    return render(
      <NavigationContainer>
        <Products {...props} />
      </NavigationContainer>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders product list when search is empty', () => {
    const { getByText } = renderProducts({ search: '', category: 'All' });
    
    expect(getByText('Acer Nitro 5')).toBeTruthy();
    expect(getByText('Acer Predator Helios')).toBeTruthy();
    expect(getByText('Adidas Premium Pants')).toBeTruthy();
    expect(getByText('Adidas Stripe Shirt')).toBeTruthy();
    expect(getByText('ASUS ROG Strix Scar 15')).toBeTruthy();
  });

  test('filters products by search term', () => {
    const { getByText, queryByText } = renderProducts({ search: 'acer', category: 'All' });
    
    expect(getByText('Acer Nitro 5')).toBeTruthy();
    expect(getByText('Acer Predator Helios')).toBeTruthy();
    expect(queryByText('Adidas Premium Pants')).toBeNull();
    expect(queryByText('Adidas Stripe Shirt')).toBeNull();
    expect(queryByText('ASUS ROG Strix Scar 15')).toBeNull();
  });

  test('filters products by category', () => {
    const { getByText, queryByText } = renderProducts({ search: '', category: 'Pants' });
    
    expect(getByText('Adidas Premium Pants')).toBeTruthy();
    expect(queryByText('Acer Nitro 5')).toBeNull();
    expect(queryByText('Adidas Stripe Shirt')).toBeNull();
  });

  test('combines search and category filters', () => {
    const { getByText, queryByText } = renderProducts({ search: 'adidas', category: 'Shirts' });
    
    expect(getByText('Adidas Stripe Shirt')).toBeTruthy();
    expect(queryByText('Adidas Premium Pants')).toBeNull();
    expect(queryByText('Acer Nitro 5')).toBeNull();
  });

  test('shows empty message when no products match search', () => {
    const { getByText } = renderProducts({ search: 'nonexistent', category: 'All' });
    
    expect(getByText('No products match your search')).toBeTruthy();
  });
});