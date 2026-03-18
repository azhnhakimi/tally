import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { BrutalistCard } from "@/components/ui/BrutalistCard";
import { Colors } from "@/constants/colors";

const AddTransactionBtn = () => {
  const router = useRouter();

  return (
    <View className="mx-6">
      <BrutalistCard style={{ backgroundColor: Colors.appRed }}>
        <TouchableOpacity
          onPress={() => router.push("/transaction/create")}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            paddingHorizontal: 24,
            paddingVertical: 16,
          }}
        >
          <Entypo name="plus" size={24} color="black" />
          <Text
            style={{
              fontFamily: "SpaceGrotesk_700Bold",
              fontSize: 22,
              color: "#111111",
              textTransform: "uppercase",
            }}
          >
            Add Transaction
          </Text>
        </TouchableOpacity>
      </BrutalistCard>
    </View>
  );
};

export default AddTransactionBtn;
