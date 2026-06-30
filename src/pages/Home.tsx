import { useNavigate } from "react-router-dom";

//  No props required — navigation handled via useNavigate hook
export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { value: "26", label: "Districts Monitored" },
    { value: "3", label: "Zone Classifications" },
    { value: "Live", label: "Real-Time Data" },
  ];

  const features = [
    {
      icon: "📊",
      title: "Overview Dashboard",
      desc: "National eco-index at a glance. Track zone distributions, district scores, and live alerts across all 26 Sri Lankan districts.",
      path: "/dashboard",
    },
    {
      icon: "🧮",
      title: "Calculate Score",
      desc: "Simulate any district's environmental resilience by adjusting canopy cover, precipitation, and industrial footprint parameters.",
      path: "/calculate",
    },
    {
      icon: "🗺️",
      title: "Interactive Map",
      desc: "Visualise destruction zones on a live map. Red markers for critical areas, yellow for moderate risk, green for stable ecosystems.",
      path: "/map",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-black select-none">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-xs">🗺️</div>
            <span className="font-black text-xs tracking-tight uppercase">EnviroScore-Map</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 text-[11px] font-black text-gray-500 hover:text-black transition-all cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 bg-black text-white text-[11px] font-black rounded-full cursor-pointer hover:bg-gray-800 transition-all"
            >
              Get Started →
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-3 py-1.5 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Environmental Monitoring — Sri Lanka</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-4">
          EnviroScore
          <br />
          <span className="text-gray-300">Map</span>
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
          A data science platform tracking environmental destruction across all 26 Sri Lankan districts.
          Simulate ecosystems, identify danger zones, and visualise green resilience in real time.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-black text-white text-xs font-black rounded-full cursor-pointer hover:bg-gray-800 transition-all shadow-md"
          >
            Enter Platform →
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white border border-gray-200 text-black text-xs font-black rounded-full cursor-pointer hover:border-black transition-all"
          >
            View Live Map
          </button>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-2xl mx-auto px-6 mb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 grid grid-cols-3 gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black">{s.value}</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-8">Platform Features</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(f => (
            <div
              key={f.title}
              onClick={() => navigate("/login")}
              className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-black transition-all group shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="text-sm font-black mb-2">{f.title}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-4">{f.desc}</p>
              <div className="text-[10px] font-black text-gray-300 group-hover:text-black transition-all group-hover:translate-x-1 transform">
                Explore →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ZONE LEGEND */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5">Zone Classification System</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { color: "bg-rose-500", light: "bg-rose-50 border-rose-100", text: "text-rose-600", zone: "Red Zone", range: "Score < 45", desc: "Critical ecological distress. Immediate intervention required." },
              { color: "bg-amber-400", light: "bg-amber-50 border-amber-100", text: "text-amber-600", zone: "Yellow Zone", range: "Score 45–69", desc: "Moderate vulnerability. Passive surveillance active." },
              { color: "bg-emerald-500", light: "bg-emerald-50 border-emerald-100", text: "text-emerald-600", zone: "Green Zone", range: "Score ≥ 70", desc: "Optimal ecosystem stability. Preservation mode active." },
            ].map(z => (
              <div key={z.zone} className={`${z.light} border rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${z.color}`}></span>
                  <span className={`text-[11px] font-black ${z.text}`}>{z.zone}</span>
                </div>
                <div className="text-[10px] font-black text-gray-500 mb-1">{z.range}</div>
                <div className="text-[10px] text-gray-400 leading-relaxed">{z.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div
          onClick={() => navigate("/login")}
          className="bg-black text-white rounded-2xl p-8 text-center cursor-pointer hover:bg-gray-900 transition-all"
        >
          <h2 className="text-2xl font-black mb-2">Ready to monitor Sri Lanka's ecosystems?</h2>
          <p className="text-xs text-gray-400 mb-5">Sign in to access the dashboard, calculator, and live interactive map.</p>
          <button className="px-6 py-3 bg-white text-black text-xs font-black rounded-full cursor-pointer hover:bg-gray-100 transition-all">
            Enter EnviroScore Map →
          </button>
        </div>
      </section>

      <footer className="text-center py-6 text-[9px] text-gray-300 font-black uppercase tracking-widest">
        © 2026 EnviroScore Map Inc. — RAD 3rd Semester Project
      </footer>
    </div>
  );
}