import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getProductVariants, isVariantSelected, isVariantAvailable } from '../utils/variants';

export default function VariantSelector({ product, stock = {}, onVariantChange }) {
  const { sizes, colors } = getProductVariants(product);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState(colors[0] || null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (onVariantChange) onVariantChange({ size, color: selectedColor });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (onVariantChange) onVariantChange({ size: selectedSize, color });
  };

  return (
    <View style={styles.container}>
      {sizes.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Size</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.optionsRow}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  testID={`size-${size}`}
                  style={[
                    styles.option,
                    isVariantSelected({ size: selectedSize, color: selectedColor }, size, selectedColor) && styles.selected,
                  ]}
                  onPress={() => handleSizeSelect(size)}
                >
                  <Text style={[
                    styles.optionText,
                    isVariantSelected({ size: selectedSize, color: selectedColor }, size, selectedColor) && styles.selectedText,
                  ]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {colors.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>Color</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.optionsRow}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  testID={`color-${color}`}
                  style={[
                    styles.option,
                    isVariantSelected({ size: selectedSize, color: selectedColor }, selectedSize, color) && styles.selected,
                  ]}
                  onPress={() => handleColorSelect(color)}
                >
                  <Text style={[
                    styles.optionText,
                    isVariantSelected({ size: selectedSize, color: selectedColor }, selectedSize, color) && styles.selectedText,
                  ]}>{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    marginRight: 8,
  },
  selected: {
    borderColor: '#1e3a8a',
    backgroundColor: '#1e3a8a',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});