import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import { FailedSmsItem } from "@/components/unmatched/FailedSmsItem";
import { Colors } from "@/constants/colors";
import { useFailedSms } from "@/hooks/useFailedSms";

export default function Unmatched() {
  const { failedSms, loading, refetch } = useFailedSms();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primaryBackground }}
      edges={["top"]}
      className="flex-1"
    >
      <Header text="unmatched" />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#111111"
          style={{ marginTop: 40 }}
        />
      ) : failedSms.length === 0 ? (
        <Text className="font-semibold text-slate-500 text-center mt-8 uppercase">
          No unmatched messages.
        </Text>
      ) : (
        <FlatList
          data={failedSms}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 12, padding: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FailedSmsItem item={item} onDismiss={refetch} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
