import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  aiAnalysis: string;
}

export default function WeatherPage() {
  const { districtName } = useParams<{ districtName: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const formattedDistrict = districtName ? districtName.charAt(0).toUpperCase() + districtName.slice(1) : "District";

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem('token'); // Grab token if required by your auth middleware
        const res = await axios.get(`http://localhost:5000/api/weather/analyze/${districtName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error("Error loading weather insights", err);
      } finally {
        setLoading(false);
      }
    };
    if (districtName) fetchAnalysis();
  }, [districtName]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-6 flex flex-col items-center justify-center select-none">
      
      {/* Navigation Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="text-xs text-slate-400 hover:text-white transition-colors font-black tracking-wider uppercase cursor-pointer"
        >
          ← Back to Map
        </button>
        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">GlowCare AI Node</span>
      </div>

      {loading ? (
        <div className="w-full max-w-md bg-slate-900/50 rounded-3xl p-12 text-center border border-slate-800">
          <div className="animate-pulse text-xs font-bold text-slate-400 uppercase tracking-widest">Querying Live Ecosystem Satellite Metrics...</div>
        </div>
      ) : data ? (
        <div className="w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/95 rounded-3xl p-6 border border-slate-700/40 shadow-2xl backdrop-blur-md">
          
          {/* Main Title Banner */}
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight">{formattedDistrict}</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">Sri Lanka Region</p>
          </div>

          {/* Core Temperature Header */}
          <div className="my-8 text-center">
            <span className="text-7xl font-extralight tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              {Math.round(data.temperature)}°
            </span>
            <p className="text-xs text-emerald-400 font-black tracking-widest uppercase mt-2">● {data.condition}</p>
          </div>

          {/* AI Analysis Card Section */}
          <div className="mb-6 bg-emerald-950/30 border border-emerald-800/30 rounded-2xl p-4">
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block mb-1">🤖 AI Diagnostics</span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">{data.aiAnalysis}</p>
          </div>

          {/* Information Weather Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Humidity", value: `${data.humidity}%`, icon: "💧" },
              { label: "Wind Velocity", value: `${data.windSpeed} m/s`, icon: "💨" },
              { label: "Geo Location", value: "6.9271° N", icon: "📍" },
              { label: "Eco Status", value: "Monitored", icon: "🌿" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-black text-slate-200">{item.value}</span>
                  <span className="text-xs opacity-70">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="text-xs font-black uppercase text-rose-500 tracking-wider">Error compiling dynamic district telemetry.</div>
      )}
    </div>
  );
}