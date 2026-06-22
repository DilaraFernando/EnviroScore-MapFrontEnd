import { useState } from 'react';

interface HomeProps {
  onStartQuiz: () => void;
  onNavigateToLogin: () => void;
}

export default function Home({ onStartQuiz, onNavigateToLogin }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#F3F6F3] text-[#1B4332] font-sans relative overflow-x-hidden flex flex-col justify-between">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="flex justify-between items-center bg-white/70 backdrop-blur-md px-8 py-3 sticky top-0 z-50 border-b border-gray-100/50 mx-4 mt-3 rounded-2xl shadow-xs">
        {/* Logo Icon & Name */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#1B4332] rounded-full flex items-center justify-center text-[#E2EFE0] font-serif font-bold text-sm">
            🌿
          </div>
          <span className="font-bold text-sm text-[#1B4332] tracking-tight">GlowCare</span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-semibold text-gray-600">
          <a href="#home" className="text-[#1B4332] font-bold">Home</a>
          <a href="#how-it-works" className="hover:text-[#1B4332] transition-colors">How It Works</a>
          <a href="#why-us" className="hover:text-[#1B4332] transition-colors">Why Us</a>
          <a href="#results" className="hover:text-[#1B4332] transition-colors">Our Results</a>
          <a href="#testimonials" className="hover:text-[#1B4332] transition-colors">Testimonials</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 bg-[#FDE2E4] hover:bg-[#FCD2D6] text-[#C94A53] text-[11px] font-bold rounded-full transition-all flex items-center gap-1 shadow-2xs">
            <span>🤍</span> Donate Now
          </button>
          <button className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 transition-all">
            🛒
          </button>
          <button 
            onClick={onNavigateToLogin}
            className="w-7 h-7 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600 hover:bg-gray-100 transition-all"
            title="Login"
          >
            👤
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 text-center max-w-3xl mx-auto px-6 space-y-4 z-10 flex-1 flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-[#1B4332] font-serif leading-tight">
          Find the Perfect Plant for Your Space
        </h1>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed font-normal">
          Answer a few simple questions and discover plants that match your light, <br />
          space, and lifestyle — no guesswork needed.
        </p>

        {/* Hero Actions */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <button 
            onClick={onStartQuiz}
            className="px-5 py-2 bg-[#1B4332] hover:bg-[#122c21] text-white text-[11px] font-medium rounded-full shadow-sm transition-all flex items-center gap-1"
          >
            Get Started <span>→</span>
          </button>
          <button 
            onClick={onStartQuiz}
            className="px-5 py-2 bg-white hover:bg-gray-50 text-[#1B4332] text-[11px] font-medium rounded-full border border-gray-200/80 shadow-2xs transition-all flex items-center gap-1"
          >
            Start Quiz <span>→</span>
          </button>
        </div>
      </section>

      {/* 3. LANDSCAPE MOUNTAIN BACKGROUND */}
      {/* පින්තූරයේ පෙනෙන කඳු සහ ගස් සහිත පසුබිම සිහිගන්වන SVG කලාකෘතිය */}
      <div className="absolute bottom-0 left-0 w-full h-[55vh] pointer-events-none z-0 overflow-hidden flex items-end">
        <svg viewBox="0 0 1440 400" className="w-full h-auto translate-y-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Back Soft Mountains */}
          <path d="M0 220 C300 130 500 180 800 100 C1100 20 1200 80 1440 140 L1440 400 L0 400 Z" fill="#A7C2A4" opacity="0.4" />
          {/* Mid Layer Mountains */}
          <path d="M0 280 C250 190 600 240 900 170 C1200 100 1300 150 1440 190 L1440 400 L0 400 Z" fill="#7FA97A" opacity="0.6" />
          {/* Front Mountain Hills & Trees Base */}
          <path d="M0 320 C350 250 700 290 1050 240 C1300 200 1380 220 1440 240 L1440 400 L0 400 Z" fill="#52794D" opacity="0.8" />
          {/* Bottom White Fog Gradient Effect */}
          <rect y="360" width="1440" height="40" fill="#F3F6F3" />
        </svg>
      </div>

      {/* 4. BOTTOM UI CARDS SECTION */}
      {/* ඔයාගේ අවශ්‍යතාවය අනුව හරියටම 200px x 200px ප්‍රමාණයේ කාඩ්පත් දෙක */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 pb-12 w-full flex flex-wrap justify-center gap-6">
        
        {/* Card 1: Will This Plant Work? */}
        <div 
          className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl shadow-md border border-white/50 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-0.5"
          style={{ width: '200px', height: '200px' }}
        >
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-900 font-serif">Will This Plant Work?</h3>
            <p className="text-[9px] text-gray-400 leading-normal">
              Check how well any plant fits your climate, space, and vibe before you buy.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="relative flex items-center bg-gray-50 border border-gray-100 rounded-xl px-2 py-1.5">
              <span className="text-[10px] text-gray-400 mr-1">🔍</span>
              <input 
                type="text" 
                placeholder="Search any plant"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[10px] focus:outline-none text-gray-700"
              />
            </div>
            <button 
              onClick={onStartQuiz}
              className="w-full py-1.5 bg-[#1B4332] text-white text-[9px] font-bold rounded-xl text-center flex items-center justify-center gap-1 hover:bg-[#122c21] transition-all"
            >
              Check Fit Score <span>→</span>
            </button>
          </div>
        </div>

        {/* Card 2: Not sure what to grow? */}
        <div 
          className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl shadow-md border border-white/50 flex flex-col justify-between relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
          style={{ width: '200px', height: '200px' }}
        >
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-900 font-serif">Not sure what to grow?</h3>
            <p className="text-[9px] text-gray-400 leading-normal">
              Let's find your perfect plant match!
            </p>
          </div>

          <div>
            <button 
              onClick={onStartQuiz}
              className="px-3 py-1.5 bg-[#7BC676] hover:bg-[#69b364] text-white text-[9px] font-bold rounded-full flex items-center gap-1 shadow-2xs transition-all"
            >
              Start Quiz <span>→</span>
            </button>
          </div>

          {/* Plant Vector Graphic Element at bottom-right corner as shown in screen */}
          <div className="absolute bottom-1 right-2 flex items-end gap-1 pointer-events-none opacity-90">
            {/* Small Plant 1 */}
            <div className="w-5 h-10 flex flex-col items-center">
              <div className="w-1.5 h-6 bg-emerald-700 rounded-full origin-bottom rotate-12"></div>
              <div className="w-1.5 h-5 bg-emerald-600 rounded-full origin-bottom -rotate-12 -mt-4"></div>
              <div className="w-4 h-3 bg-amber-200 rounded-b-md rounded-t-xs"></div>
            </div>
            {/* Small Plant 2 */}
            <div className="w-4 h-8 flex flex-col items-center">
              <div className="w-1 h-5 bg-green-600 rounded-full"></div>
              <div className="w-3 h-2.5 bg-amber-200 rounded-b-md rounded-t-xs"></div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}