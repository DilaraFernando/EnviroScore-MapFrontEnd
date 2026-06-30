import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalculateScore from "./pages/score/CalculateScore";
import InteractiveMap from "./pages/Map/InteractiveMap";
import Login from "./pages/Login";
import Home from "./pages/Home";
import WeatherPage from "./pages/score/WeatherPage";

interface User {
  username: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Home — no props needed, uses useNavigate internally */}
        <Route path="/" element={<Home />} />

        {/* Login — uses onLoginSuccess prop */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLogin} />}
        />

        {/* Protected pages */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        <Route path="/weather/:districtName" element={<WeatherPage />} />
        <Route
          path="/calculate"
          element={user ? <CalculateScore /> : <Navigate to="/login" />}
        />
        <Route
          path="/map"
          element={user ? <InteractiveMap /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;