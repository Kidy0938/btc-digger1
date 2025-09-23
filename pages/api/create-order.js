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

    // Generate unique order_id
    const order_id = `btc_digger_${crypto.randomBytes(4).toString("hex")}_${Date.now()}`;

    // Insert into Supabase orders table
    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        { order_id, user_id, amount, currency, status: "pending", buyer_email }
      ])
      .select()
      .single();

    if (error) throw error;

    // Create NOWPayments payment
    const response = await fetch("https://api.nowpayments.io/v1/payment", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_id,
        price_amount: amount,
        price_currency: currency,
        pay_currency: "usdttrc20", // or make this dynamic
        order_description: "BTC Digger Package",
        buyer_email
      })
    });

    const payment = await response.json();

    // Return both order + NOWPayments checkout link
    res.status(200).json({
      order,
      payment_url: payment.invoice_url || null,
      payment_raw: payment // full NOWPayments response, useful for debugging
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
