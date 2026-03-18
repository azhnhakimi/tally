import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import { MonthNavigator } from "@/components/transactions/MonthNavigator";
import TransactionItem from "@/components/transactions/TransactionItem";
import { type Category } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { useTransactions } from "@/hooks/useTransactions";

export default function Transactions() {
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());
  const { transactions, loading, refetch } = useTransactions(currentDate);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
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
      <Header text="transactions" />

      <View className="mx-6 mt-6 flex-1">
        <MonthNavigator
          date={currentDate}
          onPrev={goToPrev}
          onNext={goToNext}
          onNow={goToNow}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#111111" />
        ) : transactions.length === 0 ? (
          <Text className="font-semibold text-slate-500 text-center mt-8 uppercase">
            No transactions this month.
          </Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            contentContainerClassName="gap-3 pb-8"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                android_ripple={null}
                onPress={() =>
                  router.push({
                    pathname: "/transaction/[id]",
                    params: {
                      id: item.id,
                      amount: item.amount.toFixed(2),
                      merchant: item.merchant,
                      category: item.category,
                      transaction_date: item.transaction_date,
                    },
                  })
                }
              >
                <TransactionItem
                  title={item.merchant}
                  amount={item.amount.toFixed(2)}
                  category={item.category as Category}
                  date={item.transaction_date}
                />
              </Pressable>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
