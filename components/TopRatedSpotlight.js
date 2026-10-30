import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getTopRatedProducts, getSpotlightBadge } from '../utils/topRated';

export default function TopRatedSpotlight({ products, onProductPress }) {
  const topRated = getTopRatedProducts(products, 4);
  if (topRated.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Top Rated Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {topRated.map((product) => {
          const badge = getSpotlightBadge(product);
          return (
            <TouchableOpacity
              key={product._id}
              style={styles.card}
              onPress={() => onProductPress && onProductPress(product)}
            >
              {badge && (
                <View style={[styles.badge, { backgroundColor: badge.color }]}>
                  <Text style={styles.badgeText}>{badge.icon} {badge.text}</Text>
                </View>
              )}
              <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
              <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
              <Text style={styles.price}>${product.price}</Text>
              <Text style={styles.rating}>★ {product.rating}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  scroll: {
    gap: 12,
  },
  card: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  image: {
    height: 80,
    width: '100%',
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  rating: {
    fontSize: 11,
    color: '#f59e0b',
  },
});