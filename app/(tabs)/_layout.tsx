import { TabBar } from "@/components/navigation/TabBar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="archives" />
      <Tabs.Screen name="unmatched" />
      <Tabs.Screen name="patterns" />
    </Tabs>
  );
}
