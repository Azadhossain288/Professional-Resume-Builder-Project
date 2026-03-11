import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      login(res.data.user, res.data.token); // Register হলেই auto login
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Join Resume Builder today</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Arjun Ahmed"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p style={styles.link}>
          Already account আছে?{" "}
          <Link to="/login" style={styles.linkText}>
            Login করো
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D1A" },
  card: { background: "#1A1A2E", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" },
  title: { color: "#F0EEFF", fontSize: "1.8rem", fontWeight: "700", marginBottom: "4px" },
  subtitle: { color: "#8B8BAA", marginBottom: "24px" },
  field: { marginBottom: "16px" },
  label: { display: "block", color: "#8B8BAA", fontSize: "0.8rem", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" },
  input: { width: "100%", padding: "12px 16px", background: "#0D0D1A", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#F0EEFF", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" },
  btn: { width: "100%", padding: "13px", background: "linear-gradient(135deg, #784BA0, #2B86C5)", border: "none", borderRadius: "10px", color: "#fff", fontSize: "1rem", fontWeight: "700", cursor: "pointer", marginTop: "8px" },
  error: { background: "rgba(255,60,60,0.1)", color: "#FF6B6B", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "0.85rem" },
  link: { textAlign: "center", color: "#8B8BAA", marginTop: "20px", fontSize: "0.9rem" },
  linkText: { color: "#784BA0", textDecoration: "none", fontWeight: "600" },
};

export default Register;