// ─── Analytics.jsx ─────────────────────────────────────────────────────────
// E-Barangay IMS — Analytics & Dashboard
// Drop this as the /analytics route in your existing app.
// It uses your existing Sidebar (no changes needed to Sidebar.jsx).
// Fetches from: GET /api/analytics/all  (single request, all data)
// ────────────────────────────────────────────────────────────────────────────
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from "recharts";

const response = await axios.get("http://192.168.8.159:8000/api/analytics/all");
// ─── CONFIG — change this to match your .env / vite config ──────────────────
const API_BASE = import.meta.env.VITE_API_URL ?? "http://192.168.8.159:8000/api";

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  primary:   "#1a5276",
  secondary: "#2980b9",
  accent:    "#e67e22",
  success:   "#27ae60",
  danger:    "#e74c3c",
  warning:   "#f39c12",
  purple:    "#8e44ad",
  teal:      "#16a085",
  gray:      "#7f8c8d",
  pink:      "#e84393",
};

const SECTOR_COLORS = {
  "Solo Parent":        C.teal,
  "PWD":                C.warning,
  "Senior Citizen":     C.danger,
  "LGBTQIA+":           C.purple,
  "Kasambahay":         C.success,
  "OFW":                C.accent,
  "General Population": C.primary,
  "Unclassified":       C.gray,
};

const AGE_ORDER  = ["0-17","18-25","26-35","36-50","51-59","60+"];
const INCOME_ORDER = [
  "No Income","Below 5,000","5,001-10,000","10,001-20,000",
  "20,001-30,000","20,001-40,000","30,001-40,000","30,001-50,000",
  "40,001-50,000","40,001-70,000","50,001-100,000","Above 50,000",
  "Above 100,000","0",
];

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"overview",      label:"Overview",        icon:"🏠" },
  // { id:"heatmap",       label:"Purok Heatmap",   icon:"🗺️" },
  { id:"demographics",  label:"Demographics",    icon:"👥" },
  { id:"sectors",       label:"Sectors",         icon:"📊" },
  { id:"registration",  label:"Registration",    icon:"📋" },
  { id:"livelihood",    label:"Livelihood",       icon:"💼" },
  { id:"insights",      label:"Decision Guide",  icon:"🎯" },
];

// ─── SMALL UTILITIES ─────────────────────────────────────────────────────────
function pct(part, total) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

function StatCard({ icon, label, value, sub, color = "primary", trend }) {
  const bg = {
    primary:"bg-[#1a5276]", success:"bg-[#27ae60]", warning:"bg-[#e67e22]",
    danger:"bg-[#e74c3c]",  purple:"bg-[#8e44ad]",  teal:"bg-[#16a085]",
    secondary:"bg-[#2980b9]",
  };
  return (
    <div className={`${bg[color]} text-white rounded-xl p-4 shadow-md flex flex-col gap-1 min-w-0`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {trend && <span className="text-xs font-bold bg-white/20 rounded px-2 py-0.5">{trend}</span>}
      </div>
      <div className="text-3xl font-black tracking-tight">{value ?? "—"}</div>
      <div className="text-sm font-semibold opacity-90">{label}</div>
      {sub && <div className="text-xs opacity-70">{sub}</div>}
    </div>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow border border-gray-100 ${className}`}>
      {title && <h3 className="font-black text-[#1a5276] mb-4 text-xs uppercase tracking-widest">{title}</h3>}
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-black text-[#1a5276] tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function InsightCard({ type, title, description, action, priority }) {
  const style = {
    alert:   "border-l-4 border-red-500   bg-red-50",
    warning: "border-l-4 border-orange-400 bg-orange-50",
    info:    "border-l-4 border-blue-500  bg-blue-50",
    success: "border-l-4 border-green-500 bg-green-50",
  };
  const iconMap = { alert:"🚨", warning:"⚠️", info:"💡", success:"✅" };
  const badge = {
    HIGH:   "bg-red-100 text-red-700",
    MEDIUM: "bg-orange-100 text-orange-700",
    LOW:    "bg-blue-100 text-blue-700",
  };
  return (
    <div className={`rounded-lg p-4 mb-3 ${style[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5">{iconMap[type]}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1 gap-2">
            <span className="font-bold text-gray-800 text-sm leading-tight">{title}</span>
            {priority && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${badge[priority]}`}>
                {priority}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-snug">{description}</p>
          {action && (
            <div className="mt-2 text-sm font-semibold text-[#1a5276] flex gap-1">
              <span>→</span><span>{action}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#1a5276] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── HEATMAP (Leaflet) ───────────────────────────────────────────────────────
const PUROK_BOUNDS = {
  // Purok 1 & 7: North/Northeast 
  "Purok 1": [[14.7115, 121.0375], [14.7140, 121.0405]], // Brgy Hall area
  "Purok 7": [[14.7135, 121.0360], [14.7160, 121.0390]], // Boundary side
  
  // Purok 2 & 3: Central Gulod / Forest Hills
  "Purok 2": [[14.7095, 121.0365], [14.7120, 121.0395]], 
  "Purok 3": [[14.7075, 121.0380], [14.7100, 121.0410]], 

  // Purok 5 & 6: West Side (Nitang / Villareal)
  "Purok 5": [[14.7100, 121.0330], [14.7125, 121.0365]], 
  "Purok 6": [[14.7080, 121.0310], [14.7105, 121.0345]],

  // Purok 4: South (Riverside / Santa Lucia boundary)
  "Purok 4": [[14.7050, 121.0360], [14.7075, 121.0395]],
};

function getHeatColor(value, max) {
  const r = Math.max(0, Math.min(255, Math.round(26  + (231-26)  * (value/max))));
  const g = Math.max(0, Math.min(255, Math.round(82  + (76-82)   * (value/max))));
  const b = Math.max(0, Math.min(255, Math.round(118 + (60-118)  * (value/max))));
  return `rgb(${r},${g},${b})`;
}

function PurokHeatmap({ purokData }) {
  const mapRef     = useRef(null);
  const leafletMap = useRef(null);
  const [metric, setMetric] = useState("total");

  // Build max for each metric dynamically from data
  const maxOf = (key) => Math.max(...purokData.map(p => Number(p[key]||0)), 1);

  useEffect(()=>{
    if (!mapRef.current || leafletMap.current) return;
    const L = window.L; if (!L) return;
  
const map = L.map(mapRef.current, { 
  center: [14.7127, 121.0385], // Brgy Hall coordinates
  zoom: 16 
});


L.marker([14.71275, 121.03859])
  .addTo(map)
  .bindPopup("<b>Barangay Gulod Hall</b>")
  .openPopup();
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:"© OpenStreetMap contributors", maxZoom:19,
    }).addTo(map);
    leafletMap.current = map;
    return ()=>{ map.remove(); leafletMap.current=null; };
  },[]);

  useEffect(()=>{
    const L = window.L;
    if (!L || !leafletMap.current) return;
    const map = leafletMap.current;
    map.eachLayer(l=>{ if(l._isBrgy) map.removeLayer(l); });
    const mx = maxOf(metric);
    purokData.forEach(p=>{
      const bounds = PUROK_BOUNDS[p.purok]; if(!bounds) return;
      const val = Number(p[metric]||0);
      const rect = L.rectangle(bounds,{
        color:"#1a5276", weight:2,
        fillColor: getHeatColor(val, mx),
        fillOpacity: 0.3 + 0.55*(val/mx),
      });
      rect._isBrgy = true;
      rect.bindPopup(`
        <div style="font-family:system-ui;min-width:160px">
          <b style="color:#1a5276;font-size:14px">${p.purok}</b><br/>
          <span style="color:#555">Total: <b>${p.total}</b></span><br/>
          <span style="color:#27ae60">Verified: <b>${p.verified}</b></span><br/>
          <span style="color:#f39c12">Pending: <b>${p.pending}</b></span><br/>
          <span style="color:#e74c3c">Senior Citizens: <b>${p.seniors}</b></span><br/>
          <span style="color:#8e44ad">PWD: <b>${p.pwd}</b></span><br/>
          <span style="color:#e67e22">Unregistered: <b>${p.unregistered}</b></span><hr style="margin:4px 0"/>
          <b style="color:#1a5276">${metric}: ${val}</b>
        </div>
      `);
      rect.addTo(map);
    });
  },[metric, purokData]);

  const METRIC_BTNS = [
    { key:"total",       label:"Total",       icon:"👥" },
    { key:"verified",    label:"Verified",    icon:"✅" },
    { key:"seniors",     label:"Seniors",     icon:"👴" },
    { key:"pwd",         label:"PWD",         icon:"♿" },
    { key:"unregistered",label:"Unregistered",icon:"⚠️" },
  ];

  return (
    <div>
      <SectionHeader title="Purok-Level Heatmap"
        subtitle="Barangay Gulod, Novaliches, Quezon City — click a purok for details" />
      <div className="flex gap-2 mb-4 flex-wrap">
        {METRIC_BTNS.map(m=>(
          <button key={m.key} onClick={()=>setMetric(m.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              metric===m.key
                ? "bg-[#1a5276] text-white border-[#1a5276]"
                : "bg-white text-[#1a5276] border-[#1a5276] hover:bg-blue-50"
            }`}>
            {m.icon} {m.label}
          </button>
        ))}
      </div>
      <div ref={mapRef} className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
        style={{ height:420 }} />
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {purokData.map(p=>(
          <div key={p.purok} className="rounded-lg border border-gray-200 p-3 bg-white shadow-sm">
            <div className="font-bold text-[#1a5276] text-sm">{p.purok}</div>
            <div className="text-xl font-black text-gray-800">{p[metric]??0}</div>
            <div className="text-xs text-gray-500 capitalize">
              {METRIC_BTNS.find(m=>m.key===metric)?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────
function OverviewTab({ raw }) {
  const ov  = raw.overview;
  const hm  = raw.heatmap?.puroks ?? [];
  const reg = raw.registration;

  const statusData = ov.status_breakdown ?? [];
  const genderData = (ov.gender_breakdown ?? []).map(g=>({
    name: g.gender, value: Number(g.count),
    color: g.gender==="Male" ? C.secondary : C.pink,
  }));
  const residencyData = (ov.residency_breakdown ?? []).map(r=>({
    name: r.residency_status, value: Number(r.count),
    color: r.residency_status==="Old Resident" ? C.primary : C.secondary,
  }));
  const trendData = reg?.registration_trend ?? [];

  return (
    <div className="space-y-6">
      <SectionHeader title="Barangay Overview"
        subtitle="Barangay Gulod, Novaliches, Quezon City — E-Barangay IMS" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="👥" label="Total Residents" value={ov.total_residents}
          sub={`${ov.total_households} households`} color="primary" />
        <StatCard icon="✅" label="Verified"
          value={ov.verified}
          sub={`${pct(ov.verified, ov.total_residents)}% of total`}
          color="success" />
        <StatCard icon="⏳" label="Pending"
          value={ov.pending} sub="Needs verification" color="warning" />
        <StatCard icon="🗳️" label="Voters"
          value={ov.voters} sub={`${ov.total_puroks} puroks`} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Registration Status">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                paddingAngle={3} dataKey="value">
                {statusData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip/>
              <Legend iconType="circle" iconSize={10}/>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Daily Registration Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="date" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Line type="monotone" dataKey="count" stroke={C.primary}
                strokeWidth={2.5} dot={{r:4,fill:C.primary}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Gender Distribution">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={genderData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                {genderData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Residency Type">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={residencyData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                {residencyData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Purok summary strip */}
      {hm.length > 0 && (
        <Card title="Residents per Purok — Quick View">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hm} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="purok" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Bar dataKey="total" name="Total" fill={C.primary} radius={[4,4,0,0]}/>
              <Bar dataKey="verified" name="Verified" fill={C.success} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}

// ─── DEMOGRAPHICS TAB ────────────────────────────────────────────────────────
function DemographicsTab({ raw }) {
  const demo = raw.demographics;
  const hm   = raw.heatmap?.puroks ?? [];

  // Sort age groups by predefined order
  const ageData = [...(demo.age_groups??[])].sort(
    (a,b) => AGE_ORDER.indexOf(a.age_group) - AGE_ORDER.indexOf(b.age_group)
  ).map(r=>({ group:r.age_group, count:Number(r.count) }));

  const maritalData = (demo.marital_status??[]).map(r=>({
    name:r.status, value:Number(r.count)
  }));
  const maritalColors = [C.primary,C.secondary,C.teal,C.purple,C.accent,C.gray];

  const voterRows = demo.voter_data??[];
  const voters    = Number(voterRows.find(r=>r.is_voter==1)?.count??0);
  const nonVoters = Number(voterRows.find(r=>r.is_voter==0)?.count??0);
  const voterChart = [
    { name:"Voter",     value:voters,    color:C.success },
    { name:"Non-Voter", value:nonVoters, color:C.gray },
  ];

  const housePos = (demo.household_positions??[]).map(r=>({
    name:r.household_position, count:Number(r.count)
  }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Demographic Analysis"
        subtitle="Age groups, gender, marital status, household positions" />

      <Card title="Age Group Distribution">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ageData} margin={{top:5,right:10,bottom:5,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="group" tick={{fontSize:12}}/>
            <YAxis tick={{fontSize:12}}/>
            <Tooltip formatter={v=>[`${v} residents`]}/>
            <Bar dataKey="count" radius={[6,6,0,0]}>
              {ageData.map((e,i)=>(
                <Cell key={i} fill={e.group==="60+" ? C.danger : C.secondary}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2">* Senior citizens (60+) highlighted in red</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Marital Status">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={maritalData} cx="50%" cy="50%" outerRadius={90}
                dataKey="value" paddingAngle={2}>
                {maritalData.map((e,i)=><Cell key={i} fill={maritalColors[i%maritalColors.length]}/>)}
              </Pie>
              <Tooltip/>
              <Legend iconType="circle" iconSize={10} layout="vertical"
                align="right" verticalAlign="middle"/>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Voter Status">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={voterChart} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                {voterChart.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center">
            <div className="text-center">
              <div className="text-2xl font-black text-[#27ae60]">{voters}</div>
              <div className="text-xs text-gray-500">Registered Voters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-500">{nonVoters}</div>
              <div className="text-xs text-gray-500">Non-Voters</div>
            </div>
          </div>
        </Card>

        <Card title="Household Position Breakdown">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={housePos} layout="vertical"
              margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11}}/>
              <YAxis type="category" dataKey="name" tick={{fontSize:11}} width={90}/>
              <Tooltip/>
              <Bar dataKey="count" name="Count" fill={C.secondary} radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Residents per Purok — Stacked">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={hm} layout="vertical"
              margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11}}/>
              <YAxis type="category" dataKey="purok" tick={{fontSize:11}} width={60}/>
              <Tooltip/>
              <Legend iconSize={10}/>
              <Bar dataKey="verified"     name="Verified"    stackId="a" fill={C.success}/>
              <Bar dataKey="pending"      name="Pending"     stackId="a" fill={C.warning}/>
              <Bar dataKey="rejected"     name="Rejected"    stackId="a" fill={C.danger}/>
              <Bar dataKey="unregistered" name="Unregistered" stackId="a"
                fill={C.gray} radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ─── SECTORS TAB ─────────────────────────────────────────────────────────────
function SectorsTab({ raw }) {
  const sec = raw.sectors;
  const hm  = raw.heatmap?.puroks ?? [];

  const sectorChartData = (sec.sector_counts??[]).map(r=>({
    name:  r.sector_name,
    value: Number(r.count),
    color: SECTOR_COLORS[r.sector_name] ?? C.gray,
  }));

  const seniorByPurok = (sec.seniors_by_purok??[]).map(r=>({
    purok:r.purok, count:Number(r.count)
  }));

  const pwdByPurok = (sec.pwd_by_purok??[]).map(r=>({
    purok:r.purok, count:Number(r.count)
  }));

  const topSector  = sectorChartData[0] ?? {};
  const totalPwd   = pwdByPurok.reduce((a,b)=>a+b.count,0);
  const totalSenior= seniorByPurok.reduce((a,b)=>a+b.count,0);
  const worstPurokSenior = [...seniorByPurok].sort((a,b)=>b.count-a.count)[0];

  return (
    <div className="space-y-6">
      <SectionHeader title="Sectoral Classification"
        subtitle="Sector breakdown, seniors and PWD per purok" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="👴" label="Senior Citizens" value={totalSenior}
          sub="Aged 60+" color="danger"/>
        <StatCard icon="♿" label="PWD" value={totalPwd}
          sub="Persons w/ Disability" color="warning"/>
        <StatCard icon="👨‍👧" label="Solo Parent"
          value={sectorChartData.find(s=>s.name==="Solo Parent")?.value??0}
          color="teal"/>
        <StatCard icon="🌈" label="LGBTQIA+"
          value={sectorChartData.find(s=>s.name==="LGBTQIA+")?.value??0}
          color="purple"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="All Sectors">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={sectorChartData} cx="50%" cy="50%" outerRadius={95}
                dataKey="value" paddingAngle={2}>
                {sectorChartData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[v,n]}/>
              <Legend iconType="circle" iconSize={10} layout="vertical"
                align="right" verticalAlign="middle"/>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Senior Citizens per Purok">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={seniorByPurok} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="purok" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip formatter={v=>[`${v} senior citizens`]}/>
              <Bar dataKey="count" name="Senior Citizens" fill={C.danger}
                radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
          {worstPurokSenior && (
            <p className="text-xs text-orange-500 font-semibold mt-2">
              ⚠️ {worstPurokSenior.purok} has the most seniors ({worstPurokSenior.count}) — priority for ayuda
            </p>
          )}
        </Card>

        <Card title="PWD Residents per Purok">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pwdByPurok} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="purok" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip formatter={v=>[`${v} PWD residents`]}/>
              <Bar dataKey="count" name="PWD" fill={C.warning} radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="OFW & Kasambahay per Purok">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hm} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="purok" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Legend iconSize={10}/>
              <Bar dataKey="ofw"        name="OFW"        fill={C.accent}   radius={[4,4,0,0]}/>
              <Bar dataKey="solo_parent" name="Solo Parent" fill={C.teal}    radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ─── REGISTRATION TAB ────────────────────────────────────────────────────────
function RegistrationTab({ raw }) {
  const ov  = raw.overview;
  const reg = raw.registration;
  const hm  = raw.heatmap?.puroks ?? [];

  const trend = reg?.registration_trend ?? [];
  const purokVerif = reg?.purok_verification ?? [];

  const unregByPurok = hm.map(p=>({
    purok:p.purok,
    unregistered:Number(p.unregistered||0),
    total:Number(p.total||0),
    pct: pct(Number(p.unregistered||0), Number(p.total||0)),
  }));
  const worstUnreg = [...unregByPurok].sort((a,b)=>b.unregistered-a.unregistered)[0];

  const avgTime = reg?.avg_verification_time;
  const birthReg = reg?.birth_registration ?? [];
  const birthData = birthReg.map(r=>({
    name:r.birth_registration, value:Number(r.count),
    color: r.birth_registration==="Registered" ? C.success : C.danger,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Registration & Verification"
        subtitle="Submissions, approvals, pending and unregistered tracking" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="📋" label="Total Submissions" value={ov.total_residents} color="primary"/>
        <StatCard icon="✅" label="Verified"
          value={ov.verified} sub={`${pct(ov.verified,ov.total_residents)}%`}
          color="success"/>
        <StatCard icon="⏳" label="Pending"
          value={ov.pending} sub="Needs staff action" color="warning"/>
        <StatCard icon="❌" label="Rejected"
          value={ov.rejected} sub="Resubmission needed" color="danger"/>
      </div>

      {avgTime && (
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-black text-[#1a5276]">
                {avgTime.avg_hours ? `${Math.round(avgTime.avg_hours)}h` : "—"}
              </div>
              <div className="text-xs text-gray-500">Avg. Verification Time</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-black text-[#27ae60]">
                {avgTime.min_hours ? `${Math.round(avgTime.min_hours)}h` : "—"}
              </div>
              <div className="text-xs text-gray-500">Fastest Verification</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl font-black text-[#e74c3c]">
                {avgTime.max_hours ? `${Math.round(avgTime.max_hours)}h` : "—"}
              </div>
              <div className="text-xs text-gray-500">Slowest Verification</div>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Daily Registration Count">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trend} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="date" tick={{fontSize:10}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Bar dataKey="count" name="Registrations"
                fill={C.primary} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Unregistered Residents by Purok">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={unregByPurok} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="purok" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip formatter={(v,n,{payload})=>[
                `${v} (${payload?.pct}%)`,n
              ]}/>
              <Bar dataKey="unregistered" name="Unregistered"
                fill={C.accent} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
          {worstUnreg && (
            <p className="text-xs text-orange-500 font-semibold mt-2">
              ⚠️ {worstUnreg.purok} has most unregistered ({worstUnreg.unregistered}, {worstUnreg.pct}%)
            </p>
          )}
        </Card>

        <Card title="Verification Status per Purok">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={purokVerif} layout="vertical"
              margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11}}/>
              <YAxis type="category" dataKey="purok" tick={{fontSize:11}} width={60}/>
              <Tooltip/>
              <Legend iconSize={10}/>
              <Bar dataKey="verified"  name="Verified"  stackId="a" fill={C.success}/>
              <Bar dataKey="pending"   name="Pending"   stackId="a" fill={C.warning}/>
              <Bar dataKey="rejected"  name="Rejected"  stackId="a"
                fill={C.danger} radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {birthData.length > 0 && (
          <Card title="Birth Registration Status">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={birthData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                  label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                  {birthData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── LIVELIHOOD TAB ───────────────────────────────────────────────────────────
function LivelihoodTab({ raw }) {
  const lv = raw.livelihood;

  // Income — sort by logical order
  const incomeRaw = (lv.income_distribution??[]);
  const incomeData = incomeRaw
    .map(r=>({ bracket:r.bracket, count:Number(r.count) }))
    .sort((a,b)=>{
      const ia = INCOME_ORDER.indexOf(a.bracket);
      const ib = INCOME_ORDER.indexOf(b.bracket);
      return (ia<0?999:ia) - (ib<0?999:ib);
    });

  const totalIncome = incomeData.reduce((a,b)=>a+b.count,0);
  const lowIncome   = incomeData
    .filter(r=>["No Income","Below 5,000","0"].includes(r.bracket))
    .reduce((a,b)=>a+b.count,0);

  const employData = (lv.employment_status??[]).map(r=>({
    status:r.status, count:Number(r.count)
  }));

  const eduData = (lv.education_level??[]).map(r=>({
    level:r.level, count:Number(r.count)
  }));

  const srcData = (lv.income_source??[]).map(r=>({
    name:r.source, value:Number(r.count),
  }));
  const srcColors = [C.primary,C.secondary,C.teal,C.accent,C.purple,C.gray];

  const topOcc = (lv.top_occupations??[]).slice(0,8).map(r=>({
    occupation:r.occupation, count:Number(r.count)
  }));

  const schoolType = (lv.school_type??[]).map(r=>({
    name:r.type, value:Number(r.count),
    color: r.type==="Public" ? C.primary : C.accent,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Livelihood & Socioeconomic Profile"
        subtitle="Income, employment, education, occupations" />

      <Card title="Monthly Income Distribution">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={incomeData} margin={{top:5,right:10,bottom:5,left:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
            <XAxis dataKey="bracket" tick={{fontSize:9}} interval={0}
              angle={-30} textAnchor="end" height={55}/>
            <YAxis tick={{fontSize:11}}/>
            <Tooltip/>
            <Bar dataKey="count" name="Residents" radius={[4,4,0,0]}>
              {incomeData.map((e,i)=>{
                const isLow = ["No Income","Below 5,000","0"].includes(e.bracket);
                const isMid = ["5,001-10,000","10,001-20,000","20,001-30,000","20,001-40,000"].includes(e.bracket);
                return <Cell key={i} fill={isLow ? C.danger : isMid ? C.warning : C.success}/>;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {lowIncome > 0 && (
          <p className="text-xs text-red-500 font-semibold mt-2">
            🔴 {lowIncome} residents ({pct(lowIncome,totalIncome)}%) have no income or below ₱5k/mo — qualify for livelihood programs
          </p>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Employment Status">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={employData} layout="vertical"
              margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11}}/>
              <YAxis type="category" dataKey="status" tick={{fontSize:11}} width={90}/>
              <Tooltip/>
              <Bar dataKey="count" name="Residents" fill={C.secondary}
                radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Educational Attainment">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={eduData} margin={{top:5,right:10,bottom:5,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="level" tick={{fontSize:9}} interval={0}
                angle={-25} textAnchor="end" height={50}/>
              <YAxis tick={{fontSize:11}}/>
              <Tooltip/>
              <Bar dataKey="count" name="Residents" fill={C.purple}
                radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {srcData.length > 0 && (
          <Card title="Income Source">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={srcData} cx="50%" cy="50%" outerRadius={85}
                  dataKey="value" paddingAngle={2}>
                  {srcData.map((e,i)=><Cell key={i} fill={srcColors[i%srcColors.length]}/>)}
                </Pie>
                <Tooltip/>
                <Legend iconType="circle" iconSize={10} layout="vertical"
                  align="right" verticalAlign="middle"/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {schoolType.length > 1 && (
          <Card title="School Type (Public vs Private)">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={schoolType} cx="50%" cy="50%" outerRadius={80}
                  dataKey="value"
                  label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                  {schoolType.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {topOcc.length > 0 && (
          <Card title="Top Occupations" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topOcc} margin={{top:5,right:10,bottom:5,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="occupation" tick={{fontSize:10}}/>
                <YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Bar dataKey="count" name="Residents" fill={C.teal}
                  radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── DECISION GUIDE TAB ───────────────────────────────────────────────────────
function InsightsTab({ raw }) {
  const ins = raw.insights;
  const insights  = ins?.insights  ?? [];
  const summary   = ins?.summary   ?? {};

  return (
    <div className="space-y-6">
      <SectionHeader title="Decision Guide & Actionable Insights"
        subtitle="Data-driven analysis and recommended actions for barangay officials" />

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-center">
          <div className="text-2xl font-black text-red-600">
            {summary.high_priority ?? insights.filter(i=>i.priority==="HIGH").length}
          </div>
          <div className="text-xs font-bold text-red-500 uppercase">High Priority</div>
        </div>
        <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-center">
          <div className="text-2xl font-black text-orange-500">
            {summary.medium_priority ?? insights.filter(i=>i.priority==="MEDIUM").length}
          </div>
          <div className="text-xs font-bold text-orange-400 uppercase">Medium</div>
        </div>
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-center">
          <div className="text-2xl font-black text-blue-500">
            {summary.low_priority ?? insights.filter(i=>i.priority==="LOW").length}
          </div>
          <div className="text-xs font-bold text-blue-400 uppercase">Monitoring</div>
        </div>
      </div>

      {["HIGH","MEDIUM","LOW"].map(pri=>{
        const filtered = insights.filter(i=>i.priority===pri);
        if (!filtered.length) return null;
        const label = { HIGH:"🚨 High Priority Actions",
          MEDIUM:"⚠️ Medium Priority Actions", LOW:"💡 For Monitoring" }[pri];
        const cls = { HIGH:"text-red-600", MEDIUM:"text-orange-500", LOW:"text-blue-500" }[pri];
        return (
          <div key={pri}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-2 ${cls}`}>
              {label}
            </h3>
            {filtered.map((ins,idx)=>(
              <InsightCard key={idx} {...ins}/>
            ))}
          </div>
        );
      })}

      {insights.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-sm">No insights generated yet. Check that the backend is returning data.</p>
        </div>
      )}

      {summary.computed_at && (
        <p className="text-xs text-gray-400 text-right mt-4">
          Computed: {new Date(summary.computed_at).toLocaleString("en-PH")}
        </p>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab]   = useState("overview");
  const [data, setData]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [leafletReady, setLeafletReady] = useState(false);
  const [lastUpdated, setLastUpdated]   = useState(null);

  // ── Fetch all analytics in one shot ──────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/analytics/all`, {
        headers: {
          "Accept": "application/json",
          // If you use Sanctum token auth, uncomment and pass your token:
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include", // for session-based auth
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ fetchData(); },[]);

  // ── Load Leaflet dynamically ──────────────────────────────────────────────
  useEffect(()=>{
    if (window.L) { setLeafletReady(true); return; }
    const link = document.createElement("link");
    link.rel   = "stylesheet";
    link.href  = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);
    const script   = document.createElement("script");
    script.src     = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload  = ()=>setLeafletReady(true);
    document.head.appendChild(script);
  },[]);

  // ── Render active tab ─────────────────────────────────────────────────────
  const renderTab = () => {
    if (!data) return null;
    switch(activeTab) {
      case "overview":     return <OverviewTab      raw={data}/>;
      case "heatmap":      return leafletReady
        ? <PurokHeatmap purokData={data.heatmap?.puroks ?? []}/>
        : <Spinner/>;
      case "demographics": return <DemographicsTab  raw={data}/>;
      case "sectors":      return <SectorsTab        raw={data}/>;
      case "registration": return <RegistrationTab  raw={data}/>;
      case "livelihood":   return <LivelihoodTab     raw={data}/>;
      case "insights":     return <InsightsTab       raw={data}/>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen" style={{background:"#f0f4f8", fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3
        flex items-center justify-between">
        <div>
          <h1 className="text-base font-black text-[#0d2b4e]">
            {TABS.find(t=>t.id===activeTab)?.icon}{" "}
            Analytics — {TABS.find(t=>t.id===activeTab)?.label}
          </h1>
          <p className="text-xs text-gray-400">
            {lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString("en-PH")} · Barangay Gulod`
              : "Barangay Gulod, Novaliches, Quezon City"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!loading && !error && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs bg-green-50
              text-green-600 border border-green-200 rounded-full px-3 py-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"/>
              Live
            </span>
          )}
          <button onClick={fetchData} disabled={loading}
            className="text-xs font-bold bg-[#1a5276] text-white px-3 py-1.5 rounded-lg
              hover:bg-[#154360] disabled:opacity-50 transition-colors flex items-center gap-1">
            {loading ? (
              <><span className="animate-spin inline-block">⟳</span> Loading…</>
            ) : "⟳ Refresh"}
          </button>
        </div>
      </header>

      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {TABS.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
              className={`px-3 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab===tab.id
                  ? "border-[#1a5276] text-[#1a5276]"
                  : "border-transparent text-gray-500 hover:text-[#1a5276] hover:border-gray-300"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-[#1a5276] border-t-transparent
              rounded-full animate-spin"/>
            <p className="text-gray-500 text-sm font-medium">Loading analytics data…</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">⚠️</div>
            <h3 className="font-black text-red-700 text-lg mb-1">Cannot load data</h3>
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
            <div className="text-xs text-red-500 bg-red-100 rounded p-3 mb-4 text-left font-mono">
              Endpoint: GET {API_BASE}/analytics/all<br/>
              Check: CORS headers, auth token, server running
            </div>
            <button onClick={fetchData}
              className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-sm
                hover:bg-red-700 transition-colors">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data && renderTab()}
      </main>
    </div>
  );
}