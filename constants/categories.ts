import { Ionicons } from "@expo/vector-icons";
import { type ComponentProps } from "react";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

export type Category =
  | "food"
  | "entertainment"
  | "utilities"
  | "transport"
  | "personal_care"
  | "savings"
  | "clothing"
  | "supplies"
  | "subscriptions"
  | "miscellaneous";

type CategoryMeta = {
  label: string;
  icon: IoniconsName;
};

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  food: { label: "Food & Drinks", icon: "restaurant-outline" },
  entertainment: { label: "Entertainment", icon: "game-controller-outline" },
  utilities: { label: "Utilities", icon: "flash-outline" },
  transport: { label: "Transport", icon: "car-outline" },
  personal_care: { label: "Personal Care", icon: "sparkles-outline" },
  savings: { label: "Savings", icon: "wallet-outline" },
  clothing: { label: "Clothing", icon: "shirt-outline" },
  supplies: { label: "Supplies", icon: "cube-outline" },
  subscriptions: { label: "Subscriptions", icon: "repeat-outline" },
  miscellaneous: {
    label: "Miscellaneous",
    icon: "ellipsis-horizontal-outline",
  },
};
