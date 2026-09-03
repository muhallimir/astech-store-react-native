import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import { ScrollView, TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import data from "../utils/data";

const ALL = "All";

const deriveCategories = () => {
  const seen = new Set();
  const list = [];
  data.products.forEach((p) => {
    if (p.category && !seen.has(p.category)) {
      seen.add(p.category);
      list.push(p.category);
    }
  });
  return [ALL, ...list];
};

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);
  const categories = useMemo(() => deriveCategories(), []);

  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
            >
              <Text style={[styles.chipLabel, isActive ? styles.chipLabelActive : styles.chipLabelInactive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Carousel />
        <Categories />
        <Products search={search} category={activeCategory} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { backgroundColor: "#ffffff", flex: 1 },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#000000",
  },
  chipRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  chipInactive: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d5db",
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  chipLabelActive: {
    color: "#ffffff",
  },
  chipLabelInactive: {
    color: "#1e3a8a",
  },
});

export default HomeScreen;
