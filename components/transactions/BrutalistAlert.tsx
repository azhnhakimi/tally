import { Colors } from "@/constants/colors";
import { Modal, Pressable, Text, View } from "react-native";

type AlertConfig = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  confirmColor?: string;
};

const overlayStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "center" as const,
  alignItems: "center" as const,
  paddingHorizontal: 24,
};

const cardShadow = {
  position: "absolute" as const,
  backgroundColor: "#111111",
  top: 5,
  left: 5,
  right: -5,
  bottom: -5,
};

const cardInner = {
  backgroundColor: "#ffffff",
  borderWidth: 2.5,
  borderColor: "#111111",
  padding: 24,
};

export function BrutalistAlert({
  config,
  onCancel,
}: {
  config: AlertConfig;
  onCancel: () => void;
}) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <View style={overlayStyle}>
        <View style={{ position: "relative", width: "100%" }}>
          <View style={cardShadow} />
          <View style={cardInner}>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 18,
                color: "#111111",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {config.title}
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 14,
                color: "#475569",
                marginBottom: 24,
              }}
            >
              {config.message}
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={onCancel}
                android_ripple={null}
                style={{
                  flex: 1,
                  borderWidth: 2.5,
                  borderColor: "#111111",
                  backgroundColor: "#ffffff",
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_700Bold",
                    fontSize: 13,
                    color: "#111111",
                    textTransform: "uppercase",
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={config.onConfirm}
                android_ripple={null}
                style={{
                  flex: 1,
                  borderWidth: 2.5,
                  borderColor: "#111111",
                  backgroundColor: config.confirmColor ?? Colors.appRed,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_700Bold",
                    fontSize: 13,
                    color: "#111111",
                    textTransform: "uppercase",
                  }}
                >
                  {config.confirmLabel ?? "Confirm"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function BrutalistValidationAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <View style={overlayStyle}>
        <View style={{ position: "relative", width: "100%" }}>
          <View style={cardShadow} />
          <View style={cardInner}>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 18,
                color: "#111111",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Invalid Input
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 14,
                color: "#475569",
                marginBottom: 24,
              }}
            >
              {message}
            </Text>
            <Pressable
              onPress={onClose}
              android_ripple={null}
              style={{
                borderWidth: 2.5,
                borderColor: "#111111",
                backgroundColor: Colors.appYellow,
                paddingVertical: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: 13,
                  color: "#111111",
                  textTransform: "uppercase",
                }}
              >
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
