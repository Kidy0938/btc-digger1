import React from "react";

export default function Home() {
  const handlePayment = () => {
    window.location.href = "https://nowpayments.io/payment?iid=YOUR_INVOICE_ID";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>BTC Digger</h1>
      <p>Mine BTC and pay with USDT</p>
      <button 
        onClick={handlePayment} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Pay with USDT
      </button>
    </div>
  );
}
