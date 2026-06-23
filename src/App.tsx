import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
      {/*Home page */}
      {currentPage === "home" && (
        <Home 
          onStartQuiz={() => setCurrentPage("login")} 
          onNavigateToLogin={() => setCurrentPage("login")} 
        />
      )}

      {/* Login Page */}
      {currentPage === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {/*Dashboard*/}
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