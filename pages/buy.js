export default function BuyPage() {
  async function handleBuy() {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "123", // replace with actual logged-in user
        amount: 50,
        currency: "USDT",
        buyer_email: "user@example.com"
      })
    });

    const data = await res.json();
    console.log("Order + payment:", data);

    // Redirect to NOWPayments checkout
    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      alert("Error creating payment. Try again.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Buy BTC Mining Package</h1>
      <button onClick={handleBuy}>Buy Now</button>
    </div>
  );
                       }
