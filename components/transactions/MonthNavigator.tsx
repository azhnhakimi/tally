import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type MonthNavigatorProps = {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
  onNow: () => void;
};

export function MonthNavigator({
  date,
  onPrev,
  onNext,
  onNow,
}: MonthNavigatorProps) {
  const label = date.toLocaleDateString("en-MY", {
    month: "long",
    year: "numeric",
  });

  const isCurrentMonth =
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear();

  return (
    <View className="flex-row items-center justify-between mb-4">
      <Pressable
        onPress={onPrev}
        android_ripple={null}
        className="border-[2.5px] border-black bg-white p-2"
        style={{
          shadowColor: "#111111",
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 4,
        }}
      >
        <Ionicons name="chevron-back" size={20} color="#111111" />
      </Pressable>

      <View className="flex-1 items-center gap-1">
        <Text className="font-bold text-lg text-black uppercase">{label}</Text>
        {!isCurrentMonth && (
          <Pressable onPress={onNow}>
            <Text className="font-semibold text-xs text-slate-500 uppercase">
              back to now
            </Text>
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={onNext}
        android_ripple={null}
        className="border-[2.5px] border-black bg-white p-2"
        style={{
          shadowColor: "#111111",
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 4,
        }}
      >
        <Ionicons name="chevron-forward" size={20} color="#111111" />
      </Pressable>
    </View>
  );
}
