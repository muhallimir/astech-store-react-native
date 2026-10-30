import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { validatePromoCode, calculateDiscount } from '../utils/promoCodes';

export const PromoCodeInput = ({ subtotal, shipping, onApply, onRemove }) => {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(null);
  const [error, setError] = useState('');

  const handleApply = () => {
    const result = validatePromoCode(code);
    if (!result.valid) {
      setError(result.reason === 'empty' ? 'Enter a code' : 'Invalid promo code');
      return;
    }
    const { discount, shipping: newShipping } = calculateDiscount(subtotal, shipping, result);
    setApplied({ ...result, discount, shipping: newShipping });
    setError('');
    if (onApply) onApply({ ...result, discount, shipping: newShipping });
  };

  const handleRemove = () => {
    setApplied(null);
    setCode('');
    setError('');
    if (onRemove) onRemove();
  };

  return (
    <View style={styles.wrap} testID="promo-code-input">
      <Text style={styles.label}>Promo Code</Text>
      {applied ? (
        <View style={styles.appliedRow}>
          <Text style={styles.appliedText}>{applied.code} - {applied.label}</Text>
          <TouchableOpacity onPress={handleRemove} testID="promo-remove">
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Enter code"
            autoCapitalize="characters"
            testID="promo-input"
          />
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply} testID="promo-apply">
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {applied ? (
        <Text style={styles.discountText}>Discount: -${applied.discount.toFixed(2)}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { marginVertical: 8 },
  label: { fontWeight: '600', fontSize: 14, marginBottom: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, padding: 8, marginRight: 8 },
  applyBtn: { backgroundColor: '#1e3a8a', padding: 10, borderRadius: 6 },
  applyText: { color: '#fff', fontWeight: '600' },
  appliedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ecfdf5', padding: 8, borderRadius: 6 },
  appliedText: { color: '#065f46', fontWeight: '600' },
  removeText: { color: '#dc2626', fontWeight: '600' },
  error: { color: '#dc2626', fontSize: 12, marginTop: 4 },
  discountText: { color: '#065f46', fontSize: 13, marginTop: 4 },
});

export default PromoCodeInput;