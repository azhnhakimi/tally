import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MonthSummaryCard } from "@/components/archives/MonthSummaryCard";
import { CategoryList } from "@/components/home/CategoryList";
import Header from "@/components/layout/Header";
import { MonthNavigator } from "@/components/transactions/MonthNavigator";
import { type Category } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { mockTransactions } from "@/constants/mockData";

export default function Archives() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const filtered = mockTransactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    );
  });

  const total = filtered.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const categorySpending = filtered.reduce(
    (acc, t) => {
      const cat = t.category as Category;
      acc[cat] = (acc[cat] || 0) + parseFloat(t.amount);
      return acc;
    },
    {} as Record<Category, number>,
  );

  const categoryData = Object.entries(categorySpending).map(
    ([category, amount]) => ({
      category: category as Category,
      amount,
    }),
  );

  const goToPrev = () =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  const goToNext = () =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const goToNow = () => {
    setCurrentDate(new Date());
  };

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

        <MonthSummaryCard date={currentDate} total={total} />

        {categoryData.length > 0 ? (
          <View>
            <Text className="text-slate-700 text-2xl font-bold mb-3">
              CATEGORIES
            </Text>
            <CategoryList data={categoryData} alwaysExpanded />
          </View>
        ) : (
          <Text className="font-semibold text-slate-500 text-center mt-32">
            No transactions for this month.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
