import { CATEGORY_META, type Category } from "@/constants/categories";
import { Text, View } from "react-native";

type TransactionItemProps = {
  title: string;
  category: string;
  date: string;
  amount: string;
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(2);
  return `${day}-${month}-${year}`;
};

const TransactionItem = ({
  title,
  category,
  date,
  amount,
}: TransactionItemProps) => {
  const meta = CATEGORY_META[category as Category];

  return (
    <View
      className="flex flex-row justify-between items-center gap-4  py-3 border-[2.5px] border-black"
      style={{
        backgroundColor: meta.color,
        paddingHorizontal: 12,
        shadowColor: "#111111",
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      <View className="">
        <Text className="text-black font-semibold text-3xl">{title}</Text>
        <Text className="text-slate-600 font-semibold text-lg uppercase">
          {category}
        </Text>
        <Text className="text-slate-600 font-semibold text-lg uppercase">
          {formatDate(date)}
        </Text>
      </View>
      <Text className="text-black font-semibold text-2xl">RM{amount}</Text>
    </View>
  );
};

export default TransactionItem;
