import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import { Colors } from "@/constants/colors";

export default function Dev() {
  return (
    <SafeAreaView
      style={[{ backgroundColor: Colors.primaryBackground }]}
      edges={["top"]}
      className="flex-1"
    >
      <Header text="dev screen" />
    </SafeAreaView>
  );
}
