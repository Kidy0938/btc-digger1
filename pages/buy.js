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

  function handleCancel() {
    // Redirect user back to home page or any page you want
    window.location.href = "/";
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Buy BTC Mining Package</h1>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleBuy}
          style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px", cursor: "pointer" }}
        >
          Buy Now
        </button>
        <button
          onClick={handleCancel}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
