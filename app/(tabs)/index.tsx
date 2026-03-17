import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryList } from "@/components/home/CategoryList";
import { DailySpendingChart } from "@/components/home/DailySpendingChart";
import { Colors } from "@/constants/colors";
import { mockCategorySpending, mockDailySpending } from "@/constants/mockData";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 flex flex-row justify-between items-center">
          <View>
            <Text className="text-slate-600 text-xl font-semibold">
              GOOD DAY,
            </Text>
            <Text className="text-black text-3xl font-bold">MATCHA GATCHA</Text>
          </View>
          <Pressable
            onPress={() => router.push("/(tabs)/dev")}
            android_ripple={null}
            style={{
              borderWidth: 2.5,
              borderColor: "#111111",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              shadowColor: "#111111",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 4,
            }}
          >
            <Feather name="terminal" size={28} color="black" />
          </Pressable>
        </View>

        <View
          className="p-6 mx-6 border-[2.5px] border-black"
          style={{
            backgroundColor: Colors.appYellow,
            shadowColor: "#111111",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 4,
          }}
        >
          <Text className="font-semibold uppercase text-xl text-black mb-6">
            {new Date().toLocaleDateString("en-MY", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text className="text-slate-600 text-lg font-semibold mb-2">
            TOTAL SPENT
          </Text>
          <Text className="text-black font-bold text-5xl">RM1100.00</Text>
        </View>

        <View className="px-6">
          <Text className="text-slate-700 text-2xl font-bold mb-1">
            CATEGORIES
          </Text>
          <CategoryList data={mockCategorySpending} />
        </View>

        <View className="px-6">
          <Text className="text-slate-700 text-2xl font-bold mb-1">
            DAILY SPENDING
          </Text>
          <DailySpendingChart data={mockDailySpending} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
