
import React from "react";

const packages = [
  { price: 5, hashrate: 10 },
  { price: 10, hashrate: 25 },
  { price: 20, hashrate: 60 },
  { price: 50, hashrate: 160 },
  { price: 100, hashrate: 350 },
  { price: 180, hashrate: 700 },
];

export default function Home() {
  const handlePayment = async (pkg) => {
    const res = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: pkg.price }),
    });
    const data = await res.json();
    if (data.invoice_url) {
      window.location.href = data.invoice_url;
    } else {
      alert("Payment failed: " + JSON.stringify(data));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 BTC Digger</h1>
      <p>Select a Hashrate Package</p>

      {packages.map((pkg) => (
        <button
          key={pkg.price}
          onClick={() => handlePayment(pkg)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {pkg.price} USDT → {pkg.hashrate} TH/s
        </button>
      ))}
    </div>
  );
  }
