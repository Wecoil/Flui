import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Flag, MapPin, Navigation, Clock } from "lucide-react-native";

export default function RoutePanel({
  onRouteStart,
  onRouteEnd,
}: {
  onRouteStart: () => void;
  onRouteEnd: () => void;
}) {
  const [origin, setOrigin] = useState("São Paulo, SP");
  const [destination, setDestination] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <View style={styles.container}>
      <Field icon={<MapPin size={19} color="#9ca3af" />} value={origin} onChangeText={setOrigin} placeholder="Local de partida" />
      <Field icon={<Flag size={19} color="#9ca3af" />} value={destination} onChangeText={setDestination} placeholder="Destino" />

      {!isNavigating ? (
        <Pressable
          disabled={!destination}
          onPress={() => { setIsNavigating(true); onRouteStart(); }}
          style={[styles.primary, !destination && styles.disabled]}
        >
          <Navigation size={19} color="#fff" />
          <Text style={styles.primaryText}>Iniciar Navegação</Text>
        </Pressable>
      ) : (
        <View style={{ gap: 10 }}>
          <View style={styles.info}>
            <View style={styles.infoTitle}><Clock size={18} color="#111827" /><Text style={styles.infoTitleText}>Navegando</Text></View>
            <View style={styles.stats}>
              <View><Text style={styles.muted}>Tempo estimado</Text><Text style={styles.value}>42 min</Text></View>
              <View><Text style={styles.muted}>Distância</Text><Text style={styles.value}>38 km</Text></View>
            </View>
          </View>
          <Pressable onPress={() => { setIsNavigating(false); onRouteEnd(); }} style={styles.primary}>
            <Text style={styles.primaryText}>Parar Navegação</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function Field({ icon, value, onChangeText, placeholder }: any) {
  return (
    <View style={styles.field}>
      {icon}
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9ca3af" style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  field: { minHeight: 52, backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 14, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, gap: 9 },
  input: { flex: 1, fontSize: 16, color: "#111827" },
  primary: { minHeight: 54, backgroundColor: "#0f766e", borderRadius: 14, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  disabled: { backgroundColor: "#d1d5db" },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  info: { padding: 14, backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 14 },
  infoTitle: { flexDirection: "row", gap: 7, alignItems: "center" },
  infoTitleText: { fontWeight: "700", color: "#111827" },
  stats: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  muted: { color: "#6b7280", fontSize: 12 },
  value: { fontSize: 20, fontWeight: "800", color: "#111827", marginTop: 2 },
});
