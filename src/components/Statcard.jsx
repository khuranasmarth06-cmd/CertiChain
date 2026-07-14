function StatCard({ icon, label, value, loading, variant = "primary" }) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-value">{loading ? "—" : value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}
export default StatCard;
 




