import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/layout/Header";
import {
  BrutalistAlert,
  BrutalistValidationAlert,
} from "@/components/transactions/BrutalistAlert";
import { BrutalistButton } from "@/components/transactions/BrutalistButton";
import { FormField } from "@/components/transactions/FormField";
import { BrutalistCard } from "@/components/ui/BrutalistCard";
import { Colors } from "@/constants/colors";
import { type SmsPattern, useSmsPatterns } from "@/hooks/useSmsPatterns";

type AlertConfig = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  confirmColor?: string;
};

function PatternItem({
  item,
  onToggle,
  onDelete,
}: {
  item: SmsPattern;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="mx-6">
      <BrutalistCard
        style={{
          backgroundColor: item.is_active ? "#ffffff" : "#F1F5F9",
        }}
      >
        <TouchableOpacity
          onPress={() => setExpanded((e) => !e)}
          activeOpacity={0.8}
          style={{ padding: 16, gap: 6 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 14,
                color: "#111111",
                textTransform: "uppercase",
                flex: 1,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderWidth: 1.5,
                borderColor: "#111111",
                backgroundColor: item.is_active ? Colors.appYellow : "#D1D5DB",
              }}
            >
              <Text
                style={{
                  fontFamily: "SpaceGrotesk_700Bold",
                  fontSize: 10,
                  color: "#111111",
                  textTransform: "uppercase",
                }}
              >
                {item.is_active ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>

          {expanded && (
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                fontSize: 11,
                color: "#64748b",
                marginTop: 4,
              }}
            >
              {item.pattern}
            </Text>
          )}

          <Text
            style={{
              fontFamily: "SpaceGrotesk_700Bold",
              fontSize: 10,
              color: "#94A3B8",
              textTransform: "uppercase",
            }}
          >
            {expanded ? "Hide regex ↑" : "Show regex ↓"}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderTopWidth: 2.5,
            borderTopColor: "#111111",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.8}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: "center",
              borderRightWidth: 1.5,
              borderRightColor: "#111111",
              backgroundColor: item.is_active ? "#ffffff" : Colors.appYellow,
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
              {item.is_active ? "Disable" : "Enable"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={0.8}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: "center",
              borderLeftWidth: 1.5,
              borderLeftColor: "#111111",
              backgroundColor: Colors.appRed,
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
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </BrutalistCard>
    </View>
  );
}

function AddPatternModal({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, pattern: string) => Promise<unknown>;
}) {
  const [name, setName] = useState("");
  const [pattern, setPattern] = useState("");
  const [saving, setSaving] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const handleAdd = async () => {
    if (!name.trim()) {
      setValidationMessage("Please enter a pattern name.");
      return;
    }
    if (!pattern.trim()) {
      setValidationMessage("Please enter a regex pattern.");
      return;
    }
    try {
      new RegExp(pattern);
    } catch {
      setValidationMessage("Invalid regex pattern. Please check your syntax.");
      return;
    }

    setSaving(true);
    await onAdd(name.trim(), pattern.trim());
    setSaving(false);
    setName("");
    setPattern("");
    onClose();
  };

  return (
    <>
      {validationMessage && (
        <BrutalistValidationAlert
          message={validationMessage}
          onClose={() => setValidationMessage(null)}
        />
      )}
      <Modal
        transparent
        animationType="slide"
        visible={visible}
        statusBarTranslucent
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.primaryBackground,
              borderTopWidth: 2.5,
              borderTopColor: "#111111",
              padding: 24,
              gap: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_700Bold",
                fontSize: 20,
                color: "#111111",
                textTransform: "uppercase",
              }}
            >
              Add Pattern
            </Text>

            <FormField
              label="Name"
              value={name}
              onChangeText={setName}
              placeholder="e.g. CIMB FPX Payment"
            />

            <FormField
              label="Regex Pattern"
              value={pattern}
              onChangeText={setPattern}
              placeholder="e.g. CIMB BANK:\s+(\d+)..."
              multiline
              style={{ minHeight: 80, textAlignVertical: "top" }}
            />

            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <BrutalistButton
                  label="Cancel"
                  onPress={() => {
                    setName("");
                    setPattern("");
                    onClose();
                  }}
                  backgroundColor="#ffffff"
                />
              </View>
              <View style={{ flex: 1 }}>
                <BrutalistButton
                  label="Add"
                  onPress={handleAdd}
                  backgroundColor={Colors.appYellow}
                  loading={saving}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function Patterns() {
  const { patterns, loading, refetch, toggle, add, remove } = useSmsPatterns();
  const [showAddModal, setShowAddModal] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleDelete = (id: string) => {
    setAlertConfig({
      title: "Delete Pattern",
      message:
        "Are you sure you want to delete this pattern? This cannot be undone.",
      confirmLabel: "Delete",
      confirmColor: Colors.appRed,
      onConfirm: async () => {
        setAlertConfig(null);
        await remove(id);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header text="patterns" />

      {alertConfig && (
        <BrutalistAlert
          config={alertConfig}
          onCancel={() => setAlertConfig(null)}
        />
      )}

      <AddPatternModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={add}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#111111"
          style={{ marginTop: 32 }}
        />
      ) : (
        <FlatList
          data={patterns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 12, paddingVertical: 24 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{
                fontFamily: "SpaceGrotesk_600SemiBold",
                fontSize: 14,
                color: "#64748b",
                textAlign: "center",
                textTransform: "uppercase",
                marginTop: 48,
              }}
            >
              No patterns yet.
            </Text>
          }
          ListFooterComponent={
            <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
              <BrutalistButton
                label="+ Add Pattern"
                onPress={() => setShowAddModal(true)}
                backgroundColor={Colors.appYellow}
              />
            </View>
          }
          renderItem={({ item }) => (
            <PatternItem
              item={item}
              onToggle={() => toggle(item.id, item.is_active)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
