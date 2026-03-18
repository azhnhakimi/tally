import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type BrutalistDatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function BrutalistDatePicker({
  value,
  onChange,
}: BrutalistDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(value.getMonth());
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [selected, setSelected] = useState(value);

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${d}-${m}-${date.getFullYear()}`;
  };

  const handleOpen = () => {
    setSelected(value);
    setViewMonth(value.getMonth());
    setViewYear(value.getFullYear());
    setOpen(true);
  };

  const handleConfirm = () => {
    onChange(selected);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const isSelected = (day: number) =>
    selected.getDate() === day &&
    selected.getMonth() === viewMonth &&
    selected.getFullYear() === viewYear;

  const isToday = (day: number) => {
    const t = new Date();
    return (
      t.getDate() === day &&
      t.getMonth() === viewMonth &&
      t.getFullYear() === viewYear
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        activeOpacity={0.8}
        style={{
          borderWidth: 2.5,
          borderColor: "#111111",
          backgroundColor: "#ffffff",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            fontFamily: "SpaceGrotesk_600SemiBold",
            fontSize: 18,
            color: "#111111",
          }}
        >
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={open}
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
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <View style={{ position: "relative", width: "100%" }}>
            <View
              style={{
                position: "absolute",
                backgroundColor: "#111111",
                top: 5,
                left: 5,
                right: -5,
                bottom: -5,
              }}
            />
            <View
              style={{
                backgroundColor: "#ffffff",
                borderWidth: 2.5,
                borderColor: "#111111",
                padding: 20,
                gap: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={prevMonth}
                  activeOpacity={0.7}
                  style={{
                    borderWidth: 2.5,
                    borderColor: "#111",
                    padding: 6,
                    backgroundColor: "#fff",
                  }}
                >
                  <Ionicons name="chevron-back" size={16} color="#111111" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "SpaceGrotesk_700Bold",
                    fontSize: 15,
                    color: "#111111",
                    textTransform: "uppercase",
                  }}
                >
                  {MONTHS[viewMonth]} {viewYear}
                </Text>
                <TouchableOpacity
                  onPress={nextMonth}
                  activeOpacity={0.7}
                  style={{
                    borderWidth: 2.5,
                    borderColor: "#111",
                    padding: 6,
                    backgroundColor: "#fff",
                  }}
                >
                  <Ionicons name="chevron-forward" size={16} color="#111111" />
                </TouchableOpacity>
              </View>

              <View style={{ gap: 4 }}>
                <View style={{ flexDirection: "row" }}>
                  {DAYS_OF_WEEK.map((d) => (
                    <View
                      key={d}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "SpaceGrotesk_700Bold",
                          fontSize: 11,
                          color: "#64748b",
                        }}
                      >
                        {d}
                      </Text>
                    </View>
                  ))}
                </View>

                {weeks.map((week, wi) => (
                  <View key={wi} style={{ flexDirection: "row", gap: 2 }}>
                    {week.map((day, di) => {
                      if (!day) {
                        return <View key={di} style={{ flex: 1 }} />;
                      }
                      const sel = isSelected(day);
                      const tod = isToday(day);
                      return (
                        <TouchableOpacity
                          key={di}
                          onPress={() =>
                            setSelected(new Date(viewYear, viewMonth, day))
                          }
                          activeOpacity={0.7}
                          style={{
                            flex: 1,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: sel ? Colors.appYellow : "#ffffff",
                            borderWidth: sel ? 2.5 : tod ? 1.5 : 0,
                            borderColor: "#111111",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: sel
                                ? "SpaceGrotesk_700Bold"
                                : "SpaceGrotesk_400Regular",
                              fontSize: 13,
                              color: "#111111",
                            }}
                          >
                            {day}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    borderWidth: 2.5,
                    borderColor: "#111111",
                    backgroundColor: "#ffffff",
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "SpaceGrotesk_700Bold",
                      fontSize: 13,
                      color: "#111111",
                      textTransform: "uppercase",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirm}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    borderWidth: 2.5,
                    borderColor: "#111111",
                    backgroundColor: Colors.appYellow,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "SpaceGrotesk_700Bold",
                      fontSize: 13,
                      color: "#111111",
                      textTransform: "uppercase",
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
