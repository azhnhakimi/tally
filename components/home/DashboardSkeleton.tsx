import { Skeleton } from "@/components/ui/Skeleton";
import { Colors } from "@/constants/colors";
import { View } from "react-native";

export function DashboardSkeleton() {
  return (
    <View style={{ gap: 24, paddingHorizontal: 24 }}>
      <View
        style={{
          padding: 24,
          borderWidth: 2.5,
          borderColor: "#111111",
          backgroundColor: Colors.appYellow,
          gap: 12,
        }}
      >
        <Skeleton width={120} height={16} />
        <Skeleton width={80} height={14} />
        <Skeleton width={180} height={48} />
      </View>

      <View style={{ gap: 12 }}>
        <Skeleton width={140} height={24} />
        <View
          style={{
            borderWidth: 2,
            borderColor: "#111111",
            backgroundColor: Colors.appPurple,
          }}
        >
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: i < 3 ? 1 : 0,
                borderBottomColor: "#111111",
                gap: 12,
              }}
            >
              <Skeleton width={20} height={20} />
              <Skeleton width={100} height={14} />
              <View style={{ flex: 1 }} />
              <Skeleton width={60} height={14} />
            </View>
          ))}
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Skeleton width={160} height={24} />
        <View
          style={{
            borderWidth: 2.5,
            borderColor: "#111111",
            backgroundColor: "#ffffff",
            padding: 16,
          }}
        >
          <Skeleton width="100%" height={180} />
        </View>
      </View>
    </View>
  );
}
