
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payment = req.body;
    console.log("IPN received:", payment);

    const orderId = payment.order_id || "";
    const match = orderId.match(/btc_digger_(\d+)TH/);
    if (!match) return res.status(400).json({ error: "Invalid order_id" });

    const hashrate = parseInt(match[1]);

    if (payment.payment_status === "finished" || payment.payment_status === "confirmed") {
      // ⚠️ For demo: update the *first* user (better: pass customer_id in metadata)
      const { data, error } = await supabase
        .from("users")
        .update({ hashrate_balance: supabase.raw(`hashrate_balance + ${hashrate}`) })
        .limit(1);

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Database update failed" });
      }

      return res.status(200).json({ message: "Hashrate updated", data });
    }

    return res.status(200).json({ message: "Payment pending" });
  } catch (error) {
    console.error("IPN error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
