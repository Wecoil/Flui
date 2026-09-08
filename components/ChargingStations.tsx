import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Clock, DollarSign, Filter, Star, Zap } from "lucide-react-native";
import { stations } from "./AppMap";

type FilterType = "all" | "Rápido" | "Normal";

export default function ChargingStations({
  onStationSelect,
  selectedStation,
}: {
  onStationSelect: (id: number | null) => void;
  selectedStation: number | null;
}) {
  const [filter, setFilter] = useState<FilterType>("all");
  const list = useMemo(
    () => filter === "all" ? stations : stations.filter((station) => station.speed === filter),
    [filter]
  );

  return (
    <View>
      <View style={styles.filters}>
        <View style={styles.filterTitle}><Filter size={16} color="#374151" /><Text style={styles.title}>Estações próximas</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {(["all", "Rápido", "Normal"] as FilterType[]).map((value) => (
            <Pressable key={value} onPress={() => setFilter(value)} style={[styles.chip, filter === value && styles.chipActive]}>
              <Text style={[styles.chipText, filter === value && styles.chipTextActive]}>
                {value === "all" ? "Todas" : value}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{ maxHeight: 320 }} contentContainerStyle={{ padding: 14, gap: 10 }}>
        {list.map((station) => (
          <Pressable
            key={station.id}
            onPress={() => onStationSelect(station.id)}
            style={[styles.card, selectedStation === station.id && styles.selected]}
          >
            <View style={styles.cardTop}>
              <View style={styles.icon}><Zap size={21} color="#fff" fill="#fff" /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{station.name}</Text>
                <Text style={styles.address}>{station.address}</Text>
              </View>
              <Text style={styles.distance}>{station.distance}</Text>
            </View>
            <View style={styles.meta}>
              <View style={styles.metaItem}><Zap size={14} color="#0f766e" /><Text>{station.available}/{station.total}</Text></View>
              <View style={styles.metaItem}><Clock size={14} color="#6b7280" /><Text>{station.time}</Text></View>
              <View style={styles.metaItem}><DollarSign size={14} color="#6b7280" /><Text>{station.price}</Text></View>
              <View style={styles.metaItem}><Star size={14} color="#f59e0b" fill="#f59e0b" /><Text>{station.rating}</Text></View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: { padding: 14, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  filterTitle: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 10 },
  title: { fontWeight: "700", color: "#111827" },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: "#f3f4f6" },
  chipActive: { backgroundColor: "#0f766e" },
  chipText: { color: "#4b5563", fontWeight: "600", fontSize: 13 },
  chipTextActive: { color: "#fff" },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 16, padding: 13 },
  selected: { borderColor: "#0f766e", borderWidth: 2 },
  cardTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  icon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#0f766e", alignItems: "center", justifyContent: "center" },
  name: { fontWeight: "700", color: "#111827" },
  address: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  distance: { fontSize: 12, color: "#0f766e", fontWeight: "700" },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#f9fafb", paddingHorizontal: 7, paddingVertical: 5, borderRadius: 8 },
});
