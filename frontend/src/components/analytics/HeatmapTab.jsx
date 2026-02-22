// ============================================================
// HeatmapTab.jsx
// Purok heatmap: toggle between Map View (Leaflet circles)
// and Table View (color matrix). No polygons used.
// Imports ONLY from: './analyticsConfig' and './AnalyticsUI'
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { SectionHeader, Card, EmptyState } from './AnalyticsInterface';
import {
  BARANGAY_BOUNDARY,
  BARANGAY_CENTER,
  PUROK_CENTERS,
  HEATMAP_METRICS,
  COLORS,
  getHeatColor,
  calcVerifRate,
} from './analyticsConfig';

// ─── MAP VIEW — Leaflet circles, one per purok ────────────────
function HeatmapMap({ purokData, metric }) {
  const mapRef     = useRef(null);
  const leafletRef = useRef(null);
  const layersRef  = useRef([]);

  const metricMeta = HEATMAP_METRICS.find(m => m.key === metric) ?? HEATMAP_METRICS[0];
  const maxVal = Math.max(...purokData.map(p => Number(p[metric] ?? 0)), 1);

  // Init map once
  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, { center: BARANGAY_CENTER, zoom: 15 });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', maxZoom: 19,
    }).addTo(map);

    // Barangay outline
    L.polygon(BARANGAY_BOUNDARY, {
      color: '#1a5276', weight: 2.5, fillOpacity: 0.04, dashArray: '6 4',
    }).addTo(map).bindTooltip('Barangay Gulod, Novaliches, QC');

    // Hall marker
    const hallIcon = L.divIcon({
      html: `<div style="background:#1a5276;color:#fff;border-radius:50%;width:26px;height:26px;
        display:flex;align-items:center;justify-content:center;font-size:13px;
        border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)">🏛️</div>`,
      iconSize: [26, 26], iconAnchor: [13, 13], className: '',
    });
    L.marker(BARANGAY_CENTER, { icon: hallIcon })
      .addTo(map)
      .bindPopup('<b>Barangay Gulod Hall</b><br/>Novaliches, Quezon City');

    leafletRef.current = map;
    return () => { map.remove(); leafletRef.current = null; };
  }, []);

  // Redraw circles when metric changes
  useEffect(() => {
    const L = window.L;
    if (!L || !leafletRef.current) return;
    const map = leafletRef.current;

    layersRef.current.forEach(l => map.removeLayer(l));
    layersRef.current = [];

    purokData.forEach(p => {
      const meta = PUROK_CENTERS[p.purok];
      if (!meta) return;

      const val    = Number(p[metric] ?? 0);
      const fill   = getHeatColor(val, maxVal, 0.72);
      const radius = 100 + (val / maxVal) * 160; // 100–260m
      const rate   = calcVerifRate(p);
      const rateColor = rate >= 80 ? '#27ae60' : rate >= 50 ? '#f39c12' : '#e74c3c';

      const popup = `
        <div style="font-family:system-ui;min-width:210px;font-size:12.5px">
          <div style="font-weight:900;color:#1a5276;font-size:15px;margin-bottom:8px;
            border-bottom:2px solid #eee;padding-bottom:5px">${p.purok}</div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:2px 0;color:#555">Total</td>
                <td style="font-weight:800;text-align:right">${Number(p.total ?? 0).toLocaleString()}</td></tr>
            <tr><td style="padding:2px 0;color:#27ae60">✅ Verified</td>
                <td style="font-weight:800;text-align:right;color:#27ae60">${p.verified ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#f39c12">⏳ Pending</td>
                <td style="font-weight:800;text-align:right;color:#f39c12">${p.pending ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#e74c3c">❌ Rejected</td>
                <td style="font-weight:800;text-align:right;color:#e74c3c">${p.rejected ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#e67e22">⚠️ Unregistered</td>
                <td style="font-weight:800;text-align:right;color:#e67e22">${p.unregistered ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#e74c3c">👴 Seniors</td>
                <td style="font-weight:800;text-align:right">${p.seniors ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#f39c12">♿ PWD</td>
                <td style="font-weight:800;text-align:right">${p.pwd ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#8e44ad">🧒 Minors</td>
                <td style="font-weight:800;text-align:right">${p.minors ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#16a085">🗳️ Voters</td>
                <td style="font-weight:800;text-align:right">${p.voters ?? 0}</td></tr>
          </table>
          <div style="margin-top:8px;background:#f0f7ff;border-radius:8px;padding:8px;text-align:center">
            <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase">
              Verif. Rate (submitted only)
            </div>
            <div style="font-size:22px;font-weight:900;color:${rateColor}">${rate}%</div>
          </div>
          <div style="margin-top:6px;background:#1a5276;border-radius:8px;padding:6px 10px;
            text-align:center;color:white;font-weight:900;font-size:12px">
            ${metricMeta.icon} ${metricMeta.label}: ${val}
          </div>
        </div>`;

      const circle = L.circle(meta.center, {
        radius, color: '#1a5276', weight: 1.5, fillColor: fill, fillOpacity: 0.72,
      }).bindPopup(popup);

      circle.on('mouseover', function () { this.setStyle({ weight: 3, fillOpacity: 0.9 }); });
      circle.on('mouseout',  function () { this.setStyle({ weight: 1.5, fillOpacity: 0.72 }); });

      // Label
      const labelIcon = L.divIcon({
        html: `<div style="background:rgba(26,82,118,.85);color:#fff;border-radius:20px;
          padding:2px 10px;font-size:11px;font-weight:900;white-space:nowrap;
          border:1.5px solid rgba(255,255,255,.4);pointer-events:none;
          box-shadow:0 2px 6px rgba(0,0,0,.25)">${p.purok} · ${val}</div>`,
        className: '', iconAnchor: [45, 12],
      });
      const label = L.marker(meta.center, { icon: labelIcon, interactive: false });

      circle.addTo(map);
      label.addTo(map);
      layersRef.current.push(circle, label);
    });
  }, [metric, purokData, maxVal, metricMeta]);

  return (
    <div ref={mapRef}
      className="w-full rounded-xl overflow-hidden shadow border border-gray-200"
      style={{ height: 480 }}
    />
  );
}

// ─── TABLE VIEW — color matrix ────────────────────────────────
const TABLE_ROWS = [
  { key: 'total',        label: 'Total',          icon: '👥', color: [26, 82, 118]   },
  { key: 'verified',     label: 'Verified',        icon: '✅', color: [39, 174, 96]   },
  { key: 'pending',      label: 'Pending',         icon: '⏳', color: [243, 156, 18]  },
  { key: 'rejected',     label: 'Rejected',        icon: '❌', color: [231, 76, 60]   },
  { key: 'unregistered', label: 'Unregistered',    icon: '⚠️', color: [230, 126, 34]  },
  { key: 'seniors',      label: 'Senior Citizens', icon: '👴', color: [231, 76, 60]   },
  { key: 'pwd',          label: 'PWD',             icon: '♿', color: [243, 156, 18]  },
  { key: 'minors',       label: 'Minors (<18)',    icon: '🧒', color: [142, 68, 173]  },
  { key: 'voters',       label: 'Voters',          icon: '🗳️', color: [22, 160, 133]  },
  { key: 'ofw',          label: 'OFW',             icon: '✈️', color: [41, 128, 185]  },
  { key: 'solo_parent',  label: 'Solo Parent',     icon: '👩‍👦', color: [22, 160, 133]  },
  { key: 'kasambahay',   label: 'Kasambahay',      icon: '🏠', color: [39, 174, 96]   },
];

function HeatmapTable({ purokData }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-max text-sm border-collapse">
        <thead>
          <tr className="bg-[#1a5276] text-white">
            <th className="px-5 py-3 text-left font-black text-xs uppercase tracking-wider sticky left-0 bg-[#1a5276]">
              Indicator
            </th>
            {purokData.map(p => (
              <th key={p.purok} className="px-4 py-3 text-center font-black text-xs uppercase min-w-[90px]">
                {p.purok}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((row, ri) => {
            const rowMax = Math.max(...purokData.map(p => Number(p[row.key] ?? 0)), 1);
            const [r, g, b] = row.color;
            return (
              <tr key={row.key} className={ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-5 py-2.5 font-bold text-gray-700 whitespace-nowrap sticky left-0 bg-inherit border-r border-gray-100">
                  {row.icon} {row.label}
                </td>
                {purokData.map(p => {
                  const val   = Number(p[row.key] ?? 0);
                  const alpha = val > 0 ? 0.12 + 0.72 * (val / rowMax) : 0;
                  return (
                    <td key={p.purok}
                      className="px-4 py-2.5 text-center font-black text-sm"
                      style={{ backgroundColor: `rgba(${r},${g},${b},${alpha})`, color: val > 0 ? '#111' : '#bbb' }}>
                      {val > 0 ? val : '—'}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Verification rate — submitted only */}
          <tr className="bg-blue-50 border-t-2 border-[#1a5276]">
            <td className="px-5 py-2.5 font-black text-[#1a5276] whitespace-nowrap sticky left-0 bg-blue-50 border-r border-blue-100">
              📈 Verif. Rate*
            </td>
            {purokData.map(p => {
              const rate  = calcVerifRate(p);
              const color = rate >= 80 ? '#27ae60' : rate >= 50 ? '#f39c12' : '#e74c3c';
              return (
                <td key={p.purok} className="px-4 py-2.5 text-center font-black text-sm" style={{ color }}>
                  {rate}%
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div className="px-5 py-2.5 bg-blue-50 border-t border-blue-100 text-[11px] text-blue-600 font-semibold">
        * Verif. Rate = Verified ÷ (Verified + Pending + Rejected). Unregistered excluded — they never submitted.
      </div>
    </div>
  );
}

// ─── MAIN HEATMAP TAB ─────────────────────────────────────────
export default function HeatmapTab({ raw }) {
  const purokData = raw?.heatmap?.puroks ?? [];
  const [metric, setMetric]   = useState('verified');
  const [view, setView]       = useState('map');
  const [leafletReady, setLeafletReady] = useState(!!window.L);

  // Lazy-load Leaflet only when map view is active
  useEffect(() => {
    if (view !== 'map' || window.L) { setLeafletReady(!!window.L); return; }
    const link = document.createElement('link');
    link.rel   = 'stylesheet';
    link.href  = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    const script    = document.createElement('script');
    script.src      = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload   = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, [view]);

  if (!purokData.length) return <EmptyState message="No purok data available." />;

  const maxVal = Math.max(...purokData.map(p => Number(p[metric] ?? 0)), 1);

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Purok Heatmap"
        subtitle="Barangay Gulod, Novaliches, Quezon City — click a purok for details"
      />

      {/* View toggle */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {[
            { key: 'map',   label: '🗺️ Map View'   },
            { key: 'table', label: '📊 Table View' },
          ].map(v => (
            <button key={v.key} onClick={() => setView(v.key)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                view === v.key
                  ? 'bg-[#1a5276] text-white border-[#1a5276]'
                  : 'bg-white text-[#1a5276] border-[#1a5276] hover:bg-blue-50'
              }`}>
              {v.label}
            </button>
          ))}
        </div>

        {/* Color legend */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Low</span>
          <div className="flex h-3 w-28 rounded overflow-hidden">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
              <div key={i} className="flex-1" style={{ background: getHeatColor(r * 100, 100, 0.85) }} />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Metric selector (map only) */}
      {view === 'map' && (
        <div className="flex gap-2 flex-wrap">
          {HEATMAP_METRICS.map(m => (
            <button key={m.key} onClick={() => setMetric(m.key)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1 ${
                metric === m.key
                  ? 'bg-[#1a5276] text-white border-[#1a5276]'
                  : 'bg-white text-[#1a5276] border-[#1a5276] hover:bg-blue-50'
              }`}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {view === 'map' ? (
        leafletReady ? (
          <HeatmapMap purokData={purokData} metric={metric} />
        ) : (
          <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-[#1a5276] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading map…</p>
          </div>
        )
      ) : (
        <HeatmapTable purokData={purokData} />
      )}

      {/* Summary cards (map view only) */}
      {view === 'map' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {purokData.map(p => {
            const val  = Number(p[metric] ?? 0);
            const rate = calcVerifRate(p);
            const rateColor = rate >= 80 ? 'text-green-600' : rate >= 50 ? 'text-orange-500' : 'text-red-500';
            return (
              <div key={p.purok}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
                <div className="font-bold text-[#1a5276] text-xs mb-1">{p.purok}</div>
                <div className="text-2xl font-black" style={{ color: getHeatColor(val, maxVal, 1) }}>{val}</div>
                <div className="text-[10px] text-gray-400 uppercase">
                  {HEATMAP_METRICS.find(m => m.key === metric)?.label}
                </div>
                <div className={`text-xs font-bold mt-1 ${rateColor}`}>{rate}% verified</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
        <span className="font-bold">📌 Note:</span> Circle size scales with the selected metric value.
        Verification rate counts only submitted residents — unregistered are excluded.
      </div>
    </div>
  );
}