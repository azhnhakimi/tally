import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        Home
      </Text>
    </SafeAreaView>
  );
}
