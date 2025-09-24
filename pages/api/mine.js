import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  // Simulate small mining reward (e.g., 0.000001 BTC)
  const reward = 0.000001;

  // Update the free_btc balance
  const { data, error } = await supabase
    .from("users")
    .update({ free_btc: supabase.rpc("increment_balance", { reward }) }) // ❌ can't directly add, so use raw update
    .eq("id", user_id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    message: "Mining reward added",
    user: data[0]
  });
}
