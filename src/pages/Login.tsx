import { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (username: string, role: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Regular User'); // Default Role එක
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('කරුණාකර පරිශීලක නාමය සහ මුද්‍රිත පදය ඇතුළත් කරන්න.');
      return;
    }

    // සරල Mock Authentication එකක් (RAD Prototype සඳහා)
    if (username === 'dilara' && password === 'password123') {
      onLoginSuccess(username, role);
    } else if (username === 'admin' && password === 'admin123') {
      onLoginSuccess(username, 'Admin');
    } else {
      setError('පරිශීලක නාමය හෝ මුද්‍රිත පදය වැරදියි!');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-2xl border border-[#E2EFE0] shadow-md max-w-sm w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-[#1B4332] rounded-full flex items-center justify-center text-white font-bold mx-auto shadow-sm">
            E
          </div>
          <h2 className="text-xl font-bold text-[#1B4332] font-serif">Welcome Back</h2>
          <p className="text-xs text-gray-400">EnviroScore පද්ධතියට ලොග් වන්න</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl font-medium text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., dilara"
              className="mt-1.5 w-full px-4 py-2.5 bg-[#F4F7F4] border border-transparent rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#1B4332] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full px-4 py-2.5 bg-[#F4F7F4] border border-transparent rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#1B4332] transition-all"
            />
          </div>

          {/* Role Dropdown Selector */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Your Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="mt-1.5 w-full px-4 py-2.5 bg-[#F4F7F4] border border-transparent rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#1B4332] transition-all cursor-pointer"
            >
              <option value="Regular User">Regular User</option>
              <option value="Officer">Officer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:bg-[#122c21] transition-all pt-3.5"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}