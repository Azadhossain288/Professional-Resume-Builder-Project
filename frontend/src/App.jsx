
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeBuilder from "./pages/ResumeBuilder";


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={navStyles.nav}>
      <span style={navStyles.logo}>📄 ResumeFlow</span>
      {user && (
        <div style={navStyles.right}>
          <span style={navStyles.username}> {user.name}</span>
          <button style={navStyles.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const navStyles = {
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", background: "#1A1A2E", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  logo: { color: "#F0EEFF", fontWeight: "700", fontSize: "1.2rem" },
  right: { display: "flex", alignItems: "center", gap: "16px" },
  username: { color: "#8B8BAA", fontSize: "0.9rem" },
  btn: { padding: "8px 18px", background: "rgba(255,60,172,0.15)", border: "1px solid rgba(255,60,172,0.3)", borderRadius: "8px", color: "#FF3CAC", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem" },
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;