export function Confetti() {
  const colors = ["#F5A623", "#0D9488", "#3B82F6", "#EC4899", "#10B981", "#8B5CF6"];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998, overflow: "hidden" }}>
      {Array.from({ length: 60 }).map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 2;
        const dur = 2 + Math.random() * 2;
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: "-10px",
              width: 8,
              height: 8,
              background: color,
              borderRadius: Math.random() > 0.5 ? "50%" : 2,
              animation: `confettiFall ${dur}s ${delay}s ease-in forwards`
            }}
          />
        );
      })}
      <style>{`@keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
    </div>
  );
}
