import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Callout, Marker, Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import { Clock, DollarSign, Heart, MapPin, Star, X, Zap } from "lucide-react-native";

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

type StationReview = { id: string; stationId: number; rating: number; comment: string; createdAt: string };
const REVIEWS_STORAGE_KEY = "@flui/station-reviews";

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
  favoriteIds,
  onToggleFavorite,
}: {
  selectedStation: number | null;
  routeActive: boolean;
  onStationSelect: (id: number | null) => void;
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
}) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [reviews, setReviews] = useState<StationReview[]>([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [draftRating, setDraftRating] = useState(5);
  const [draftComment, setDraftComment] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(REVIEWS_STORAGE_KEY)
      .then((value) => {
        if (!value) return;
        const parsed: unknown = JSON.parse(value);
        if (Array.isArray(parsed)) setReviews(parsed as StationReview[]);
      })
      .catch((error) => console.warn("Não foi possível carregar as avaliações:", error))
      .finally(() => setReviewsLoaded(true));
  }, []);

  useEffect(() => {
    if (!reviewsLoaded) return;
    AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews)).catch((error) =>
      console.warn("Não foi possível salvar as avaliações:", error)
    );
  }, [reviews, reviewsLoaded]);

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
    setDraftRating(5);
    setDraftComment("");
    setActiveStation(station);
  };

  const submitReview = () => {
    if (!activeStation) return;
    const comment = draftComment.trim();
    if (!comment) {
      Alert.alert("Comentário necessário", "Escreva um comentário antes de enviar sua avaliação.");
      return;
    }
    const review: StationReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      stationId: activeStation.id,
      rating: draftRating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setReviews((current) => [review, ...current]);
    setDraftComment("");
    setDraftRating(5);
    Alert.alert("Avaliação enviada", "Obrigado por compartilhar sua experiência!");
  };

  const stationReviews = activeStation ? reviews.filter((review) => review.stationId === activeStation.id) : [];
  const totalRating = activeStation
    ? (activeStation.rating * activeStation.reviews + stationReviews.reduce((sum, review) => sum + review.rating, 0)) / (activeStation.reviews + stationReviews.length)
    : 0;
  const totalReviews = activeStation ? activeStation.reviews + stationReviews.length : 0;

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
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.modalContent}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                  <View style={styles.stationBody}>
                    <View style={styles.stationTitleRow}><View style={{ flex: 1 }}><Text style={styles.stationTitle}>{activeStation.name}</Text></View><Pressable onPress={() => onToggleFavorite(activeStation.id)} style={styles.modalFavorite} accessibilityRole="button" accessibilityLabel={favoriteIds.includes(activeStation.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart size={23} color={favoriteIds.includes(activeStation.id) ? "#e11d48" : "#9ca3af"} fill={favoriteIds.includes(activeStation.id) ? "#e11d48" : "transparent"} /></Pressable></View>
                    <Text style={styles.address}>{activeStation.address}</Text>
                    <View style={styles.row}>
                      <View style={styles.stat}><Zap size={16} color="#0f766e" /><Text>{activeStation.available}/{activeStation.total}</Text></View>
                      <View style={styles.stat}><Clock size={16} color="#6b7280" /><Text>{activeStation.time}</Text></View>
                      <View style={styles.stat}><DollarSign size={16} color="#6b7280" /><Text>{activeStation.price}</Text></View>
                    </View>
                    <View style={styles.rating}><Star size={16} color="#f59e0b" fill="#f59e0b" /><Text style={{fontWeight:"700"}}>{totalRating.toFixed(1)}</Text><Text style={{color:"#6b7280"}}>({totalReviews} avaliações)</Text><Text style={{marginLeft:"auto", color:"#0f766e"}}>{activeStation.hours}</Text></View>

                    <View style={styles.reviewSection}>
                      <Text style={styles.sectionTitle}>Avalie esta estação</Text>
                      <Text style={styles.helperText}>Como foi sua experiência? Escolha uma nota de 1 a 5 estrelas.</Text>
                      <View style={styles.starPicker}>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Pressable key={value} onPress={() => setDraftRating(value)} hitSlop={8} accessibilityRole="button" accessibilityLabel={`${value} ${value === 1 ? "estrela" : "estrelas"}`}>
                            <Star size={32} color="#f59e0b" fill={value <= draftRating ? "#f59e0b" : "transparent"} />
                          </Pressable>
                        ))}
                      </View>
                      <TextInput
                        value={draftComment}
                        onChangeText={setDraftComment}
                        placeholder="Conte como foi o atendimento, a disponibilidade dos carregadores..."
                        placeholderTextColor="#9ca3af"
                        multiline
                        textAlignVertical="top"
                        maxLength={500}
                        style={styles.commentInput}
                      />
                      <Text style={styles.characterCount}>{draftComment.length}/500</Text>
                      <Pressable onPress={submitReview} style={styles.submitReview} accessibilityRole="button">
                        <Text style={styles.submitReviewText}>Enviar avaliação</Text>
                      </Pressable>
                    </View>

                    <View style={styles.reviewListSection}>
                      <Text style={styles.sectionTitle}>Comentários ({stationReviews.length})</Text>
                      {stationReviews.length === 0 ? (
                        <Text style={styles.noReviews}>Ainda não há comentários enviados por usuários. Seja o primeiro a avaliar!</Text>
                      ) : stationReviews.slice(0, 10).map((review) => (
                        <View key={review.id} style={styles.reviewCard}>
                          <View style={styles.reviewCardTop}>
                            <View style={styles.reviewStars}>{[1, 2, 3, 4, 5].map((value) => <Star key={value} size={14} color="#f59e0b" fill={value <= review.rating ? "#f59e0b" : "transparent"} />)}</View>
                            <Text style={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString("pt-BR")}</Text>
                          </View>
                          <Text style={styles.reviewComment}>{review.comment}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
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
  stationCard: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: "hidden", maxHeight: "88%" },
  modalContent: { flexShrink: 1 },
  stationImage: { width: "100%", height: 170 },
  close: { position: "absolute", right: 14, top: 14, backgroundColor: "#fff", width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  stationBody: { padding: 18, paddingBottom: 28 },
  stationTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  modalFavorite: { padding: 8, backgroundColor: "#fff1f2", borderRadius: 12 },
  stationTitle: { fontSize: 20, fontWeight: "800", color: "#111827" },
  address: { color: "#6b7280", marginTop: 4 },
  row: { flexDirection: "row", gap: 12, marginTop: 18 },
  stat: { flexDirection: "row", gap: 5, alignItems: "center", backgroundColor: "#f3f4f6", padding: 8, borderRadius: 10 },
  rating: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  reviewSection: { marginTop: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  helperText: { color: "#6b7280", fontSize: 12, lineHeight: 18, marginTop: 5 },
  starPicker: { flexDirection: "row", gap: 10, marginTop: 14, marginBottom: 14 },
  commentInput: { minHeight: 100, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, padding: 12, color: "#111827", fontSize: 14, backgroundColor: "#fff" },
  characterCount: { color: "#9ca3af", fontSize: 11, textAlign: "right", marginTop: 5 },
  submitReview: { backgroundColor: "#0f766e", borderRadius: 12, paddingVertical: 13, alignItems: "center", marginTop: 10 },
  submitReviewText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  reviewListSection: { marginTop: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: "#e5e7eb", gap: 10 },
  noReviews: { color: "#6b7280", fontSize: 13, lineHeight: 19, marginTop: 4 },
  reviewCard: { backgroundColor: "#f9fafb", borderRadius: 12, padding: 12, gap: 8 },
  reviewCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  reviewStars: { flexDirection: "row", gap: 2 },
  reviewDate: { color: "#9ca3af", fontSize: 11 },
  reviewComment: { color: "#374151", fontSize: 13, lineHeight: 19 },
});
