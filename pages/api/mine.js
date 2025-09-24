export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  // Reward amount (can be random or fixed)
  const reward = 0.000001;

  const { error } = await supabase.rpc("increment_free_btc", {
    uid: user_id,
    reward
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    message: `+${reward} BTC mined`,
    reward
  });
}
