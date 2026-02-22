// ============================================================
// OverviewTab.jsx
// Imports ONLY from: './AnalyticsUI' and './analyticsConfig'
// ============================================================

import {
  PieChart, Pie, Cell, Legend, Tooltip,
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import { StatCard, Card, SectionHeader } from './AnalyticsInterface';
import { COLORS, pct } from './analyticsConfig';

export default function OverviewTab({ raw }) {
  const ov  = raw?.overview ?? {};
  const hm  = raw?.heatmap?.puroks ?? [];
  const reg = raw?.registration;

  const statusData  = ov.status_breakdown ?? [];
  const trendData   = reg?.registration_trend ?? [];

  const genderData = (ov.gender_breakdown ?? []).map(g => ({
    name:  g.gender,
    value: Number(g.count),
    color: g.gender === 'Male' ? COLORS.secondary : COLORS.pink,
  }));

  const residencyData = (ov.residency_breakdown ?? []).map(r => ({
    name:  r.residency_status,
    value: Number(r.count),
    color: r.residency_status === 'Old Resident' ? COLORS.primary : COLORS.secondary,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Barangay Overview"
        subtitle="Barangay Gulod, Novaliches, Quezon City — E-Barangay IMS"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="👥" label="Total Residents"   value={ov.total_residents ?? 0}
          sub={`${ov.total_households ?? 0} households`} color="primary" />
        <StatCard icon="✅" label="Verified"           value={ov.verified ?? 0}
          sub={`${pct(ov.verified, ov.total_residents)}% of total`} color="success" />
        <StatCard icon="⏳" label="Pending"            value={ov.pending ?? 0}
          sub="Needs verification" color="warning" />
        <StatCard icon="🗳️" label="Registered Voters" value={ov.voters ?? 0}
          sub={`${ov.total_puroks ?? 0} puroks`} color="teal" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon="🏠" label="Active Households"   value={ov.total_households ?? 0}   color="secondary" />
        <StatCard icon="🏘️" label="Indigent Households" value={ov.indigent_households ?? 0}
          sub={`${pct(ov.indigent_households, ov.total_households)}% of HH`} color="warning" />
        <StatCard icon="❌" label="Rejected"             value={ov.rejected ?? 0}            color="danger" />
        <StatCard icon="🪪" label="No Barangay ID"       value={ov.no_id ?? 0}
          sub="Needs enrollment" color="gray" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Registration Status Breakdown">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                paddingAngle={3} dataKey="value">
                {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Daily Registration Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" name="Registrations"
                stroke={COLORS.primary} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Gender Distribution">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={genderData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Residency Type">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={residencyData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {residencyData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {hm.length > 0 && (
        <Card title="Residents per Purok — Quick View">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hm} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="purok" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="total"    name="Total"    fill={COLORS.primary}  radius={[4, 4, 0, 0]} />
              <Bar dataKey="verified" name="Verified" fill={COLORS.success}  radius={[4, 4, 0, 0]} />
              <Bar dataKey="seniors"  name="Seniors"  fill={COLORS.danger}   radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}