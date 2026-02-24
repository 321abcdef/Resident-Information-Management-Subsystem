// ============================================================
// AnalyticsUI.jsx
// Shared UI building blocks for all analytics tabs.
// Import from: './AnalyticsUI'
// ============================================================

// ─── STAT CARD ────────────────────────────────────────────────
export function StatCard({ icon, label, value, sub, color = 'primary', trend }) {
  const bg = {
    primary:   'bg-[#1a5276]',
    success:   'bg-[#27ae60]',
    warning:   'bg-[#e67e22]',
    danger:    'bg-[#e74c3c]',
    purple:    'bg-[#8e44ad]',
    teal:      'bg-[#16a085]',
    secondary: 'bg-[#2980b9]',
    gray:      'bg-[#7f8c8d]',
  };
  return (
    <div className={`${bg[color] ?? bg.primary} text-white rounded-xl p-4 shadow-md flex flex-col gap-1 min-w-0`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className="text-xs font-bold bg-white/20 rounded px-2 py-0.5">{trend}</span>
        )}
      </div>
      <div className="text-3xl font-black tracking-tight">
        {typeof value === 'number' ? value.toLocaleString() : (value ?? '—')}
      </div>
      <div className="text-sm font-semibold opacity-90">{label}</div>
      {sub && <div className="text-xs opacity-70">{sub}</div>}
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────
export function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl p-5 shadow border border-gray-100 dark:border-slate-800 ${className}`}>
      {title && (
        <h3 className="font-black text-[#1a5276] dark:text-slate-200 mb-4 text-xs uppercase tracking-widest">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────
export function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-black text-[#1a5276] dark:text-slate-100 tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── SPINNER ──────────────────────────────────────────────────
export function Spinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#1a5276] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────
export function EmptyState({ icon = '📊', message = 'No data available.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <span className="text-4xl mb-2">{icon}</span>
      <p className="text-sm">{message}</p>
    </div>
  );
}

// ─── INSIGHT CARD ─────────────────────────────────────────────
export function InsightCard({ type, icon, title, description, action, priority, metric, metric_label }) {
  const styles = {
    alert:   { wrap: 'border-l-4 border-red-500 bg-red-50',       badge: 'bg-red-100 text-red-700'    },
    warning: { wrap: 'border-l-4 border-orange-400 bg-orange-50', badge: 'bg-orange-100 text-orange-700' },
    info:    { wrap: 'border-l-4 border-blue-500 bg-blue-50',     badge: 'bg-blue-100 text-blue-700'  },
    success: { wrap: 'border-l-4 border-green-500 bg-green-50',   badge: 'bg-green-100 text-green-700' },
  };
  const s = styles[type] ?? styles.info;
  const priorityBadge = {
    HIGH:   'bg-red-100 text-red-700',
    MEDIUM: 'bg-orange-100 text-orange-700',
    LOW:    'bg-blue-100 text-blue-700',
  };
  return (
    <div className={`rounded-lg p-4 mb-3 ${s.wrap}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1 gap-2 flex-wrap">
            <span className="font-bold text-gray-800 dark:text-slate-100 text-sm leading-tight">{title}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {metric !== undefined && (
                <span className="text-lg font-black text-gray-700 dark:text-slate-100">
                  {metric}
                  {metric_label && <span className="text-xs font-normal text-gray-500 ml-1">{metric_label}</span>}
                </span>
              )}
              {priority && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityBadge[priority] ?? ''}`}>
                  {priority}
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600 dark:text-slate-300 text-sm leading-snug">{description}</p>
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

