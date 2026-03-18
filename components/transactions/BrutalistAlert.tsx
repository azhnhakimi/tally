import { Colors } from "@/constants/colors";
import { Modal, Pressable, Text, View } from "react-native";

type AlertConfig = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  confirmColor?: string;
};

export function BrutalistAlert({
  config,
  onCancel,
}: {
  config: AlertConfig;
  onCancel: () => void;
}) {
  return (
    <Modal transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <View style={{ position: "relative", width: "100%" }}>
          <View
            style={{
              position: "absolute",
              backgroundColor: "#111111",
              top: 5,
              left: 5,
              right: -5,
              bottom: -5,
            }}
          />
          <View
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 2.5,
              borderColor: "#111111",
              padding: 24,
            }}
          >
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
    <Modal transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <View style={{ position: "relative", width: "100%" }}>
          <View
            style={{
              position: "absolute",
              backgroundColor: "#111111",
              top: 5,
              left: 5,
              right: -5,
              bottom: -5,
            }}
          />
          <View
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 2.5,
              borderColor: "#111111",
              padding: 24,
            }}
          >
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
