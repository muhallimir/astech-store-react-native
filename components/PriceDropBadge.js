import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getPriceDropBadge } from '../utils/priceDrop';

export default function PriceDropBadge({ alert }) {
  const badge = getPriceDropBadge(alert);
  if (!badge) return null;

  return (
    <View style={[styles.badge, { backgroundColor: badge.bgColor }]}>
      <Text style={[styles.text, { color: badge.color }]}>{badge.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});