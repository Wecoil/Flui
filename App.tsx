import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppMap from "./components/AppMap";
import BatteryStatus from "./components/BatteryStatus";
import BottomSheet from "./components/BottomSheet";
import ChargingStations from "./components/ChargingStations";
import MobileNav, { MainView } from "./components/MobileNav";
import NavigationView from "./components/NavigationView";
import BatteryView from "./components/BatteryView";
import RewardsView from "./components/RewardsView";
import SettingsView from "./components/SettingsView";
import RoutePanel from "./components/RoutePanel";
import ChargingHistory from "./components/ChargingHistory";

const FAVORITES_KEY = "@flui/favorite-stations";

export default function App() {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [routeActive, setRouteActive] = useState(false);
  const [mainView, setMainView] = useState<MainView>("map");
  const [mapTab, setMapTab] = useState<"route" | "stations" | "favorites">("route");
  const [sheetOpen, setSheetOpen] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((value) => {
        if (value) {
          const parsed: unknown = JSON.parse(value);
          if (Array.isArray(parsed)) setFavoriteIds(parsed.filter((id): id is number => Number.isInteger(id)));
        }
      })
      .catch((error) => console.warn("Não foi possível carregar favoritos:", error))
      .finally(() => setFavoritesLoaded(true));
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds)).catch((error) =>
      console.warn("Não foi possível salvar favoritos:", error)
    );
  }, [favoriteIds, favoritesLoaded]);

  const toggleFavorite = (stationId: number) => {
    setFavoriteIds((current) => current.includes(stationId)
      ? current.filter((id) => id !== stationId)
      : [...current, stationId]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        {mainView === "map" && (
          <View style={styles.mapScreen}>
            <AppMap
              selectedStation={selectedStation}
              routeActive={routeActive}
              onStationSelect={setSelectedStation}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
            <View style={styles.batteryOverlay}><BatteryStatus /></View>
            <BottomSheet isOpen={sheetOpen} onToggle={() => setSheetOpen((value) => !value)}>
              <View style={styles.tabs}>
                <TabButton label="Rota" active={mapTab === "route"} onPress={() => setMapTab("route")} />
                <TabButton label="Estações" active={mapTab === "stations"} onPress={() => setMapTab("stations")} />
                <TabButton label={`Favoritos (${favoriteIds.length})`} active={mapTab === "favorites"} onPress={() => setMapTab("favorites")} />
              </View>
              {mapTab === "route" ? (
                <RoutePanel onRouteStart={() => setRouteActive(true)} onRouteEnd={() => setRouteActive(false)} />
              ) : (
                <ChargingStations
                  onStationSelect={setSelectedStation}
                  selectedStation={selectedStation}
                  favoriteIds={favoriteIds}
                  onToggleFavorite={toggleFavorite}
                  favoritesOnly={mapTab === "favorites"}
                />
              )}
            </BottomSheet>
          </View>
        )}
        {mainView === "navigation" && <NavigationView routeActive={routeActive} onRouteStart={() => setRouteActive(true)} onRouteEnd={() => setRouteActive(false)} />}
        {mainView === "battery" && <BatteryView />}
        {mainView === "rewards" && <RewardsView />}
        {mainView === "history" && <ChargingHistory />}
        {mainView === "settings" && <SettingsView />}
      </View>
      <MobileNav activeView={mainView} onViewChange={setMainView} />
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { Pressable, Text } = require("react-native");
  return <View style={styles.tabButtonWrapper}><Pressable onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}><Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text></Pressable></View>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" }, content: { flex: 1 }, mapScreen: { flex: 1, position: "relative" },
  batteryOverlay: { position: "absolute", top: 12, left: 16, right: 16, zIndex: 20 },
  tabs: { flexDirection: "row", backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  tabButtonWrapper: { flex: 1 }, tabButton: { alignItems: "center", paddingVertical: 14, borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabButtonActive: { borderBottomColor: "#0f766e" }, tabText: { color: "#6b7280", fontWeight: "600", fontSize: 12 }, tabTextActive: { color: "#0f766e" },
});
