import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import data from "../utils/data";
import { formatPrice } from "../utils/formatters";

const RelatedProducts = ({ category, excludeId }) => {
  const navigation = useNavigation();
  const related = data.products
    .filter((p) => p.category === category && p._id !== excludeId)
    .slice(0, 6);

  if (related.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No related products in {category}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>You may also like</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {related.map((p) => (
          <TouchableOpacity
            key={p._id}
            style={styles.card}
            onPress={() => navigation.navigate("ProductScreen", { productId: p._id })}
          >
            <Text style={styles.name} numberOfLines={2}>{p.name}</Text>
            <Text style={styles.price}>{formatPrice(p.price)}</Text>
            <Text style={styles.brand}>{p.brand}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { paddingVertical: 12, paddingHorizontal: 16, backgroundColor: "#ffffff" },
  heading: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 8 },
  card: {
    width: 140,
    marginRight: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  name: { fontSize: 13, fontWeight: "600", color: "#111827", marginBottom: 4 },
  price: { fontSize: 14, fontWeight: "700", color: "#1e3a8a" },
  brand: { fontSize: 11, color: "#6b7280", marginTop: 4 },
  empty: { padding: 16 },
  emptyText: { fontSize: 14, color: "#6b7280", textAlign: "center" },
});

export default RelatedProducts;
