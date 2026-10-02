import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Clock, DollarSign, Filter, Heart, Star, Zap } from "lucide-react-native";
import { stations } from "./AppMap";

type FilterType = "all" | "Rápido" | "Normal";
export default function ChargingStations({
  onStationSelect, selectedStation, favoriteIds, onToggleFavorite, favoritesOnly = false,
}: {
  onStationSelect: (id: number | null) => void; selectedStation: number | null;
  favoriteIds: number[]; onToggleFavorite: (id: number) => void; favoritesOnly?: boolean;
}) {
  const [filter, setFilter] = useState<FilterType>("all");
  const list = useMemo(() => stations.filter((station) =>
    (!favoritesOnly || favoriteIds.includes(station.id)) && (filter === "all" || station.speed === filter)
  ), [filter, favoritesOnly, favoriteIds]);
  return <View style={styles.container}>
    <View style={styles.filters}>
      <View style={styles.filterTitle}><Filter size={16} color="#374151" /><Text style={styles.title}>{favoritesOnly ? "Pontos favoritos" : "Estações próximas"}</Text></View>
      {!favoritesOnly && <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>{(["all", "Rápido", "Normal"] as FilterType[]).map((value) => <Pressable key={value} onPress={() => setFilter(value)} style={[styles.chip, filter === value && styles.chipActive]}><Text style={[styles.chipText, filter === value && styles.chipTextActive]}>{value === "all" ? "Todas" : value}</Text></Pressable>)}</ScrollView>}
    </View>
    <ScrollView
      style={styles.stationList}
      contentContainerStyle={styles.stationListContent}
      showsVerticalScrollIndicator
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
    >
      {list.map((station) => {
        const isFavorite = favoriteIds.includes(station.id);
        return <Pressable key={station.id} onPress={() => onStationSelect(station.id)} style={[styles.card, selectedStation === station.id && styles.selected]}>
          <View style={styles.cardTop}>
            <View style={styles.icon}><Zap size={21} color="#fff" fill="#fff" /></View>
            <View style={{ flex: 1 }}><Text style={styles.name}>{station.name}</Text><Text style={styles.address}>{station.address}</Text></View>
            <Text style={styles.distance}>{station.distance}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"} hitSlop={10} onPress={(event) => { event.stopPropagation(); onToggleFavorite(station.id); }} style={styles.favoriteButton}><Heart size={21} color={isFavorite ? "#e11d48" : "#9ca3af"} fill={isFavorite ? "#e11d48" : "transparent"} /></Pressable>
          </View>
          <View style={styles.meta}><View style={styles.metaItem}><Zap size={14} color="#0f766e" /><Text>{station.available}/{station.total}</Text></View><View style={styles.metaItem}><Clock size={14} color="#6b7280" /><Text>{station.time}</Text></View><View style={styles.metaItem}><DollarSign size={14} color="#6b7280" /><Text>{station.price}</Text></View><View style={styles.metaItem}><Star size={14} color="#f59e0b" fill="#f59e0b" /><Text>{station.rating}</Text></View></View>
        </Pressable>;
      })}
      {list.length === 0 && <View style={styles.empty}><Heart size={26} color="#9ca3af" /><Text style={styles.emptyTitle}>Nenhum favorito ainda</Text><Text style={styles.emptyText}>Toque no coração de uma estação para salvá-la aqui.</Text></View>}
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 0 },
  stationList: { flex: 1, minHeight: 0 },
  stationListContent: { padding: 14, gap: 10, paddingBottom: 24 },
  filters: { padding: 14, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" }, filterTitle: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 10 }, title: { fontWeight: "700", color: "#111827" },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: "#f3f4f6" }, chipActive: { backgroundColor: "#0f766e" }, chipText: { color: "#4b5563", fontWeight: "600", fontSize: 13 }, chipTextActive: { color: "#fff" },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 16, padding: 13 }, selected: { borderColor: "#0f766e", borderWidth: 2 }, cardTop: { flexDirection: "row", alignItems: "center", gap: 10 }, icon: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#0f766e", alignItems: "center", justifyContent: "center" },
  name: { fontWeight: "700", color: "#111827" }, address: { fontSize: 12, color: "#6b7280", marginTop: 2 }, distance: { fontSize: 12, color: "#0f766e", fontWeight: "700" }, favoriteButton: { padding: 5 },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 12 }, metaItem: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#f9fafb", paddingHorizontal: 7, paddingVertical: 5, borderRadius: 8 },
  empty: { alignItems: "center", padding: 24, gap: 8 }, emptyTitle: { color: "#111827", fontWeight: "700" }, emptyText: { color: "#6b7280", textAlign: "center", fontSize: 12 },
});
