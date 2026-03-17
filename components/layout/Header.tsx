import { Text, View } from "react-native";

const Header = ({ text }: { text: string }) => {
  return (
    <View
      className="mx-6 bg-white border-[2.5px] border-black px-6 py-4"
      style={{
        shadowColor: "#111111",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      <Text className="text-center font-semibold uppercase text-3xl">
        {text}
      </Text>
    </View>
  );
};

export default Header;
