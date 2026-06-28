import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

// District data with coords and default scores
const DISTRICTS = [
  { id: "colombo", name: "Colombo", province: "Western", lat: 6.9271, lng: 79.8612, score: 52, zone: "Yellow" as const, note: "High urban density. Green canopy below threshold." },
  { id: "gampaha", name: "Gampaha", province: "Western", lat: 7.0917, lng: 80.0, score: 55, zone: "Yellow" as const, note: "Rapid industrial expansion threatening groundwater." },
  { id: "kalutara", name: "Kalutara", province: "Western", lat: 6.5854, lng: 79.9607, score: 78, zone: "Green" as const, note: "Excellent wet zone stability. Minor erosion risk." },
  { id: "kandy", name: "Kandy", province: "Central", lat: 7.2906, lng: 80.6337, score: 67, zone: "Green" as const, note: "Montane micro-climate with localized air quality issues." },
  { id: "matale", name: "Matale", province: "Central", lat: 7.4675, lng: 80.6234, score: 61, zone: "Yellow" as const, note: "Agriculture and forest transition zone." },
  { id: "nuwaraeliya", name: "Nuwara Eliya", province: "Central", lat: 6.9497, lng: 80.7891, score: 82, zone: "Green" as const, note: "High-altitude cloud forest. Outstanding carbon sink." },
  { id: "galle", name: "Galle", province: "Southern", lat: 6.0535, lng: 80.2210, score: 71, zone: "Green" as const, note: "Coastal reef ecosystem. Urban coastline pressure rising." },
  { id: "matara", name: "Matara", province: "Southern", lat: 5.9549, lng: 80.5550, score: 65, zone: "Green" as const, note: "Coastal erosion from tourism pressure increasing." },
  { id: "hambantota", name: "Hambantota", province: "Southern", lat: 6.1241, lng: 81.1185, score: 48, zone: "Yellow" as const, note: "Port development threatening mangrove ecosystems." },
  { id: "jaffna", name: "Jaffna", province: "Northern", lat: 9.6615, lng: 80.0255, score: 34, zone: "Red" as const, note: "CRITICAL: Arid limestone zone. Severe drought stress." },
  { id: "kilinochchi", name: "Kilinochchi", province: "Northern", lat: 9.3803, lng: 80.4037, score: 43, zone: "Yellow" as const, note: "Post-conflict recovery. Land degradation significant." },
  { id: "mannar", name: "Mannar", province: "Northern", lat: 8.9810, lng: 79.9044, score: 38, zone: "Red" as const, note: "CRITICAL: Salt mining destroying wetland habitats." },
  { id: "mullaitivu", name: "Mullaitivu", province: "Northern", lat: 9.2671, lng: 80.8128, score: 56, zone: "Yellow" as const, note: "Lagoon recovery zone. Reforestation targets needed." },
  { id: "vavuniya", name: "Vavuniya", province: "Northern", lat: 8.7514, lng: 80.4971, score: 44, zone: "Yellow" as const, note: "Vanni forest belt encroachment growing concern." },
  { id: "batticaloa", name: "Batticaloa", province: "Eastern", lat: 7.7170, lng: 81.7004, score: 57, zone: "Yellow" as const, note: "Lagoon salinity stress. Mangrove degradation." },
  { id: "ampara", name: "Ampara", province: "Eastern", lat: 7.2997, lng: 81.6747, score: 62, zone: "Yellow" as const, note: "Seasonal flooding threatening fertile basin zones." },
  { id: "trincomalee", name: "Trincomalee", province: "Eastern", lat: 8.5874, lng: 81.2152, score: 59, zone: "Yellow" as const, note: "Marine pollution from shipping traffic." },
  { id: "kurunegala", name: "Kurunegala", province: "North Western", lat: 7.4818, lng: 80.3609, score: 58, zone: "Yellow" as const, note: "Mono-crop agriculture reducing soil biodiversity." },
  { id: "puttalam", name: "Puttalam", province: "North Western", lat: 8.0362, lng: 79.8283, score: 47, zone: "Yellow" as const, note: "Prawn farming degrading wetland habitats." },
  { id: "anuradhapura", name: "Anuradhapura", province: "North Central", lat: 8.3114, lng: 80.4037, score: 39, zone: "Red" as const, note: "CRITICAL: Chronic dry spells. Critical soil moisture management." },
  { id: "polonnaruwa", name: "Polonnaruwa", province: "North Central", lat: 7.9403, lng: 81.0188, score: 46, zone: "Yellow" as const, note: "Tank siltation and catchment deforestation." },
  { id: "badulla", name: "Badulla", province: "Uva", lat: 6.9934, lng: 81.0550, score: 64, zone: "Yellow" as const, note: "Tea monoculture degrading biodiversity corridors." },
  { id: "moneragala", name: "Moneragala", province: "Uva", lat: 6.8728, lng: 81.3507, score: 53, zone: "Yellow" as const, note: "Elephant corridor fragmentation escalating." },
  { id: "ratnapura", name: "Ratnapura", province: "Sabaragamuwa", lat: 6.6828, lng: 80.4005, score: 60, zone: "Yellow" as const, note: "Gem mining causing severe river sedimentation." },
  { id: "kegalle", name: "Kegalle", province: "Sabaragamuwa", lat: 7.2513, lng: 80.3464, score: 66, zone: "Green" as const, note: "Landslide risk increasing with slope deforestation." },
];

type Zone = "Green" | "Yellow" | "Red";

const ZONE_HEX: Record<Zone, string> = {
  Green: "#10b981",
  Yellow: "#f59e0b",
  Red: "#f43f5e",
};

export default function InteractiveMap() {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<typeof DISTRICTS[0] | null>(null);
  const [filterZone, setFilterZone] = useState<Zone | "All">("All");
  const [dbScores, setDbScores] = useState<Record<string, number>>({});
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load saved scores from backend
  useEffect(() => {
    api.get("/calculate/all").then(res => {
      const map: Record<string, number> = {};
      res.data.forEach((item: any) => { map[item.districtId] = item.score; });
      setDbScores(map);
    }).catch(() => {});
  }, []);

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      if ((window as any).L) { setLeafletLoaded(true); return; }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => setLeafletLoaded(true);
      document.head.appendChild(script);
    };
    loadLeaflet();
  }, []);

  // Init map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || mapRef.current) return;
    const L = (window as any).L;

    const map = L.map(mapContainerRef.current, {
      center: [7.8731, 80.7718],
      zoom: 7,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    const visibleDistricts = filterZone === "All" ? DISTRICTS : DISTRICTS.filter(d => d.zone === filterZone);

    visibleDistricts.forEach(district => {
      const score = dbScores[district.id] ?? district.score;
      const zone: Zone = score >= 70 ? "Green" : score < 45 ? "Red" : "Yellow";
      const color = ZONE_HEX[zone];

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 36px; height: 36px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 12px rgba(0,0,0,0.25);
            display: flex; align-items: center; justify-content: center;
            font-weight: 900; font-size: 11px; color: white;
            font-family: sans-serif;
          ">${score}</div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([district.lat, district.lng], { icon });

      marker.bindPopup(`
        <div style="font-family:sans-serif; min-width:200px; padding:4px 0">
          <div style="font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#999; margin-bottom:4px">${district.province} Province</div>
          <div style="font-size:16px; font-weight:900; color:#111; margin-bottom:8px">${district.name}</div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px">
            <span style="background:${color}; color:white; font-size:9px; font-weight:900; padding:3px 8px; border-radius:20px; text-transform:uppercase">● ${zone} Zone</span>
            <span style="font-size:20px; font-weight:900; color:#111">${score}<span style="font-size:10px; color:#ccc">/100</span></span>
          </div>
          <div style="font-size:11px; color:#666; line-height:1.5">${district.note}</div>
        </div>
      `, { maxWidth: 260 });

      marker.on("click", () => setSelectedDistrict({ ...district, score, zone }));
      marker.addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [leafletLoaded, dbScores, filterZone]);

  const filteredDistricts = filterZone === "All" ? DISTRICTS : DISTRICTS.filter(d => d.zone === filterZone);
  const greenCount = DISTRICTS.filter(d => (dbScores[d.id] ?? d.score) >= 70).length;
  const redCount = DISTRICTS.filter(d => (dbScores[d.id] ?? d.score) < 45).length;
  const yellowCount = DISTRICTS.length - greenCount - redCount;

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-black select-none flex flex-col">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 flex-shrink-0">
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
                  path === "/map" ? "bg-black text-white" : "text-gray-400 hover:text-black"
                }`}>
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => navigate('/calculate')} className="px-3 py-1.5 text-[11px] font-black text-gray-400 hover:text-black transition-all cursor-pointer">
            + Add Score
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>

        {/* SIDEBAR */}
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col overflow-hidden flex-shrink-0">

          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Live Map</p>
              <h2 className="text-sm font-black">Sri Lanka Environmental</h2>
              <h2 className="text-sm font-black text-gray-300">Destruction Zones</h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Green", count: greenCount, color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
                { label: "Yellow", count: yellowCount, color: "bg-amber-50 text-amber-600", dot: "bg-amber-400" },
                { label: "Red", count: redCount, color: "bg-rose-50 text-rose-600", dot: "bg-rose-500" },
              ].map(s => (
                <div key={s.label} className={`${s.color} rounded-lg p-2 text-center`}>
                  <div className="text-lg font-black">{s.count}</div>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                    <span className="text-[9px] font-black uppercase">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-1">
              {(["All", "Green", "Yellow", "Red"] as const).map(z => (
                <button key={z} onClick={() => { setFilterZone(z); mapRef.current = null; }}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all cursor-pointer ${
                    filterZone === z ? "bg-black text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}>
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Map Legend</p>
            <div className="space-y-1.5">
              {[
                { color: "bg-rose-500", label: "Red Zone", desc: "Score < 45 — Critical destruction" },
                { color: "bg-amber-400", label: "Yellow Zone", desc: "Score 45–69 — Moderate risk" },
                { color: "bg-emerald-500", label: "Green Zone", desc: "Score ≥ 70 — Stable ecosystem" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0 mt-0.5`}></span>
                  <div>
                    <span className="text-[10px] font-black block">{item.label}</span>
                    <span className="text-[9px] text-gray-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District List */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredDistricts
              .sort((a, b) => (dbScores[a.id] ?? a.score) - (dbScores[b.id] ?? b.score))
              .map(d => {
                const score = dbScores[d.id] ?? d.score;
                const zone: Zone = score >= 70 ? "Green" : score < 45 ? "Red" : "Yellow";
                const dotColor = zone === "Green" ? "bg-emerald-500" : zone === "Red" ? "bg-rose-500" : "bg-amber-400";
                return (
                  <button key={d.id} onClick={() => setSelectedDistrict({ ...d, score, zone })}
                    className={`w-full text-left px-3 py-2.5 rounded-xl mb-0.5 transition-all cursor-pointer ${
                      selectedDistrict?.id === d.id ? "bg-black text-white" : "hover:bg-gray-50"
                    }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}></span>
                        <span className="text-[11px] font-black">{d.name}</span>
                      </div>
                      <span className={`text-[11px] font-black ${selectedDistrict?.id === d.id ? "text-white" : zone === "Red" ? "text-rose-500" : zone === "Green" ? "text-emerald-600" : "text-amber-600"}`}>
                        {score}
                      </span>
                    </div>
                    <p className={`text-[9px] ml-4 mt-0.5 truncate ${selectedDistrict?.id === d.id ? "text-gray-400" : "text-gray-400"}`}>
                      {d.province}
                    </p>
                  </button>
                );
              })}
          </div>
        </aside>

        {/* MAP AREA */}
        <div className="flex-1 relative">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Info Panel */}
          {selectedDistrict && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] z-[1000]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{selectedDistrict.province} Province</p>
                  <h3 className="text-lg font-black">{selectedDistrict.name}</h3>
                </div>
                <button onClick={() => setSelectedDistrict(null)} className="text-gray-400 hover:text-black text-lg cursor-pointer">×</button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl font-black">{selectedDistrict.score}</div>
                <div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black text-white ${
                    selectedDistrict.zone === "Green" ? "bg-emerald-500" : selectedDistrict.zone === "Red" ? "bg-rose-500" : "bg-amber-400"
                  }`}>
                    ● {selectedDistrict.zone} Zone
                  </div>
                  <p className="text-[9px] text-gray-400 mt-1">/100 environmental score</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{selectedDistrict.note}</p>
              <button onClick={() => navigate('/calculate')}
                className="w-full py-2 bg-black text-white text-[10px] font-black rounded-full cursor-pointer hover:bg-gray-800 transition-all">
                Run New Analysis for {selectedDistrict.name} →
              </button>
            </div>
          )}

          {/* Loading overlay */}
          {!leafletLoaded && (
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-50">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Loading Map...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}