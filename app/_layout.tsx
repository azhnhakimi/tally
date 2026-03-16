import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { Colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.primaryBackground }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
