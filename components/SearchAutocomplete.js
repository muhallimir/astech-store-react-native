import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import data from "../utils/data";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchAutocomplete = ({ visible = true }) => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();
  const { items: recent } = useRecentlyViewed();

  if (!visible) return null;

  const matches = query.trim().length > 0
    ? data.products
        .filter((p) =>
          p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          (p.brand && p.brand.toLowerCase().includes(query.trim().toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const open = (product) => {
    navigation.navigate("ProductScreen", { productId: product._id });
    setQuery("");
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        placeholder="Search products"
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={setQuery}
      />

      {matches.length > 0 && (
        <View style={styles.dropdown}>
          {matches.map((p) => (
            <TouchableOpacity key={p._id} style={styles.row} onPress={() => open(p)}>
              <Text style={styles.rowName} numberOfLines={1}>{p.name}</Text>
              <Text style={styles.rowPrice}>${p.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {matches.length === 0 && query.trim().length > 0 && (
        <View style={styles.dropdown}>
          <Text style={styles.empty}>No matches for "{query}"</Text>
        </View>
      )}

      {matches.length === 0 && recent.length > 0 && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownLabel}>Recently viewed</Text>
          {recent.slice(0, 3).map((p) => (
            <TouchableOpacity key={p._id} style={styles.row} onPress={() => open(p)}>
              <Text style={styles.rowName} numberOfLines={1}>{p.name}</Text>
              <Text style={styles.rowPrice}>${p.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#ffffff" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#111827",
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  dropdownLabel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    color: "#6b7280",
    backgroundColor: "#f9fafb",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  rowName: { flex: 1, fontSize: 14, color: "#111827", marginRight: 8 },
  rowPrice: { fontSize: 13, color: "#1e3a8a", fontWeight: "600" },
  empty: { paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: "#6b7280" },
});

export default SearchAutocomplete;
