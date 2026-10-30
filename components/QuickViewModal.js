import React from 'react';
import { Modal, View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getQuickViewData, formatQuickViewPrice, getStockStatus, truncateDescription } from '../utils/quickView';

export default function QuickViewModal({ visible, product, onClose, onAddToCart }) {
  const data = getQuickViewData(product);
  if (!data) return null;

  const stockStatus = getStockStatus(data.stockCount);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton} testID="quick-view-close">
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <ScrollView>
            <Image source={{ uri: data.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.price}>{formatQuickViewPrice(data.price)}</Text>
            <Text style={[styles.stock, { color: stockStatus.color }]}>{stockStatus.text}</Text>
            <Text style={styles.category}>{data.category}</Text>
            <Text style={styles.description}>{truncateDescription(data.description)}</Text>

            {stockStatus.available && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAddToCart && onAddToCart(product)}
                testID="quick-view-add-to-cart"
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});