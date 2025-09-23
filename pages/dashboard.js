import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default function Dashboard() {
  const [btcBalance, setBtcBalance] = useState(0);  // Paid BTC balance (from orders)
  const [freeBtc, setFreeBtc] = useState(0);        // Free mining BTC
  const [hashRate, setHashRate] = useState(1);      // Low hash rate
  const [mining, setMining] = useState(false);

  // Load free BTC from Supabase
  useEffect(() => {
    async function fetchUser() {
      const userId = "123"; // Replace with logged-in user
      const { data, error } = await supabase
        .from("users")
        .select("free_btc")
        .eq("id", userId)
        .single();

      if (!error && data) setFreeBtc(data.free_btc);
    }
    fetchUser();
  }, []);

  // Free mining simulation
  useEffect(() => {
    let interval;
    if (mining) {
      interval = setInterval(() => {
        setFreeBtc(prev => +(prev + hashRate * 0.00000001).toFixed(8));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mining, hashRate]);

  // Save free BTC to Supabase periodically
  useEffect(() => {
    const saveInterval = setInterval(async () => {
      const userId = "123"; // Replace with logged-in user
      await supabase
        .from("users")
        .update({ free_btc: freeBtc })
        .eq("id", userId);
    }, 10000); // every 10 seconds

    return () => clearInterval(saveInterval);
  }, [freeBtc]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>BTC Digger Dashboard</h1>
      <p>Paid BTC Balance: {btcBalance} BTC</p>
      <p>Free BTC Balance: {freeBtc} BTC</p>
      <p>Free Mining Hash Rate: {hashRate} H/s</p>

      {!mining ? (
        <button
          onClick={() => setMining(true)}
          style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}
        >
          Start Free Mining
        </button>
      ) : (
        <button
          onClick={() => setMining(false)}
          style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}
        >
          Stop Mining
        </button>
      )}

      <button
        onClick={() => setFreeBtc(0)}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Reset Free BTC
      </button>
    </div>
  );
    }
