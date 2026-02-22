// ============================================================
// DecisionGuideTab.jsx
// Imports ONLY from: './AnalyticsUI'
// No analyticsConfig needed here.
// ============================================================

import { InsightCard, SectionHeader, EmptyState } from './AnalyticsInterface';

export default function DecisionGuideTab({ raw }) {
  const ins      = raw?.insights ?? {};
  const insights = ins.insights  ?? [];
  const summary  = ins.summary   ?? {};

  const priorityGroups = [
    { key: 'HIGH',   label: '🚨 High Priority Actions', cls: 'text-red-600',    bg: 'bg-red-50 border-red-200'       },
    { key: 'MEDIUM', label: '⚠️ Medium Priority',        cls: 'text-orange-500', bg: 'bg-orange-50 border-orange-200' },
    { key: 'LOW',    label: '💡 For Monitoring',         cls: 'text-blue-500',   bg: 'bg-blue-50 border-blue-200'     },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Decision Guide & Actionable Insights"
        subtitle="Data-driven analysis and recommended actions for barangay officials"
      />

      {/* Priority badges */}
      <div className="grid grid-cols-3 gap-3">
        {priorityGroups.map(pg => {
          const count = summary[`${pg.key.toLowerCase()}_priority`]
            ?? insights.filter(i => i.priority === pg.key).length;
          return (
            <div key={pg.key} className={`rounded-lg p-3 text-center border ${pg.bg}`}>
              <div className={`text-2xl font-black ${pg.cls}`}>{count}</div>
              <div className={`text-xs font-bold uppercase ${pg.cls}`}>
                {pg.key === 'HIGH' ? 'High Priority' : pg.key === 'MEDIUM' ? 'Medium' : 'Monitoring'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights by priority group */}
      {priorityGroups.map(pg => {
        const filtered = insights.filter(i => i.priority === pg.key);
        if (!filtered.length) return null;
        return (
          <div key={pg.key}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${pg.cls}`}>
              {pg.label}
            </h3>
            {filtered.map((insight, idx) => (
              <InsightCard key={idx} {...insight} />
            ))}
          </div>
        );
      })}

      {insights.length === 0 && (
        <EmptyState message="No insights generated yet. Check that the backend is returning data." />
      )}

      {summary.computed_at && (
        <p className="text-xs text-gray-400 text-right mt-4">
          Computed: {new Date(summary.computed_at).toLocaleString('en-PH')}
        </p>
      )}
    </div>
  );
}