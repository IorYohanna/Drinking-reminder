import { useState, useEffect, useRef } from "react";
import type { DrinkLog, Reminder, TabId } from "./type/types";
import { KEYS, DEFAULT_REMINDERS } from "./utils/constants";
import { load } from "./utils/utils";
import { NavTab } from "./components/layouts/NavTab";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import RemindersPage from "./pages/RemindersPage";
import ProfilePage from "./pages/ProfilPage";
import "./index.css"
import { SketchyDefs } from "./components/ui/SketchuDefs";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [goal, setGoal] = useState<number>(() => load<number>(KEYS.goal, 2.5));
  const [logs, setLogs] = useState<DrinkLog[]>(() => load<DrinkLog[]>(KEYS.logs, []));
  const[reminders, setReminders] = useState<Reminder[]>(() => load<Reminder[]>(KEYS.reminders, DEFAULT_REMINDERS));
  const [toast, setToast] = useState<Reminder | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const hit = reminders.find(r => r.enabled && r.time === hhmm);
      if (hit) {
        setToast(hit);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 6000);
      }
    };
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [reminders]);

  const TABS: { id: TabId; icon: string; label: string; }[] =[
    { id: "home",         icon: "🏠", label: "Home" },
    { id: "history",      icon: "📊", label: "History" },
    { id: "reminders",    icon: "🔔", label: "Remind" },
    { id: "profile",      icon: "👤", label: "Profile" },
  ];

  return (
    <main className="bg-black text-white">
      <SketchyDefs />

      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-p-paper border-[3px] border-p-green rounded-[14px] py-3 px-5 flex items-center gap-2.5 shadow-[4px_4px_0_#1a1714] max-w-[360px] w-[90%]" style={{ filter: "url(#sk2)" }}>
          <span className="text-[26px]">{toast.icon}</span>
          <div>
            <div className="font-caveat text-lg font-bold text-p-green">Time to drink! 💧</div>
            <div className="font-caveat text-[15px] text-p-muted">{toast.label}</div>
          </div>
          <button onClick={() => setToast(null)} className="bg-none border-none cursor-pointer text-xl text-p-muted ml-auto">✕</button>
        </div>
      )}

      <div className="bg-p-bg min-h-screen flex justify-center">
        <div className="w-full max-w-[420px] min-h-screen bg-p-bg flex flex-col relative">
          <div className="flex-1 overflow-y-auto pb-[72px]">
            {tab === "home"         && <HomePage         logs={logs} setLogs={setLogs} goal={goal} setGoal={setGoal} />}
            {tab === "history"      && <HistoryPage      logs={logs} setLogs={setLogs} goal={goal} />}
            {tab === "reminders"    && <RemindersPage    reminders={reminders} setReminders={setReminders} />}
            {tab === "profile"      && <ProfilePage      goal={goal} setGoal={setGoal} logs={logs} />}
          </div>

          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-p-paper border-t-[2.5px] border-p-ink flex justify-around pb-[env(safe-area-inset-bottom,4px)] z-40" style={{ filter: "url(#sk)" }}>
            {TABS.map(t => <NavTab key={t.id} {...t} active={tab === t.id} onClick={() => setTab(t.id)} />)}
          </nav>
        </div>
      </div>
    </main>
  );
}