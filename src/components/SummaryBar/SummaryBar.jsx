import './SummaryBar.css';

export default function SummaryBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const overdue = tasks.filter(t => {
    if (!t.dueDate || t.status === "Completed") return false;
    return new Date(t.dueDate) < new Date(new Date().toDateString());
  }).length;

  const stats = [
    { label: "Total", value: total, color: "#6366F1" },
    { label: "Completed", value: completed, color: "#22C55E" },
    { label: "In Progress", value: inProgress, color: "#3B82F6" },
    { label: "Pending", value: pending, color: "#F59E0B" },
    { label: "Overdue", value: overdue, color: "#EF4444" },
  ];

  return (
    <div className="summary-bar">
      {stats.map((s, i) => (
        <div key={i} className="summary-item" style={{ borderTop: `3px solid ${s.color}` }}>
          <span className="summary-value" style={{ color: s.color }}>{s.value}</span>
          <span className="summary-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
