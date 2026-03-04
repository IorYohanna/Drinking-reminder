import type { DrinkLog } from "../type/types";

export const dayKey = (ts: number): string => new Date(ts).toDateString();

export const getDayMap = (logs: DrinkLog[]): Record<string, number> => {
  const m: Record<string, number> = {};
  logs.forEach(l => { m[dayKey(l.ts)] = (m[dayKey(l.ts)] ?? 0) + l.ml; });
  return m;
};

export const computeStreak = (logs: DrinkLog[], goal: number): number => {
  const m = getDayMap(logs);
  const goalMl = goal * 1000;
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    if ((m[d.toDateString()] ?? 0) >= goalMl) streak++;
    else if (i > 0) break;
  }
  return streak;
};

export function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, val: unknown): void {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}