import { useState } from "react";
import type { DrinkLog, Profile } from "../type/types";
import { KEYS } from "../utils/constants";
import { load, save, computeStreak, dayKey } from "../utils/utils";
import { Card } from "../components/ui/Card";
import { TI } from "../components/layouts/TI";

interface Props { goal: number; setGoal: React.Dispatch<React.SetStateAction<number>>; logs: DrinkLog[]; }

export default function ProfilePage({ goal, setGoal, logs }: Props) {
  const[profile, setProfile] = useState<Profile>(() => load<Profile>(KEYS.profile, { name: "Me", weight: 70, unit: "metric" }));

  const updateProfile = (patch: Partial<Profile>) => { const next = { ...profile, ...patch }; setProfile(next); save(KEYS.profile, next); };
  const suggestedGoal = +(profile.weight * (profile.unit === "metric" ? 0.033 : 0.015)).toFixed(1);
  const totalLogged = logs.reduce((s, l) => s + l.ml, 0);
  const daysActive = new Set(logs.map(l => dayKey(l.ts))).size;
  const streak = computeStreak(logs, goal);

  return (
    <div className="flex flex-col gap-3.5 p-4 pb-6">
      <h2 className="font-caveat text-[32px] font-bold text-p-ink">Profile 🐱</h2>

      <Card className="flex items-center gap-4">
        <div className="w-18 h-18 rounded-full border-[3px] border-p-ink bg-p-blue flex items-center justify-center text-[38px] shrink-0" style={{ filter: "url(#sk2)" }}>🐱</div>
        <div>
          <div className="font-caveat text-[26px] font-bold text-p-ink">{profile.name}</div>
          <div className="font-caveat text-[15px] text-p-muted">{daysActive} days · {(totalLogged / 1000).toFixed(1)}L total · {streak}🔥</div>
        </div>
      </Card>

      <Card>
        <p className="font-caveat text-base text-p-muted mb-1.5">Your name</p>
        <TI value={profile.name} onChange={e => updateProfile({ name: e.target.value })} placeholder="Your name" />
      </Card>

      <Card>
        <p className="font-caveat text-base text-p-muted mb-1.5">Weight — for goal suggestion</p>
        <div className="flex gap-2.5 items-center">
          <TI type="number" value={profile.weight} onChange={e => updateProfile({ weight: Number(e.target.value) })} className="flex-1" />
          <div className="flex gap-1">
            {(["metric", "imperial"] as const).map(u => (
              <button key={u} onClick={() => updateProfile({ unit: u })} style={{ filter: "url(#sk)" }} className={`border-2 border-p-ink rounded-md py-2 px-2.5 font-caveat text-[15px] cursor-pointer transition-colors ${profile.unit === u ? 'bg-p-ink text-white' : 'bg-transparent text-p-ink'}`}>{u === "metric" ? "kg" : "lbs"}</button>
            ))}
          </div>
        </div>
        <p className="font-caveat text-[15px] text-p-green mt-2">💡 Suggested: {suggestedGoal}L/day</p>
        <button onClick={() => { setGoal(suggestedGoal); save(KEYS.goal, suggestedGoal); }} style={{ filter: "url(#sk)" }} className="mt-1.5 bg-p-greenLight text-p-green border-2 border-p-green rounded-md py-1.5 px-3.5 font-caveat text-base cursor-pointer">Use {suggestedGoal}L as my goal</button>
      </Card>

      <Card>
        <p className="font-caveat text-lg font-bold text-p-ink mb-2.5">Daily Goal</p>
        <div className="flex gap-2 flex-wrap">
          {[1.5, 2, 2.5, 3, 3.5].map(g => (
            <button key={g} onClick={() => { setGoal(g); save(KEYS.goal, g); }} style={{ filter: "url(#sk)" }} className={`border-[2.5px] border-p-ink rounded-lg py-2 px-3.5 font-caveat text-lg cursor-pointer transition-colors ${goal === g ? 'bg-p-green text-white' : 'bg-p-paper text-p-ink'}`}>{g}L</button>
          ))}
        </div>
      </Card>

      <Card className="border-[2.5px] border-p-accent">
        <p className="font-caveat text-lg font-bold text-p-accent mb-2">Reset data</p>
        <p className="font-caveat text-sm text-p-muted mb-2.5">Permanently delete all drink logs stored on this device.</p>
        <button onClick={() => { if (window.confirm("Delete ALL logs? Can't be undone.")) { save(KEYS.logs,[]); window.location.reload(); } }} style={{ filter: "url(#sk)" }} className="bg-transparent text-p-accent border-2 border-p-accent rounded-lg py-2 px-4 font-caveat text-[17px] cursor-pointer">🗑️ Clear all logs</button>
      </Card>

      <p className="font-caveat text-[13px] text-p-muted text-center">All data stored locally on this device only 🔒</p>
    </div>
  );
}