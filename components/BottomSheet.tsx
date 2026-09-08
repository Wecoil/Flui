import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

export default function BottomSheet({
  isOpen,
  onToggle,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={[styles.sheet, !isOpen && styles.closed]}>
      <Pressable onPress={onToggle} style={styles.handleArea}>
        <View style={styles.handle} />
        {isOpen ? <ChevronDown size={18} color="#6b7280" /> : <ChevronUp size={18} color="#6b7280" />}
      </Pressable>
      {isOpen && <View style={styles.body}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "61%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  closed: { height: 52, maxHeight: 52 },
  handleArea: { height: 42, alignItems: "center", justifyContent: "center", gap: 2 },
  handle: { width: 42, height: 4, borderRadius: 4, backgroundColor: "#d1d5db" },
  body: { maxHeight: 380 },
});
