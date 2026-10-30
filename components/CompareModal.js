import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getComparisonFields, getComparisonValue } from '../utils/comparison';

export default function CompareModal({ visible, items, onClose, onClear }) {
  const fields = getComparisonFields(items);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Product Comparison</Text>
            <TouchableOpacity onPress={onClose} testID="compare-close">
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          {items.length === 0 ? (
            <Text style={styles.empty}>No products to compare</Text>
          ) : (
            <ScrollView horizontal>
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.labelCell}>Feature</Text>
                  {items.map((p) => (
                    <Text key={p._id} style={styles.headerCell}>{p.name}</Text>
                  ))}
                </View>
                {fields.map((field) => (
                  <View key={field} style={styles.row}>
                    <Text style={styles.labelCell}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                    {items.map((p) => (
                      <Text key={p._id} style={styles.valueCell}>
                        {getComparisonValue(p, field)}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          )}

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClear} style={styles.clearButton} testID="compare-clear">
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  closeText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  labelCell: {
    width: 100,
    fontWeight: '600',
    color: '#374151',
  },
  headerCell: {
    width: 120,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  valueCell: {
    width: 120,
    color: '#111827',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  clearText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});