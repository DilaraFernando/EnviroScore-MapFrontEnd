import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

const SRI_LANKAN_DISTRICTS = [
  { id: "colombo", name: "Colombo", province: "Western", baseTemp: "31.8°C", baseHumidity: 82, lat: 6.9271, lng: 79.8612, note: "High urban density leading to surface heat island effects. Needs structural green canopy restoration and wetland buffer management." },
  { id: "gampaha", name: "Gampaha", province: "Western", baseTemp: "30.2°C", baseHumidity: 75, lat: 7.0917, lng: 80.0, note: "Industrial mixed zone with rapid construction footprints. Groundwater preservation and urban forest nodes are critical." },
  { id: "kalutara", name: "Kalutara", province: "Western", baseTemp: "28.5°C", baseHumidity: 88, lat: 6.5854, lng: 79.9607, note: "Excellent eco-forest wet zone stability. Highly resilient ecosystem but vulnerable to minor soil erosion during peak monsoons." },
  { id: "kandy", name: "Kandy", province: "Central", baseTemp: "26.4°C", baseHumidity: 80, lat: 7.2906, lng: 80.6337, note: "Montane micro-climate matrix. Heavy canopy cover but experiencing localized ambient air threats due to valley topology trap." },
  { id: "matale", name: "Matale", province: "Central", baseTemp: "27.0°C", baseHumidity: 76, lat: 7.4675, lng: 80.6234, note: "Mixed agriculture and forest zone. Spice cultivation contributes positively but expanding urbanization poses risks." },
  { id: "nuwaraeliya", name: "Nuwara Eliya", province: "Central", baseTemp: "18.5°C", baseHumidity: 85, lat: 6.9497, lng: 80.7891, note: "High-altitude cloud forest ecosystem. Highly sensitive to agro-chemical soil shifts. Outstanding carbon sink capabilities." },
  { id: "galle", name: "Galle", province: "Southern", baseTemp: "29.8°C", baseHumidity: 83, lat: 6.0535, lng: 80.2210, note: "Coastal marine ecosystem balance. Reef structures provide great wave energy dissipation, but urban coastline pressure is rising." },
  { id: "matara", name: "Matara", province: "Southern", baseTemp: "29.4°C", baseHumidity: 80, lat: 5.9549, lng: 80.5550, note: "Coastal and riverine ecosystem mix. Tourism pressure affecting coastal dune systems and estuarine biodiversity." },
  { id: "hambantota", name: "Hambantota", province: "Southern", baseTemp: "31.0°C", baseHumidity: 72, lat: 6.1241, lng: 81.1185, note: "Semi-arid coastal plain. Rapid port and industrial development threatening lagoon and mangrove ecosystems." },
  { id: "jaffna", name: "Jaffna", province: "Northern", baseTemp: "33.1°C", baseHumidity: 70, lat: 9.6615, lng: 80.0255, note: "Arid limestone topography with limited fresh water nodes. Vulnerable to prolonged heatwaves. Requires intense drought-resilient vegetation." },
  { id: "kilinochchi", name: "Kilinochchi", province: "Northern", baseTemp: "32.0°C", baseHumidity: 71, lat: 9.3803, lng: 80.4037, note: "Post-conflict recovery zone. Reforestation efforts underway but land degradation remains significant." },
  { id: "mannar", name: "Mannar", province: "Northern", baseTemp: "32.8°C", baseHumidity: 68, lat: 8.9810, lng: 79.9044, note: "Dryland and coastal zone. Important bird sanctuary areas under pressure from salt mining and overfishing." },
  { id: "mullaitivu", name: "Mullaitivu", province: "Northern", baseTemp: "31.5°C", baseHumidity: 73, lat: 9.2671, lng: 80.8128, note: "Coastal lagoon and forest recovery zone. High biodiversity potential if reforestation targets are met." },
  { id: "vavuniya", name: "Vavuniya", province: "Northern", baseTemp: "32.2°C", baseHumidity: 69, lat: 8.7514, lng: 80.4971, note: "Transitional dry zone. Encroachment on Vanni forest belts is a growing concern." },
  { id: "batticaloa", name: "Batticaloa", province: "Eastern", baseTemp: "30.5°C", baseHumidity: 78, lat: 7.7170, lng: 81.7004, note: "Lagoon-estuary system under salinity stress. Mangrove degradation accelerating coastal erosion." },
  { id: "ampara", name: "Ampara", province: "Eastern", baseTemp: "30.8°C", baseHumidity: 76, lat: 7.2997, lng: 81.6747, note: "Paddy and forest mosaic. Seasonal flooding events threatening fertile basin zones. Climate adaptation needed." },
  { id: "trincomalee", name: "Trincomalee", province: "Eastern", baseTemp: "31.2°C", baseHumidity: 74, lat: 8.5874, lng: 81.2152, note: "Strategic harbor and coral reef zone. Industrial shipping traffic contributing to marine pollution." },
  { id: "kurunegala", name: "Kurunegala", province: "North Western", baseTemp: "29.5°C", baseHumidity: 74, lat: 7.4818, lng: 80.3609, note: "Coconut triangle district. Mono-crop agriculture reducing soil biodiversity and water retention." },
  { id: "puttalam", name: "Puttalam", province: "North Western", baseTemp: "31.8°C", baseHumidity: 71, lat: 8.0362, lng: 79.8283, note: "Lagoon and salt flat ecosystem. Prawn farming and salt extraction industries degrading wetland habitats." },
  { id: "anuradhapura", name: "Anuradhapura", province: "North Central", baseTemp: "32.5°C", baseHumidity: 68, lat: 8.3114, lng: 80.4037, note: "Dry zone cascade tank network matrix. Chronic seasonal dry spells threat. Critical soil moisture management required." },
  { id: "polonnaruwa", name: "Polonnaruwa", province: "North Central", baseTemp: "31.8°C", baseHumidity: 70, lat: 7.9403, lng: 81.0188, note: "Ancient irrigation reservoir ecosystem. Siltation of tanks and deforestation of catchment areas are primary threats." },
  { id: "badulla", name: "Badulla", province: "Uva", baseTemp: "22.5°C", baseHumidity: 82, lat: 6.9934, lng: 81.0550, note: "Uva highland ecosystem. Tea monoculture and stream channel degradation affecting biodiversity corridors." },
  { id: "moneragala", name: "Moneragala", province: "Uva", baseTemp: "28.0°C", baseHumidity: 74, lat: 6.8728, lng: 81.3507, note: "Elephant corridor zone. Human-wildlife conflict escalating due to forest fragmentation." },
  { id: "ratnapura", name: "Ratnapura", province: "Sabaragamuwa", baseTemp: "27.2°C", baseHumidity: 86, lat: 6.6828, lng: 80.4005, note: "Wet zone gem mining district. River sedimentation from mining activities severely impacts aquatic ecosystems." },
  { id: "kegalle", name: "Kegalle", province: "Sabaragamuwa", baseTemp: "27.8°C", baseHumidity: 83, lat: 7.2513, lng: 80.3464, note: "Hilly terrain with rubber and tea estates. Landslide risk increasing with deforestation on steep slopes." },
];

const ZONE_COLORS: Record<string, string> = {
  Green: "bg-emerald-500",
  Yellow: "bg-amber-400",
  Red: "bg-rose-500",
};

export default function CalculateScore() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"input" | "result">("input");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState("kalutara");
  const [simulatedCanopy, setSimulatedCanopy] = useState<number>(35);
  const [simulatedRainfall, setSimulatedRainfall] = useState<number>(140);
  const [industrialImpact, setIndustrialImpact] = useState<string>("low");
  const [finalReport, setFinalReport] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const filteredDistricts = useMemo(() =>
    SRI_LANKAN_DISTRICTS.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]);

  const selectedDistrict = useMemo(() =>
    SRI_LANKAN_DISTRICTS.find(d => d.id === selectedId) || SRI_LANKAN_DISTRICTS[0],
    [selectedId]);

  const runAnalysis = () => {
    const base = selectedDistrict;
    let penalty = industrialImpact === "high" ? 18 : industrialImpact === "medium" ? 8 : 0;
    let score = Math.round((simulatedCanopy * 0.7) + (base.baseHumidity * 0.4) - Math.abs(simulatedRainfall - 160) * 0.08 - penalty);
    score = Math.min(100, Math.max(12, score));
    const zone: "Green" | "Yellow" | "Red" = score >= 70 ? "Green" : score < 45 ? "Red" : "Yellow";

    const report = {
      district: base.name,
      districtId: base.id,
      province: base.province,
      lat: base.lat,
      lng: base.lng,
      score,
      zone,
      moisture: Math.min(100, Math.round((simulatedRainfall * 0.22) + (base.baseHumidity * 0.35))),
      temp: base.baseTemp,
      humidity: base.baseHumidity,
      problemNote: base.note,
      inputs: { canopy: simulatedCanopy, rainfall: simulatedRainfall, industrial: industrialImpact },
    };
    setFinalReport(report);
    setViewMode("result");
    setSaved(false);
  };

  const saveToBackend = async () => {
    if (!finalReport) return;
    setSaving(true);
    try {
      await api.post("/calculate/save", finalReport);
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-black select-none">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-xs">🗺️</div>
            <span className="font-black text-xs tracking-tight uppercase">EnviroScore-Map</span>
          </div>
          <nav className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 gap-0.5">
            {[
              { label: "Overview", path: "/dashboard" },
              { label: "Calculate Score", path: "/calculate" },
              { label: "Interactive Map", path: "/map" },
            ].map(({ label, path }) => (
              <button key={path} onClick={() => navigate(path)}
                className={`px-4 py-1.5 text-[11px] font-black rounded-full transition-all cursor-pointer ${
                  path === "/calculate" ? "bg-black text-white" : "text-gray-400 hover:text-black"
                }`}>
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => navigate('/dashboard')} className="px-3 py-1.5 text-[11px] font-black text-gray-400 hover:text-black transition-all cursor-pointer">
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {viewMode === "input" && (
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Eco Calculator</p>
              <h1 className="text-3xl font-black tracking-tight mt-0.5">District Score<br /><span className="text-gray-300">Simulator</span></h1>
              <p className="text-xs text-gray-400 mt-2">Select a district and adjust environmental parameters to calculate its ecosystem resilience score.</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

                {/* District Selector */}
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">Search District</label>
                    <input
                      type="text"
                      placeholder="Filter districts..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-black rounded-xl px-3 py-2 text-xs font-bold transition-all focus:outline-none"
                    />
                  </div>
                  <div className="overflow-y-auto border border-gray-100 rounded-xl p-1 space-y-0.5 bg-gray-50/50 max-h-[300px]">
                    {filteredDistricts.map(d => (
                      <button key={d.id} onClick={() => setSelectedId(d.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-[11px] font-bold flex justify-between items-center cursor-pointer ${
                          selectedId === d.id ? "bg-black text-white" : "text-black hover:bg-gray-100 bg-white"
                        }`}>
                        <span>{d.name}</span>
                        <span className="text-[8px] uppercase tracking-wider opacity-50">{d.province}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="md:col-span-3 space-y-5">

                  <div className="grid grid-cols-2 gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Selected District</span>
                      <span className="text-sm font-black mt-0.5 block">{selectedDistrict.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Base Temperature</span>
                      <span className="text-sm font-black mt-0.5 block">{selectedDistrict.baseTemp}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Province</span>
                      <span className="text-sm font-black mt-0.5 block">{selectedDistrict.province}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Base Humidity</span>
                      <span className="text-sm font-black mt-0.5 block">{selectedDistrict.baseHumidity}%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-black uppercase tracking-wider">Green Canopy Cover</label>
                      <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded-md">{simulatedCanopy}%</span>
                    </div>
                    <input type="range" min="5" max="100" value={simulatedCanopy} onChange={e => setSimulatedCanopy(Number(e.target.value))}
                      className="w-full accent-black h-1.5 bg-gray-100 rounded-lg cursor-pointer" />
                    <div className="flex justify-between text-[9px] text-gray-300 font-bold">
                      <span>5% (Barren)</span><span>100% (Dense Forest)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-black uppercase tracking-wider">Monthly Precipitation</label>
                      <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded-md">{simulatedRainfall}mm</span>
                    </div>
                    <input type="range" min="40" max="400" value={simulatedRainfall} onChange={e => setSimulatedRainfall(Number(e.target.value))}
                      className="w-full accent-black h-1.5 bg-gray-100 rounded-lg cursor-pointer" />
                    <div className="flex justify-between text-[9px] text-gray-300 font-bold">
                      <span>40mm (Drought)</span><span>400mm (Heavy)</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-black uppercase tracking-wider block">Industrial Footprint</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: "low", label: "Low", sub: "Rural / Eco" },
                        { val: "medium", label: "Medium", sub: "Suburban" },
                        { val: "high", label: "High", sub: "Industrial" },
                      ].map(opt => (
                        <button key={opt.val} onClick={() => setIndustrialImpact(opt.val)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            industrialImpact === opt.val
                              ? "bg-black text-white border-black"
                              : "bg-white border-gray-200 hover:border-gray-400"
                          }`}>
                          <div className="text-[11px] font-black">{opt.label}</div>
                          <div className={`text-[9px] mt-0.5 ${industrialImpact === opt.val ? "text-gray-400" : "text-gray-400"}`}>{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={runAnalysis}
                    className="w-full py-3.5 bg-black hover:bg-gray-900 text-white text-xs font-black rounded-xl tracking-widest uppercase transition-all cursor-pointer">
                    Analyze Eco-Status →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "result" && finalReport && (
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{finalReport.province} Province</p>
                <h1 className="text-3xl font-black tracking-tight mt-0.5">{finalReport.district}<br /><span className="text-gray-300">Matrix Report</span></h1>
              </div>
              <button onClick={() => setViewMode("input")}
                className="px-4 py-2 border border-black hover:bg-black hover:text-white text-black text-xs font-black rounded-full transition-all cursor-pointer">
                ← Recalculate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Score */}
              <div className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest w-full text-left mb-4">Environmental Score</span>
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none"
                      stroke={finalReport.zone === "Green" ? "#10b981" : finalReport.zone === "Yellow" ? "#f59e0b" : "#f43f5e"}
                      strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - finalReport.score / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black">{finalReport.score}</span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-400">out of 100</span>
              </div>

              {/* Zone Status */}
              <div className="md:col-span-3 bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sustainability Status</span>
                <div className="my-auto py-3">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white ${ZONE_COLORS[finalReport.zone]}`}>
                    ● {finalReport.zone} Zone
                  </div>
                  <h3 className="text-xl font-black mt-2 mb-1">
                    {finalReport.zone === "Green" && "Optimal Ecosystem Stability"}
                    {finalReport.zone === "Yellow" && "Moderate Ecological Vulnerability"}
                    {finalReport.zone === "Red" && "Severe Ecological Distress"}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{finalReport.problemNote}</p>
                </div>
                <div className="text-[9px] text-gray-300 font-black uppercase tracking-wider">SL-ECO-{finalReport.district.toUpperCase()}-{finalReport.score}</div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Soil Moisture", value: `${finalReport.moisture}%`, icon: "💧" },
                { label: "Canopy Cover", value: `${finalReport.inputs.canopy}%`, icon: "🌿" },
                { label: "Precipitation", value: `${finalReport.inputs.rainfall}mm`, icon: "🌧️" },
                { label: "Humidity", value: `${finalReport.humidity}%`, icon: "🌫️" },
              ].map(m => (
                <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <span className="text-base">{m.icon}</span>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mt-2">{m.label}</p>
                  <p className="text-xl font-black mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Save + Actions */}
            <div className="flex gap-3 flex-wrap">
              <button onClick={saveToBackend} disabled={saving || saved}
                className={`px-5 py-3 text-xs font-black rounded-full transition-all cursor-pointer ${
                  saved ? "bg-emerald-500 text-white" : "bg-black text-white hover:bg-gray-800"
                }`}>
                {saving ? "Saving..." : saved ? "✓ Saved to Database" : "Save Analysis"}
              </button>
              <button onClick={() => navigate('/map')}
                className="px-5 py-3 bg-white border border-gray-200 hover:border-black text-black text-xs font-black rounded-full transition-all cursor-pointer">
                View on Map →
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-[9px] text-gray-300 font-black uppercase tracking-widest">
        © 2026 EnviroScore Map Inc.
      </footer>
    </div>
  );
}