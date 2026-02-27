// ============================================================
// HeatmapTab.jsx
// Purok heatmap: Map View (Leaflet circles) + Table View (matrix)
// ============================================================

import { useEffect, useRef, useState } from 'react';
import {
  Accessibility,
  Baby,
  CircleX,
  Clock3,
  House,
  Map as MapIcon,
  Plane,
  ShieldCheck,
  Table2,
  TrendingUp,
  TriangleAlert,
  UserCog,
  UserRound,
  Users,
  Vote,
} from 'lucide-react';
import { EmptyState, SectionHeader } from './AnalyticsInterface';
import {
  BARANGAY_BOUNDARY,
  BARANGAY_CENTER,
  COLORS,
  HEATMAP_METRICS,
  PUROK_CENTERS,
  calcVerifRate,
  getHeatColor,
} from './analyticsConfig';

const TABLE_ROWS = [
  { key: 'total', label: 'Total Residents', icon: Users, iconClass: 'text-[#1a5276] bg-[#1a5276]/10', color: [26, 82, 118] },
  { key: 'verified', label: 'Verified', icon: ShieldCheck, iconClass: 'text-[#27ae60] bg-[#27ae60]/10', color: [39, 174, 96] },
  { key: 'pending', label: 'Pending', icon: Clock3, iconClass: 'text-[#f39c12] bg-[#f39c12]/10', color: [243, 156, 18] },
  { key: 'rejected', label: 'Rejected', icon: CircleX, iconClass: 'text-[#e74c3c] bg-[#e74c3c]/10', color: [231, 76, 60] },
  { key: 'unregistered', label: 'Unregistered', icon: TriangleAlert, iconClass: 'text-[#e67e22] bg-[#e67e22]/10', color: [230, 126, 34] },
  { key: 'seniors', label: 'Senior Citizens', icon: UserRound, iconClass: 'text-[#e74c3c] bg-[#e74c3c]/10', color: [231, 76, 60] },
  { key: 'pwd', label: 'PWD', icon: Accessibility, iconClass: 'text-[#f39c12] bg-[#f39c12]/10', color: [243, 156, 18] },
  { key: 'minors', label: 'Minors (<18)', icon: Baby, iconClass: 'text-[#8e44ad] bg-[#8e44ad]/10', color: [142, 68, 173] },
  { key: 'voters', label: 'Voters', icon: Vote, iconClass: 'text-[#16a085] bg-[#16a085]/10', color: [22, 160, 133] },
  { key: 'ofw', label: 'OFW', icon: Plane, iconClass: 'text-[#2980b9] bg-[#2980b9]/10', color: [41, 128, 185] },
  { key: 'solo_parent', label: 'Solo Parent', icon: UserCog, iconClass: 'text-[#16a085] bg-[#16a085]/10', color: [22, 160, 133] },
  { key: 'kasambahay', label: 'Kasambahay', icon: House, iconClass: 'text-[#27ae60] bg-[#27ae60]/10', color: [39, 174, 96] },
];

const METRIC_ICON_MAP = {
  verified: ShieldCheck,
  total: Users,
  seniors: UserRound,
  pwd: Accessibility,
  unregistered: TriangleAlert,
  minors: Baby,
  voters: Vote,
};

function HeatmapMap({ purokData, metric }) {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const layersRef = useRef([]);

  const metricMeta = HEATMAP_METRICS.find((m) => m.key === metric) ?? HEATMAP_METRICS[0];
  const maxVal = Math.max(...purokData.map((p) => Number(p[metric] ?? 0)), 1);

  useEffect(() => {
    if (!mapRef.current || leafletRef.current || !window.L) return;

    const L = window.L;
    const map = L.map(mapRef.current, { center: BARANGAY_CENTER, zoom: 15 });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '(c) OpenStreetMap (c) CARTO',
      maxZoom: 19,
    }).addTo(map);

    L.polygon(BARANGAY_BOUNDARY, {
      color: '#1a5276',
      weight: 2.5,
      fillOpacity: 0.04,
      dashArray: '6 4',
    }).addTo(map).bindTooltip('Barangay Gulod, Novaliches, QC');

    const hallIcon = L.divIcon({
      html: `<div style="background:#1a5276;color:#fff;border-radius:50%;width:26px;height:26px;
        display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;
        border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)">BH</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      className: '',
    });
    L.marker(BARANGAY_CENTER, { icon: hallIcon })
      .addTo(map)
      .bindPopup('<b>Barangay Gulod Hall</b><br/>Novaliches, Quezon City');

    leafletRef.current = map;
    return () => {
      map.remove();
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!window.L || !leafletRef.current) return;

    const L = window.L;
    const map = leafletRef.current;

    layersRef.current.forEach((layer) => map.removeLayer(layer));
    layersRef.current = [];

    purokData.forEach((purok) => {
      const meta = PUROK_CENTERS[purok.purok];
      if (!meta) return;

      const value = Number(purok[metric] ?? 0);
      const fill = getHeatColor(value, maxVal, 0.72);
      const radius = 100 + (value / maxVal) * 160;
      const rate = calcVerifRate(purok);
      const rateColor = rate >= 80 ? '#27ae60' : rate >= 50 ? '#f39c12' : '#e74c3c';

      const popup = `
        <div style="font-family:system-ui;min-width:220px;font-size:12.5px">
          <div style="font-weight:900;color:#1a5276;font-size:15px;margin-bottom:8px;
            border-bottom:2px solid #eee;padding-bottom:5px">${purok.purok}</div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:2px 0;color:#555">Total</td><td style="font-weight:800;text-align:right">${Number(purok.total ?? 0).toLocaleString()}</td></tr>
            <tr><td style="padding:2px 0;color:#27ae60">Verified</td><td style="font-weight:800;text-align:right;color:#27ae60">${purok.verified ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#f39c12">Pending</td><td style="font-weight:800;text-align:right;color:#f39c12">${purok.pending ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#e74c3c">Rejected</td><td style="font-weight:800;text-align:right;color:#e74c3c">${purok.rejected ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#e67e22">Unregistered</td><td style="font-weight:800;text-align:right;color:#e67e22">${purok.unregistered ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#e74c3c">Seniors</td><td style="font-weight:800;text-align:right">${purok.seniors ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#f39c12">PWD</td><td style="font-weight:800;text-align:right">${purok.pwd ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#8e44ad">Minors</td><td style="font-weight:800;text-align:right">${purok.minors ?? 0}</td></tr>
            <tr><td style="padding:2px 0;color:#16a085">Voters</td><td style="font-weight:800;text-align:right">${purok.voters ?? 0}</td></tr>
          </table>
          <div style="margin-top:8px;background:#f0f7ff;border-radius:8px;padding:8px;text-align:center">
            <div style="font-size:10px;color:#888;font-weight:600;text-transform:uppercase">Verif. Rate (submitted only)</div>
            <div style="font-size:22px;font-weight:900;color:${rateColor}">${rate}%</div>
          </div>
          <div style="margin-top:6px;background:#1a5276;border-radius:8px;padding:6px 10px;
            text-align:center;color:#fff;font-weight:900;font-size:12px">
            ${metricMeta.label}: ${value}
          </div>
        </div>`;

      const circle = L.circle(meta.center, {
        radius,
        color: '#1a5276',
        weight: 1.5,
        fillColor: fill,
        fillOpacity: 0.72,
      }).bindPopup(popup);

      circle.on('mouseover', function onHover() {
        this.setStyle({ weight: 3, fillOpacity: 0.9 });
      });
      circle.on('mouseout', function onOut() {
        this.setStyle({ weight: 1.5, fillOpacity: 0.72 });
      });

      const labelIcon = L.divIcon({
        html: `<div style="background:rgba(26,82,118,.85);color:#fff;border-radius:20px;
          padding:2px 10px;font-size:11px;font-weight:900;white-space:nowrap;
          border:1.5px solid rgba(255,255,255,.4);pointer-events:none;
          box-shadow:0 2px 6px rgba(0,0,0,.25)">${purok.purok} | ${value}</div>`,
        className: '',
        iconAnchor: [45, 12],
      });
      const label = L.marker(meta.center, { icon: labelIcon, interactive: false });

      circle.addTo(map);
      label.addTo(map);
      layersRef.current.push(circle, label);
    });
  }, [maxVal, metric, metricMeta, purokData]);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-xl overflow-hidden shadow border border-gray-200 dark:border-slate-700"
      style={{ height: 480 }}
    />
  );
}

function HeatmapTable({ purokData }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40">
        <h3 className="text-xs font-black tracking-[0.12em] uppercase text-slate-700 dark:text-slate-200">Purok Indicator Matrix</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm border-collapse">
          <thead className="bg-[#1a5276] text-white">
            <tr>
              <th className="px-5 py-3.5 text-left font-black text-[11px] uppercase tracking-wider sticky left-0 bg-[#1a5276] z-20 border-r border-white/15">
                Indicator
              </th>
              {purokData.map((purok) => (
                <th key={purok.purok} className="px-4 py-3.5 text-center font-black text-[11px] uppercase tracking-wider min-w-[92px] border-r last:border-r-0 border-white/10">
                  {purok.purok}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {TABLE_ROWS.map((row, index) => {
              const RowIcon = row.icon;
              return (
                <tr key={row.key} className={index % 2 === 0 ? 'bg-slate-50/70 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-900'}>
                  <td className="px-5 py-3 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap sticky left-0 bg-inherit z-10 border-r border-slate-100 dark:border-slate-800">
                    <span className={`mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg ${row.iconClass}`}>
                      <RowIcon size={15} strokeWidth={2.2} />
                    </span>
                    {row.label}
                  </td>
                  {purokData.map((purok) => {
                    const value = Number(purok[row.key] ?? 0);
                    return (
                      <td
                        key={purok.purok}
                        className="px-3 py-2.5 text-center"
                      >
                        {value > 0 ? (
                          <span className="inline-flex min-w-[34px] h-7 px-2 items-center justify-center rounded-lg text-slate-900 dark:text-slate-100 font-black text-[13px]">
                            {value}
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 font-bold">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            <tr className="bg-slate-50 dark:bg-slate-900/40 border-t-2 border-[#1a5276]">
              <td className="px-5 py-3 font-black text-[#1a5276] dark:text-blue-300 whitespace-nowrap sticky left-0 bg-slate-50 dark:bg-slate-900/40 z-10 border-r border-slate-200 dark:border-slate-800">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200/70 dark:bg-slate-800 text-[#1a5276] dark:text-blue-300">
                  <TrendingUp size={15} strokeWidth={2.2} />
                </span>
                Verif. Rate*
              </td>
              {purokData.map((purok) => {
                const rate = calcVerifRate(purok);
                return (
                  <td key={purok.purok} className="px-3 py-2.5 text-center">
                    <span className="inline-flex min-w-[48px] h-7 px-2 items-center justify-center rounded-lg text-slate-900 dark:text-slate-100 font-black text-[13px]">
                      {rate}%
                    </span>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-blue-50 dark:bg-blue-950/20 border-t border-blue-100 dark:border-blue-900 text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
        * Verif. Rate = Verified / (Verified + Pending + Rejected). Unregistered excluded.
      </div>
    </div>
  );
}

export default function HeatmapTab({ raw }) {
  const purokData = raw?.heatmap?.puroks ?? [];
  const [metric, setMetric] = useState('verified');
  const [view, setView] = useState('map');
  const [leafletReady, setLeafletReady] = useState(Boolean(window.L));

  useEffect(() => {
    if (view !== 'map' || window.L) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, [view]);

  if (!purokData.length) return <EmptyState message="No purok data available." />;

  const maxVal = Math.max(...purokData.map((purok) => Number(purok[metric] ?? 0)), 1);

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Purok Heatmap"
        subtitle="Barangay Gulod, Novaliches, Quezon City - click a purok for details"
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1">
          {[
            { key: 'map', label: 'Map View', icon: MapIcon },
            { key: 'table', label: 'Table View', icon: Table2 },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all inline-flex items-center gap-1.5 ${
                view === item.key
                  ? 'bg-[#1a5276] text-white border-[#1a5276]'
                  : 'bg-white text-[#1a5276] border-[#1a5276] hover:bg-blue-50'
              }`}
            >
              <item.icon size={14} strokeWidth={2.2} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Low</span>
          <div className="flex h-3 w-28 rounded overflow-hidden">
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, idx) => (
              <div key={idx} className="flex-1" style={{ background: getHeatColor(ratio * 100, 100, 0.85) }} />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>

      {view === 'map' && (
        <div className="flex gap-2 flex-wrap">
          {HEATMAP_METRICS.map((metricOption) => {
            const MetricIcon = METRIC_ICON_MAP[metricOption.key] ?? TrendingUp;
            return (
              <button
                key={metricOption.key}
                onClick={() => setMetric(metricOption.key)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all inline-flex items-center gap-1.5 ${
                  metric === metricOption.key
                    ? 'bg-[#1a5276] text-white border-[#1a5276]'
                    : 'bg-white text-[#1a5276] border-[#1a5276] hover:bg-blue-50'
                }`}
              >
                <MetricIcon size={14} strokeWidth={2.2} />
                {metricOption.label}
              </button>
            );
          })}
        </div>
      )}

      {view === 'map' ? (
        leafletReady || window.L ? (
          <HeatmapMap purokData={purokData} metric={metric} />
        ) : (
          <div className="flex items-center justify-center h-64 gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-[#1a5276] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading map...</p>
          </div>
        )
      ) : (
        <HeatmapTable purokData={purokData} />
      )}

      {view === 'map' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {purokData.map((purok) => {
            const value = Number(purok[metric] ?? 0);
            const rate = calcVerifRate(purok);
            const rateColor = rate >= 80 ? 'text-green-600' : rate >= 50 ? 'text-orange-500' : 'text-red-500';
            return (
              <div key={purok.purok} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm p-3 text-center">
                <div className="font-bold text-[#1a5276] text-xs mb-1">{purok.purok}</div>
                <div className="text-2xl font-black" style={{ color: getHeatColor(value, maxVal, 1) }}>{value}</div>
                <div className="text-[10px] text-gray-400 uppercase">
                  {HEATMAP_METRICS.find((m) => m.key === metric)?.label}
                </div>
                <div className={`text-xs font-bold mt-1 ${rateColor}`}>{rate}% verified</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
        <span className="font-bold inline-flex items-center gap-1">
          <TriangleAlert size={14} strokeWidth={2.2} />
          Note:
        </span>{' '}
        Circle size scales with the selected metric value. Verification rate counts only submitted residents - unregistered are excluded.
      </div>
    </div>
  );
}
