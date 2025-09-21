
import Dashboard from '../components/Dashboard';

export default function Home() {
  const userEmail = 'user@example.com'; // Replace with logged-in user email

  return (
    <div>
      <h1>Welcome to BTC Digger</h1>
      <Dashboard userEmail={userEmail} />
    </div>
  );
}
