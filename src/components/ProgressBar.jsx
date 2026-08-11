export function ProgressBar({ value, color = "#0D9488", label, pct }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontFamily: "DM Sans,sans-serif" }}>{label}</span>
        <span style={{ fontSize: 12, fontFamily: "DM Sans,sans-serif", color: "#6B7280" }}>
          {pct || `${value}%`} <span style={{ color: "#10B981", fontSize: 11 }}>+5% ↑</span>
        </span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "#E5E7EB", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            borderRadius: 999,
            background: color,
            transition: "width 1s ease"
          }}
        />
      </div>
    </div>
  );
}
