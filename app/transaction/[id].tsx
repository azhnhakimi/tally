import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import {
  BrutalistAlert,
  BrutalistValidationAlert,
} from "@/components/transactions/BrutalistAlert";
import { BrutalistButton } from "@/components/transactions/BrutalistButton";
import { BrutalistDatePicker } from "@/components/transactions/BrutalistDatePicker";
import { CategoryPicker } from "@/components/transactions/CategoryPicker";
import { FormField } from "@/components/transactions/FormField";
import { type Category } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { supabase } from "@/lib/supabase";

type AlertConfig = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  confirmColor?: string;
};

export default function TransactionDetail() {
  const { id, amount, merchant, category, transaction_date } =
    useLocalSearchParams<{
      id: string;
      amount: string;
      merchant: string;
      category: string;
      transaction_date: string;
    }>();

  const router = useRouter();

  const [editAmount, setEditAmount] = useState(amount ?? "");
  const [editMerchant, setEditMerchant] = useState(merchant ?? "");
  const [editCategory, setEditCategory] = useState<Category>(
    category as Category,
  );
  const [editDate, setEditDate] = useState(
    new Date(transaction_date ?? Date.now()),
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const validate = () => {
    const parsedAmount = parseFloat(editAmount);
    if (!editAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setValidationMessage("Please enter a valid amount greater than 0.");
      return false;
    }
    if (!editMerchant.trim()) {
      setValidationMessage("Merchant name cannot be empty.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);

    const merchantNormalized = editMerchant
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9\s]/g, "");

    const { error } = await supabase
      .from("transactions")
      .update({
        amount: parseFloat(editAmount),
        merchant: editMerchant.trim(),
        merchant_normalized: merchantNormalized,
        category: editCategory,
        transaction_date: editDate.toISOString(),
        is_reviewed: true,
      })
      .eq("id", id);

    if (!error) {
      await supabase.from("merchant_categories").upsert({
        merchant_normalized: merchantNormalized,
        category: editCategory,
        user_id: (
          await supabase
            .from("transactions")
            .select("user_id")
            .eq("id", id)
            .single()
        ).data?.user_id,
        updated_at: new Date().toISOString(),
      });
    }

    setSaving(false);
    if (!error) router.back();
  };

  const handleDelete = () => {
    setAlertConfig({
      title: "Delete Transaction",
      message:
        "Are you sure you want to delete this transaction? This cannot be undone.",
      confirmLabel: "Delete",
      confirmColor: Colors.appRed,
      onConfirm: async () => {
        setAlertConfig(null);
        setDeleting(true);
        await supabase.from("transactions").delete().eq("id", id);
        setDeleting(false);
        router.back();
      },
    });
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primaryBackground }}
      edges={["top", "bottom"]}
      className="flex-1 pb-6"
    >
      <Header text="transaction" backVisible={true} />

      {validationMessage && (
        <BrutalistValidationAlert
          message={validationMessage}
          onClose={() => setValidationMessage(null)}
        />
      )}

      {alertConfig && (
        <BrutalistAlert
          config={alertConfig}
          onCancel={() => setAlertConfig(null)}
        />
      )}

      <ScrollView
        className="flex-1 pb-6"
        contentContainerClassName="gap-5 px-6 mt-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Amount"
          value={editAmount}
          onChangeText={setEditAmount}
          keyboardType="decimal-pad"
        />

        <FormField
          label="Merchant"
          value={editMerchant}
          onChangeText={setEditMerchant}
        />

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
            Date
          </Text>
          <BrutalistDatePicker value={editDate} onChange={setEditDate} />
        </View>

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
            Category
          </Text>
          <CategoryPicker value={editCategory} onChange={setEditCategory} />
        </View>

        <BrutalistButton
          label="Save"
          onPress={handleSave}
          backgroundColor={Colors.appYellow}
          loading={saving}
        />

        <BrutalistButton
          label="Delete Transaction"
          onPress={handleDelete}
          backgroundColor={Colors.appRed}
          loading={deleting}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
