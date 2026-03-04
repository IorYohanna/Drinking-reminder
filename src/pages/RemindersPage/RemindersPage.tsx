import { useState, useMemo } from "react";
import type { Reminder } from "../../type/types";
import { KEYS } from "../../utils/constants";
import { save } from "../../utils/utils";
import "./RemindersPage.css";
import { Btn } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import ToggleBtn from "../../components/ui/ToggleButton";
import Modal from "../../components/ui/Modal";
import { TI } from "../../components/ui/TextInput";

const ICONS = ["💧", "🌅", "☀️", "🍽️", "😴", "🌇", "🌙", "⚡", "🏃", "🎯", "🫖", "🧊"];

interface RemindersPageProps { 
  reminders: Reminder[]; 
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>; 
}

export default function RemindersPage({ reminders, setReminders }: RemindersPageProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTime, setNewTime] = useState("09:00");
  const [newLabel, setNewLabel] = useState("");
  const [newIcon, setNewIcon] = useState("💧");
  const sortedReminders = useMemo(() => {
    return [...reminders].sort((a, b) => a.time.localeCompare(b.time));
  }, [reminders]);

  const activeCount = useMemo(() => 
    reminders.filter(r => r.enabled).length, 
  [reminders]);

  const handleUpdateReminders = (next: Reminder[]) => {
    setReminders(next);
    save(KEYS.reminders, next);
  };

  const toggleReminder = (id: number) => {
    handleUpdateReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const removeReminder = (id: number) => {
    handleUpdateReminders(reminders.filter(r => r.id !== id));
  };

  const addReminder = () => {
    if (!newTime) return;
    const newEntry: Reminder = {
      id: Date.now(),
      time: newTime,
      label: newLabel || "Drink water",
      enabled: true,
      icon: newIcon
    };
    handleUpdateReminders([...reminders, newEntry]);
    resetForm();
  };

  const resetForm = () => {
    setShowAdd(false);
    setNewTime("09:00");
    setNewLabel("");
    setNewIcon("💧");
  };

  return (
    <div className="flex flex-col gap-3 p-4 pb-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="font-caveat text-[32px] font-bold text-p-ink">Reminders 🔔</h2>
          <p className="font-caveat text-[15px] text-p-muted">{activeCount} active</p>
        </div>
        <Btn onClick={() => setShowAdd(true)} className="py-2 px-4 text-lg">+ Add</Btn>
      </header>

      <Card className="flex gap-2.5 items-start py-3 px-3.5 bg-p-paper/50 border-p-ink/20">
        <span className="text-xl shrink-0">💡</span>
        <p className="font-caveat text-sm text-p-muted m-0">
          Visual reminders shown as a banner in the app. For phone notifications, 
          use your device's built-in clock app.
        </p>
      </Card>

      <section className="flex flex-col gap-2 mt-2">
        {sortedReminders.length === 0 ? (
          <div className="text-center py-10 font-caveat text-xl text-p-muted">No reminders yet!</div>
        ) : (
          sortedReminders.map(r => (
            <Card 
              key={r.id} 
              className={`reminder-card ${!r.enabled ? 'reminder-disabled' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[28px]">{r.icon}</span>
                <div>
                  <div className="font-caveat text-2xl font-bold text-p-ink leading-tight">{r.time}</div>
                  <div className="font-caveat text-[15px] text-p-muted">{r.label}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ToggleBtn enabled={r.enabled} onChange={() => toggleReminder(r.id)} />
                <button 
                  onClick={() => removeReminder(r.id)} 
                  className="bg-transparent border-none cursor-pointer text-lg text-p-muted hover:text-p-accent transition-colors"
                >
                  🗑️
                </button>
              </div>
            </Card>
          ))
        )}
      </section>

      <Modal open={showAdd} onClose={resetForm} title="New reminder ✏️">
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-caveat text-base text-p-muted mb-1.5 block">Time</label>
            <input 
              type="time" 
              value={newTime} 
              onChange={e => setNewTime(e.target.value)} 
              className="time-input-custom" 
            />
          </div>
          
          <div>
            <label className="font-caveat text-base text-p-muted mb-1.5 block">Label</label>
            <TI value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Morning boost..." />
          </div>

          <div>
            <label className="font-caveat text-base text-p-muted mb-2 block">Icon</label>
            <div className="icon-grid">
              {ICONS.map(ic => (
                <button 
                  key={ic} 
                  onClick={() => setNewIcon(ic)} 
                  className={`icon-selector-btn ${newIcon === ic ? 'active' : ''}`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <Btn onClick={addReminder} className="w-full p-3.5 text-xl mt-2">Save 💾</Btn>
        </div>
      </Modal>
    </div>
  );
}