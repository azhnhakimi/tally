import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

const AddTransactionBtn = () => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/(tabs)")}
      className="mx-6 border-[2.5px] border-black px-6 py-4"
      style={{
        backgroundColor: Colors.appRed,
        shadowColor: "#111111",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      <View className=" flex flex-row justify-center items-center gap-3">
        <Entypo name="plus" size={24} color="black" />
        <Text className="text-center font-semibold uppercase text-2xl">
          Add Transaction
        </Text>
      </View>
    </Pressable>
  );
};

export default AddTransactionBtn;
