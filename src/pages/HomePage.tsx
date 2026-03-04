import { useState } from "react";
import type { DrinkLog } from "../type/types";
import { KEYS, P, DRINK_TYPES, QUICK_AMOUNTS } from "../utils/constants";
import { save, computeStreak } from "../utils/utils";
import { CircleProgress } from "../components/CircleProgress";
import { Card } from "../components/ui/Card";
import { Btn } from "../components/ui/Btn";
import Modal from "../components/ui/Modal";
import { TI } from "../components/layouts/TI";

interface Props { logs: DrinkLog[]; setLogs: React.Dispatch<React.SetStateAction<DrinkLog[]>>; goal: number; setGoal: React.Dispatch<React.SetStateAction<number>>; }

export default function HomePage({ logs, setLogs, goal, setGoal }: Props) {
  const [selAmt, setSelAmt] = useState<number>(250);
  const[selType, setSelType] = useState<string>("water");
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customAmt, setCustomAmt] = useState<string>("");
  const [goalModal, setGoalModal] = useState<boolean>(false);
  const[goalInput, setGoalInput] = useState<number>(goal);
  const [pop, setPop] = useState<boolean>(false);

  const today = new Date().toDateString();
  const todayLogs = logs.filter(l => new Date(l.ts).toDateString() === today);
  const totalMl = todayLogs.reduce((s, l) => s + l.ml, 0);
  const totalL = +(totalMl / 1000).toFixed(2);
  const pct = Math.min(100, Math.round((totalMl / (goal * 1000)) * 100));
  const streak = computeStreak(logs, goal);

  const addLog = () => {
    const ml = customMode ? Number(customAmt) : selAmt;
    if (!ml || ml <= 0) return;
    const next: DrinkLog[] =[{ id: Date.now(), ml, type: selType, ts: Date.now() }, ...logs];
    setLogs(next); save(KEYS.logs, next);
    setPop(true); setTimeout(() => setPop(false), 500);
    setCustomAmt(""); setCustomMode(false);
  };

  const removeLog = (id: number) => {
    const next = logs.filter(x => x.id !== id);
    setLogs(next); save(KEYS.logs, next);
  };

  const saveGoal = () => { setGoal(goalInput); save(KEYS.goal, goalInput); setGoalModal(false); };

  return (
    <div className="flex flex-col gap-3.5 p-4 pb-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-caveat text-base text-p-muted">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
          <h1 className="font-caveat text-[32px] font-bold text-p-ink leading-none">{pct >= 100 ? "Goal reached! 🎉" : pct >= 60 ? "Keep going! 🌊" : "Stay hydrated! 💧"}</h1>
        </div>
        <div onClick={() => setGoalModal(true)} style={{ filter: "url(#sk)" }} className="bg-p-greenLight border-2 border-p-green rounded-[10px] px-3 py-1.5 cursor-pointer text-center">
          <div className="font-caveat text-xs text-p-green">Goal</div>
          <div className="font-caveat text-[22px] font-bold text-p-green">{goal}L</div>
        </div>
      </div>

      {streak > 0 && (
        <Card className="inline-flex items-center gap-2 py-2 px-3.5 self-start">
          <span className="text-xl">🔥</span><span className="font-caveat text-lg text-p-ink">{streak}-day streak!</span>
        </Card>
      )}

      <div className="flex justify-center py-1">
        <div className={`transition-transform duration-300 ${pop ? 'scale-105' : 'scale-100'}`}>
          <CircleProgress pct={pct} total={goal} current={totalL} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Drinks",    val: todayLogs.length,                               unit: "today" },
          { label: "Remaining", val: `${Math.max(0, +(goal - totalL).toFixed(2))}L`, unit: "to go" },
          { label: "Last",      val: todayLogs[0] ? `${Math.round((Date.now() - todayLogs[0].ts) / 60000)}m` : "—", unit: "ago" },
        ].map(s => (
          <Card key={s.label} className="text-center py-2.5 px-1.5">
            <div className="font-caveat text-[26px] font-bold text-p-green">{s.val}</div>
            <div className="font-caveat text-[13px] text-p-muted">{s.unit}</div>
            <div className="font-caveat text-[11px] text-p-ink/50">{s.label}</div>
          </Card>
        ))}
      </div>

      <div>
        <p className="font-caveat text-lg text-p-muted mb-2">Quick add</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {QUICK_AMOUNTS.map(q => (
            <button key={q.ml} onClick={() => { setSelAmt(q.ml); setCustomMode(false); }} style={{ filter: "url(#sk)" }} className={`shrink-0 border-[2.5px] border-p-ink rounded-[10px] py-2.5 px-3 font-caveat text-base cursor-pointer min-w-17 flex flex-col items-center gap-0.75 transition-colors ${selAmt === q.ml && !customMode ? 'bg-p-green text-white' : 'bg-p-paper text-p-ink'}`}>
              <span className="text-2xl">{q.icon}</span><span>{q.ml}ml</span><span className="text-[11px] opacity-70">{q.label}</span>
            </button>
          ))}
          <button onClick={() => setCustomMode(true)} style={{ filter: "url(#sk)" }} className={`shrink-0 border-[2.5px] border-p-ink rounded-[10px] py-2.5 px-3 font-caveat text-base cursor-pointer min-w-17 flex flex-col items-center gap-0.75 transition-colors ${customMode ? 'bg-p-green text-white' : 'bg-p-paper text-p-ink'}`}>
            <span className="text-2xl">✏️</span><span>Custom</span>
          </button>
        </div>
      </div>

      {customMode && (
        <Card className="py-3 px-3.5">
          <p className="font-caveat text-base text-p-muted mb-1.5">Amount in ml</p>
          <TI type="number" value={customAmt} onChange={e => setCustomAmt(e.target.value)} placeholder="e.g. 330" />
        </Card>
      )}

      <div>
        <p className="font-caveat text-lg text-p-muted mb-2">Drink type</p>
        <div className="flex gap-2 flex-wrap">
          {DRINK_TYPES.map(d => (
            <button key={d.id} onClick={() => setSelType(d.id)} style={{ backgroundColor: selType === d.id ? d.color : P.paper, filter: "url(#sk)" }} className={`border-[2.5px] border-p-ink rounded-full py-1.5 px-3.5 font-caveat text-base cursor-pointer flex items-center gap-1.25 transition-colors ${selType === d.id ? 'text-white' : 'text-p-ink'}`}>
              {d.icon} {d.label}
            </button>
          ))}
        </div>
      </div>

      <Btn onClick={addLog} className="w-full p-4 text-[22px] rounded-xl shadow-[4px_4px_0_#1a1714]">💧 LOG DRINK</Btn>

      {todayLogs.length > 0 && (
        <div>
          <p className="font-caveat text-lg text-p-muted mb-2">Today's log</p>
          <div className="flex flex-col gap-2">
            {todayLogs.slice(0, 4).map(l => {
              const dt = DRINK_TYPES.find(d => d.id === l.type) ?? DRINK_TYPES[0];
              return (
                <Card key={l.id} className="flex justify-between items-center py-2.5 px-3.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[22px]">{dt.icon}</span>
                    <div>
                      <div className="font-caveat text-lg text-p-ink">{l.ml}ml — {dt.label}</div>
                      <div className="font-caveat text-[13px] text-p-muted">{new Date(l.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>
                  </div>
                  <button onClick={() => removeLog(l.id)} className="bg-none border-none cursor-pointer text-lg text-p-muted">✕</button>
                </Card>
              );
            })}
            {todayLogs.length > 4 && <p className="font-caveat text-sm text-p-muted text-center">+{todayLogs.length - 4} more entries</p>}
          </div>
        </div>
      )}

      <Modal open={goalModal} onClose={() => setGoalModal(false)} title="Daily goal 🎯">
        <p className="font-caveat text-base text-p-muted mb-3">Choose or type your daily target</p>
        <div className="flex gap-2 flex-wrap mb-3.5">
          {[1.5, 2, 2.5, 3, 3.5].map(g => (
            <button key={g} onClick={() => setGoalInput(g)} style={{ filter: "url(#sk)" }} className={`border-[2.5px] border-p-ink rounded-lg py-2 px-4 font-caveat text-lg cursor-pointer transition-colors ${goalInput === g ? 'bg-p-green text-white' : 'bg-p-paper text-p-ink'}`}>
              {g}L
            </button>
          ))}
        </div>
        <TI type="number" value={goalInput} onChange={e => setGoalInput(Number(e.target.value))} className="mb-4" />
        <Btn onClick={saveGoal} className="w-full p-3.5 text-xl">Save ✓</Btn>
      </Modal>
    </div>
  );
}