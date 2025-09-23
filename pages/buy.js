export default function BuyPage() {
  async function handleBuy() {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "123", // replace with actual logged-in user ID
          amount: 50,
          currency: "USDT",
          buyer_email: "user@example.com"
        })
      });

      const data = await res.json();
      console.log("Order + payment:", data);

      // Redirect user to NOWPayments checkout
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Error creating payment. Try again.");
      }

    } catch (err) {
      console.error("Error creating order:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Buy BTC Mining Package</h1>
      <button
        onClick={handleBuy}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Buy Now
      </button>
    </div>
  );
}
