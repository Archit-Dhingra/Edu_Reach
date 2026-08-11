import { useState } from "react";
import { TUTORS } from "../constants/data";
import { Toast } from "../components/Toast";

export function FindTutor({ theme, onNotif }) {
  const T = theme;
  const [search, setSearch] = useState("");
  const [meetModal, setMeetModal] = useState(null);
  const [enrolled, setEnrolled] = useState([]);
  const [toast, setToast] = useState(null);
  const [dmOpen, setDmOpen] = useState(null);
  const [dmMsg, setDmMsg] = useState("");

  const filtered = TUTORS.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );
  const fakeLink =
    "https://meet.google.com/" +
    Math.random().toString(36).slice(2, 6) +
    "-" +
    Math.random().toString(36).slice(2, 6);

  return (
    <div style={{ padding: 28, maxWidth: 800, fontFamily: "DM Sans,sans-serif" }}>
      <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, marginBottom: 16 }}>
        👨‍🏫 Find My Tutor
      </h2>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or subject..."
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "11px 16px",
          borderRadius: 10,
          border: `1.5px solid ${T.border}`,
          background: T.input,
          color: T.text,
          fontFamily: "DM Sans,sans-serif",
          fontSize: 14,
          marginBottom: 20,
          outline: "none",
          boxSizing: "border-box"
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
        {filtered.map(t => (
          <div
            key={t.id}
            style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, transition: "all 0.2s" }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: T.tealLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Nunito,sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: T.teal,
                  flexShrink: 0,
                  position: "relative"
                }}
              >
                {t.avatar}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: t.online ? "#10B981" : "#6B7280",
                    border: `2px solid ${T.card}`
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: T.text, fontFamily: "Nunito,sans-serif", fontSize: 15 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: T.teal, fontWeight: 600 }}>{t.subject}</div>
                <div style={{ fontSize: 12, color: t.online ? "#10B981" : "#6B7280", fontWeight: 600 }}>
                  {t.online ? "🟢 Online" : "⚫ Offline"}
                </div>
              </div>
              <div style={{ fontSize: 13, color: T.amber, fontWeight: 700 }}>★ {t.rating}</div>
            </div>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, marginBottom: 14 }}>{t.bio}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={() => setDmOpen(t)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: T.tealLight,
                  color: T.teal,
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "DM Sans,sans-serif",
                  fontSize: 13
                }}
              >
                💬 Message
              </button>
              <button
                onClick={() => {
                  setEnrolled(e => (e.includes(t.id) ? e : [...e, t.id]));
                  setToast(`Enrolled with ${t.name}!`);
                }}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: enrolled.includes(t.id) ? T.amberLight : T.card,
                  color: enrolled.includes(t.id) ? T.amber : T.text,
                  border: `1px solid ${enrolled.includes(t.id) ? T.amber : T.border}`,
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "DM Sans,sans-serif",
                  fontSize: 13
                }}
              >
                {enrolled.includes(t.id) ? "✓ Enrolled" : "Enroll"}
              </button>
              {t.online && (
                <button
                  onClick={() => {
                    const link = fakeLink;
                    setMeetModal({ tutor: t, link });
                    onNotif({
                      id: Date.now(),
                      type: "meet",
                      title: `Session from ${t.name}`,
                      body: `Google Meet session started! Join now.`,
                      time: "Just now",
                      read: false,
                      link
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: T.amber,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "DM Sans,sans-serif",
                    fontSize: 13
                  }}
                >
                  📹 Start Session
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {meetModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ background: T.card, borderRadius: 20, padding: 32, width: 360, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📹</div>
            <h3 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, color: T.text, margin: "0 0 8px" }}>
              Google Meet link created!
            </h3>
            <p style={{ color: T.muted, fontSize: 14, marginBottom: 16 }}>
              Session with {meetModal.tutor.name}. Link sent to enrolled students.
            </p>
            <div
              style={{
                background: T.surface,
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: T.teal,
                fontWeight: 600,
                marginBottom: 16,
                wordBreak: "break-all"
              }}
            >
              {meetModal.link}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(meetModal.link);
                  setToast("Link copied!");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: T.amber,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "DM Sans,sans-serif"
                }}
              >
                Copy Link
              </button>
              <button
                onClick={() => setMeetModal(null)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: T.surface,
                  color: T.text,
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "DM Sans,sans-serif"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {dmOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ background: T.card, borderRadius: 20, padding: 24, width: 360 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: T.tealLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  color: T.teal,
                  fontFamily: "Nunito,sans-serif"
                }}
              >
                {dmOpen.avatar}
              </div>
              <div style={{ fontWeight: 700, color: T.text }}>{dmOpen.name}</div>
              <button
                onClick={() => setDmOpen(null)}
                style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: T.muted, fontSize: 20 }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                background: T.surface,
                borderRadius: 10,
                padding: 12,
                marginBottom: 12,
                minHeight: 80,
                fontSize: 14,
                color: T.muted,
                fontStyle: "italic"
              }}
            >
              Hi there! How can I help you today?
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={dmMsg}
                onChange={e => setDmMsg(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `1.5px solid ${T.border}`,
                  background: T.input,
                  color: T.text,
                  fontFamily: "DM Sans,sans-serif",
                  fontSize: 14,
                  outline: "none"
                }}
              />
              <button
                onClick={() => {
                  setToast("Message sent!");
                  setDmMsg("");
                }}
                style={{
                  padding: "10px 16px",
                  background: T.amber,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "DM Sans,sans-serif"
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
