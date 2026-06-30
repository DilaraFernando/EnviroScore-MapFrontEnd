import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: { username: string; role: string } | null;
  onLogout: () => void;
}

const DISTRICT_STATS = [
  { name: "Colombo", score: 52, zone: "Yellow", trend: -2.1, temp: 29, condition: "Mostly Cloudy" },
  { name: "Kalutara", score: 78, zone: "Green", trend: +1.4, temp: 28, condition: "Partly Cloudy" },
  { name: "Galle", score: 71, zone: "Green", trend: +0.8, temp: 28, condition: "Light Rain" },
  { name: "Jaffna", score: 34, zone: "Red", trend: -3.5, temp: 31, condition: "Sunny" },
  { name: "Kandy", score: 67, zone: "Green", trend: +0.3, temp: 25, condition: "Cloudy" },
  { name: "Anuradhapura", score: 39, zone: "Red", trend: -1.9, temp: 32, condition: "Sunny" },
  { name: "Gampaha", score: 55, zone: "Yellow", trend: -0.7, temp: 29, condition: "Mostly Cloudy" },
  { name: "Nuwara Eliya", score: 82, zone: "Green", trend: +2.1, temp: 18, condition: "Heavy Rain" },
];

const ZONE_COLORS: Record<string, string> = {
  Green: "bg-emerald-500",
  Yellow: "bg-amber-400",
  Red: "bg-rose-500",
};

const ZONE_TEXT: Record<string, string> = {
  Green: "text-emerald-600",
  Yellow: "text-amber-600",
  Red: "text-rose-600",
};

const ZONE_BG: Record<string, string> = {
  Green: "bg-emerald-50 border-emerald-100",
  Yellow: "bg-amber-50 border-amber-100",
  Red: "bg-rose-50 border-rose-100",
};

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [animatedScores, setAnimatedScores] = useState<number[]>(DISTRICT_STATS.map(() => 0));
  const [activeAlert, setActiveAlert] = useState(0);

  const greenCount = DISTRICT_STATS.filter(d => d.zone === "Green").length;
  const yellowCount = DISTRICT_STATS.filter(d => d.zone === "Yellow").length;
  const redCount = DISTRICT_STATS.filter(d => d.zone === "Red").length;
  const avgScore = Math.round(DISTRICT_STATS.reduce((s, d) => s + d.score, 0) / DISTRICT_STATS.length);

  const alerts = [
    { district: "Jaffna", msg: "Critical drought stress detected — score dropped to 34/100.", zone: "Red" },
    { district: "Anuradhapura", msg: "Seasonal dry spell at peak. Soil moisture at 18% — intervention needed.", zone: "Red" },
    { district: "Colombo", msg: "Urban heat island effect intensifying. Green canopy below threshold.", zone: "Yellow" },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedScores(DISTRICT_STATS.map(d => d.score));
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlert(prev => (prev + 1) % alerts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-black select-none">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-xs">🗺️</div>
            <span className="font-black text-xs tracking-tight uppercase">EnviroScore-Map</span>
          </div>
          
          {/* UPDATED NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 gap-0.5">
            {[
              { label: "Overview", path: "/dashboard" },
              { label: "Calculate Score", path: "/calculate" },
              { label: "Interactive Map", path: "/map" },
              { label: "Weather Analytics", path: "/weather/colombo" }, // Single path configuration to weather page
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`px-4 py-1.5 text-[11px] font-black rounded-full transition-all cursor-pointer ${
                  path === "/dashboard" ? "bg-black text-white" : "text-gray-400 hover:text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black leading-none">{user?.username || "Guest"}</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{user?.role || "Viewer"}</p>
            </div>
            <button onClick={onLogout} className="px-3 py-1.5 bg-black text-white text-[11px] font-black rounded-full cursor-pointer hover:bg-gray-800 transition-all">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Overview Dashboard</p>
            <h1 className="text-3xl font-black tracking-tight mt-0.5">
              Sri Lanka<br />
              <span className="text-gray-300">Environmental Index</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/calculate')}
              className="px-4 py-2 bg-black text-white text-[11px] font-black rounded-full cursor-pointer hover:bg-gray-800 transition-all"
            >
              + Run Simulation
            </button>
            <button
              onClick={() => navigate('/map')}
              className="px-4 py-2 bg-white border border-gray-200 text-black text-[11px] font-black rounded-full cursor-pointer hover:border-black transition-all"
            >
              View Live Map →
            </button>
          </div>
        </div>

        {/* ALERT TICKER */}
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-bold transition-all duration-500 ${ZONE_BG[alerts[activeAlert].zone]}`}>
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ZONE_COLORS[alerts[activeAlert].zone]} animate-pulse`}></span>
          <span className={`text-[10px] font-black uppercase tracking-wider flex-shrink-0 ${ZONE_TEXT[alerts[activeAlert].zone]}`}>
            {alerts[activeAlert].district}
          </span>
          <span className="text-gray-500 text-[11px]">{alerts[activeAlert].msg}</span>
          <span className="ml-auto text-[9px] text-gray-300 font-bold flex-shrink-0">{activeAlert + 1}/{alerts.length}</span>
        </div>

        {/* TOP STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "National Avg Score", value: `${avgScore}`, unit: "/100", icon: "📊", sub: "Across 26 districts" },
            { label: "Green Zones", value: `${greenCount}`, unit: " districts", icon: "🌿", sub: "Optimal resilience", color: "text-emerald-600" },
            { label: "At-Risk Zones", value: `${redCount}`, unit: " critical", icon: "⚠️", sub: "Immediate action needed", color: "text-rose-600" },
            { label: "Active Data Nodes", value: "26", unit: " live", icon: "📡", sub: "Real-time monitoring" },
          ].map(card => (
            <div key={card.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider leading-tight">{card.label}</span>
                <span className="text-base">{card.icon}</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className={`text-3xl font-black tracking-tight ${card.color || "text-black"}`}>{card.value}</span>
                <span className="text-[11px] text-gray-400 font-bold">{card.unit}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* ZONE DISTRIBUTION BAR */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Zone Distribution</p>
              <p className="text-sm font-black mt-0.5">8 Districts Monitored</p>
            </div>
            <div className="flex gap-4 text-[10px] font-black">
              <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Green {greenCount}</span>
              <span className="flex items-center gap-1 text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Yellow {yellowCount}</span>
              <span className="flex items-center gap-1 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> Red {redCount}</span>
            </div>
          </div>
          <div className="flex rounded-full overflow-hidden h-3">
            <div className="bg-emerald-500 transition-all duration-1000" style={{ width: `${(greenCount / DISTRICT_STATS.length) * 100}%` }}></div>
            <div className="bg-amber-400 transition-all duration-1000" style={{ width: `${(yellowCount / DISTRICT_STATS.length) * 100}%` }}></div>
            <div className="bg-rose-500 transition-all duration-1000" style={{ width: `${(redCount / DISTRICT_STATS.length) * 100}%` }}></div>
          </div>
        </div>

        {/* DISTRICT SCORE GRID */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">District Performance</p>
              <p className="text-sm font-black mt-0.5">Live Eco-Score Index</p>
            </div>
            <button onClick={() => navigate('/calculate')} className="text-[10px] font-black text-gray-400 hover:text-black transition-all cursor-pointer">
              Run Analysis →
            </button>
          </div>
          <div className="space-y-3">
            {DISTRICT_STATS.map((d, i) => (
              <div key={d.name} className="flex items-center gap-4">
                <span className="text-[11px] font-black text-gray-600 w-24 flex-shrink-0">{d.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${ZONE_COLORS[d.zone]}`}
                    style={{ width: `${animatedScores[i]}%`, transitionDelay: `${i * 80}ms` }}
                  ></div>
                </div>
                <span className="text-[11px] font-black w-8 text-right">{d.score}</span>
                <span className={`text-[9px] font-black flex-shrink-0 ${d.trend > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {d.trend > 0 ? '▲' : '▼'} {Math.abs(d.trend)}
                </span>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ZONE_COLORS[d.zone]}`}></span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/calculate')}
            className="bg-black text-white rounded-2xl p-6 cursor-pointer hover:bg-gray-900 transition-all group"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Eco Calculator</p>
            <h3 className="text-lg font-black mt-1 mb-2">Simulate District<br />Environmental Score</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Adjust canopy cover, precipitation, and industrial impact to forecast ecosystem health.</p>
            <div className="mt-4 text-[11px] font-black group-hover:translate-x-1 transition-transform">Open Calculator →</div>
          </div>
          <div
            onClick={() => navigate('/map')}
            className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-black transition-all group shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Interactive Map</p>
            <h3 className="text-lg font-black mt-1 mb-2">Explore Destruction<br />Hotspots Visually</h3>
            <p className="text-xs text-gray-400 leading-relaxed">Color-coded district markers: red danger zones, yellow caution, green safe areas across Sri Lanka.</p>
            <div className="mt-4 text-[11px] font-black group-hover:translate-x-1 transition-transform">Open Map →</div>
          </div>
        </div>

      </main>

      <footer className="text-center py-6 text-[9px] text-gray-300 font-black uppercase tracking-widest">
        © 2026 EnviroScore Map Inc. — All 26 District Nodes Active
      </footer>
    </div>
  );
}