import { Colors } from "@/constants/colors";
import { Text, View } from "react-native";

type MonthSummaryCardProps = {
  date: Date;
  total: number;
};

export function MonthSummaryCard({ date, total }: MonthSummaryCardProps) {
  const label = date.toLocaleDateString("en-MY", {
    month: "long",
    year: "numeric",
  });

  return (
    <View
      className="p-6 border-[2.5px] border-black"
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
        {label}
      </Text>
      <Text className="text-slate-600 text-lg font-semibold mb-2">
        TOTAL SPENT
      </Text>
      <Text className="text-black font-bold text-5xl">
        RM{total.toFixed(2)}
      </Text>
    </View>
  );
}
