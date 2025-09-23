import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const packages = [
    { hashrate: 1, price: 5 },
    { hashrate: 5, price: 20 },
    { hashrate: 10, price: 40 },
    { hashrate: 20, price: 70 },
    { hashrate: 50, price: 120 },
    { hashrate: 100, price: 150 },
    { hashrate: 150, price: 170 },
    { hashrate: 200, price: 180 },
  ];

  const handleBuy = async (hashrate, price) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashrate, price }),
      });

      const data = await res.json();

      if (data.invoice_url) {
        window.location.href = data.invoice_url; // Redirect to NOWPayments checkout
      } else {
        setMessage("❌ Payment failed, please try again.");
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to payment server.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>💎 BTC Digger Packages</h1>
      <p>Select your hash rate and pay in USDT (TRC20)</p>

      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {packages.map((pkg, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              background: "#f9f9f9",
            }}
          >
            <h3>{pkg.hashrate} TH/s</h3>
            <p>Price: {pkg.price} USDT</p>
            <button
              onClick={() => handleBuy(pkg.hashrate, pkg.price)}
              disabled={loading}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#0070f3",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
    </div>
  );
}
