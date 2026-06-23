import { useState } from "react";
import Home from "./pages/Home"; // 📂 ඔයාගේ folder structure එකට අනුව path එක නිවැරදි කළා
import Login from "./pages/Login"; // 📂 Login.tsx තියෙන්නේ pages/score/ ඇතුළේ නම්
import Dashboard from "./pages/score/Dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'dashboard'>("home");
  const [userSession, setUserSession] = useState<{ username: string; role: string } | null>(null);

  const handleLoginSuccess = (username: string, role: string) => {
    setUserSession({ username, role });
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserSession(null);
    setCurrentPage("home");
  };

  return (
    <div>
      {/* 1. Home page */}
      {currentPage === "home" && (
        <Home 
          onStartQuiz={() => setCurrentPage("login")} 
          onNavigateToLogin={() => setCurrentPage("login")} 
        />
      )}

      {/* 2. Login Page */}
      {currentPage === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {/* 3. Dashboard (Props ටික Dashboard.tsx එකට ගැළපෙන සේ Connect කළා) */}
      {currentPage === "dashboard" && userSession && (
        <Dashboard 
          user={userSession} // 🎯 userSession Object 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}