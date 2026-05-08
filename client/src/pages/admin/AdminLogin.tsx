import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/admin";
import "../../styles/admin.css";

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <span>✈</span>
          <h1>Skyline Admin</h1>
        </div>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label className="admin-field__label">Email</label>
            <input
              className="admin-field__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoFocus
            />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Password</label>
            <input
              className="admin-field__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button className="admin-btn admin-btn--primary" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
