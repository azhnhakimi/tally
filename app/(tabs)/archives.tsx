import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MonthSummaryCard } from "@/components/archives/MonthSummaryCard";
import { CategoryList } from "@/components/home/CategoryList";
import Header from "@/components/layout/Header";
import { MonthNavigator } from "@/components/transactions/MonthNavigator";
import { Colors } from "@/constants/colors";
import { useDashboard } from "@/hooks/useDashboard";
import { useTransactions } from "@/hooks/useTransactions";
import { useFocusEffect } from "expo-router";

export default function Archives() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { transactions, loading, refetch } = useTransactions(currentDate);
  const { total, categorySpending } = useDashboard(transactions);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const goToPrev = () =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  const goToNext = () =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const goToNow = () => setCurrentDate(new Date());

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primaryBackground }}
      edges={["top"]}
      className="flex-1"
    >
      <Header text="archives" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-6 pb-8 mx-6 mt-6"
        showsVerticalScrollIndicator={false}
      >
        <MonthNavigator
          date={currentDate}
          onPrev={goToPrev}
          onNext={goToNext}
          onNow={goToNow}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#111111" />
        ) : (
          <>
            <MonthSummaryCard date={currentDate} total={total} />

            {categorySpending.length > 0 ? (
              <View>
                <Text className="text-slate-700 text-2xl font-bold mb-3">
                  CATEGORIES
                </Text>
                <CategoryList data={categorySpending} alwaysExpanded />
              </View>
            ) : (
              <Text className="font-semibold text-slate-500 text-center mt-32 uppercase">
                No transactions for this month.
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
