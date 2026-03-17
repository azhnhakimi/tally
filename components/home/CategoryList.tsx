import { CATEGORY_META, type Category } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type CategorySpending = {
  category: Category;
  amount: number;
};

type CategoryListProps = {
  data: CategorySpending[];
};

export function CategoryList({ data }: CategoryListProps) {
  const [expanded, setExpanded] = useState(false);

  const sorted = [...data].sort((a, b) => b.amount - a.amount);
  const displayed = expanded ? sorted : sorted.slice(0, 3);
  const hasMore = sorted.length > 3;

  return (
    <View>
      <View
        className="border-2 border-[#111111]"
        style={{ backgroundColor: Colors.appPurple }}
      >
        {displayed.map((item, index) => {
          const meta = CATEGORY_META[item.category];

          return (
            <View key={item.category}>
              <View className="flex-row items-center px-4 py-3">
                <Ionicons name={meta.icon} size={20} color="#111111" />
                <Text className="font-medium text-sm text-[#111111] flex-1 ml-3">
                  {meta.label}
                </Text>
                <Text className="font-semibold text-sm text-[#111111]">
                  RM {item.amount.toFixed(2)}
                </Text>
              </View>
              {index < displayed.length - 1 && (
                <View className="h-[1px] bg-[#111111] mx-4" />
              )}
            </View>
          );
        })}
      </View>

      {hasMore && (
        <Pressable onPress={() => setExpanded(!expanded)} className="mt-3 py-2">
          <Text className="font-semibold text-sm text-[#111111] text-right">
            {expanded ? "Show less ↑" : `Show ${sorted.length - 3} more ↓`}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
