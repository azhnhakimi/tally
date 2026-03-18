import { BrutalistCard } from "@/components/ui/BrutalistCard";
import { Colors } from "@/constants/colors";
import { Text } from "react-native";

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
    <BrutalistCard
      backgroundColor={Colors.appYellow}
      shadowOffset={5}
      style={{ padding: 16 }}
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
    </BrutalistCard>
  );
}
