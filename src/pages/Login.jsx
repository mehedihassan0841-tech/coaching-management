import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="logo-icon">C</div>
          <div>
            <h2>EduCare</h2>
            <span>Coaching Center</span>
          </div>
        </div>

        <h1>Welcome back</h1>
        <p className="login-sub">Log in to manage your coaching center.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="admin@educare.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          <div className="login-row">
            <label className="checkbox-row">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
