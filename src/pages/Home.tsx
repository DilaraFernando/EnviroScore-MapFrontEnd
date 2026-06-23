import { useState } from 'react';
import mapAsset from '../assets/e6c4b8a894883d80de5c55de4dcc8a36-removebg-preview.png';

interface HomeProps {
  onStartQuiz: () => void;
  onNavigateToLogin: () => void;
}

export default function Home({ onStartQuiz, onNavigateToLogin }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden flex flex-col justify-between select-none">
{/*PERFECTLY BALANCED MODERN NAVBAR */}
      <header className="max-w-7xl w-full mx-auto px-8 pt-8 flex justify-between items-center relative z-50 animate-fade-in">
        
        {/* Left Side */}
        <div className="flex items-center gap-2.5 justify-start">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-sm shadow-xs text-white">
            🗺️
          </div>
          <span className="font-black text-sm tracking-tight text-black uppercase">EnviroScore-Map</span>
        </div>

        {/* Center Navigation Pills */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-full p-1 gap-1">
          <button className="px-5 py-2 bg-gray-50 text-black font-bold text-xs rounded-full transition-all">
            Calculate Score
          </button>
          <button className="px-5 py-2 text-gray-400 hover:text-black font-semibold text-xs rounded-full transition-all cursor-pointer">
            Interactive Map
          </button>
          <button className="px-5 py-2 text-gray-400 hover:text-black font-semibold text-xs rounded-full transition-all cursor-pointer">
            User Account
          </button>
        </nav>

        {/* Right Side: Action Buttons*/}
        <div className="flex items-center gap-4 justify-end">
          <button 
            onClick={onNavigateToLogin}
            className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-black transition-all cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={onStartQuiz}
            className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white text-xs font-bold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            Join system
          </button>
        </div>

      </header>

      {/* HERO MAIN CONTENT SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-4 relative z-10 max-w-4xl mx-auto w-full animate-fade-in">
        
        {/* Active Eco Trackers Count Indicator */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex -space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] shadow-xs">🌿</div>
            <div className="w-7 h-7 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] shadow-xs">🍀</div>
            <div className="w-7 h-7 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-[10px] shadow-xs">🌲</div>
          </div>
          <span className="text-[10px] text-gray-400 font-extrabold tracking-wider uppercase">60K+ Active Trackers</span>
        </div>

        {/* Premium Dark Typography */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.12] max-w-3xl">
          EnviroScore-Map
        </h1> 
    
        {/* Subtitle Text */}
        <p className="text-xs md:text-sm text-gray-400 max-w-sm mx-auto mt-4 leading-relaxed font-normal">
          Explore environmental impact scores and track live system metrics for your sustainability journeys.
        </p>

        {/* Minimalist Search Bar */}
        <div className="flex items-center bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full p-2 mt-8 w-full max-w-md transition-all duration-300">
          <div className="flex items-center px-3 w-full">
            <span className="text-sm text-gray-400 mr-2">📍</span>
            <input 
              type="text" 
              placeholder="Search region or system..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs focus:outline-none text-black font-medium placeholder-gray-300"
            />
          </div>
          <button 
            onClick={onStartQuiz}
            className="px-6 py-2.5 bg-black hover:bg-gray-900 text-white text-xs font-bold rounded-full shadow-xs whitespace-nowrap transition-all cursor-pointer"
          >
            Check Score
          </button>
        </div>

        {/*IMAGE & FLOATING INFOGRAPHICS */}
        <div className="mt-4 relative w-full max-w-2xl flex justify-center items-end h-[410px]">
          
          {/* Neutral Smooth Radial Glow Behind the Map Image */}
          <div className="absolute w-96 h-96 bg-gray-100/60 rounded-full blur-3xl -z-10 bottom-6"></div>
          
          {/* 🖼️ Large Map Asset */}
          <div className="w-96 h-96 select-none transform hover:scale-102 transition-transform duration-500 ease-out pb-2 flex items-center justify-center relative z-10">
            <img 
              src={mapAsset} 
              alt="EnviroScore 3D Map" 
              className="w-full h-full object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.08)]" 
            />
          </div>

          {/* Floating Card Left */}
          <div className="absolute left-8 bottom-24 bg-white/95 backdrop-blur-md border border-gray-100/80 p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-center gap-2.5 text-left transform -rotate-1 hover:rotate-0 transition-transform duration-300 z-20">
            <div className="w-7 h-7 bg-gray-50 rounded-xl flex items-center justify-center text-xs">
              🛡️
            </div>
            <div>
              <p className="text-[10px] font-black text-black leading-none mb-0.5">100% Verified</p>
              <p className="text-[8px] text-gray-400 font-medium">Environmental Data</p>
            </div>
          </div>

          {/* Floating Card Right*/}
          <div className="absolute right-8 bottom-32 bg-white/95 backdrop-blur-md border border-gray-100/80 p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col gap-1 text-left transform rotate-2 hover:rotate-0 transition-transform duration-300 z-20">
            <span className="text-[8px] font-extrabold text-gray-400 uppercase tracking-wider">Live Updates</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-black animate-pulse">●</span>
              <p className="text-[11px] font-black text-black leading-none">Impact Score</p>
            </div>
          </div>

        </div>
      </main>

      {/*  Footer */}
      <footer className="w-full py-4 text-center text-[10px] text-gray-300 z-10 font-medium">
         2026 EnviroScore Map Inc. All rights reserved.
      </footer>
    </div>
  );
}