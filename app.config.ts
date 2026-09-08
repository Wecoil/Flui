import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Flui EV Navigator",
  slug: "flui-ev-navigator",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "flui",
  userInterfaceStyle: "light",
  android: {
    package: "com.flui.evnavigator",
  },
  ios: {
    bundleIdentifier: "com.flui.evnavigator",
  },
  plugins: [
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        iosGoogleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    ],
    [
      "expo-location",
      {
        locationWhenInUsePermission:
          "Permita que o Flui use sua localização para mostrar sua posição e encontrar estações de recarga próximas.",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: undefined,
    },
  },
};

export default config;
