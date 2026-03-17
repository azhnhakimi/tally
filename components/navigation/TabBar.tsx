import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const TABS: {
  name: string;
  label: string;
  icon: IoniconsName;
  iconActive: IoniconsName;
}[] = [
  { name: "index", label: "HOME", icon: "home-outline", iconActive: "home" },
  {
    name: "transactions",
    label: "TRANSACTIONS",
    icon: "receipt-outline",
    iconActive: "receipt",
  },
  {
    name: "archives",
    label: "ARCHIVES",
    icon: "archive-outline",
    iconActive: "archive",
  },
  {
    name: "unmatched",
    label: "UNMATCHED",
    icon: "chatbubble-outline",
    iconActive: "chatbubble",
  },
  {
    name: "patterns",
    label: "PATTERNS",
    icon: "terminal-outline",
    iconActive: "terminal",
  },
];

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t-[2.5px] border-[#111111] bg-[#F5F0E8]"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="flex-row h-16 flex-1">
        {TABS.map((tab, index) => {
          const isActive = state.index === index;

          return (
            <Pressable
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              className={`flex-1 items-center justify-center gap-1 ${
                isActive
                  ? "bg-[#FF6B6B] border-x-[2.5px] border-b-[2.5px] border-[#111111]"
                  : ""
              }`}
              style={
                isActive
                  ? {
                      shadowColor: "#111111",
                      shadowOffset: { width: 3, height: 3 },
                      shadowOpacity: 1,
                      shadowRadius: 0,
                      elevation: 4,
                    }
                  : undefined
              }
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color="#111111"
              />
              <Text
                className="text-[8px] font-semibold text-[#111111] tracking-widest"
                allowFontScaling={false}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
