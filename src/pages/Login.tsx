import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

// ✅ Prop name matches what App.tsx passes: onLoginSuccess
interface LoginProps {
  onLoginSuccess: (userData: { username: string; role: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "viewer" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    if (mode === "register" && !form.username) {
      setError("Username is required.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      
      // ✅ Payload updated: 'username' mapped to 'name' to match your backend model destructuring
      const payload = mode === "login"
        ? { email: form.email, password: form.password }
        : { name: form.username, email: form.email, password: form.password, role: form.role };

      const res = await api.post(endpoint, payload);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      
      // ✅ Updated to user.name to map back correctly from the server response payload
      onLoginSuccess({ 
        username: user.name || user.username || "", 
        role: user.role 
      });
      
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-sm">🗺️</div>
        <span className="font-black text-sm tracking-tight uppercase">EnviroScore-Map</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

        {/* Toggle */}
        <div className="flex bg-gray-50 border border-gray-100 rounded-full p-1 mb-6">
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-1.5 text-[11px] font-black rounded-full transition-all cursor-pointer ${
                mode === m ? "bg-black text-white" : "text-gray-400 hover:text-black"
              }`}
            >
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        <div className="mb-5">
          <h1 className="text-xl font-black">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {mode === "login"
              ? "Sign in to access the EnviroScore platform."
              : "Register to start analysing Sri Lanka's ecosystems."}
          </p>
        </div>

        <div className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Username</label>
              <input
                name="username"
                type="text"
                placeholder="e.g. dilara_fernandez"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none transition-all"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none transition-all cursor-pointer"
              >
                <option value="viewer">Viewer — Read-only access</option>
                <option value="analyst">Analyst — Save analyses</option>
                <option value="admin">Admin — Full access</option>
              </select>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2.5">
            <p className="text-[11px] font-bold text-rose-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 py-3 bg-black hover:bg-gray-900 text-white text-xs font-black rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Please wait..."
            : mode === "login" ? "Sign In →" : "Create Account →"}
        </button>

        <p className="text-center text-[10px] text-gray-400 mt-4">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="font-black text-black cursor-pointer hover:underline"
          >
            {mode === "login" ? "Register" : "Sign In"}
          </button>
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 text-[10px] font-black text-gray-400 hover:text-black transition-all cursor-pointer"
      >
        ← Back to Home
      </button>
    </div>
  );
}