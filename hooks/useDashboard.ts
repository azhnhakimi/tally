import { type Category } from "@/constants/categories";
import { useMemo } from "react";
import { type Transaction } from "./useTransactions";

export function useDashboard(transactions: Transaction[]) {
  const total = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const categorySpending = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const t of transactions) {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return Object.entries(acc).map(([category, amount]) => ({
      category: category as Category,
      amount,
    }));
  }, [transactions]);

  const dailySpending = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const t of transactions) {
      const day = t.transaction_date.slice(0, 10);
      acc[day] = (acc[day] || 0) + t.amount;
    }
    return Object.entries(acc)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, amount]) => ({ date, amount }));
  }, [transactions]);

  return { total, categorySpending, dailySpending };
}