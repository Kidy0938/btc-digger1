// pages/api/create-order.js
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { user_id, amount, currency, buyer_email } = req.body;

    // Generate order_id
    const order_id = `btc_digger_${crypto.randomBytes(4).toString("hex")}_${Date.now()}`;

    // Insert into database
    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          order_id,
          user_id,
          amount,
          currency,
          status: "pending",
          buyer_email
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Return order details
    res.status(200).json({ order });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
