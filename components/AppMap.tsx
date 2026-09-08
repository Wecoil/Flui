import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";
import MapView, { Callout, Marker, Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Clock, DollarSign, MapPin, Star, X, Zap } from "lucide-react-native";

export interface Station {
  id: number;
  name: string;
  address: string;
  available: number;
  total: number;
  speed: "Rápido" | "Normal" | "Lento";
  price: string;
  rating: number;
  reviews: number;
  distance: string;
  time: string;
  image: string;
  hours: string;
  isOpen: boolean;
  coordinate: { latitude: number; longitude: number };
}

export const stations: Station[] = [
  {
    id: 1,
    name: "Estação Shopping Center",
    address: "Av. Paulista, 1000 - Bela Vista",
    available: 4,
    total: 6,
    speed: "Rápido",
    price: "R$ 2,80/kWh",
    rating: 4.8,
    reviews: 234,
    distance: "2.3 km",
    time: "~30 min",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    hours: "24 horas",
    isOpen: true,
    coordinate: { latitude: -23.5562, longitude: -46.6574 },
  },
  {
    id: 2,
    name: "Posto Paulista",
    address: "Rua da Consolação, 1500",
    available: 2,
    total: 4,
    speed: "Rápido",
    price: "R$ 2,50/kWh",
    rating: 4.6,
    reviews: 156,
    distance: "4.1 km",
    time: "~35 min",
    image: "https://images.unsplash.com/photo-1704475336842-0ab3798abf0e?auto=format&fit=crop&w=800&q=80",
    hours: "6h - 22h",
    isOpen: true,
    coordinate: { latitude: -23.551, longitude: -46.662 },
  },
  {
    id: 3,
    name: "Estacionamento Sul",
    address: "Av. Brigadeiro, 2000",
    available: 8,
    total: 10,
    speed: "Normal",
    price: "R$ 1,90/kWh",
    rating: 4.5,
    reviews: 89,
    distance: "5.8 km",
    time: "~60 min",
    image: "https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?auto=format&fit=crop&w=800&q=80",
    hours: "8h - 20h",
    isOpen: true,
    coordinate: { latitude: -23.5685, longitude: -46.6495 },
  },
  {
    id: 4,
    name: "Terminal Norte",
    address: "Av. Tiradentes, 800",
    available: 3,
    total: 8,
    speed: "Rápido",
    price: "R$ 2,65/kWh",
    rating: 4.7,
    reviews: 201,
    distance: "7.2 km",
    time: "~32 min",
    image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=800&q=80",
    hours: "24 horas",
    isOpen: true,
    coordinate: { latitude: -23.525, longitude: -46.624 },
  },
];

const initialRegion: Region = {
  latitude: -23.5505,
  longitude: -46.6333,
  latitudeDelta: 0.075,
  longitudeDelta: 0.075,
};

export default function AppMap({
  selectedStation,
  routeActive,
  onStationSelect,
}: {
  selectedStation: number | null;
  routeActive: boolean;
  onStationSelect: (id: number | null) => void;
}) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [activeStation, setActiveStation] = useState<Station | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      setLocationPermission(true);
      const current = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });
    })();
  }, []);

  const openStation = (station: Station) => {
    onStationSelect(station.id);
    setActiveStation(station);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={locationPermission}
        showsMyLocationButton={locationPermission}
        showsCompass
        toolbarEnabled
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={station.coordinate}
            onPress={() => openStation(station)}
            tracksViewChanges={false}
          >
            <View style={[styles.marker, selectedStation === station.id && styles.markerSelected]}>
              <Zap size={20} color={selectedStation === station.id ? "#fff" : "#0f766e"} fill={selectedStation === station.id ? "#fff" : "none"} />
              <View style={[styles.badge, station.available <= 2 ? styles.badgeWarning : styles.badgeOk]}>
                <Text style={styles.badgeText}>{station.available}</Text>
              </View>
            </View>
            <Callout onPress={() => openStation(station)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{station.name}</Text>
                <Text style={styles.calloutText}>{station.distance} · {station.speed}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {routeActive && (
          <Polyline
            coordinates={[
              location ?? initialRegion,
              { latitude: -23.551, longitude: -46.662 },
              { latitude: -23.5685, longitude: -46.6495 },
              { latitude: -23.558, longitude: -46.637 },
            ]}
            strokeColor="#0f766e"
            strokeWidth={5}
          />
        )}
      </MapView>

      {!locationPermission && (
        <View style={styles.locationHint}>
          <MapPin size={16} color="#0f766e" />
          <Text style={styles.locationHintText}>Ative a localização para centralizar sua posição.</Text>
        </View>
      )}

      {location === null && locationPermission && (
        <View style={styles.loading}>
          <ActivityIndicator color="#0f766e" />
        </View>
      )}

      <Modal
        visible={activeStation !== null}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setActiveStation(null);
          onStationSelect(null);
        }}
      >
        {activeStation && (
          <View style={styles.modalBackdrop}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setActiveStation(null)} />
            <View style={styles.stationCard}>
              <Image source={{ uri: activeStation.image }} style={styles.stationImage} />
              <Pressable style={styles.close} onPress={() => setActiveStation(null)}>
                <X size={20} color="#111827" />
              </Pressable>
              <View style={styles.stationBody}>
                <Text style={styles.stationTitle}>{activeStation.name}</Text>
                <Text style={styles.address}>{activeStation.address}</Text>
                <View style={styles.row}>
                  <View style={styles.stat}><Zap size={16} color="#0f766e" /><Text>{activeStation.available}/{activeStation.total}</Text></View>
                  <View style={styles.stat}><Clock size={16} color="#6b7280" /><Text>{activeStation.time}</Text></View>
                  <View style={styles.stat}><DollarSign size={16} color="#6b7280" /><Text>{activeStation.price}</Text></View>
                </View>
                <View style={styles.rating}><Star size={16} color="#f59e0b" fill="#f59e0b" /><Text style={{fontWeight:"700"}}>{activeStation.rating}</Text><Text style={{color:"#6b7280"}}>({activeStation.reviews})</Text><Text style={{marginLeft:"auto", color:"#0f766e"}}>{activeStation.hours}</Text></View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8e0d8" },
  marker: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: "#fff",
    alignItems: "center", justifyContent: "center", shadowColor: "#000",
    shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 6,
  },
  markerSelected: { backgroundColor: "#0f766e", borderWidth: 3, borderColor: "#99f6e4" },
  badge: {
    position: "absolute", right: -4, top: -4, width: 19, height: 19, borderRadius: 10,
    alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#fff",
  },
  badgeOk: { backgroundColor: "#0f766e" },
  badgeWarning: { backgroundColor: "#f59e0b" },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "800" },
  callout: { width: 180, padding: 5 },
  calloutTitle: { fontWeight: "700", color: "#111827" },
  calloutText: { marginTop: 3, color: "#6b7280" },
  locationHint: {
    position: "absolute", top: 92, left: 16, right: 16, backgroundColor: "#fff",
    borderRadius: 12, padding: 10, flexDirection: "row", alignItems: "center", gap: 8,
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  locationHintText: { flex: 1, fontSize: 12, color: "#374151" },
  loading: {
    position: "absolute", top: 92, right: 16, backgroundColor: "#fff", borderRadius: 20,
    width: 40, height: 40, alignItems: "center", justifyContent: "center", elevation: 3,
  },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,.35)", justifyContent: "flex-end" },
  stationCard: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: "hidden" },
  stationImage: { width: "100%", height: 170 },
  close: { position: "absolute", right: 14, top: 14, backgroundColor: "#fff", width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  stationBody: { padding: 18, paddingBottom: 28 },
  stationTitle: { fontSize: 20, fontWeight: "800", color: "#111827" },
  address: { color: "#6b7280", marginTop: 4 },
  row: { flexDirection: "row", gap: 12, marginTop: 18 },
  stat: { flexDirection: "row", gap: 5, alignItems: "center", backgroundColor: "#f3f4f6", padding: 8, borderRadius: 10 },
  rating: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
});
