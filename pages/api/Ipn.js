export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET; // set in Vercel env

    // Verify NOWPayments IPN Secret
    if (req.headers["x-nowpayments-sig"] !== ipnSecret) {
      return res.status(403).json({ error: "Invalid IPN signature" });
    }

    const payment = req.body;

    // Example: log payment
    console.log("✅ Payment received:", payment);

    if (payment.payment_status === "finished") {
      // Extract hashrate from order_id
      const orderId = payment.order_id; 
      // Format: btc_digger_160TH_1695237890
      const hashrateMatch = orderId.match(/_(\d+)TH_/);
      const hashrate = hashrateMatch ? hashrateMatch[1] : "unknown";

      console.log(`✔ User bought ${hashrate} TH/s`);

      // Here you could:
      // - Save to a database (Supabase / Firebase / MongoDB)
      // - Activate mining power in your system
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("IPN error:", err);
    return res.status(500).json({ error: "Server error" });
  }
        }
