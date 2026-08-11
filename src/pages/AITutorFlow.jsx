import { useState, useEffect, useRef } from "react";
import { SUBJECTS_LIST, SUBJECT_ICONS, SUBJECT_COLORS } from "../constants/data";

export function AITutorFlow({ user, theme, assignments, onAddAssignment }) {
  const T = theme;
  const [step, setStep] = useState("select"); // select | chat
  const [subject, setSubject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [topicsCovered, setTopicsCovered] = useState([]);
  const [chatHistory] = useState(["Jan 10 — Math", "Jan 8 — Science", "Jan 5 — Math"]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const startChat = s => {
    setSubject(s);
    setMessages([
      {
        id: "1",
        role: "ai",
        text: `Hi ${user.name.split(" ")[0]}! 😊 I'm ${
          user.tutorName || "Asha"
        }, your AI tutor. Today we're going to learn about ${s}! What topic would you like to start with?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setStep("chat");
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(m => [...m, userMsg]);
    const userInput = input;
    setInput("");
    setTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const msg = userInput.toLowerCase();
      if (msg.includes("fraction")) {
        aiResponse = "Fractions represent parts of a whole. For example, 1/2 means one part out of two equal parts. 🍕";
        setTopicsCovered(t => [...new Set([...t, "Fractions"])]);
      } else if (msg.includes("algebra")) {
        aiResponse = "Algebra is about finding unknown values using equations. Example: x + 2 = 5, so x = 3.";
        setTopicsCovered(t => [...new Set([...t, "Algebra"])]);
      } else if (msg.includes("force")) {
        aiResponse = "Force is a push or pull on an object. It is measured in Newtons (N).";
        setTopicsCovered(t => [...new Set([...t, "Force"])]);
      } else if (msg.includes("gravity")) {
        aiResponse = "Gravity is the force that pulls objects toward the Earth. That's why things fall down!";
        setTopicsCovered(t => [...new Set([...t, "Gravity"])]);
      } else if (msg.includes("computer") || msg.includes("programming")) {
        aiResponse = "Programming means giving instructions to a computer using languages like C++ or Python.";
        setTopicsCovered(t => [...new Set([...t, "Programming"])]);
      } else if (msg.includes("hello") || msg.includes("hi")) {
        aiResponse = `Hello ${user.name.split(" ")[0]}! 😊 How can I help you today in ${subject}?`;
      } else if (msg.includes("quiz") || msg.includes("test")) {
        aiResponse = `Great work! I've added a quiz on ${subject} to your Assignments section. 📝`;
        onAddAssignment({
          id: Date.now(),
          subject,
          assignedBy: `AI Tutor (${user.tutorName || "Asha"})`,
          dueDate: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
          topic: topicsCovered[0] || subject,
          difficulty: "Medium",
          completed: false,
          score: null
        });
      } else {
        aiResponse = `That's a great question! Let me explain it in a simple way. ${subject} becomes easy when you understand the basics step by step. 😊`;
      }
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(m => [...m, aiMsg]);
      setTyping(false);
    }, 1000);
  };

  const requestQuiz = () => {
    setInput("I want a quiz");
    setTimeout(() => document.getElementById("chat-input")?.click(), 50);
    const fake = {
      id: "user-quiz-" + Date.now(),
      role: "user",
      text: "📝 Request a Quiz",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(m => [...m, fake]);
    setTyping(true);
    setTimeout(() => {
      const r = {
        id: "ai-quiz-" + Date.now(),
        role: "ai",
        text: `Great idea! I've added a quiz on ${subject} covering ${
          topicsCovered.join(", ") || "recent topics"
        } to your Assignments section. Go check it out! 📝`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(m => [...m, r]);
      setTyping(false);
      onAddAssignment({
        id: Date.now(),
        subject,
        assignedBy: `AI Tutor (${user.tutorName || "Asha"})`,
        dueDate: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
        topic: topicsCovered[0] || subject,
        difficulty: "Medium",
        completed: false,
        score: null
      });
    }, 1000);
  };

  if (step === "select") {
    return (
      <div style={{ padding: 28, maxWidth: 700, fontFamily: "DM Sans,sans-serif" }}>
        <h2 style={{ fontFamily: "Nunito,sans-serif", fontWeight: 900, fontSize: 24, color: T.text, marginBottom: 8 }}>
          ✨ Choose a Subject
        </h2>
        <p style={{ color: T.muted, marginBottom: 24 }}>Select a subject to start your AI tutoring session.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 14 }}>
          {user.subjects.map(s => (
            <button
              key={s}
              onClick={() => startChat(s)}
              style={{
                padding: "20px 16px",
                borderRadius: 14,
                border: `2px solid ${T.border}`,
                background: T.card,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
                fontFamily: "DM Sans,sans-serif"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = SUBJECT_COLORS[s] || T.amber;
                e.currentTarget.style.boxShadow = `0 8px 24px ${SUBJECT_COLORS[s] || T.amber}33`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{SUBJECT_ICONS[s] || "📖"}</div>
              <div style={{ fontWeight: 600, color: T.text, fontSize: 14 }}>{s}</div>
            </button>
          ))}
          <button
            style={{
              padding: "20px 16px",
              borderRadius: 14,
              border: `2px dashed ${T.border}`,
              background: "transparent",
              cursor: "pointer",
              textAlign: "center",
              fontFamily: "DM Sans,sans-serif",
              color: T.muted
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>+</div>
            <div style={{ fontSize: 14 }}>Add New</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "calc(100vh - 0px)", fontFamily: "DM Sans,sans-serif", overflow: "hidden" }}>
      {/* Chat history sidebar */}
      <div style={{ width: 220, borderRight: `1px solid ${T.border}`, background: T.sidebar, padding: 16, flexShrink: 0, overflowY: "auto" }}>
        <button
          onClick={() => setStep("select")}
          style={{
            width: "100%",
            marginBottom: 14,
            padding: "8px 12px",
            background: T.amberLight,
            color: T.amber,
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "DM Sans,sans-serif",
            fontSize: 13
          }}
        >
          ← Back to Subjects
        </button>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          Recent Sessions
        </div>
        {chatHistory.map((h, i) => (
          <div
            key={i}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              marginBottom: 4,
              background: i === 0 ? T.amberLight : "transparent",
              color: i === 0 ? T.amber : T.muted,
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {/* Main chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${T.border}`,
            background: T.card,
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: T.tealLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20
            }}
          >
            🤖
          </div>
          <div>
            <div style={{ fontWeight: 700, color: T.text, fontFamily: "Nunito,sans-serif" }}>
              {user.tutorName || "Asha"} — {subject}
            </div>
            <div style={{ fontSize: 12, color: T.teal }}>● Online</div>
          </div>
          {topicsCovered.length > 0 && (
            <div style={{ marginLeft: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {topicsCovered.map(t => (
                <span
                  key={t}
                  style={{
                    background: T.tealLight,
                    color: T.teal,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 999
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map(m => (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                gap: 10,
                alignItems: "flex-end"
              }}
            >
              {m.role === "ai" && (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: T.tealLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0
                  }}
                >
                  🤖
                </div>
              )}
              <div
                style={{
                  maxWidth: "70%",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user" ? T.amber : T.card,
                  color: m.role === "user" ? "#fff" : T.text,
                  fontSize: 14,
                  lineHeight: 1.6,
                  border: m.role === "ai" ? `1px solid ${T.border}` : "none"
                }}
              >
                {m.text}
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.6, textAlign: "right" }}>{m.time}</div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: T.tealLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16
                }}
              >
                🤖
              </div>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "10px 16px", display: "flex", gap: 6 }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: T.muted,
                      animation: `typing 1s ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <style>{`@keyframes typing{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
        {/* Quick action */}
        <div style={{ padding: "8px 20px 0" }}>
          <button
            onClick={requestQuiz}
            style={{
              padding: "6px 14px",
              background: T.amberLight,
              color: T.amber,
              border: `1px solid ${T.amber}44`,
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "DM Sans,sans-serif"
            }}
          >
            📝 Request a Quiz
          </button>
        </div>
        {/* Input */}
        <div style={{ padding: 16, borderTop: `1px solid ${T.border}`, display: "flex", gap: 10 }}>
          <input
            id="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg()}
            placeholder={`Ask ${user.tutorName || "Asha"} anything... (Enter to send)`}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 12,
              border: `1.5px solid ${T.border}`,
              background: T.input,
              color: T.text,
              fontFamily: "DM Sans,sans-serif",
              fontSize: 14,
              outline: "none"
            }}
          />
          <button style={{ padding: "12px", background: T.border, border: "none", borderRadius: 12, cursor: "pointer", fontSize: 18 }}>
            🎤
          </button>
          <button
            onClick={sendMsg}
            style={{
              padding: "12px 20px",
              background: T.amber,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontFamily: "Nunito,sans-serif",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
