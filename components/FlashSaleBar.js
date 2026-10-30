import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { getFlashSaleCountdown, formatFlashSaleCountdown } from '../utils/flashSaleBar';

export default function FlashSaleBar({ saleEndTime, discountPercent = 20 }) {
  const [countdown, setCountdown] = useState(getFlashSaleCountdown(saleEndTime));
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getFlashSaleCountdown(saleEndTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [saleEndTime]);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  if (countdown?.expired) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: pulseAnim }] }]}>
      <View style={styles.left}>
        <Text style={styles.label}>⚡ FLASH SALE</Text>
        <Text style={styles.discount}>{discountPercent}% OFF</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.timerLabel}>Ends in</Text>
        <Text style={styles.timer}>{formatFlashSaleCountdown(countdown)}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  discount: {
    color: '#fef08a',
    fontWeight: 'bold',
    fontSize: 14,
  },
  right: {
    alignItems: 'flex-end',
  },
  timerLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
  },
  timer: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    fontVariant: ['tabular-nums'],
  },
});