import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useReviews } from "../contexts/ReviewsContext";

const StarPicker = ({ value, onChange }) => (
  <View style={styles.stars}>
    {[1, 2, 3, 4, 5].map((n) => (
      <TouchableOpacity key={n} onPress={() => onChange(n)} accessibilityLabel={`Rate ${n} stars`}>
        <Text style={[styles.star, n <= value && styles.starActive]}>
          {n <= value ? "★" : "☆"}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ReviewsSection = ({ productId }) => {
  const { reviewsByProduct, addReview, averageFor } = useReviews();
  const list = reviewsByProduct[productId] || [];
  const stats = averageFor(productId);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!name.trim()) {
      Alert.alert("Add a name", "Please enter your name before posting a review.");
      return;
    }
    addReview({ productId, name: name.trim(), rating, comment: comment.trim() });
    setName("");
    setComment("");
    setRating(5);
    Alert.alert("Review posted", "Thanks for the feedback.");
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Reviews</Text>
      <View style={styles.summary}>
        <Text style={styles.average}>
          {stats.count === 0 ? "No reviews yet" : `${stats.average.toFixed(1)} ★`}
        </Text>
        <Text style={styles.count}>
          {stats.count > 0 ? `${stats.count} review${stats.count === 1 ? "" : "s"}` : "Be the first"}
        </Text>
      </View>

      {list.map((r) => (
        <View key={r.id} style={styles.review}>
          <View style={styles.reviewHead}>
            <Text style={styles.reviewName}>{r.name}</Text>
            <Text style={styles.reviewStars}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</Text>
          </View>
          {r.comment ? <Text style={styles.reviewComment}>{r.comment}</Text> : null}
        </View>
      ))}

      <View style={styles.form}>
        <Text style={styles.formTitle}>Write a review</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor="#9ca3af"
          value={name}
          onChangeText={setName}
        />
        <StarPicker value={rating} onChange={setRating} />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="What did you think?"
          placeholderTextColor="#9ca3af"
          multiline
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.submit} onPress={submit}>
          <Text style={styles.submitText}>Post review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  heading: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 8 },
  summary: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  average: { fontSize: 18, fontWeight: "700", color: "#111827", marginRight: 8 },
  count: { fontSize: 14, color: "#6b7280" },
  review: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  reviewName: { fontSize: 14, fontWeight: "600", color: "#111827" },
  reviewStars: { fontSize: 14, color: "#f59e0b" },
  reviewComment: { fontSize: 14, color: "#374151" },
  form: { marginTop: 16, padding: 12, backgroundColor: "#f9fafb", borderRadius: 8 },
  formTitle: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
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
  textarea: { minHeight: 70, textAlignVertical: "top" },
  stars: { flexDirection: "row", marginBottom: 8 },
  star: { fontSize: 28, color: "#d1d5db", marginRight: 4 },
  starActive: { color: "#f59e0b" },
  submit: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  submitText: { color: "#ffffff", fontWeight: "700", fontSize: 14 },
});

export default ReviewsSection;
