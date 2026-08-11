import { useEffect } from "react";

export function Toast({ msg, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "success" ? "#0D9488" : "#F5A623";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 12,
        fontFamily: "DM Sans,sans-serif",
        fontWeight: 600,
        fontSize: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 10
      }}
    >
      {msg}
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: 16,
          lineHeight: 1
        }}
      >
        ×
      </button>
    </div>
  );
}
