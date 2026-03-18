import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MonthSummaryCard } from "@/components/archives/MonthSummaryCard";
import { CategoryList } from "@/components/home/CategoryList";
import { DailySpendingChart } from "@/components/home/DailySpendingChart";
import { DashboardSkeleton } from "@/components/home/DashboardSkeleton";
import { BrutalistCard } from "@/components/ui/BrutalistCard";
import { useDashboard } from "@/hooks/useDashboard";
import { useTransactions } from "@/hooks/useTransactions";

export default function Home() {
  const router = useRouter();
  const { transactions, loading, refetch } = useTransactions(new Date());
  const { total, categorySpending, dailySpending } = useDashboard(transactions);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
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
          <BrutalistCard>
            <Pressable
              onPress={() => router.push("/(tabs)/dev")}
              android_ripple={null}
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Feather name="terminal" size={28} color="black" />
            </Pressable>
          </BrutalistCard>
        </View>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
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

            {transactions.length === 0 && (
              <Text className="font-semibold text-slate-500 text-center mt-8 uppercase">
                No transactions this month.
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
