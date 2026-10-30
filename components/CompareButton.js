import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CompareButton({ product, isSelected = false, disabled = false, onToggle }) {
  const handlePress = () => {
    if (!disabled && onToggle) {
      onToggle(product);
    }
  };

  return (
    <TouchableOpacity
      testID="compare-button"
      onPress={handlePress}
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={[styles.button, isSelected && styles.selected, disabled && styles.disabled]}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {isSelected ? 'Selected' : 'Compare'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1e3a8a',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  selected: {
    backgroundColor: '#1e3a8a',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#1e3a8a',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedText: {
    color: '#ffffff',
  },
});