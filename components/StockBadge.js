import React from "react";
import { Text, View, StyleSheet } from "react-native";

const StockBadge = ({ countInStock = 0, size = "sm" }) => {
  if (!countInStock || countInStock <= 0) {
    return (
      <View style={[styles.badge, styles.out, size === "lg" && styles.badgeLg]}>
        <Text style={[styles.text, size === "lg" && styles.textLg]}>Out of stock</Text>
      </View>
    );
  }
  if (countInStock < 5) {
    return (
      <View style={[styles.badge, styles.low, size === "lg" && styles.badgeLg]}>
        <Text style={[styles.text, styles.textLight, size === "lg" && styles.textLg]}>
          Only {countInStock} left
        </Text>
      </View>
    );
  }
  if (countInStock < 10) {
    return (
      <View style={[styles.badge, styles.mid, size === "lg" && styles.badgeLg]}>
        <Text style={[styles.text, size === "lg" && styles.textLg]}>
          {countInStock} in stock
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.badge, styles.ok, size === "lg" && styles.badgeLg]}>
      <Text style={[styles.text, size === "lg" && styles.textLg]}>In stock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeLg: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
    color: "#92400e",
  },
  textLg: {
    fontSize: 14,
  },
  textLight: {
    color: "#ffffff",
  },
  out: { backgroundColor: "#f3f4f6" },
  low: { backgroundColor: "#dc2626" },
  mid: { backgroundColor: "#fbbf24" },
  ok: { backgroundColor: "#d1fae5" },
});

export default StockBadge;
