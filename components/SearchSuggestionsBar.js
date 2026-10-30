import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { getSearchSuggestions, addRecentSearch, getRecentSearches } from '../utils/searchSuggestions';

export default function SearchSuggestionsBar({ products, query, onSearch, visible }) {
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (query && query.length >= 2) {
      setSuggestions(getSearchSuggestions(products, query));
    } else {
      setSuggestions([]);
    }
  }, [query, products]);

  useEffect(() => {
    if (visible && (suggestions.length > 0 || recentSearches.length > 0)) {
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start();
    }
  }, [visible, suggestions, recentSearches]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
        {suggestions.map((s, i) => (
          <TouchableOpacity key={i} style={styles.item} onPress={() => onSearch(s)}>
            <Text style={styles.suggestionText}>{s}</Text>
          </TouchableOpacity>
        ))}
        {suggestions.length === 0 && recentSearches.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Recent Searches</Text>
            {recentSearches.map((s, i) => (
              <TouchableOpacity key={i} style={styles.item} onPress={() => onSearch(s)}>
                <Text style={styles.recentText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    maxHeight: 200,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  list: {
    paddingVertical: 4,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: '#1e293b',
  },
  recentText: {
    fontSize: 14,
    color: '#64748b',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    paddingHorizontal: 16,
    paddingVertical: 6,
    textTransform: 'uppercase',
  },
});