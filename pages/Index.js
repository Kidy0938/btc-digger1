import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Auth from "../components/Auth";

export default function Home() {
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchUserData(session.user.id);
    }
  }, [session]);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("email, hashrate_balance")
      .eq("id", userId)
      .single();
    if (!error) setUserData(data);
  };

  if (!session) return <Auth />;

  return (
    <div className="p-6">
      <h1 className="text-xl">BTC Digger Dashboard</h1>
      {userData && (
        <p className="mt-4">
          Welcome <b>{userData.email}</b> <br />
          Your Hashrate Balance: <b>{userData.hashrate_balance} TH/s</b>
        </p>
      )}

      <button
        onClick={async () => {
          const res = await fetch("/api/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ hashrate: 5, price: 180 }),
          });
          const data = await res.json();
          if (data.invoice_url) {
            window.location.href = data.invoice_url; // redirect to NOWPayments checkout
          } else {
            alert("Error creating payment");
          }
        }}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Buy 5 TH/s → 180 USDT
      </button>
    </div>
  );
}
