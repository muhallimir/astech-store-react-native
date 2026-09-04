import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyState = ({
  icon = "📦",
  title = "Nothing here yet",
  message = "",
  actionLabel,
  onAction,
  compact = false,
}) => {
  return (
    <View style={[styles.wrap, compact && styles.compact]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel ? (
        <Text style={styles.action} onPress={onAction}>
          {actionLabel}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  compact: {
    paddingVertical: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  action: {
    marginTop: 8,
    color: "#1e3a8a",
    fontWeight: "700",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default EmptyState;
