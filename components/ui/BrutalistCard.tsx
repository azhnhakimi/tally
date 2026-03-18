import { View, ViewProps } from "react-native";

type BrutalistCardProps = ViewProps & {
  backgroundColor?: string;
  shadowOffset?: number;
  children: React.ReactNode;
};

export function BrutalistCard({
  backgroundColor = "#ffffff",
  shadowOffset = 4,
  children,
  style,
  ...props
}: BrutalistCardProps) {
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#111111",
          top: shadowOffset,
          left: shadowOffset,
          right: -shadowOffset,
          bottom: -shadowOffset,
        }}
      />
      <View
        {...props}
        style={[
          {
            backgroundColor,
            borderWidth: 2.5,
            borderColor: "#111111",
          },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
}
