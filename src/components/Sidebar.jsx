const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "ai-tutor", label: "AI Tutor", icon: "✨" },
  { id: "find-tutor", label: "Find My Tutor", icon: "👨‍🏫" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "assignments", label: "Assignments", icon: "📚" },
  { id: "profile", label: "Profile", icon: "👤" }
];

export function Sidebar({
  active,
  onNav,
  dark,
  onToggleDark,
  onLogout,
  user,
  collapsed,
  onToggleCollapse,
  notifCount,
  theme
}) {
  const T = theme;
  return (
    <div
      style={{
        width: collapsed ? 64 : 220,
        background: T.sidebar,
        borderRight: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        transition: "width 0.3s ease",
        flexShrink: 0,
        position: "relative",
        zIndex: 10
      }}
    >
      <div
        style={{
          padding: collapsed ? "16px 12px" : "20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: `1px solid ${T.border}`
        }}
      >
        {!collapsed && (
          <>
            <span style={{ fontSize: 22 }}>📚</span>
            <span style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 18, color: T.amber }}>
              EduReach
            </span>
          </>
        )}
        <button
          onClick={onToggleCollapse}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            color: T.muted,
            padding: 4
          }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {NAV.map(n => {
          const isActive = active === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "12px" : "12px 12px",
                borderRadius: 10,
                border: "none",
                background: isActive ? T.amberLight : "transparent",
                color: isActive ? T.amber : T.text,
                fontFamily: "DM Sans,sans-serif",
                fontWeight: isActive ? 700 : 400,
                fontSize: 14,
                cursor: "pointer",
                marginBottom: 2,
                transition: "all 0.2s",
                position: "relative",
                borderLeft: isActive ? `3px solid ${T.amber}` : "3px solid transparent",
                justifyContent: collapsed ? "center" : "flex-start"
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
              {n.id === "notifications" && notifCount > 0 && !collapsed && (
                <span
                  style={{
                    marginLeft: "auto",
                    background: T.amber,
                    color: "#fff",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 7px",
                    minWidth: 18,
                    textAlign: "center"
                  }}
                >
                  {notifCount}
                </span>
              )}
              {n.id === "notifications" && notifCount > 0 && collapsed && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: T.amber,
                    width: 8,
                    height: 8,
                    borderRadius: "50%"
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "12px 8px", borderTop: `1px solid ${T.border}` }}>
        <button
          onClick={onToggleDark}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: T.muted,
            cursor: "pointer",
            fontFamily: "DM Sans,sans-serif",
            fontSize: 14,
            justifyContent: collapsed ? "center" : "flex-start"
          }}
        >
          <span>{dark ? "☀️" : "🌙"}</span>
          {!collapsed && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "#EF4444",
            cursor: "pointer",
            fontFamily: "DM Sans,sans-serif",
            fontSize: 14,
            justifyContent: collapsed ? "center" : "flex-start"
          }}
        >
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
