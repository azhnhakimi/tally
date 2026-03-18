import { ActivityIndicator, Pressable, Text, View } from "react-native";

type BrutalistButtonProps = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  loading?: boolean;
  disabled?: boolean;
};

export function BrutalistButton({
  label,
  onPress,
  backgroundColor,
  loading = false,
  disabled = false,
}: BrutalistButtonProps) {
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#111111",
          top: 4,
          left: 4,
          right: -4,
          bottom: -4,
        }}
      />
      <Pressable
        onPress={onPress}
        android_ripple={null}
        disabled={disabled || loading}
        style={{
          borderWidth: 2.5,
          borderColor: "#111111",
          backgroundColor,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#111111" />
        ) : (
          <Text
            style={{
              fontFamily: "SpaceGrotesk_700Bold",
              fontSize: 14,
              color: "#111111",
              textTransform: "uppercase",
            }}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}
