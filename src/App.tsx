import { useState, useEffect, useRef } from "react";
import type { DrinkLog, Reminder, TabId } from "./type/types";
import { KEYS, DEFAULT_REMINDERS } from "./utils/constants";
import { load } from "./utils/utils";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import RemindersPage from "./pages/RemindersPage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";
import Notif from "./components/layouts/Notifications";
import Navbar from "./components/layouts/NavBar/NavBar";
import LoadingPage from "./pages/LoadingPage";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [goal, setGoal] = useState<number>(() => load<number>(KEYS.goal, 2.5));
  const [logs, setLogs] = useState<DrinkLog[]>(() => load<DrinkLog[]>(KEYS.logs, []));
  const [reminders, setReminders] = useState<Reminder[]>(() => load<Reminder[]>(KEYS.reminders, DEFAULT_REMINDERS));
  const [toast, setToast] = useState<Reminder | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [exitSplash, setExitSplash] = useState(false);

  useEffect(() => {
    const timerExit = setTimeout(() => setExitSplash(true), 2000);
    const timerRemove = setTimeout(() => setShowSplash(false), 3000);
    return () => {
      clearTimeout(timerExit);
      clearTimeout(timerRemove);
    };
  }, []);

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

  return (
    <main className="bg-[#EAE5DF] text-black font-novaSquare relative w-full h-screen overflow-hidden">

      <Notif data={toast} onClose={() => setToast(null)} />

      <div className="h-full flex justify-center w-full">
        <div className="w-full max-w-105 h-full flex flex-col relative bg-[#F5F0E8] shadow-2xl overflow-hidden">
          {showSplash && <LoadingPage isExiting={exitSplash} />}

          <div className="flex-1 overflow-hidden relative">
            {tab === "home" && <HomePage logs={logs} setLogs={setLogs} goal={goal} setGoal={setGoal} />}
            {tab === "history" && <HistoryPage logs={logs} setLogs={setLogs} goal={goal} />}
            {tab === "reminders" && <RemindersPage reminders={reminders} setReminders={setReminders} />}
            {tab === "profile" && <ProfilePage goal={goal} setGoal={setGoal} logs={logs} />}
          </div>

          <Navbar currentTab={tab} onTabChange={setTab} />

        </div>
      </div>
    </main>
  );
}