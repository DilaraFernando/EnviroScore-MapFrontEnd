interface DashboardProps {
  username: string;
  role: string;
  onLogout: () => void;
}

export default function Dashboard({ username, role, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#F4F7F4] font-sans text-[#1B4332]">
      
      {/* Dashboard Top Navigation */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-[#E2EFE0] shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-[#1B4332]">🌿 GlowCare Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] bg-[#E2EFE0] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
            {username} ({role})
          </span>
          <button 
            onClick={onLogout} 
            className="text-xs text-red-600 font-bold hover:text-red-700 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold mt-12 font-serif text-[#1B4332]">Welcome Back, {username}!</h2>
        <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
          ඔබ සාර්ථකව පද්ධතියට ලොග් වී ඇත. මෙතැන් සිට ඔබේ ශාක වර්ධන දත්ත සහ පද්ධති තොරතුරු කළමනාකරණය කළ හැකිය.
        </p>
        
        {/* Simple Analytics Card Row Example */}
        <div className="pt-6 flex justify-center gap-4 flex-wrap">
          <div className="bg-white p-5 rounded-2xl border border-[#E2EFE0] shadow-2xs w-[180px] text-left">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Active Role</span>
            <div className="text-sm font-black text-[#1B4332] mt-1">{role}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E2EFE0] shadow-2xs w-[180px] text-left">
            <span className="text-[10px] font-bold text-gray-400 uppercase">System Status</span>
            <div className="text-sm font-black text-emerald-600 mt-1">● Connected</div>
          </div>
        </div>
      </main>

    </div>
  );
}