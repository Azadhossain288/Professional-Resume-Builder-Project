import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeBuilder from "./pages/ResumeBuilder";
import MyResumes from "./pages/MyResume";
import Home from "./pages/Home";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <nav style={navStyles.nav}>
      <span
        style={{ ...navStyles.logo, cursor: "pointer" }}
        onClick={() => navigate(user ? "/" : "/home")}
      >
        📄 ResumeFlow
      </span>
      {user ? (
        <div style={navStyles.right}>
          <button onClick={() => navigate("/resumes")} style={navStyles.resumeBtn}>
            📋 My Resumes
          </button>
          <button onClick={() => navigate("/?new=true")} style={navStyles.newBtn}>
            + New Resume
          </button>
          <span style={navStyles.username}>👋 {user.name}</span>
          <button style={navStyles.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div style={navStyles.right}>
          <button onClick={() => navigate("/login")} style={navStyles.resumeBtn}>
            Login
          </button>
          <button onClick={() => navigate("/register")} style={navStyles.newBtn}>
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

const navStyles = {
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 32px", background: "#0a0a16",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    position: "sticky", top: 0, zIndex: 50,
  },
  logo: { color: "#F0EEFF", fontWeight: "700", fontSize: "1.2rem" },
  right: { display: "flex", alignItems: "center", gap: "12px" },
  username: { color: "#8B8BAA", fontSize: "0.85rem" },
  resumeBtn: {
    padding: "7px 14px", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
    color: "#F0EEFF", cursor: "pointer", fontWeight: "500", fontSize: "0.82rem",
  },
  newBtn: {
    padding: "7px 14px", background: "rgba(196,90,138,0.12)",
    border: "1px solid rgba(196,90,138,0.25)", borderRadius: "8px",
    color: "#e06090", cursor: "pointer", fontWeight: "600", fontSize: "0.82rem",
  },
  btn: {
    padding: "7px 16px", background: "rgba(255,60,172,0.12)",
    border: "1px solid rgba(255,60,172,0.25)", borderRadius: "8px",
    color: "#FF3CAC", cursor: "pointer", fontWeight: "600", fontSize: "0.82rem",
  },
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes"
          element={
            <ProtectedRoute>
              <MyResumes />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;