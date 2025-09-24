import { useState } from "react";

export default function MinePage() {
  const [message, setMessage] = useState("");

  async function handleMine() {
    const res = await fetch("/api/mine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "123" }) // replace with real logged-in user ID
    });

    const data = await res.json();
    setMessage(data.message || "Error");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>⛏️ Free BTC Mining Simulation</h1>
      <button
        onClick={handleMine}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: "#f2a900",
          border: "none",
          borderRadius: "8px",
          color: "white"
        }}
      >
        ⛏️ Start Free Mining
      </button>
      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
  }
