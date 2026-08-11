export function Avatar({ initials, size = 40, color = "#0D9488" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color + "22",
        border: `2px solid ${color}44`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Nunito,sans-serif",
        fontWeight: 700,
        fontSize: size * 0.35,
        color
      }}
    >
      {initials}
    </div>
  );
}
