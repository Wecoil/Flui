import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BatteryCharging, ChevronDown, ChevronUp, Gauge, Leaf, MapPin, Thermometer, Zap } from "lucide-react-native";

export default function BatteryStatus() {
  const [expanded, setExpanded] = useState(false);
  const data = {
    level: 68, remainingKm: 245, health: 98, temperature: 24, voltage: 385,
    cycles: 142, consumptionAvg: 18.5, distanceToday: 47, distanceTotal: 12847,
    timeToFull: 45, isCharging: false,
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => setExpanded((v) => !v)} style={styles.compact}>
        <View style={styles.batteryIcon}>
          <BatteryCharging size={21} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.level}>{data.level}% · {data.remainingKm} km</Text>
          <Text style={styles.sub}>{data.isCharging ? "Carregando" : "Bateria do veículo"}</Text>
        </View>
        {expanded ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
      </Pressable>

      {expanded && (
        <ScrollView style={styles.details} contentContainerStyle={{ paddingBottom: 10 }}>
          <View style={styles.progressTrack}><View style={[styles.progress, { width: `${data.level}%` }]} /></View>
          <View style={styles.grid}>
            <Stat icon={<Gauge size={16} color="#111827" />} label="Saúde" value={`${data.health}%`} />
            <Stat icon={<Thermometer size={16} color="#111827" />} label="Temperatura" value={`${data.temperature}°C`} />
            <Stat icon={<Zap size={16} color="#111827" />} label="Tensão" value={`${data.voltage} V`} />
            <Stat icon={<Leaf size={16} color="#111827" />} label="Consumo" value={`${data.consumptionAvg} kWh`} />
            <Stat icon={<MapPin size={16} color="#111827" />} label="Hoje" value={`${data.distanceToday} km`} />
            <Stat icon={<BatteryCharging size={16} color="#111827" />} label="Ciclos" value={`${data.cycles}`} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <View style={styles.stat}><View style={styles.statIcon}>{icon}</View><View><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View></View>;
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#fff", borderRadius: 17, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 8, elevation: 5 },
  compact: { minHeight: 62, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  batteryIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: "#0f766e", alignItems: "center", justifyContent: "center" },
  level: { fontWeight: "800", color: "#111827", fontSize: 15 },
  sub: { color: "#6b7280", fontSize: 11, marginTop: 1 },
  details: { maxHeight: 190, paddingHorizontal: 12 },
  progressTrack: { height: 8, backgroundColor: "#e5e7eb", borderRadius: 6, overflow: "hidden", marginBottom: 10 },
  progress: { height: "100%", backgroundColor: "#0f766e", borderRadius: 6 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  stat: { width: "31.5%", backgroundColor: "#f9fafb", borderRadius: 10, padding: 8 },
  statIcon: { marginBottom: 5 },
  statLabel: { fontSize: 9, color: "#6b7280" },
  statValue: { fontSize: 12, fontWeight: "800", color: "#111827", marginTop: 1 },
});
