import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type DailySpending = {
  date: string;
  amount: number;
};

type DailySpendingChartProps = {
  data: DailySpending[];
};

const CHART_WIDTH = Dimensions.get("window").width - 48;

export function DailySpendingChart({ data }: DailySpendingChartProps) {
  const chartData = data.map((item, index) => {
    const day = index + 1;
    const isLabelDay = day === 1 || day === 15 || day === data.length;

    return {
      value: item.amount,
      label: isLabelDay ? `DAY ${day}` : "",
      frontColor: "#111111",
    };
  });

  return (
    <View
      className="border-2 border-[#111111] bg-white p-4"
      style={{
        shadowColor: "#111111",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      <BarChart
        data={chartData}
        width={CHART_WIDTH - 64}
        height={180}
        barWidth={Math.floor((CHART_WIDTH - 64) / data.length)}
        spacing={0}
        noOfSections={3}
        yAxisTextStyle={{
          fontSize: 9,
          color: "#111111",
          fontFamily: "SpaceGrotesk_700Bold",
        }}
        xAxisLabelTextStyle={{
          fontSize: 8,
          color: "#111111",
          fontFamily: "SpaceGrotesk_700Bold",
          width: 36,
          textAlign: "center",
          marginLeft: -18,
        }}
        yAxisColor="#111111"
        xAxisColor="#111111"
        xAxisThickness={2}
        yAxisThickness={2}
        hideRules={false}
        rulesColor="#11111115"
        rulesType="dashed"
        showXAxisIndices={false}
        yAxisLabelPrefix="RM"
        showValuesAsTopLabel={false}
        disablePress
        renderTooltip={undefined}
        leftShiftForLastIndexTooltip={0}
        initialSpacing={12}
      />
    </View>
  );
}
