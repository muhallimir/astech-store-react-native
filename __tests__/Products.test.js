import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Products from '../components/Products';

describe('Products Component - Feature 1: Product Search with Debounce', () => {
  const renderWithNavigation = (component) => {
    return render(
      <NavigationContainer>
        {component}
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
    const { getByText } = renderWithNavigation(<Products search='' category='All' />);
    
    expect(getByText('Acer Nitro 5')).toBeTruthy();
    expect(getByText('Acer Predator Helios')).toBeTruthy();
    expect(getByText('Adidas Premium Pants')).toBeTruthy();
    expect(getByText('Adidas Stripe Shirt')).toBeTruthy();
    expect(getByText('ASUS ROG Strix Scar 15')).toBeTruthy();
  });

  test('filters products by search term', () => {
    const { getByText, queryByText } = renderWithNavigation(<Products search='acer' category='All' />);
    
    expect(getByText('Acer Nitro 5')).toBeTruthy();
    expect(getByText('Acer Predator Helios')).toBeTruthy();
    expect(queryByText('Adidas Premium Pants')).toBeNull();
    expect(queryByText('Adidas Stripe Shirt')).toBeNull();
    expect(queryByText('ASUS ROG Strix Scar 15')).toBeNull();
  });

  test('filters products by category', () => {
    const { getByText, queryByText } = renderWithNavigation(<Products search='' category='Pants' />);
    
    expect(getByText('Adidas Premium Pants')).toBeTruthy();
    expect(queryByText('Acer Nitro 5')).toBeNull();
    expect(queryByText('Adidas Stripe Shirt')).toBeNull();
  });

  test('combines search and category filters', () => {
    const { getByText, queryByText } = renderWithNavigation(<Products search='adidas' category='Shirts' />);
    
    expect(getByText('Adidas Stripe Shirt')).toBeTruthy();
    expect(queryByText('Adidas Premium Pants')).toBeNull();
    expect(queryByText('Acer Nitro 5')).toBeNull();
  });

  test('shows empty message when no products match search', () => {
    const { getByText } = renderWithNavigation(<Products search='nonexistent' category='All' />);
    
    expect(getByText('No products match your search')).toBeTruthy();
  });
});