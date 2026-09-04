import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { luhnCheck, detectCardBrand, maskCardNumber, isValidExpiry } from "../utils/cardValidation";

const STORAGE_KEY = "astech.paymentMethods";

const seedMethods = [
  {
    id: "pm1",
    type: "card",
    label: "Visa ending 4242",
    cardNumber: "4242424242424242",
    expiry: "12/27",
    isDefault: true,
  },
];

const PaymentMethods = () => {
  const [methods, setMethods] = useState(seedMethods);
  const [draft, setDraft] = useState({ cardNumber: "", expiry: "", cvv: "", label: "" });

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const stored = JSON.parse(raw);
          if (Array.isArray(stored) && stored.length > 0) {
            setMethods(stored);
          }
        } catch {
          /* keep seed */
        }
      }
    });
  }, []);

  const persist = (next) => {
    setMethods(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add = () => {
    if (!luhnCheck(draft.cardNumber)) {
      Alert.alert("Invalid card", "The card number didn't pass validation.");
      return;
    }
    if (!isValidExpiry(draft.expiry)) {
      Alert.alert("Invalid expiry", "Use MM/YY format with a future date.");
      return;
    }
    if (!/^\d{3,4}$/.test(draft.cvv)) {
      Alert.alert("Invalid CVV", "CVV must be 3 or 4 digits.");
      return;
    }
    const id = `pm_${Date.now()}`;
    const next = [
      ...methods.map((m) => ({ ...m, isDefault: false })),
      {
        id,
        type: "card",
        label: draft.label || `${detectCardBrand(draft.cardNumber).toUpperCase()} ending ${draft.cardNumber.slice(-4)}`,
        cardNumber: draft.cardNumber,
        expiry: draft.expiry,
        isDefault: methods.length === 0,
      },
    ];
    persist(next);
    setDraft({ cardNumber: "", expiry: "", cvv: "", label: "" });
  };

  const setDefault = (id) => {
    persist(methods.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const remove = (id) => {
    if (methods.find((m) => m.id === id)?.isDefault && methods.length === 1) {
      Alert.alert("Cannot remove", "Keep at least one payment method.");
      return;
    }
    persist(methods.filter((m) => m.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.heading}>Payment methods</Text>
      {methods.map((m) => (
        <View key={m.id} style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.label}>{m.label}</Text>
            {m.isDefault ? <Text style={styles.defaultBadge}>Default</Text> : null}
          </View>
          <Text style={styles.line}>{maskCardNumber(m.cardNumber)}</Text>
          <Text style={styles.line}>Expires {m.expiry}</Text>
          <View style={styles.cardActions}>
            {!m.isDefault ? (
              <TouchableOpacity onPress={() => setDefault(m.id)}>
                <Text style={styles.action}>Set default</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => remove(m.id)}>
              <Text style={[styles.action, styles.remove]}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.heading}>Add new card</Text>
      {[
        ["label", "Label (optional)"],
        ["cardNumber", "Card number"],
        ["expiry", "Expiry (MM/YY)"],
        ["cvv", "CVV"],
      ].map(([field, placeholder]) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          keyboardType={field === "label" ? "default" : "number-pad"}
          value={draft[field]}
          onChangeText={(t) => setDraft({ ...draft, [field]: t })}
        />
      ))}
      <TouchableOpacity style={styles.submit} onPress={add}>
        <Text style={styles.submitText}>Save card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  heading: { fontSize: 18, fontWeight: "700", color: "#111827", marginVertical: 12 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9fafb",
  },
  cardHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  label: { fontSize: 16, fontWeight: "700", color: "#111827" },
  defaultBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
    backgroundColor: "#1e3a8a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  line: { fontSize: 14, color: "#374151", marginTop: 2 },
  cardActions: { flexDirection: "row", marginTop: 8 },
  action: { fontSize: 14, color: "#1e3a8a", fontWeight: "600", marginRight: 16 },
  remove: { color: "#dc2626" },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: "#111827",
    marginBottom: 8,
  },
  submit: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
  },
  submitText: { color: "#ffffff", fontWeight: "700", fontSize: 14 },
});

export default PaymentMethods;
