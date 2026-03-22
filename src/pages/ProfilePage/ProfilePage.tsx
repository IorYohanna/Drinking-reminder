import { useState, useMemo } from "react";
import type { DrinkLog, Profile } from "../../type/types";
import { KEYS } from "../../utils/constants";
import { load, save, computeStreak, dayKey } from "../../utils/utils";
import { Card } from "../../components/ui/Card";
import {  TI } from "../../components/ui/TextInput";
import "./ProfilePage.css";

interface ProfilePageProps { 
  goal: number; 
  setGoal: (g: number) => void; 
  logs: DrinkLog[]; 
}

export default function ProfilePage({ goal, setGoal, logs }: ProfilePageProps) {
  const [profile, setProfile] = useState<Profile>(() => 
    load<Profile>(KEYS.profile, { name: "Me", weight: 70, unit: "metric" })
  );

  const stats = useMemo(() => {
    const totalLogged = logs.reduce((s, l) => s + l.ml, 0);
    const daysActive = new Set(logs.map(l => dayKey(l.ts))).size;
    const streak = computeStreak(logs, goal);
    return { totalLogged, daysActive, streak };
  }, [logs, goal]);

  const suggestedGoal = useMemo(() => {
    const factor = profile.unit === "metric" ? 0.033 : 0.015;
    return +(profile.weight * factor).toFixed(1);
  }, [profile.weight, profile.unit]);

  const updateProfile = (patch: Partial<Profile>) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    save(KEYS.profile, next);
  };

  const handleReset = () => {
    if (window.confirm("Delete ALL logs? This cannot be undone.")) {
      save(KEYS.logs, []);
      window.location.reload();
    }
  };

  const applySuggested = () => {
    setGoal(suggestedGoal);
    save(KEYS.goal, suggestedGoal);
  };

  return (
    <div className="profile-container">
      <h2 className="text-[32px] font-bold">Profile 🐱</h2>

      <Card className="flex items-center gap-4">
        <div className="profile-avatar">🐱</div>
        <div>
          <div className="text-[26px] font-bold">{profile.name}</div>
          <div className="text-[15px]">
            {stats.daysActive} days · {(stats.totalLogged / 1000).toFixed(1)}L total · {stats.streak}🔥
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-base mb-1.5">Your name</p>
        <TI value={profile.name} onChange={e => updateProfile({ name: e.target.value })} />
      </Card>

      <Card>
        <p className="text-base mb-1.5">Weight — for suggestion</p>
        <div className="flex gap-2.5 items-center">
          <TI type="number" value={profile.weight} onChange={e => updateProfile({ weight: Number(e.target.value) })} className="flex-1" />
          <div className="flex gap-1">
            {(["metric", "imperial"] as const).map(u => (
              <button 
                key={u} 
                onClick={() => updateProfile({ unit: u })} 
                className={`unit-btn ${profile.unit === u ? 'active' : ''}`}
              >
                {u === "metric" ? "kg" : "lbs"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 p-3 rounded-lg border">
          <p className="text-[15px]">💡 Suggested: {suggestedGoal}L/day</p>
          <button onClick={applySuggested} className="suggested-btn">
            Use {suggestedGoal}L as my goal
          </button>
        </div>
      </Card>

      <Card className="border-[2.5px] mt-4">
        <p className="text-lg font-bold mb-1">Reset data</p>
        <p className="text-sm mb-3">Permanently delete all drink logs stored on this device.</p>
        <button onClick={handleReset} className="danger-btn">
          🗑️ Clear all logs
        </button>
      </Card>

      <p className="text-[13px] text-center italic">
        All data stored locally on this device only 🔒
      </p>
    </div>
  );
}