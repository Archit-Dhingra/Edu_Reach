import { useState } from "react";
import { Confetti } from "../components/Confetti";
import { Toast } from "../components/Toast";
import { QUIZ_QUESTIONS } from "../constants/data";

export function Assignments({ theme, assignments, onComplete }) {
  const T = theme;
  const [tab, setTab] = useState("remaining");
  const [quizOpen, setQuizOpen] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const diffColor = { Easy: "#10B981", Medium: "#F5A623", Hard: "#EF4444" };
  const subjectBorder = {
    Math: T.teal,
    Science: "#F5A623",
    English: "#3B82F6",
    History: "#8B5CF6",
    "Computer Science": "#EC4899",
    Art: "#F97316",
    Geography: "#10B981",
    Hindi: "#EF4444"
  };

  const remaining = assignments.filter(a => !a.completed);
  const completed = assignments.filter(a => a.completed);
  const shown = tab === "remaining" ? remaining : completed;

  const startQuiz = a => {
    const qs = QUIZ_QUESTIONS[a.subject] || QUIZ_QUESTIONS.default;
    setQuizOpen({ ...a, questions: qs });
    setQIdx(0);
    setSelected(null);
    setAnswers([]);
    setShowScore(false);
  };

  const nextQ = () => {
    const newAns = [...answers, selected];
    if (qIdx + 1 >= quizOpen.questions.length) {
      const score = newAns.filter((a, i) => a === quizOpen.questions[i].ans).length;
      const pct = Math.round((score / quizOpen.questions.length) * 100);
      setAnswers(newAns);
      setShowScore(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      onComplete(quizOpen.id, pct);
    } else {
      setAnswers(newAns);
      setQIdx(q => q + 1);
      setSelected(null);
    }
  };

  return (
    <div style={{ padding: 28, maxWidth: 700, fontFamily: "DM Sans,sans-serif" }}>
      {showConfetti && <Confetti />}
      <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, marginBottom: 16 }}>
        📚 Assignments
      </h2>
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: T.surface, borderRadius: 10, padding: 4, width: "fit-content" }}>
        {["remaining", "completed"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: tab === t ? T.card : "transparent",
              color: tab === t ? T.text : T.muted,
              fontWeight: tab === t ? 700 : 400,
              cursor: "pointer",
              fontFamily: "DM Sans,sans-serif",
              fontSize: 14,
              transition: "all 0.2s",
              textTransform: "capitalize"
            }}
          >
            {t} {t === "remaining" ? `(${remaining.length})` : `(${completed.length})`}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {shown.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontFamily: "Nunito,sans-serif", fontWeight: 700, fontSize: 18 }}>
              {tab === "remaining" ? "All done! No pending assignments." : "No completed assignments yet."}
            </div>
          </div>
        )}
        {shown.map(a => (
          <div
            key={a.id}
            style={{
              background: T.card,
              borderRadius: 14,
              padding: 18,
              borderLeft: `4px solid ${subjectBorder[a.subject] || T.teal}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <div>
                <span style={{ fontWeight: 700, color: T.text, fontFamily: "Nunito,sans-serif", fontSize: 15 }}>{a.topic}</span>
                <span
                  style={{
                    marginLeft: 10,
                    background: diffColor[a.difficulty] + "22",
                    color: diffColor[a.difficulty],
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: 999
                  }}
                >
                  {a.difficulty}
                </span>
              </div>
              {a.completed && a.score !== null && (
                <div
                  style={{
                    fontFamily: "Nunito,sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: a.score >= 80 ? "#10B981" : a.score >= 60 ? T.amber : "#EF4444"
                  }}
                >
                  {a.score}%
                </div>
              )}
            </div>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 4 }}>
              {a.subject} • Assigned by {a.assignedBy}
            </div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: a.completed ? 8 : 12 }}>Due: {a.dueDate}</div>
            {a.completed && a.feedback && (
              <div style={{ fontSize: 13, color: T.teal, background: T.tealLight, borderRadius: 8, padding: "8px 12px" }}>
                💬 {a.feedback}
              </div>
            )}
            {!a.completed && (
              <button
                onClick={() => startQuiz(a)}
                style={{
                  padding: "8px 20px",
                  background: T.amber,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "DM Sans,sans-serif",
                  fontSize: 13
                }}
              >
                Attempt Now →
              </button>
            )}
          </div>
        ))}
      </div>

      {quizOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16
          }}
        >
          <div style={{ background: T.card, borderRadius: 20, padding: 28, width: "100%", maxWidth: 460, maxHeight: "90vh", overflowY: "auto" }}>
            {!showScore ? (
              <>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: T.muted, marginBottom: 6, fontWeight: 600 }}>
                    Question {qIdx + 1} of {quizOpen.questions.length}
                  </div>
                  <div style={{ height: 6, background: T.border, borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${((qIdx + 1) / quizOpen.questions.length) * 100}%`,
                        background: T.amber,
                        borderRadius: 999,
                        transition: "width 0.4s"
                      }}
                    />
                  </div>
                </div>
                <h3 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 800, fontSize: 18, color: T.text, marginBottom: 16 }}>
                  {quizOpen.questions[qIdx].q}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  {quizOpen.questions[qIdx].opts.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(i)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: `2px solid ${selected === i ? T.amber : T.border}`,
                        background: selected === i ? T.amberLight : "transparent",
                        color: T.text,
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "DM Sans,sans-serif",
                        fontSize: 14,
                        fontWeight: selected === i ? 600 : 400,
                        transition: "all 0.2s"
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {o}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={nextQ}
                    disabled={selected === null}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: selected === null ? "#E5E7EB" : T.amber,
                      color: selected === null ? T.muted : "#fff",
                      border: "none",
                      borderRadius: 10,
                      fontWeight: 700,
                      cursor: selected === null ? "not-allowed" : "pointer",
                      fontFamily: "DM Sans,sans-serif"
                    }}
                  >
                    {qIdx + 1 === quizOpen.questions.length ? "Submit Quiz ✓" : "Next →"}
                  </button>
                  <button
                    onClick={() => setQuizOpen(null)}
                    style={{
                      padding: "12px 20px",
                      background: "transparent",
                      border: `1px solid ${T.border}`,
                      borderRadius: 10,
                      color: T.muted,
                      cursor: "pointer",
                      fontFamily: "DM Sans,sans-serif"
                    }}
                  >
                    Exit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, margin: "0 0 8px" }}>
                    Quiz Complete!
                  </h3>
                  <div
                    style={{
                      fontFamily: "Nunito,sans-serif",
                      fontSize: 48,
                      fontWeight: 900,
                      color:
                        answers.filter((a, i) => a === quizOpen.questions[i].ans).length / quizOpen.questions.length >= 0.8
                          ? "#10B981"
                          : T.amber,
                      margin: "16px 0"
                    }}
                  >
                    {Math.round((answers.filter((a, i) => a === quizOpen.questions[i].ans).length / quizOpen.questions.length) * 100)}%
                  </div>
                  <p style={{ color: T.muted, fontSize: 14, marginBottom: 20 }}>
                    {answers.filter((a, i) => a === quizOpen.questions[i].ans).length} out of {quizOpen.questions.length} correct
                  </p>
                  <button
                    onClick={() => setQuizOpen(null)}
                    style={{
                      padding: "12px 32px",
                      background: T.amber,
                      color: "#fff",
                      border: "none",
                      borderRadius: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "Nunito,sans-serif",
                      fontSize: 16
                    }}
                  >
                    Done 🎯
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
