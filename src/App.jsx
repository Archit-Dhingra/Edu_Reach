import { useState, useEffect } from "react";

// Themes and Constants
import { LIGHT, DARK } from "./constants/theme";
import { INIT_ASSIGNMENTS, INIT_NOTIFICATIONS } from "./constants/data";

// Custom Hooks
import { useLocalState } from "./hooks/useLocalState";

// Components
import { Toast } from "./components/Toast";
import { Sidebar } from "./components/Sidebar";

// Pages
import { WelcomeScreen } from "./pages/WelcomeScreen";
import { LoginScreen } from "./pages/LoginScreen";
import { SignupScreen } from "./pages/SignupScreen";
import { Dashboard } from "./pages/Dashboard";
import { AITutorFlow } from "./pages/AITutorFlow";
import { FindTutor } from "./pages/FindTutor";
import { Notifications } from "./pages/Notifications";
import { Assignments } from "./pages/Assignments";
import { Profile } from "./pages/Profile";

export default function EduReach() {
  const [dark, setDark] = useLocalState("edureach-dark", false);
  const [auth, setAuth] = useLocalState("edureach-auth", null);
  const [screen, setScreen] = useState("welcome"); // welcome | login | signup
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalState("edureach-sidebar", false);
  const [assignments, setAssignments] = useLocalState("edureach-assignments", INIT_ASSIGNMENTS);
  const [notifications, setNotifications] = useLocalState("edureach-notifs", INIT_NOTIFICATIONS);
  const [toast, setToast] = useState(null);

  const T = dark ? DARK : LIGHT;
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogin = user => {
    setAuth(user);
    setScreen("app");
    setPage("dashboard");
  };
  const handleLogout = () => {
    setAuth(null);
    setScreen("welcome");
  };
  const addAssignment = a => setAssignments(prev => [a, ...prev]);
  const completeAssignment = (id, score) =>
    setAssignments(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              completed: true,
              score,
              feedback:
                score >= 80
                  ? "Excellent work! Keep it up!"
                  : "Good effort! Review the marked topics again."
            }
          : a
      )
    );
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const addNotif = n => setNotifications(prev => [n, ...prev]);

  useEffect(() => {
    if (auth) {
      setScreen("app");
    }
  }, [auth]);

  if (screen !== "app") {
    return (
      <div style={{ fontFamily: "DM Sans,sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
        {screen === "welcome" && <WelcomeScreen onLogin={() => setScreen("login")} onSignup={() => setScreen("signup")} theme={T} />}
        {screen === "login" && <LoginScreen onSuccess={handleLogin} onGotoSignup={() => setScreen("signup")} theme={T} />}
        {screen === "signup" && <SignupScreen onSuccess={handleLogin} onGotoLogin={() => setScreen("login")} theme={T} />}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, overflow: "hidden", fontFamily: "DM Sans,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>
      <Sidebar
        active={page}
        onNav={setPage}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
        onLogout={handleLogout}
        user={auth}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
        notifCount={unreadCount}
        theme={T}
      />
      <main style={{ flex: 1, overflowY: "auto", background: T.bg }}>
        {page === "dashboard" && <Dashboard user={auth} theme={T} onNav={setPage} />}
        {page === "ai-tutor" && <AITutorFlow user={auth} theme={T} assignments={assignments} onAddAssignment={addAssignment} />}
        {page === "find-tutor" && <FindTutor theme={T} onNotif={addNotif} />}
        {page === "notifications" && <Notifications theme={T} notifications={notifications} onMarkAll={markAllRead} />}
        {page === "assignments" && <Assignments theme={T} assignments={assignments} onComplete={completeAssignment} />}
        {page === "profile" && (
          <Profile
            user={auth}
            theme={T}
            onSave={u => {
              setAuth(a => ({ ...a, ...u }));
              setToast("Profile updated!");
            }}
          />
        )}
      </main>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}