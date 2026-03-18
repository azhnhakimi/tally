import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { BrutalistCard } from "@/components/ui/BrutalistCard";
import { Colors } from "@/constants/colors";
import { type FailedSms } from "@/hooks/useFailedSms";
import { supabase } from "@/lib/supabase";

type FailedSmsItemProps = {
  item: FailedSms;
  onDismiss: () => void;
};

export function FailedSmsItem({ item, onDismiss }: FailedSmsItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const router = useRouter();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(2);
    return `${day}-${month}-${year}`;
  };

  const handleDismiss = async () => {
    setDismissing(true);
    await supabase.from("failed_sms").delete().eq("id", item.id);
    onDismiss();
  };

  const handleCreate = () => {
    router.push({
      pathname: "/transaction/create",
      params: {
        prefill_date: item.received_at,
        prefill_raw: item.raw_sms,
      },
    });
  };

  return (
    <BrutalistCard style={{ backgroundColor: Colors.appLightRed }}>
      <View style={{ padding: 16, gap: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 13,
                color: "#111111",
                textTransform: "uppercase",
              }}
            >
              {item.sender}
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 11,
                color: "#64748b",
              }}
            >
              {formatDate(item.received_at)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setExpanded((e) => !e)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#111111"
            />
          </TouchableOpacity>
        </View>

        <Text
          numberOfLines={expanded ? undefined : 2}
          style={{
            fontFamily: "SpaceGrotesk_400Regular",
            fontSize: 13,
            color: "#374151",
            lineHeight: 20,
          }}
        >
          {item.raw_sms}
        </Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={handleCreate}
            activeOpacity={0.8}
            style={{
              flex: 1,
              borderWidth: 2.5,
              borderColor: "#111111",
              backgroundColor: Colors.appYellow,
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 12,
                color: "#111111",
                textTransform: "uppercase",
              }}
            >
              Create Transaction
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDismiss}
            disabled={dismissing}
            activeOpacity={0.8}
            style={{
              flex: 1,
              borderWidth: 2.5,
              borderColor: "#111111",
              backgroundColor: "#ffffff",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 12,
                color: "#111111",
                textTransform: "uppercase",
              }}
            >
              Dismiss
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BrutalistCard>
  );
}
