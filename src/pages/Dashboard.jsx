import { QUOTES, SUBJECT_COLORS } from "../constants/data";
import { ProgressBar } from "../components/ProgressBar";

export function Dashboard({ user, theme, onNav }) {
  const T = theme;
  const quote = QUOTES[new Date().getDay() % QUOTES.length];
  const statCards = [
    { label: "Day Streak", value: `${user.streak || 0}🔥`, grad: "linear-gradient(135deg,#FEF3DC,#FDE68A)" },
    { label: "Subjects", value: user.subjects.length, grad: "linear-gradient(135deg,#E0F2F1,#B2DFDB)" },
    { label: "Assignments Done", value: "4", grad: "linear-gradient(135deg,#D1FAE5,#A7F3D0)" },
    { label: "Avg Score", value: "88%", grad: "linear-gradient(135deg,#EDE9FE,#DDD6FE)" }
  ];

  return (
    <div style={{ padding: 28, maxWidth: 900, fontFamily: "DM Sans,sans-serif" }}>
      {/* Welcome */}
      <div style={{ background: `linear-gradient(135deg,${T.amberLight},${T.tealLight})`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, margin: "0 0 6px" }}>
          Welcome back, {user.name.split(" ")[0]}! 👋
        </h2>
        <p style={{ color: T.muted, fontSize: 14, margin: "0 0 16px", fontStyle: "italic" }}>"{quote}"</p>
        <div
          style={{
            background: T.card,
            borderRadius: 12,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 4 }}>Continue where you left off</div>
            <div style={{ fontWeight: 700, color: T.text, fontFamily: "Nunito,sans-serif" }}>
              {user.subjects[0] || "Math"} — Chapter 3: Fractions
            </div>
          </div>
          <button
            onClick={() => onNav("ai-tutor")}
            style={{
              padding: "10px 20px",
              background: T.amber,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            Resume Session →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        {statCards.map((c, i) => (
          <div key={i} style={{ background: c.grad, borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6
              }}
            >
              {c.label}
            </div>
            <div style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 28, color: T.text }}>
              {c.value}
            </div>
            {i === 0 && user.streak === 0 && <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Start a session today! 🔥</div>}
            {i === 0 && user.streak >= 3 && <div style={{ fontSize: 11, color: "#F5A623", marginTop: 4, fontWeight: 700 }}>You're on fire! 🔥</div>}
          </div>
        ))}
      </div>

      {/* Syllabus coverage */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={{ background: T.card, borderRadius: 14, padding: 20, border: `1px solid ${T.border}` }}>
          <h3 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 16, color: T.text, marginBottom: 16, margin: "0 0 16px" }}>
            📈 Syllabus Coverage
          </h3>
          {user.subjects.slice(0, 4).map((s, i) => (
            <ProgressBar key={s} label={s} value={[72, 45, 88, 60][i % 4]} color={SUBJECT_COLORS[s] || T.teal} />
          ))}
        </div>
        <div style={{ background: T.card, borderRadius: 14, padding: 20, border: `1px solid ${T.border}` }}>
          <h3 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 16, color: T.text, margin: "0 0 16px" }}>
            📅 Weekly Activity
          </h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
              const h = [60, 80, 40, 100, 70, 30, 50][i];
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${h}%`,
                      background: i < 5 ? T.amber : T.border,
                      borderRadius: 4,
                      transition: "height 0.5s"
                    }}
                  />
                  <div style={{ fontSize: 11, color: T.muted }}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent feedback */}
      <div style={{ background: T.card, borderRadius: 14, padding: 20, border: `1px solid ${T.border}` }}>
        <h3 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 16, color: T.text, margin: "0 0 14px" }}>
          💬 Recent AI Tutor Feedback
        </h3>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: T.tealLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: T.text, marginBottom: 4 }}>Math Session — Yesterday</div>
            <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.6 }}>
              Aryan did a great job covering Fractions today! He understood mixed numbers well. Suggested to practice more on
              improper fractions. Quiz added to Assignments. 📝
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
