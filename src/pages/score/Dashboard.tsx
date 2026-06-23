import { useState } from 'react';

interface DashboardProps {
  user: { username: string; role: string } | null;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  // Tabs පාලනය සඳහා (Calculate Score සහ Interactive Map)
  const [activeTab, setActiveTab] = useState<'calculator' | 'map'>('calculator');
  
  // Form Inputs
  const [district, setDistrict] = useState('Colombo');
  const [publicTransport, setPublicTransport] = useState('No');
  const [acHours, setAcHours] = useState('0');
  const [polythene, setPolythene] = useState('No');

  // Calculation Results States
  const [score, setScore] = useState<number | null>(null);
  const [advisory, setAdvisory] = useState('');
  const [calculatedDistrict, setCalculatedDistrict] = useState('');

  // 🧮 Score Calculator Function
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    let currentScore = 100;

    // Deduct points based on rules
    if (publicTransport === 'No') currentScore -= 20;
    
    const acTime = parseFloat(acHours) || 0;
    currentScore -= (acTime * 5); // පැයකට ලකුණු 5 බැගින් අඩු වේ

    if (polythene === 'Yes') currentScore -= 25;

    // Boundary Validation
    if (currentScore < 0) currentScore = 0;

    // Set Dynamic Advisories
    let currentAdvisory = '';
    if (currentScore >= 80) {
      currentAdvisory = '🌱 Excellent! Your lifestyle is highly eco-friendly. Keep sustaining the green zone!';
    } else if (currentScore >= 50) {
      currentAdvisory = '⚠️ Moderate impact. Consider reducing AC usage or switching to public transport to improve your score.';
    } else {
      currentAdvisory = '🚨 High Environmental Impact! Urgent lifestyle adjustments needed to reduce your carbon footprint.';
    }

    setScore(currentScore);
    setAdvisory(currentAdvisory);
    setCalculatedDistrict(district);
    
    // Calculate කළ සැණින් සිතියම බලන්න Map Tab එකට ස්වයංක්‍රීයව මාරු කිරීම
    setActiveTab('map');
  };

  // 🎨 Map එක සඳහා Dynamic Color Picker
  const getDistrictColor = (targetDistrict: string) => {
    if (!score || calculatedDistrict !== targetDistrict) return 'bg-gray-100 border-gray-200 text-gray-400';
    
    if (score >= 80) return 'bg-emerald-500 border-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]';
    if (score >= 50) return 'bg-amber-400 border-amber-500 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]';
    return 'bg-rose-500 border-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]';
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden flex flex-col justify-between select-none">
      
      {/* BACKGROUND DOTS */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#f1f5f9_2px,transparent_2px)] [background-size:32px_32px] pointer-events-none z-0"></div>

      {/* ⚪ TOP NAVBAR */}
      <header className="max-w-7xl w-full mx-auto px-8 pt-8 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-sm text-white">
            🗺️
          </div>
          <span className="font-black text-sm tracking-tight text-black uppercase">EnviroScore-Map</span>
        </div>

        {/* Center Dynamic Navigation Bars (Logout නොමැතිව) */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-full p-1 gap-1">
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-5 py-2 font-bold text-xs rounded-full transition-all cursor-pointer ${activeTab === 'calculator' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            Calculate Score
          </button>
          <button 
            onClick={() => setActiveTab('map')}
            className={`px-5 py-2 font-bold text-xs rounded-full transition-all cursor-pointer ${activeTab === 'map' ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
          >
            Interactive Map
          </button>
        </nav>

        {/* Right Side: Account Info & Action Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-black leading-none">{user?.username}</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{user?.role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-gray-50 border border-gray-100 hover:bg-gray-100 text-black text-xs font-bold rounded-full transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ⚪ MAIN CORE MODULES */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10 max-w-4xl mx-auto w-full">
        
        {activeTab === 'calculator' ? (
          /* ==========================================
             M2: ECO-SCORE CALCULATOR FORM
             ========================================== */
          <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] bg-gray-100 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Module 02</span>
              <h2 className="text-xl font-black tracking-tight text-black pt-1">Eco-Score Calculator</h2>
              <p className="text-xs text-gray-400">Evaluate your daily environmental footprint</p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Select Region / District</label>
                <select 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)}
                  className="mt-1.5 w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs text-black font-semibold focus:outline-none focus:bg-white focus:border-black transition-all cursor-pointer"
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Did you use Public Transport today? (Bus/Train)</label>
                <div className="flex gap-2 mt-1.5">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPublicTransport(option)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${publicTransport === option ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:text-black'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Air Conditioner (AC) Usage Hours</label>
                <input 
                  type="number" 
                  min="0" 
                  max="24"
                  value={acHours}
                  onChange={(e) => setAcHours(e.target.value)}
                  placeholder="e.g., 2"
                  className="mt-1.5 w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs text-black font-medium focus:outline-none focus:bg-white focus:border-black transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Did you use single-use polythene/plastics today?</label>
                <div className="flex gap-2 mt-1.5">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPolythene(option)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${polythene === option ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:text-black'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-black hover:bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all mt-4 cursor-pointer"
              >
                Instant Calculate
              </button>
            </form>
          </div>
        ) : (
          /* ==========================================
             M3: INTERACTIVE ECO-MAP & ADVISORY
             ========================================== */
          <div className="w-full max-w-2xl flex flex-col items-center space-y-8 animate-fade-in">
            
            {/* Dynamic Advisory Card */}
            {score !== null ? (
              <div className="w-full max-w-md bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center space-y-2">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Live Analysis for {calculatedDistrict}</p>
                <h3 className="text-4xl font-black tracking-tight">{score}/100</h3>
                <p className="text-xs font-medium text-gray-600 px-4 mt-2 leading-relaxed">{advisory}</p>
              </div>
            ) : (
              <div className="bg-gray-50 text-gray-400 text-xs px-6 py-3 rounded-xl border border-dashed border-gray-200">
                Please calculate your score first to initialize map states.
              </div>
            )}

            {/* Premium Interactive 3D-Like Map Canvas Layout */}
            <div className="relative w-full h-[320px] flex items-center justify-center bg-gray-50/40 border border-gray-100 rounded-3xl p-6">
              <div className="absolute w-72 h-72 bg-gray-100/30 rounded-full blur-3xl -z-10"></div>
              
              {/* Western Province Simulated Map Blocks */}
              <div className="flex flex-col gap-3 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <span className="text-[10px] font-extrabold text-gray-300 text-center uppercase tracking-widest mb-2">Western Province Map</span>
                
                {/* Gampaha District Block */}
                <div className={`w-44 p-4 border rounded-2xl text-center font-black text-xs tracking-wide transition-all duration-500 uppercase ${getDistrictColor('Gampaha')}`}>
                  Gampaha
                </div>

                {/* Colombo District Block */}
                <div className={`w-44 p-5 border rounded-2xl text-center font-black text-sm tracking-wide transition-all duration-500 uppercase ml-6 ${getDistrictColor('Colombo')}`}>
                  Colombo
                </div>

                {/* Kalutara District Block */}
                <div className={`w-44 p-4 border rounded-2xl text-center font-black text-xs tracking-wide transition-all duration-500 uppercase ml-2 ${getDistrictColor('Kalutara')}`}>
                  Kalutara
                </div>
              </div>
            </div>

            {/* Map Legends */}
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white px-6 py-2.5 rounded-full border border-gray-100">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> 80-100 (Green)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span> 50-79 (Yellow)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span> &lt; 50 (Red)</div>
            </div>

          </div>
        )}
      </main>

      {/* Balanced Footer */}
      <footer className="w-full py-4 text-center text-[10px] text-gray-300 z-10 font-medium">
        © 2026 EnviroScore Map Inc. All rights reserved.
      </footer>
    </div>
  );
}