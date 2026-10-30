import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PromoCodeInput from '../components/PromoCodeInput';

describe('PromoCodeInput Component - Feature 1: Promo Code at Checkout', () => {
  test('renders promo code input', () => {
    const { getByTestId } = render(<PromoCodeInput subtotal={100} shipping={10} />);
    expect(getByTestId('promo-code-input')).toBeTruthy();
    expect(getByTestId('promo-input')).toBeTruthy();
    expect(getByTestId('promo-apply')).toBeTruthy();
  });

  test('shows error for empty code', () => {
    const { getByTestId, getByText } = render(<PromoCodeInput subtotal={100} shipping={10} />);
    fireEvent.press(getByTestId('promo-apply'));
    expect(getByText('Enter a code')).toBeTruthy();
  });

  test('shows error for invalid code', () => {
    const { getByTestId, getByText } = render(<PromoCodeInput subtotal={100} shipping={10} />);
    fireEvent.changeText(getByTestId('promo-input'), 'INVALID');
    fireEvent.press(getByTestId('promo-apply'));
    expect(getByText('Invalid promo code')).toBeTruthy();
  });

  test('applies valid percent promo code', () => {
    const onApply = jest.fn();
    const { getByTestId, getByText } = render(<PromoCodeInput subtotal={100} shipping={10} onApply={onApply} />);
    fireEvent.changeText(getByTestId('promo-input'), 'SAVE10');
    fireEvent.press(getByTestId('promo-apply'));
    expect(getByText('SAVE10 - 10% off')).toBeTruthy();
    expect(getByText('Discount: -$10.00')).toBeTruthy();
    expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ code: 'SAVE10', discount: 10 }));
  });

  test('applies valid fixed promo code', () => {
    const onApply = jest.fn();
    const { getByTestId, getByText } = render(<PromoCodeInput subtotal={100} shipping={10} onApply={onApply} />);
    fireEvent.changeText(getByTestId('promo-input'), 'FLAT15');
    fireEvent.press(getByTestId('promo-apply'));
    expect(getByText('FLAT15 - $15 off')).toBeTruthy();
    expect(getByText('Discount: -$15.00')).toBeTruthy();
  });

  test('applies free shipping promo code', () => {
    const onApply = jest.fn();
    const { getByTestId, getByText } = render(<PromoCodeInput subtotal={100} shipping={10} onApply={onApply} />);
    fireEvent.changeText(getByTestId('promo-input'), 'FREESHIP');
    fireEvent.press(getByTestId('promo-apply'));
    expect(getByText('FREESHIP - Free shipping')).toBeTruthy();
    expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ code: 'FREESHIP', shipping: 0 }));
  });

  test('removes applied promo code', () => {
    const onRemove = jest.fn();
    const { getByTestId } = render(<PromoCodeInput subtotal={100} shipping={10} onRemove={onRemove} />);
    fireEvent.changeText(getByTestId('promo-input'), 'SAVE10');
    fireEvent.press(getByTestId('promo-apply'));
    fireEvent.press(getByTestId('promo-remove'));
    expect(getByTestId('promo-input')).toBeTruthy();
    expect(onRemove).toHaveBeenCalled();
  });
});