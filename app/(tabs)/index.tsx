import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MonthSummaryCard } from "@/components/archives/MonthSummaryCard";
import { CategoryList } from "@/components/home/CategoryList";
import { DailySpendingChart } from "@/components/home/DailySpendingChart";
import { useDashboard } from "@/hooks/useDashboard";
import { useTransactions } from "@/hooks/useTransactions";
import { useCallback } from "react";

export default function Home() {
  const router = useRouter();
  const { transactions, loading, refetch } = useTransactions(new Date());
  const { total, categorySpending, dailySpending } = useDashboard(transactions);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

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

        <View className="px-6">
          <MonthSummaryCard date={new Date()} total={total} />
        </View>

        {categorySpending.length > 0 && (
          <View className="px-6">
            <Text className="text-slate-700 text-2xl font-bold mb-3">
              CATEGORIES
            </Text>
            <CategoryList data={categorySpending} />
          </View>
        )}

        {dailySpending.length > 0 && (
          <View className="px-6">
            <Text className="text-slate-700 text-2xl font-bold mb-3">
              DAILY SPENDING
            </Text>
            <DailySpendingChart data={dailySpending} />
          </View>
        )}

        {!loading && transactions.length === 0 && (
          <Text className="font-semibold text-slate-500 text-center mt-8 uppercase">
            No transactions this month.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
