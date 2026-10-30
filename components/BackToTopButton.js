import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { shouldShowBackToTop } from '../utils/backToTop';

export default function BackToTopButton({ scrollY, onPress }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const show = shouldShowBackToTop(scrollY);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.icon}>↑</Text>
        <Text style={styles.label}>Top</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    zIndex: 50,
  },
  button: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  icon: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});