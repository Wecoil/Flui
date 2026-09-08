import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Battery, Map, Navigation, Settings, Trophy } from "lucide-react-native";

export type MainView = "map" | "navigation" | "battery" | "rewards" | "settings";

const items = [
  { key: "map" as const, label: "Mapa", Icon: Map },
  { key: "navigation" as const, label: "Navegar", Icon: Navigation },
  { key: "battery" as const, label: "Bateria", Icon: Battery },
  { key: "rewards" as const, label: "Prêmios", Icon: Trophy },
  { key: "settings" as const, label: "Ajustes", Icon: Settings },
];

export default function MobileNav({
  activeView,
  onViewChange,
}: {
  activeView: MainView;
  onViewChange: (view: MainView) => void;
}) {
  return (
    <View style={styles.bar}>
      {items.map(({ key, label, Icon }) => {
        const active = key === activeView;
        return (
          <Pressable key={key} style={styles.item} onPress={() => onViewChange(key)}>
            <Icon size={21} color={active ? "#0f766e" : "#6b7280"} />
            <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 68,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 4,
  },
  item: { flex: 1, alignItems: "center", gap: 3 },
  label: { fontSize: 11, color: "#6b7280" },
  activeLabel: { color: "#0f766e", fontWeight: "700" },
});
