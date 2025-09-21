import { useState } from "react";

export default function MiningSimulator() {
  const [hashrate, setHashrate] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const startMining = () => {
    let h = Math.floor(Math.random() * 1000);
    let e = (h * 0.0001).toFixed(4);
    setHashrate(h);
    setEarnings(e);
  };

  const payUSDT = async () => {
    const res = await fetch("/api/create-payment", { method: "POST" });
    const data = await res.json();
    window.location.href = data.invoice_url; // Redirect to NOWPayments checkout
  };

  return (
    <div style={{textAlign:'center', marginTop:'20px'}}>
      <p>Hashrate: {hashrate} H/s</p>
      <p>Earnings: {earnings} BTC</p>
      <button onClick={startMining} style={{margin:'10px'}}>Start Mining</button>
      <button onClick={payUSDT} style={{margin:'10px'}}>Pay $10 USDT</button>
    </div>
  );
    }
