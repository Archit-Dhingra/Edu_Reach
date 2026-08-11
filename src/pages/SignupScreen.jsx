import { useState } from "react";
import { Confetti } from "../components/Confetti";
import { SUBJECTS_LIST, SUBJECT_ICONS, SUBJECT_COLORS } from "../constants/data";

export function SignupScreen({ onSuccess, onGotoLogin, theme }) {
  const T = theme;
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    age: "12",
    grade: "Grade 7",
    subjects: [],
    tutorName: "Asha"
  });
  const [errs, setErrs] = useState({});

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inp = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1.5px solid ${T.border}`,
    background: T.input,
    color: T.text,
    fontFamily: "DM Sans,sans-serif",
    fontSize: 15,
    boxSizing: "border-box",
    outline: "none"
  };

  const validate1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validate1()) return;
    if (step === 2 && form.subjects.length === 0) {
      setErrs({ subjects: "Pick at least 1 subject" });
      return;
    }
    setErrs({});
    if (step < 4) setStep(s => s + 1);
    if (step === 3) {
      setStep(4);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const pwStrength = p => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const str = pwStrength(form.password);
  const strColor = ["#EF4444", "#F5A623", "#EAB308", "#10B981"][str - 1] || "#E5E7EB";
  const strLabel = ["", "Weak", "Fair", "Good", "Strong"][str];

  const toggleSubject = s =>
    upd(
      "subjects",
      form.subjects.includes(s) ? form.subjects.filter(x => x !== s) : [...form.subjects, s]
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans,sans-serif",
        padding: 24
      }}
    >
      {showConfetti && <Confetti />}
      <div
        style={{
          background: T.card,
          borderRadius: 20,
          padding: 36,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
        }}
      >
        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            {["Basic Info", "Subjects", "Syllabus", "Done!"].map((l, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: step > i + 1 ? T.teal : step === i + 1 ? T.amber : "#E5E7EB",
                    color: step >= i + 1 ? "#fff" : T.muted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    margin: "0 auto 4px",
                    transition: "all 0.3s"
                  }}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: step === i + 1 ? T.amber : T.muted,
                    fontWeight: step === i + 1 ? 600 : 400
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 4, background: "#E5E7EB", borderRadius: 999, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(step / 4) * 100}%`,
                background: T.amber,
                borderRadius: 999,
                transition: "width 0.4s ease"
              }}
            />
          </div>
        </div>

        {step === 1 && (
          <>
            <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 22, color: T.text, marginBottom: 20 }}>
              Tell us about yourself
            </h2>
            {[[ "name", "Full Name", "text" ], [ "email", "Email", "email" ]].map(([k, ph, tp]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                  {ph}
                </label>
                <input
                  style={{ ...inp, borderColor: errs[k] ? "#EF4444" : T.border }}
                  type={tp}
                  value={form[k]}
                  onChange={e => upd(k, e.target.value)}
                  placeholder={ph}
                />
                {errs[k] && <div style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errs[k]}</div>}
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                Password
              </label>
              <input
                style={{ ...inp, borderColor: errs.password ? "#EF4444" : T.border }}
                type="password"
                value={form.password}
                onChange={e => upd("password", e.target.value)}
                placeholder="Min 6 characters"
              />
              {form.password && (
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: "#E5E7EB", borderRadius: 999 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${str * 25}%`,
                        background: strColor,
                        borderRadius: 999,
                        transition: "width 0.3s"
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 12, color: strColor, fontWeight: 600 }}>{strLabel}</span>
                </div>
              )}
              {errs.password && <div style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errs.password}</div>}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                Confirm Password
              </label>
              <input
                style={{ ...inp, borderColor: errs.confirm ? "#EF4444" : T.border }}
                type="password"
                value={form.confirm}
                onChange={e => upd("confirm", e.target.value)}
                placeholder="Repeat password"
              />
              {errs.confirm && <div style={{ color: "#EF4444", fontSize: 12, marginTop: 3 }}>{errs.confirm}</div>}
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                  Age
                </label>
                <select style={{ ...inp }} value={form.age} onChange={e => upd("age", e.target.value)}>
                  {Array.from({ length: 13 }, (_, i) => (
                    <option key={i} value={i + 6}>
                      {i + 6} years
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                  Grade
                </label>
                <select style={{ ...inp }} value={form.grade} onChange={e => upd("grade", e.target.value)}>
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
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                AI Tutor Name
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                {["Asha", "Arjun"].map(n => (
                  <button
                    key={n}
                    onClick={() => upd("tutorName", n)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: 10,
                      border: `2px solid ${form.tutorName === n ? T.amber : T.border}`,
                      background: form.tutorName === n ? T.amberLight : "transparent",
                      color: form.tutorName === n ? T.amber : T.text,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "DM Sans,sans-serif",
                      transition: "all 0.2s"
                    }}
                  >
                    {n} {n === "Asha" ? "👩" : "👦"}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 22, color: T.text, marginBottom: 8 }}>
              What would you like to learn?
            </h2>
            <p style={{ color: T.muted, fontSize: 14, marginBottom: 20 }}>Pick at least one subject to get started.</p>
            {errs.subjects && <div style={{ color: "#EF4444", fontSize: 13, marginBottom: 12 }}>{errs.subjects}</div>}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {SUBJECTS_LIST.map(s => {
                const sel = form.subjects.includes(s);
                const color = SUBJECT_COLORS[s] || T.teal;
                return (
                  <button
                    key={s}
                    onClick={() => toggleSubject(s)}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      border: `2px solid ${sel ? color : T.border}`,
                      background: sel ? color + "18" : "transparent",
                      color: sel ? color : T.text,
                      fontWeight: sel ? 700 : 400,
                      cursor: "pointer",
                      fontFamily: "DM Sans,sans-serif",
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "all 0.2s"
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{SUBJECT_ICONS[s] || "📖"}</span>
                    {s}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 22, color: T.text, marginBottom: 8 }}>
              Upload Your Syllabus
            </h2>
            <p style={{ color: T.muted, fontSize: 14, marginBottom: 20 }}>
              Optional — helps your AI tutor teach exactly what you need.
            </p>
            {form.subjects.slice(0, 3).map(s => (
              <div
                key={s}
                style={{
                  border: `1.5px dashed ${T.border}`,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  textAlign: "center"
                }}
              >
                <div style={{ fontWeight: 600, color: SUBJECT_COLORS[s] || T.teal, marginBottom: 8 }}>
                  {SUBJECT_ICONS[s]} {s}
                </div>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 8 }}>Drag & drop PDF or click to upload</div>
                <button
                  style={{
                    background: T.amberLight,
                    color: T.amber,
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "DM Sans,sans-serif"
                  }}
                >
                  Choose File
                </button>
                <span style={{ marginLeft: 8, fontSize: 12, color: T.muted, cursor: "pointer", textDecoration: "underline" }}>
                  Skip
                </span>
              </div>
            ))}
            <button
              onClick={() => {}}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                color: T.muted,
                cursor: "pointer",
                fontFamily: "DM Sans,sans-serif",
                fontSize: 13
              }}
            >
              I don't have any syllabus — skip all
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 26, color: T.text, margin: "0 0 8px" }}>
                You're all set!
              </h2>
              <p style={{ color: T.muted, fontSize: 15, marginBottom: 24 }}>
                Welcome, <strong>{form.name || "Learner"}</strong>! Your AI tutor <strong>{form.tutorName}</strong> is ready.
              </p>
              <button
                onClick={() =>
                  onSuccess({
                    name: form.name || "Learner",
                    email: form.email,
                    grade: form.grade,
                    age: form.age,
                    subjects: form.subjects.length ? form.subjects : ["Math", "Science"],
                    tutorName: form.tutorName,
                    streak: 0,
                    avatar: form.name.slice(0, 2).toUpperCase() || "LN"
                  })
                }
                style={{
                  padding: "14px 36px",
                  background: T.amber,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontFamily: "Nunito,sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(245,166,35,0.35)"
                }}
              >
                Start Learning →
              </button>
            </div>
          </>
        )}

        {step < 4 && (
          <button
            onClick={next}
            style={{
              width: "100%",
              marginTop: 20,
              padding: "14px",
              background: T.amber,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            {step === 3 ? "Let's Go! 🚀" : "Continue →"}
          </button>
        )}
        {step < 4 && (
          <p style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: T.muted }}>
            Already have an account?{" "}
            <button
              onClick={onGotoLogin}
              style={{
                background: "none",
                border: "none",
                color: T.teal,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "DM Sans,sans-serif",
                fontSize: 13
              }}
            >
              Log In
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
