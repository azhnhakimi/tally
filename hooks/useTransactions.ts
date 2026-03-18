import { type Category } from "@/constants/categories";
import { USER_ID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export type Transaction = {
  id: string;
  amount: number;
  merchant: string;
  merchant_normalized: string;
  category: Category;
  is_reviewed: boolean;
  transaction_date: string;
  raw_sms: string | null;
  created_at: string;
};

export function useTransactions(date: Date) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();

  const fetchTransactions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", USER_ID)
      .gte("transaction_date", startOfMonth)
      .lte("transaction_date", endOfMonth)
      .order("transaction_date", { ascending: false });

    setTransactions(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();

    const channel = supabase
      .channel(`transactions-${date.getFullYear()}-${date.getMonth()}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${USER_ID}`,
        },
        () => {
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [date]);

  return { transactions, loading, refetch: fetchTransactions };
}