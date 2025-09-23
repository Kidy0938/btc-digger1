export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { hashrate, price } = req.body;

  try {
    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: price,
        price_currency: "usdttrc20", // User pays with USDT TRC20
        order_id: `btc_digger_${hashrate}TH_${Date.now()}`,
        order_description: `BTC Digger Package: ${hashrate} TH/s for ${price} USDT`,
        ipn_callback_url: process.env.NOWPAYMENTS_IPN_URL, // Set this in Vercel env vars
        success_url: "https://yourdomain.com/success",
        cancel_url: "https://yourdomain.com/cancel",
      }),
    });

    const data = await response.json();

    if (data.invoice_url) {
      res.status(200).json({ url: data.invoice_url });
    } else {
      res.status(400).json({ error: "Failed to create payment", details: data });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
