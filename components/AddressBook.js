import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "astech.addresses";

const seedAddresses = [
  {
    id: "a1",
    label: "Home",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    country: "USA",
    isDefault: true,
  },
];

const AddressBook = () => {
  const [addresses, setAddresses] = useState(seedAddresses);
  const [draft, setDraft] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const stored = JSON.parse(raw);
          if (Array.isArray(stored) && stored.length > 0) {
            setAddresses(stored);
          }
        } catch {
          /* keep seed */
        }
      }
    });
  }, []);

  const persist = (next) => {
    setAddresses(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const setDefault = (id) => {
    const next = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    persist(next);
  };

  const remove = (id) => {
    const target = addresses.find((a) => a.id === id);
    if (target?.isDefault && addresses.length === 1) {
      Alert.alert("Cannot remove", "Keep at least one address.");
      return;
    }
    persist(addresses.filter((a) => a.id !== id));
  };

  const add = () => {
    if (!draft.label || !draft.street || !draft.city || !draft.zip) {
      Alert.alert("Missing fields", "Label, street, city, and zip are required.");
      return;
    }
    const id = `a_${Date.now()}`;
    const next = [
      ...addresses.map((a) => ({ ...a, isDefault: false })),
      { ...draft, id, isDefault: addresses.length === 0 },
    ];
    persist(next);
    setDraft({ label: "", street: "", city: "", state: "", zip: "", country: "" });
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.heading}>Saved addresses</Text>
      {addresses.length === 0 ? (
        <Text style={styles.empty}>No addresses yet. Add one below.</Text>
      ) : (
        addresses.map((a) => (
          <View key={a.id} style={styles.card}>
            <View style={styles.cardHead}>
              <Text style={styles.label}>{a.label}</Text>
              {a.isDefault ? <Text style={styles.defaultBadge}>Default</Text> : null}
            </View>
            <Text style={styles.line}>{a.street}</Text>
            <Text style={styles.line}>{a.city}, {a.state} {a.zip}</Text>
            <Text style={styles.line}>{a.country}</Text>
            <View style={styles.cardActions}>
              {!a.isDefault ? (
                <TouchableOpacity onPress={() => setDefault(a.id)}>
                  <Text style={styles.action}>Set default</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity onPress={() => remove(a.id)}>
                <Text style={[styles.action, styles.remove]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Text style={styles.heading}>Add new</Text>
      {[
        ["label", "Label (Home, Work...)"],
        ["street", "Street"],
        ["city", "City"],
        ["state", "State"],
        ["zip", "Zip"],
        ["country", "Country"],
      ].map(([field, placeholder]) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={draft[field]}
          onChangeText={(t) => setDraft({ ...draft, [field]: t })}
        />
      ))}
      <TouchableOpacity style={styles.submit} onPress={add}>
        <Text style={styles.submitText}>Save address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  heading: { fontSize: 18, fontWeight: "700", color: "#111827", marginVertical: 12 },
  empty: { fontSize: 14, color: "#6b7280", textAlign: "center", padding: 20 },
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

export default AddressBook;
