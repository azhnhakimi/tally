import { USER_ID } from "@/constants/user";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";

export type SmsPattern = {
  id: string;
  name: string;
  pattern: string;
  is_active: boolean;
  created_at: string;
};

export function useSmsPatterns() {
  const [patterns, setPatterns] = useState<SmsPattern[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("sms_patterns")
      .select("*")
      .eq("user_id", USER_ID)
      .order("created_at", { ascending: false });

    setPatterns(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const toggle = async (id: string, current: boolean) => {
    await supabase
      .from("sms_patterns")
      .update({ is_active: !current })
      .eq("id", id);
    setPatterns((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !current } : p))
    );
  };

  const add = async (name: string, pattern: string) => {
    const { data, error } = await supabase
      .from("sms_patterns")
      .insert({ name, pattern, is_active: true, user_id: USER_ID })
      .select()
      .single();

    if (!error && data) {
      setPatterns((prev) => [data, ...prev]);
    }

    return error;
  };

  const remove = async (id: string) => {
    await supabase.from("sms_patterns").delete().eq("id", id);
    setPatterns((prev) => prev.filter((p) => p.id !== id));
  };

  return { patterns, loading, refetch: fetch, toggle, add, remove };
}