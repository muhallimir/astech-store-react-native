import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const STEPS = [
  { key: "pending", label: "Order received" },
  { key: "preparing", label: "Preparing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

const ETAS = {
  pending: "Confirming your order",
  preparing: "Packing in 15 minutes",
  shipped: "Arriving in 2-3 days",
  out_for_delivery: "Arriving today",
  delivered: "Delivered",
};

const OrderTimeline = ({ status = "preparing", createdAt }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const currentIdx = STEPS.findIndex((s) => s.key === status);
  const elapsed = createdAt ? Math.floor((now - new Date(createdAt).getTime()) / 1000) : 0;
  const elapsedStr = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Order status</Text>
      <Text style={styles.eta}>{ETAS[status] || status}</Text>
      <Text style={styles.elapsed}>Elapsed since order: {elapsedStr}</Text>

      {STEPS.map((step, idx) => {
        const reached = idx <= currentIdx;
        const active = idx === currentIdx;
        return (
          <View key={step.key} style={styles.step}>
            <View
              style={[
                styles.dot,
                reached && styles.dotReached,
                active && styles.dotActive,
              ]}
            >
              {active ? <Text style={styles.dotActiveText}>●</Text> : null}
            </View>
            <Text
              style={[
                styles.label,
                reached && styles.labelReached,
                active && styles.labelActive,
              ]}
            >
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  heading: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 4 },
  eta: { fontSize: 14, color: "#1e3a8a", marginBottom: 4 },
  elapsed: { fontSize: 12, color: "#6b7280", marginBottom: 16 },
  step: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d1d5db",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dotReached: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  dotActive: {
    borderColor: "#60a5fa",
    borderWidth: 3,
  },
  dotActiveText: { color: "#60a5fa", fontSize: 6 },
  label: { fontSize: 14, color: "#9ca3af" },
  labelReached: { color: "#111827", fontWeight: "600" },
  labelActive: { color: "#1e3a8a", fontWeight: "700" },
});

export default OrderTimeline;
