// pages/api/create-payment.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { hashrate, price } = req.body;

    const response = await fetch("https://api.nowpayments.io/v1/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NOWPAYMENTS_API_KEY, // add this in Vercel env
      },
      body: JSON.stringify({
        price_amount: price,
        price_currency: "usdt",
        pay_currency: "usdttrc20",
        order_id: `btc_digger_${hashrate}TH_${Date.now()}`,
        order_description: `BTC Digger Package: ${hashrate} TH/s for ${price} USDT`,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/ipn`, // where NOWPayments will send IPN
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("NOWPayments error:", error);
    return res.status(500).json({ error: "Payment creation failed" });
  }
}
