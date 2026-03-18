import { crypto } from "jsr:@std/crypto";
import { encodeHex } from "jsr:@std/encoding/hex";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // validate api key
    const apiKey = req.headers.get("x-api-key");
    const expectedKey = Deno.env.get("API_SECRET");
    
    console.log("Received key:", apiKey);
    console.log("Expected key:", expectedKey);
    
    if (apiKey !== expectedKey) {
      return new Response(JSON.stringify({ error: "Unauthorized", received: apiKey, expected: expectedKey }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { body, sender, received_at } = await req.json();
    console.log("Parsed body:", body);
    console.log("Parsed sender:", sender);
    console.log("Parsed received_at:", received_at);

    if (!body) {
      return new Response(JSON.stringify({ error: "Missing body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const userId = Deno.env.get("USER_ID")!;

    // deduplicate via MD5 hash of raw sms
    const hashBuffer = await crypto.subtle.digest(
      "MD5",
      new TextEncoder().encode(body)
    );
    const rawSmsHash = encodeHex(new Uint8Array(hashBuffer));

    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("raw_sms_hash", rawSmsHash)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ message: "Duplicate, skipped" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // fetch active patterns
    const { data: patterns } = await supabase
      .from("sms_patterns")
      .select("*")
      .eq("is_active", true)
      .eq("user_id", userId);

    let matched = null;

    for (const p of patterns ?? []) {
      const regex = new RegExp(p.pattern, "i");
      const match = body.match(regex);
      if (match) {
        matched = { pattern: p, match };
        break;
      }
    }

    // no pattern matched — store in failed_sms
    if (!matched) {
      await supabase.from("failed_sms").insert({
        raw_sms: body,
        sender: sender ?? "unknown",
        received_at: received_at ?? new Date().toISOString(),
        user_id: userId,
      });

      return new Response(JSON.stringify({ message: "No pattern matched, stored in failed_sms" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // extract fields from regex groups
    // group 1: amount, group 2: date (DD-MM-YY), group 3: merchant
    const [, rawAmount, rawDate, rawMerchant] = matched.match;

    const amount = parseFloat(rawAmount);

    const [day, month, year] = rawDate.split("-");
    const transactionDate = new Date(`20${year}-${month}-${day}`).toISOString();

    const merchantNormalized = rawMerchant
      .toUpperCase()
      .trim()
      .replace(/[^A-Z0-9\s]/g, "");

    // categorization flow
    // 1. check merchant_categories (exact match)
    const { data: merchantMatch } = await supabase
      .from("merchant_categories")
      .select("category")
      .eq("merchant_normalized", merchantNormalized)
      .eq("user_id", userId)
      .single();

    let category = "miscellaneous";
    let isReviewed = false;

    if (merchantMatch) {
      category = merchantMatch.category;
      isReviewed = true;
    } else {
      // 2. check keyword_rules
      const { data: keywords } = await supabase
        .from("keyword_rules")
        .select("keyword, category")
        .eq("user_id", userId);

      for (const rule of keywords ?? []) {
        if (merchantNormalized.includes(rule.keyword.toUpperCase())) {
          category = rule.category;
          isReviewed = true;
          break;
        }
      }
    }

    // insert transaction
    const { error } = await supabase.from("transactions").insert({
      amount,
      merchant: rawMerchant.trim(),
      merchant_normalized: merchantNormalized,
      category,
      is_reviewed: isReviewed,
      transaction_date: transactionDate,
      raw_sms: body,
      raw_sms_hash: rawSmsHash,
      user_id: userId,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Transaction inserted", category }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});