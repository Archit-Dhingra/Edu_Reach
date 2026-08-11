import { useState } from "react";
import { Toast } from "../components/Toast";
import { SUBJECT_COLORS } from "../constants/data";

export function Profile({ user, theme, onSave }) {
  const T = theme;
  const [form, setForm] = useState({ name: user.name, email: user.email, grade: user.grade || "Grade 8", age: user.age || 14 });
  const [toast, setToast] = useState(null);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inp = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: `1.5px solid ${T.border}`,
    background: T.input,
    color: T.text,
    fontFamily: "DM Sans,sans-serif",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none"
  };

  return (
    <div style={{ padding: 28, maxWidth: 520, fontFamily: "DM Sans,sans-serif" }}>
      <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, marginBottom: 24 }}>
        👤 Profile
      </h2>
      <div
        style={{
          background: T.card,
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          textAlign: "center",
          border: `1px solid ${T.border}`
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: T.tealLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Nunito,sans-serif",
            fontWeight: 800,
            fontSize: 28,
            color: T.teal,
            margin: "0 auto 12px",
            cursor: "pointer",
            border: `3px solid ${T.amber}`
          }}
        >
          {user.avatar || user.name.slice(0, 2).toUpperCase()}
        </div>
        <button
          style={{
            fontSize: 13,
            color: T.amber,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "DM Sans,sans-serif",
            fontWeight: 600
          }}
        >
          📷 Change Photo
        </button>
      </div>
      <div style={{ background: T.card, borderRadius: 16, padding: 24, border: `1px solid ${T.border}` }}>
        {[[ "name", "Full Name" ], [ "email", "Email" ]].map(([k, l]) => (
          <div key={k} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
              {l}
            </label>
            <input style={inp} value={form[k]} onChange={e => upd(k, e.target.value)} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
              Grade
            </label>
            <select style={inp} value={form.grade} onChange={e => upd("grade", e.target.value)}>
              {[
                "Grade 1",
                "Grade 2",
                "Grade 3",
                "Grade 4",
                "Grade 5",
                "Grade 6",
                "Grade 7",
                "Grade 8",
                "Grade 9",
                "Grade 10",
                "Grade 11",
                "Grade 12"
              ].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
              Age
            </label>
            <select style={inp} value={form.age} onChange={e => upd("age", e.target.value)}>
              {Array.from({ length: 13 }, (_, i) => (
                <option key={i} value={i + 6}>
                  {i + 6} years
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 10 }}>
            Subjects
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {user.subjects.map(s => (
              <span
                key={s}
                style={{
                  background: SUBJECT_COLORS[s] || T.teal + "22",
                  color: SUBJECT_COLORS[s] || T.teal,
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600
                }}
              >
                {s} ×
              </span>
            ))}
            <span
              style={{
                background: T.amberLight,
                color: T.amber,
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              + Add
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            onSave(form);
            setToast("Profile saved!");
          }}
          style={{
            width: "100%",
            padding: "13px",
            background: T.amber,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontFamily: "Nunito,sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer"
          }}
        >
          Save Changes
        </button>
      </div>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
