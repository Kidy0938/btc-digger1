import React from "react";

const packages = [
  { price: 5, hashrate: 10 },
  { price: 25, hashrate: 50 },
  { price: 50, hashrate: 100 },
  { price: 90, hashrate: 200 },
  { price: 180, hashrate: 400 },
];

export default function Home() {
  const handlePayment = async (price, hashrate) => {
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, hashrate }),
      });

      const data = await res.json();
      if (data.invoice_url) {
        window.location.href = data.invoice_url; // Redirect to NOWPayments checkout
      } else {
        alert("Payment failed: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("Error creating payment: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>BTC Digger</h1>
      <p>Select your mining package (Pay with USDT)</p>

      {packages.map((pkg, index) => (
        <div key={index} style={{ margin: "15px" }}>
          <button
            onClick={() => handlePayment(pkg.price, pkg.hashrate)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "6px",
              background: "#2b6cb0",
              color: "#fff",
              border: "none",
            }}
          >
            {pkg.hashrate} TH/s — {pkg.price} USDT
          </button>
        </div>
      ))}
    </div>
  );
}
