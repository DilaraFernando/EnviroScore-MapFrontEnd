import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/score/Dashboard";

// 🌟 මෙතන 'export default function App()' කියන කොටස හරියටම තියෙන්න ඕනේ
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
      {/* 1. ප්‍රධාන මුල් පිටුව (Main Home Page) */}
      {currentPage === "home" && (
        <Home 
          onStartQuiz={() => setCurrentPage("login")} 
          onNavigateToLogin={() => setCurrentPage("login")} 
        />
      )}

      {/* 2. ලොගින් පිටුව (Login Page) */}
      {currentPage === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {/* 3. ප්‍රධාන ඩෑෂ්බෝඩ් පිටුව (Dashboard) */}
      {currentPage === "dashboard" && userSession && (
        <Dashboard 
          username={userSession.username} 
          role={userSession.role} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}