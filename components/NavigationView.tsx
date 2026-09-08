import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AlertCircle, ArrowRight, Clock, Flag, MapPin, Navigation } from "lucide-react-native";

export default function NavigationView({
  routeActive,
  onRouteStart,
  onRouteEnd,
}: {
  routeActive: boolean;
  onRouteStart: () => void;
  onRouteEnd: () => void;
}) {
  const [origin, setOrigin] = useState("São Paulo, SP");
  const [destination, setDestination] = useState("");

  const steps = [
    ["Siga em frente na Av. Paulista", "1.2 km", "3 min"],
    ["Vire à direita na Rua Augusta", "800 m", "2 min"],
    ["Continue pela Rua da Consolação", "2.5 km", "5 min"],
    ["Destino à direita", "200 m", "1 min"],
  ];

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerIcon}><Navigation size={23} color="#fff" /></View>
        <View><Text style={styles.title}>Navegação</Text><Text style={styles.subtitle}>Planeje sua rota</Text></View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.form}>
          <Field icon={<MapPin size={18} color="#9ca3af" />} value={origin} onChangeText={setOrigin} placeholder="Local de partida" />
          <Field icon={<Flag size={18} color="#9ca3af" />} value={destination} onChangeText={setDestination} placeholder="Destino" />

          {!routeActive ? (
            <Pressable disabled={!destination} onPress={onRouteStart} style={[styles.primary, !destination && styles.disabled]}>
              <Navigation size={19} color="#fff" /><Text style={styles.primaryText}>Iniciar Navegação</Text>
            </Pressable>
          ) : (
            <Pressable onPress={onRouteEnd} style={styles.primary}><Text style={styles.primaryText}>Parar Navegação</Text></Pressable>
          )}
        </View>

        {routeActive && (
          <View style={styles.routeCard}>
            <View style={styles.summary}>
              <View><Text style={styles.muted}>Tempo estimado</Text><Text style={styles.big}>42 min</Text></View>
              <ArrowRight size={24} color="#0f766e" />
              <View><Text style={styles.muted}>Distância</Text><Text style={styles.big}>38 km</Text></View>
            </View>
            {steps.map(([instruction, distance, duration], index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepDot}><Text style={styles.stepNumber}>{index + 1}</Text></View>
                <View style={{ flex: 1 }}><Text style={styles.instruction}>{instruction}</Text><Text style={styles.muted}>{distance} · {duration}</Text></View>
                <Clock size={17} color="#9ca3af" />
              </View>
            ))}
            <View style={styles.notice}><AlertCircle size={17} color="#0f766e" /><Text style={{flex:1,color:"#374151"}}>A rota exibida é uma simulação. A integração com Routes API pode ser adicionada na próxima etapa.</Text></View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Field({ icon, value, onChangeText, placeholder }: any) {
  return <View style={styles.field}>{icon}<TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9ca3af" style={styles.input} /></View>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" },
  header: { backgroundColor: "#fff", padding: 22, flexDirection: "row", alignItems: "center", gap: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  headerIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#0f766e", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "800", color: "#111827" },
  subtitle: { color: "#0f766e", marginTop: 2 },
  form: { backgroundColor: "#fff", padding: 16, gap: 10 },
  field: { minHeight: 52, borderRadius: 13, backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, gap: 8 },
  input: { flex: 1, fontSize: 15, color: "#111827" },
  primary: { minHeight: 54, borderRadius: 13, backgroundColor: "#111827", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  disabled: { backgroundColor: "#d1d5db" },
  primaryText: { color: "#fff", fontWeight: "800" },
  routeCard: { margin: 16, padding: 16, backgroundColor: "#fff", borderRadius: 18, borderWidth: 1, borderColor: "#e5e7eb" },
  summary: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  muted: { color: "#6b7280", fontSize: 12 },
  big: { fontSize: 23, fontWeight: "800", color: "#111827", marginTop: 3 },
  step: { flexDirection: "row", alignItems: "center", gap: 11, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  stepDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#ccfbf1", alignItems: "center", justifyContent: "center" },
  stepNumber: { color: "#0f766e", fontWeight: "800" },
  instruction: { color: "#111827", fontWeight: "600", marginBottom: 3 },
  notice: { marginTop: 15, padding: 11, borderRadius: 12, backgroundColor: "#f0fdfa", flexDirection: "row", gap: 8 },
});
