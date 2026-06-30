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

// Full list of districts for the drop-down navigation selector
const SRI_LANKA_DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Moneragala", "Ratnapura", "Kegalle"
].sort();

export default function WeatherPage() {
  const { districtName } = useParams<{ districtName: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fallback to colombo if parameter string is missing
  const activeDistrict = districtName || "colombo";
  const formattedDistrict = activeDistrict.charAt(0).toUpperCase() + activeDistrict.slice(1);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/weather/analyze/${activeDistrict}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error("Error loading weather insights", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [activeDistrict]);

  // Handler to smoothly transition routes when a new district is selected
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.toLowerCase();
    navigate(`/weather/${selected}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-black font-sans p-4 sm:p-6 lg:p-10 flex flex-col items-center select-none">

      {/* Top Header Bar - matches nav style from calculator page */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-10 mt-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs text-neutral-500 hover:text-black transition-colors font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
        >
          ← Dashboard
        </button>

        {/* Dropdown to easily look up separate districts without leaving the page */}
        <div className="relative">
          <select
            value={formattedDistrict}
            onChange={handleDistrictChange}
            className="bg-white border border-neutral-300 text-xs text-black rounded-full px-4 py-2 pr-8 font-bold tracking-wider uppercase outline-none appearance-none cursor-pointer focus:border-black transition-colors"
          >
            {SRI_LANKA_DISTRICTS.map((district) => (
              <option key={district} value={district}>{district} District</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[9px] text-neutral-400">▼</div>
        </div>
      </div>

      {/* Page Title Block - matches "Eco Calculator / District Score Simulator" style */}
      <div className="w-full max-w-3xl mb-8">
        <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Eco Climate Monitor</span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-1">{formattedDistrict}</h1>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-300">Weather Report</h2>
        <p className="text-sm text-neutral-500 mt-3">Live atmospheric data and AI ecosystem diagnostics for this district.</p>
      </div>

      {loading ? (
        <div className="w-full max-w-3xl bg-white rounded-2xl p-16 text-center border border-neutral-200 shadow-sm">
          <div className="inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="animate-pulse text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Running Predictive AI Models...</div>
        </div>
      ) : data ? (
        <div className="w-full max-w-3xl bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">

          {/* Main Visual Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 sm:p-8 border-b border-neutral-200">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Selected District</span>
              <h1 className="text-2xl font-black mt-1">{formattedDistrict}</h1>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-1">Sri Lanka Eco-Sector Zone</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black tracking-tighter text-black">{Math.round(data.temperature)}°</span>
              <p className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase mt-1">☁️ {data.condition}</p>
            </div>
          </div>

          {/* AI Analysis Block */}
          <div className="p-6 sm:p-8 space-y-4 border-b border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🤖</span>
              <h3 className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Ecosystem Core Diagnostics</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <span className="text-[10px] font-bold text-black uppercase tracking-widest block mb-1">Ecology Assessment</span>
                <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                  {data.aiAnalysis}
                </p>
              </div>

              <div className="bg-black border border-black rounded-xl p-4 flex gap-4 items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest block mb-1">Predictive Safe Action</span>
                  <p className="text-sm text-neutral-200">Ecosystem configuration optimal. Monitor humidity thresholds over 24H intervals.</p>
                </div>
                <span className="text-lg text-white">🛡️</span>
              </div>
            </div>
          </div>

          {/* Environmental Telemetry Grid Items */}
          <div className="grid grid-cols-2 gap-3 p-6 sm:p-8">
            {[
              { label: "Atmospheric Humidity", value: `${data.humidity}%`, icon: "💧" },
              { label: "Wind Vector Speed", value: `${data.windSpeed} m/s`, icon: "💨" },
              { label: "Ecoscore Node ID", value: `LK-${activeDistrict.slice(0,3).toUpperCase()}-26`, icon: "📡" },
              { label: "Data Integrity", value: "Verified", icon: "✓" },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between hover:border-black transition-colors">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.label}</span>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-black text-black">{item.value}</span>
                  <span className="text-sm opacity-60">{item.icon}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-2xl p-10 text-center border border-red-200">
          <span className="text-xs font-bold uppercase text-red-500 tracking-wider">Error compiling dynamic district telemetry.</span>
        </div>
      )}
    </div>
  );
}