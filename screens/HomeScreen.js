import React, { useMemo, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import { ScrollView, TextInput, TouchableOpacity, View, Text, StyleSheet, Animated } from "react-native";
import data from "../utils/data";
import FlashSaleBar from "../components/FlashSaleBar";
import TopRatedSpotlight from "../components/TopRatedSpotlight";
import BackToTopButton from "../components/BackToTopButton";
import SearchSuggestionsBar from "../components/SearchSuggestionsBar";
import { SORT_OPTIONS, sortProducts } from "../utils/sortSelect";

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
  const [sort, setSort] = useState("featured");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollViewRef = useRef(null);
  const categories = useMemo(() => deriveCategories(), []);

  const handleBackToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <SearchSuggestionsBar
          products={data.products}
          query={search}
          onSearch={(q) => {
            setSearch(q);
            setShowSuggestions(false);
          }}
          visible={showSuggestions}
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
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortChips}>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setSort(opt.key)}
              style={[styles.sortChip, sort === opt.key && styles.sortChipActive]}
            >
              <Text style={[styles.sortChipText, sort === opt.key && styles.sortChipTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <FlashSaleBar saleEndTime={new Date(Date.now() + 3600000 * 2)} discountPercent={20} />
        <Carousel />
        <TopRatedSpotlight products={data.products} onProductPress={() => {}} />
        <Categories />
        <Products search={search} category={activeCategory} sortBy={sort} />
      </ScrollView>
      <BackToTopButton scrollY={scrollY} onPress={handleBackToTop} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { backgroundColor: "#f8fafc", flex: 1 },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#ffffff",
    position: 'relative',
    zIndex: 100,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#0f172a",
    fontSize: 15,
    backgroundColor: "#f1f5f9",
  },
  chipRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  chipInactive: {
    backgroundColor: "#f1f5f9",
    borderColor: "#e2e8f0",
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  chipLabelActive: {
    color: "#ffffff",
  },
  chipLabelInactive: {
    color: "#475569",
  },
  sortRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  sortChips: {
    gap: 8,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    marginRight: 6,
  },
  sortChipActive: {
    backgroundColor: '#1e3a8a',
  },
  sortChipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  sortChipTextActive: {
    color: '#ffffff',
  },
});

export default HomeScreen;
