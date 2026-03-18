import { CATEGORY_META, type Category } from "@/constants/categories";
import { Pressable, Text, View } from "react-native";

const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

type CategoryPickerProps = {
  value: Category;
  onChange: (category: Category) => void;
};

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      {CATEGORIES.map((cat) => {
        const meta = CATEGORY_META[cat];
        const isSelected = value === cat;
        return (
          <Pressable
            key={cat}
            onPress={() => onChange(cat)}
            android_ripple={null}
            style={{
              borderWidth: 2.5,
              borderColor: "#111111",
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: isSelected ? meta.color : "#ffffff",
              elevation: isSelected ? 3 : 0,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 12,
                color: "#111111",
                textTransform: "uppercase",
              }}
            >
              {meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
