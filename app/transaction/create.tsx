import { useLocalSearchParams, useRouter } from "expo-router";
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
  const { prefill_date, prefill_raw_sms, failed_sms_id } =
    useLocalSearchParams<{
      prefill_date?: string;
      prefill_raw_sms?: string;
      failed_sms_id?: string;
    }>();

  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState<Category>("miscellaneous");
  const [date, setDate] = useState(
    prefill_date ? new Date(prefill_date) : new Date(),
  );
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

    if (!error && failed_sms_id) {
      await supabase.from("failed_sms").delete().eq("id", failed_sms_id);
    }

    setSaving(false);
    if (!error) router.back();
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.primaryBackground }}
      edges={["top"]}
      className="flex-1"
    >
      <Header text="create" backVisible />

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
        {prefill_raw_sms && (
          <View
            style={{
              borderWidth: 2.5,
              borderColor: "#111111",
              backgroundColor: Colors.appLightRed,
              padding: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 10,
                color: "#64748b",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Raw SMS
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 12,
                color: "#374151",
              }}
            >
              {prefill_raw_sms}
            </Text>
          </View>
        )}

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
