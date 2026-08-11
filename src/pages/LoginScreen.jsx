import { useState } from "react";

export function LoginScreen({ onSuccess, onGotoSignup, theme }) {
  const T = theme;
  const [email, setEmail] = useState("demo@edureach.in");
  const [pass, setPass] = useState("password123");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = () => {
    if (!email) {
      setErr("Email is required");
      return;
    }
    if (!pass) {
      setErr("Password is required");
      return;
    }
    setLoading(true);
    setErr("");
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: "Aryan Sharma",
        email,
        grade: "Grade 8",
        age: 14,
        subjects: ["Math", "Science", "English"],
        tutorName: "Asha",
        streak: 7,
        avatar: "AS"
      });
    }, 1000);
  };

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "DM Sans,sans-serif"
      }}
    >
      <div
        style={{
          background: T.card,
          borderRadius: 20,
          padding: 40,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>📚</div>
          <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 26, color: T.text, margin: 0 }}>
            Welcome back!
          </h2>
          <p style={{ color: T.muted, fontSize: 14, margin: "4px 0 0" }}>Log in to continue learning</p>
        </div>
        {err && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#991B1B",
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16
            }}
          >
            {err}
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
            Email
          </label>
          <input
            style={inp}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
            Password
          </label>
          <input
            style={inp}
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <div style={{ textAlign: "right", marginBottom: 24 }}>
          <button
            onClick={() => setForgotOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: T.teal,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "DM Sans,sans-serif"
            }}
          >
            Forgot Password?
          </button>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: T.amber,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontFamily: "Nunito,sans-serif",
            fontWeight: 700,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s"
          }}
        >
          {loading ? "Logging in…" : "Log In →"}
        </button>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: T.muted }}>
          Don't have an account?{" "}
          <button
            onClick={onGotoSignup}
            style={{
              background: "none",
              border: "none",
              color: T.teal,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans,sans-serif",
              fontSize: 14
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
      {forgotOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div style={{ background: T.card, borderRadius: 16, padding: 32, width: 320, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontFamily: "Nunito,sans-serif", margin: "0 0 16px", color: T.text }}>Reset Password</h3>
            {!forgotSent ? (
              <>
                <input
                  style={{ ...inp, marginBottom: 16 }}
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <button
                  onClick={() => setForgotSent(true)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: T.amber,
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontFamily: "Nunito,sans-serif",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Send Reset Link
                </button>
              </>
            ) : (
              <p style={{ color: T.teal, fontWeight: 600 }}>✅ Reset link sent! Check your inbox.</p>
            )}
            <button
              onClick={() => {
                setForgotOpen(false);
                setForgotSent(false);
              }}
              style={{
                width: "100%",
                marginTop: 12,
                padding: "10px",
                background: "transparent",
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                color: T.muted,
                cursor: "pointer",
                fontFamily: "DM Sans,sans-serif"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
