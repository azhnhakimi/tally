import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Patterns() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        Patterns
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
