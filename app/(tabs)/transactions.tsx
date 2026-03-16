import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Transactions() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        Transactions
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
