import { useState } from "react";
import type { Reminder } from "../type/types";
import { KEYS } from "../utils/constants";
import { save } from "../utils/utils";
import { Card } from "../components/ui/Card";
import { Btn } from "../components/ui/Btn";
import  ToggleBtn  from "../components/layouts/ToggleBtn";
import Modal from "../components/ui/Modal";
import { TI } from "../components/layouts/TI";


interface Props { reminders: Reminder[]; setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>; }

export default function RemindersPage({ reminders, setReminders }: Props) {
  const[showAdd, setShowAdd] = useState(false);
  const [newTime, setNewTime] = useState("09:00");
  const [newLabel, setNewLabel] = useState("");
  const[newIcon, setNewIcon] = useState("💧");
  const ICONS =["💧", "🌅", "☀️", "🍽️", "😴", "🌇", "🌙", "⚡", "🏃", "🎯", "🫖", "🧊"];

  const saveReminders = (next: Reminder[]) => { setReminders(next); save(KEYS.reminders, next); };
  const toggle = (id: number) => saveReminders(reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  const remove = (id: number) => saveReminders(reminders.filter(r => r.id !== id));
  const add = () => {
    if (!newTime) return;
    saveReminders([...reminders, { id: Date.now(), time: newTime, label: newLabel || "Drink water", enabled: true, icon: newIcon }]);
    setShowAdd(false); setNewTime("09:00"); setNewLabel(""); setNewIcon("💧");
  };

  const sorted = [...reminders].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="flex flex-col gap-3 p-4 pb-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-caveat text-[32px] font-bold text-p-ink">Reminders 🔔</h2>
          <p className="font-caveat text-[15px] text-p-muted">{reminders.filter(r => r.enabled).length} active</p>
        </div>
        <Btn onClick={() => setShowAdd(true)} className="py-2 px-4 text-lg">+ Add</Btn>
      </div>

      <Card className="flex gap-2.5 items-start py-3 px-3.5">
        <span className="text-xl shrink-0">💡</span>
        <p className="font-caveat text-sm text-p-muted m-0">Visual reminders shown as a banner in the app. For phone notifications, use your device's built-in clock app.</p>
      </Card>

      {sorted.length === 0 && <div className="text-center py-10 font-caveat text-xl text-p-muted">No reminders yet!</div>}

      {sorted.map(r => (
        <Card key={r.id} className={`flex justify-between items-center py-3 px-4 transition-opacity ${r.enabled ? 'opacity-100' : 'opacity-[0.55]'}`}>
          <div className="flex items-center gap-3">
            <span className="text-[28px]">{r.icon}</span>
            <div>
              <div className="font-caveat text-2xl font-bold text-p-ink">{r.time}</div>
              <div className="font-caveat text-[15px] text-p-muted">{r.label}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ToggleBtn enabled={r.enabled} onChange={() => toggle(r.id)} />
            <button onClick={() => remove(r.id)} className="bg-none border-none cursor-pointer text-lg text-p-muted">🗑️</button>
          </div>
        </Card>
      ))}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="New reminder ✏️">
        <div className="flex flex-col gap-3.5">
          <div>
            <p className="font-caveat text-base text-p-muted mb-1.5">Time</p>
            <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full font-caveat text-[22px] bg-transparent border-2 border-p-ink rounded-md py-2 px-3 outline-none text-p-ink box-border" />
          </div>
          <div>
            <p className="font-caveat text-base text-p-muted mb-1.5">Label</p>
            <TI value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Morning boost..." />
          </div>
          <div>
            <p className="font-caveat text-base text-p-muted mb-2">Icon</p>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(ic => (
                <button key={ic} onClick={() => setNewIcon(ic)} style={{ filter: "url(#sk)" }} className={`text-2xl p-2 border-2 rounded-lg cursor-pointer transition-colors ${newIcon === ic ? 'border-p-green bg-p-greenLight' : 'border-p-ink bg-transparent'}`}>{ic}</button>
              ))}
            </div>
          </div>
          <Btn onClick={add} className="w-full p-3.5 text-xl">Save 💾</Btn>
        </div>
      </Modal>
    </div>
  );
}