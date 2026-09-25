import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    // Admin Login
    if (
      form.email === "admin@educare.com" &&
      form.password === "admin123"
    ) {
      localStorage.setItem(
        "educareUser",
        JSON.stringify({
          role: "admin",
          email: form.email,
          name: "Admin",
        })
      );

      navigate("/");
      return;
    }

    // Student Login
    if (
      form.email === "student@educare.com" &&
      form.password === "student123"
    ) {
      localStorage.setItem(
        "educareUser",
        JSON.stringify({
          role: "student",
          email: form.email,
          name: "Arif Rahman",
        })
      );

      navigate("/student-dashboard");
      return;
    }
    // Teacher Login
    if (
      form.email === "teacher@educare.com" &&
      form.password === "teacher123"
    ) {
      localStorage.setItem(
        "educareUser",
        JSON.stringify({
          role: "teacher",
          email: form.email,
          name: "Mr. Rahman",
          teacherId: "T-001",
          subject: "Physics",
        })
      );

      navigate("/teacher-dashboard");
      return;
    }

    // Wrong Login
    setError("Invalid email or password.");
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

        <p className="login-sub">
          Log in to manage your coaching center.
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>
            Email

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
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

          <button
            type="submit"
            className="btn-primary login-btn"
          >
            Log In
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;