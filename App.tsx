import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
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

export default function App() {
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [routeActive, setRouteActive] = useState(false);
  const [mainView, setMainView] = useState<MainView>("map");
  const [mapTab, setMapTab] = useState<"route" | "stations">("route");
  const [sheetOpen, setSheetOpen] = useState(true);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        {mainView === "map" && (
          <View style={styles.mapScreen}>
            <AppMap
              selectedStation={selectedStation}
              routeActive={routeActive}
              onStationSelect={setSelectedStation}
            />

            <View style={styles.batteryOverlay}>
              <BatteryStatus />
            </View>

            <BottomSheet
              isOpen={sheetOpen}
              onToggle={() => setSheetOpen((value) => !value)}
            >
              <View style={styles.tabs}>
                <TabButton
                  label="Rota"
                  active={mapTab === "route"}
                  onPress={() => setMapTab("route")}
                />
                <TabButton
                  label="Estações"
                  active={mapTab === "stations"}
                  onPress={() => setMapTab("stations")}
                />
              </View>

              {mapTab === "route" ? (
                <RoutePanel
                  onRouteStart={() => setRouteActive(true)}
                  onRouteEnd={() => setRouteActive(false)}
                />
              ) : (
                <ChargingStations
                  onStationSelect={setSelectedStation}
                  selectedStation={selectedStation}
                />
              )}
            </BottomSheet>
          </View>
        )}

        {mainView === "navigation" && (
          <NavigationView
            routeActive={routeActive}
            onRouteStart={() => setRouteActive(true)}
            onRouteEnd={() => setRouteActive(false)}
          />
        )}

        {mainView === "battery" && <BatteryView />}
        {mainView === "rewards" && <RewardsView />}
        {mainView === "settings" && <SettingsView />}
      </View>

      <MobileNav activeView={mainView} onViewChange={setMainView} />
    </SafeAreaView>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.tabButtonWrapper}>
      <TabPressable label={label} active={active} onPress={onPress} />
    </View>
  );
}

function TabPressable({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { Pressable, Text } = require("react-native");
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" },
  content: { flex: 1 },
  mapScreen: { flex: 1, position: "relative" },
  batteryOverlay: {
    position: "absolute",
    top: 12,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tabButtonWrapper: { flex: 1 },
  tabButton: {
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: { borderBottomColor: "#0f766e" },
  tabText: { color: "#6b7280", fontWeight: "600" },
  tabTextActive: { color: "#0f766e" },
});
