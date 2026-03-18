import { USER_ID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";

export type FailedSms = {
  id: string;
  raw_sms: string;
  sender: string;
  received_at: string;
  created_at: string;
};

export function useFailedSms() {
  const [failedSms, setFailedSms] = useState<FailedSms[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("failed_sms")
      .select("*")
      .eq("user_id", USER_ID)
      .order("created_at", { ascending: false });
    setFailedSms(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();

    const channel = supabase
      .channel("failed_sms")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "failed_sms",
          filter: `user_id=eq.${USER_ID}`,
        },
        () => fetch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  return { failedSms, loading, refetch: fetch };
}