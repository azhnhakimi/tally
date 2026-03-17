import { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import AddTransactionBtn from "@/components/transactions/AddTransactionBtn";
import { MonthNavigator } from "@/components/transactions/MonthNavigator";
import TransactionItem from "@/components/transactions/TransactionItem";
import { Colors } from "@/constants/colors";
import { mockTransactions } from "@/constants/mockData";

export default function Transactions() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const filtered = mockTransactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const goToPrev = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const goToNext = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const goToNow = () => {
    setCurrentDate(new Date());
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primaryBackground }}
      edges={["top"]}
      className="flex-1 gap-4"
    >
      <Header text="transactions" />
      <AddTransactionBtn />

      <View className="mx-6 flex-1">
        <MonthNavigator
          date={currentDate}
          onPrev={goToPrev}
          onNext={goToNext}
          onNow={goToNow}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerClassName="gap-3 pb-8"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TransactionItem
              title={item.title}
              amount={item.amount}
              category={item.category}
              date={item.date}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
