import { BrutalistCard } from "@/components/ui/BrutalistCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

const Header = ({
  text,
  backVisible = false,
}: {
  text: string;
  backVisible?: boolean;
}) => {
  const router = useRouter();

  return (
    <View className="mx-6">
      <BrutalistCard
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 12,
        }}
      >
        {backVisible && (
          <Pressable
            style={{ position: "absolute", left: 12 }}
            onPress={() => router.back()}
          >
            <BrutalistCard
              style={{ backgroundColor: Colors.appRed }}
              shadowOffset={2}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </BrutalistCard>
          </Pressable>
        )}
        <Text className="text-center font-semibold uppercase text-3xl">
          {text}
        </Text>
      </BrutalistCard>
    </View>
  );
};

export default Header;
