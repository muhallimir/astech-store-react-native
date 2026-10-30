import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { canCancelOrder } from '../utils/orderCancel';

export default function CancelOrderButton({ order, onCancel }) {
  if (!canCancelOrder(order)) return null;

  return (
    <TouchableOpacity
      testID="cancel-order-button"
      style={styles.button}
      onPress={() => onCancel && onCancel(order)}
    >
      <Text style={styles.text}>Cancel Order</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});