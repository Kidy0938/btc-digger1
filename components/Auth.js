import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for the login link!");
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded">
      <h2 className="text-lg mb-2">Login / Signup</h2>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Send Magic Link
      </button>
    </form>
  );
}
