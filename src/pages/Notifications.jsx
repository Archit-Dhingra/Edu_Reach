export function Notifications({ theme, notifications, onMarkAll }) {
  const T = theme;
  const typeStyle = {
    assignment: { icon: "📋", color: "#F5A623" },
    message: { icon: "💬", color: "#0D9488" },
    meet: { icon: "📹", color: "#3B82F6" },
    performance: { icon: "📈", color: "#8B5CF6" },
    grade: { icon: "✅", color: "#10B981" }
  };

  const groups = [
    { label: "Today", items: notifications.filter(n => n.time.includes("min") || n.time.includes("hr")) },
    { label: "Yesterday", items: notifications.filter(n => n.time === "1 day ago") },
    { label: "Earlier", items: notifications.filter(n => n.time.includes("days ago")) }
  ].filter(g => g.items.length > 0);

  return (
    <div style={{ padding: 28, maxWidth: 640, fontFamily: "DM Sans,sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, margin: 0 }}>
          🔔 Notifications
        </h2>
        <button
          onClick={onMarkAll}
          style={{
            padding: "8px 16px",
            background: T.amberLight,
            color: T.amber,
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "DM Sans,sans-serif",
            fontSize: 13
          }}
        >
          Mark all read
        </button>
      </div>
      {groups.map(g => (
        <div key={g.label} style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: T.muted,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 10
            }}
          >
            {g.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {g.items.map(n => {
              const ts = typeStyle[n.type] || typeStyle.grade;
              return (
                <div
                  key={n.id}
                  style={{
                    background: T.card,
                    borderRadius: 12,
                    padding: 14,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    borderLeft: !n.read ? `3px solid ${T.amber}` : `3px solid transparent`,
                    transition: "all 0.2s"
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: ts.color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0
                    }}
                  >
                    {ts.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: T.text, fontSize: 14, marginBottom: 2 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{n.body}</div>
                    {n.link && (
                      <a href={n.link} style={{ fontSize: 12, color: T.teal, fontWeight: 600 }}>
                        Join Meeting →
                      </a>
                    )}
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{n.time}</div>
                  </div>
                  {!n.read && (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.amber, flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
