import { Text, TextInput, TextInputProps, View } from "react-native";

type FormFieldProps = TextInputProps & {
  label: string;
};

export function FormField({ label, ...props }: FormFieldProps) {
  return (
    <View>
      <Text
        style={{
          fontFamily: "SpaceGrotesk_700Bold",
          fontSize: 12,
          color: "#64748b",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <TextInput
        {...props}
        style={[
          {
            borderWidth: 2.5,
            borderColor: "#111111",
            backgroundColor: "#ffffff",
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontFamily: "SpaceGrotesk_600SemiBold",
            fontSize: 18,
            color: "#111111",
          },
          props.style,
        ]}
      />
    </View>
  );
}
