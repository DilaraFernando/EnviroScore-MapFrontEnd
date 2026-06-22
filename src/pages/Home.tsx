import { useState } from 'react';

interface HomeProps {
  onStartQuiz: () => void;
  onNavigateToLogin: () => void;
}

export default function Home({ onStartQuiz, onNavigateToLogin }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F9FBFA] text-[#1E293B] relative overflow-x-hidden flex flex-col justify-between select-none">
      
      {/* 🟢 BACKGROUND GRID DOTS (පසුබිමේ ඇති ලස්සන තිත් රටාව) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none z-0"></div>

      {/* 🟢 MODERN FLOATING NAVIGATION BAR */}
      <header className="max-w-6xl w-full mx-auto px-6 pt-6 flex justify-between items-center relative z-50 animate-fade-in">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#1B4332] rounded-full flex items-center justify-center text-lg shadow-sm">
            🗺️
          </div>
          <span className="font-black text-base tracking-tight text-[#1B4332] uppercase">EnviroScore</span>
        </div>

        {/* Center Floating Pills (Flatrover Minimalist Design) */}
        <nav className="hidden md:flex items-center bg-white border border-gray-200/60 shadow-xs rounded-full p-1.5 gap-1">
          <button className="px-5 py-2 bg-[#E2EFE0] text-[#1B4332] font-bold text-xs rounded-full transition-all flex items-center gap-1.5">
            <span>🔍</span> Explore Map
          </button>
          <button className="px-5 py-2 text-gray-500 hover:text-black font-semibold text-xs rounded-full transition-all cursor-pointer">
            🌱 Eco Impact
          </button>
          <button className="px-5 py-2 text-gray-500 hover:text-black font-semibold text-xs rounded-full transition-all cursor-pointer">
            📊 Region Scores
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateToLogin}
            className="px-5 py-2 text-xs font-bold text-gray-600 hover:text-black transition-all cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={onStartQuiz}
            className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Join Ecosystem
          </button>
        </div>
      </header>

      {/* 🟢 HERO MAIN CONTENT SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-12 pb-6 relative z-10 max-w-4xl mx-auto w-full animate-fade-in">
        
        {/* Active Eco Trackers Count Indicator */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex -space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-[#E2EFE0] border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xs">🌿</div>
            <div className="w-7 h-7 rounded-full bg-[#C7E2C5] border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xs">🍀</div>
            <div className="w-7 h-7 rounded-full bg-[#A3D19F] border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-xs">🌲</div>
          </div>
          <span className="text-[10px] text-gray-400 font-extrabold tracking-wider uppercase">60K+ Active Eco Trackers</span>
        </div>

        {/* Main Bold Heading (Flatrover Typography Style) */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.15] max-w-3xl">
          Travel freely, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-green-600">stay in green zones</span>
        </h1>
        
        {/* Subtitle Text */}
        <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto mt-5 leading-relaxed font-normal">
          Explore environmental impact scores and track live ecosystem metrics for your sustainability journeys.
        </p>

        {/* Center Search Input & Button Bar */}
        <div className="flex items-center bg-white border border-gray-200 shadow-xs hover:shadow-md rounded-full p-2 mt-8 w-full max-w-md transition-all">
          <div className="flex items-center px-3 w-full">
            <span className="text-sm text-gray-400 mr-2">📍</span>
            <input 
              type="text" 
              placeholder="Search region or ecosystem..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none text-gray-700 font-medium placeholder-gray-400"
            />
          </div>
          <button 
            onClick={onStartQuiz}
            className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-bold rounded-full shadow-xs whitespace-nowrap transition-all cursor-pointer"
          >
            Check Score
          </button>
        </div>

        {/* 🟢 CENTER MAP HERO ICON & FLOATING INFOGRAPHICS */}
        <div className="mt-14 relative w-full max-w-md flex justify-center items-end h-72">
          
          {/* Subtle Radial Glow Behind the Map Asset */}
          <div className="absolute w-56 h-56 bg-emerald-100/40 rounded-full blur-3xl -z-10 bottom-6"></div>
          
          {/* Central Interactive Style Map Asset */}
          <div className="text-[150px] drop-shadow-2xl select-none transform hover:scale-105 transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing pb-4">
            🗺️
          </div>

          {/* Floating Card Left: 100% Verified */}
          <div className="absolute left-2 bottom-16 bg-white/95 backdrop-blur-xs border border-gray-100 p-3 rounded-2xl shadow-md flex items-center gap-2.5 text-left transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="w-7 h-7 bg-emerald-50 rounded-xl flex items-center justify-center text-xs shadow-2xs">
              🛡️
            </div>
            <div>
              <p className="text-[10px] font-black text-black leading-none mb-0.5">100% Verified</p>
              <p className="text-[8px] text-gray-400 font-medium">Environmental Data</p>
            </div>
          </div>

          {/* Floating Card Right: Live Impact */}
          <div className="absolute right-2 bottom-24 bg-white/95 backdrop-blur-xs border border-gray-100 p-3 rounded-2xl shadow-md flex flex-col gap-1 text-left transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-wider">Live Updates</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-emerald-600">●</span>
              <p className="text-[11px] font-black text-black leading-none">Eco Impact Live</p>
            </div>
          </div>

        </div>

      </main>

      {/* Balanced Footer */}
      <footer className="w-full py-4 text-center text-[10px] text-gray-300 z-10">
        © 2026 EnviroScore Map Inc. All rights reserved.
      </footer>
    </div>
  );
}