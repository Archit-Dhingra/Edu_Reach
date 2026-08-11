export function WelcomeScreen({ onLogin, onSignup, theme }) {
  const T = theme;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "DM Sans,sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}}
        @keyframes floatB{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-15px) rotate(-5deg)}}
        @keyframes pulse{0%,100%{opacity:0.3}50%{opacity:0.6}}
      `}</style>
      {/* Floating shapes */}
      {[[80, 10, "#F5A623", 60, "floatA 6s infinite"], [10, 20, "#0D9488", 40, "floatB 7s infinite 1s"], [70, 70, "#F5A623", 30, "floatA 5s infinite 2s"], [20, 75, "#0D9488", 50, "floatB 8s infinite 0.5s"]].map(([l, t, c, s, anim], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${l}%`,
            top: `${t}%`,
            width: s,
            height: s,
            borderRadius: "50%",
            background: c,
            opacity: 0.15,
            animation: anim
          }}
        />
      ))}
      <div style={{ textAlign: "center", zIndex: 1, padding: "0 24px", maxWidth: 480 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>📚</div>
        <h1
          style={{
            fontFamily: "Nunito,sans-serif",
            fontSize: 42,
            fontWeight: 900,
            color: T.amber,
            margin: "0 0 4px",
            letterSpacing: -1
          }}
        >
          EduReach
        </h1>
        <p style={{ fontFamily: "Nunito,sans-serif", fontSize: 18, color: T.text, fontWeight: 600, marginBottom: 8, opacity: 0.9 }}>
          Every child deserves a great teacher.
        </p>
        <p style={{ color: T.muted, fontSize: 15, marginBottom: 40, lineHeight: 1.6 }}>
          AI-powered tutoring meets human care. Learn at your pace, with a tutor who understands you.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={onLogin}
            style={{
              padding: "14px 40px",
              background: T.amber,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 16px rgba(245,166,35,0.35)"
            }}
            onMouseEnter={e => (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.target.style.transform = "translateY(0)")}
          >
            Log In
          </button>
          <button
            onClick={onSignup}
            style={{
              padding: "14px 40px",
              background: "transparent",
              color: T.teal,
              border: `2px solid ${T.teal}`,
              borderRadius: 12,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.target.style.background = T.teal;
              e.target.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.target.style.background = "transparent";
              e.target.style.color = T.teal;
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
