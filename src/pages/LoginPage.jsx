import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoggingIn(true);
      setError("");

      await login(email, password);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <main className="page">
      <h1>Login</h1>

      <form className="login-box" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {error && <p className="error">{error}</p>}

        <button disabled={isLoggingIn || !email || !password}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
