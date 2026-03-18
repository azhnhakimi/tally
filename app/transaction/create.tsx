import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import { BrutalistValidationAlert } from "@/components/transactions/BrutalistAlert";
import { BrutalistButton } from "@/components/transactions/BrutalistButton";
import { BrutalistDatePicker } from "@/components/transactions/BrutalistDatePicker";
import { CategoryPicker } from "@/components/transactions/CategoryPicker";
import { FormField } from "@/components/transactions/FormField";
import { type Category } from "@/constants/categories";
import { Colors } from "@/constants/colors";
import { USER_ID } from "@/constants/user";
import { supabase } from "@/lib/supabase";

export default function CreateTransaction() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState<Category>("miscellaneous");
  const [date, setDate] = useState(new Date());
  const [saving, setSaving] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const validate = () => {
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setValidationMessage("Please enter a valid amount greater than 0.");
      return false;
    }
    if (!merchant.trim()) {
      setValidationMessage("Please enter a merchant or title.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);

    const merchantNormalized = merchant
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9\s]/g, "");

    const { error } = await supabase.from("transactions").insert({
      amount: parseFloat(amount),
      merchant: merchant.trim(),
      merchant_normalized: merchantNormalized,
      category,
      is_reviewed: true,
      transaction_date: date.toISOString(),
      user_id: USER_ID,
    });

    setSaving(false);
    if (!error) router.back();
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primaryBackground }}
      edges={["top"]}
      className="flex-1"
    >
      <Header text="create" backVisible={true} />

      {validationMessage && (
        <BrutalistValidationAlert
          message={validationMessage}
          onClose={() => setValidationMessage(null)}
        />
      )}

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-6 mt-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
        />

        <FormField
          label="Merchant / Title"
          value={merchant}
          onChangeText={setMerchant}
          placeholder="e.g. Pasar malam"
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
          <BrutalistDatePicker value={date} onChange={setDate} />
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
          <CategoryPicker value={category} onChange={setCategory} />
        </View>

        <BrutalistButton
          label="Save Transaction"
          onPress={handleSave}
          backgroundColor={Colors.appYellow}
          loading={saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
