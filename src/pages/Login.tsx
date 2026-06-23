import { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (username: string, role: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Regular User');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both your username and password.');
      return;
    }

    setIsLoading(true);

    try {
      // 🚀 Node.js Backend API එකට සම්බන්ධ වන ස්ථානය
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Backend එකෙන් සාර්ථක ප්‍රතිචාරයක් ලැබුණහොත් Dashboard එකට දත්ත යවයි
        onLoginSuccess(data.username, data.role);
      } else {
        // Backend එකෙන් එන වැරදි (Invalid credentials) පෙන්වීම
        setError(data.message || 'Invalid username or password. Please try again.');
      }
    } catch (err) {
      // Backend සර්වර් එක ක්‍රියා විරහිත නම් ලැබෙන Error එක
      setError('Server connection failed. Please check if your Node.js backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative select-none">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#f1f5f9_2px,transparent_2px)] [background-size:32px_32px] opacity-100 pointer-events-none z-0"></div>

      {/* LOGIN CARD */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] max-w-sm w-full space-y-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-sm shadow-xs mx-auto">
            🗺️
          </div>
          <h2 className="text-xl font-black text-black tracking-tight mt-3">Welcome Back</h2>
          <p className="text-xs text-gray-400">Sign in to your EnviroScore account</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-gray-50 border border-gray-200 text-black text-[11px] p-3 rounded-xl font-semibold text-center animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        {/* Modern Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div>
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., dilara"
              className="mt-1.5 w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs text-black font-medium focus:outline-none focus:bg-white focus:border-black transition-all placeholder-gray-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs text-black font-medium focus:outline-none focus:bg-white focus:border-black transition-all placeholder-gray-300"
            />
          </div>

          {/* Role Dropdown Selector */}
          <div>
            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">System Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-xs text-black font-semibold focus:outline-none focus:bg-white focus:border-black transition-all cursor-pointer appearance-none"
            >
              <option value="Regular User">Regular User</option>
              <option value="Officer">Officer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs hover:bg-gray-900 transition-all mt-6 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Connecting...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}