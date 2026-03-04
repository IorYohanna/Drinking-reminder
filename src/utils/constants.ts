import type { DrinkType, QuickAmount, Reminder } from "../type/types";
export const KEYS = {
  logs:      "hydro_logs",
  reminders: "hydro_reminders",
  profile:   "hydro_profile",
  goal:      "hydro_goal",
} as const;

export const P = {
  bg:         "#f5f0e8",
  paper:      "#fffdf7",
  green:      "#096643",
  greenLight: "#e8f5ef",
  accent:     "#e8732a",
  ink:        "#1a1714",
  muted:      "#8c7e70",
  blue:       "#4a90d9",
  water:      "#6bc4e8",
} as const;

export const DRINK_TYPES: DrinkType[] =[
  { id: "water",  label: "Water",  icon: "💧", color: P.blue },
  { id: "tea",    label: "Tea",    icon: "🍵", color: "#a67c52" },
  { id: "coffee", label: "Coffee", icon: "☕", color: "#6f4e37" },
  { id: "juice",  label: "Juice",  icon: "🧃", color: P.accent },
  { id: "milk",   label: "Milk",   icon: "🥛", color: "#c8c8c8" },
  { id: "sport",  label: "Sport",  icon: "🏃", color: P.green },
];

export const QUICK_AMOUNTS: QuickAmount[] =[
  { ml: 150, icon: "☕", label: "Espresso" },
  { ml: 250, icon: "🥤", label: "Glass" },
  { ml: 350, icon: "🫗", label: "Lg glass" },
  { ml: 500, icon: "🍶", label: "Bottle" },
];

export const DEFAULT_REMINDERS: Reminder[] =[
  { id: 1, time: "08:00", label: "Morning boost",   enabled: true,  icon: "🌅" },
  { id: 2, time: "11:00", label: "Mid-morning",     enabled: true,  icon: "☀️" },
  { id: 3, time: "13:00", label: "After lunch",     enabled: true,  icon: "🍽️" },
  { id: 4, time: "15:30", label: "Afternoon slump", enabled: false, icon: "😴" },
  { id: 5, time: "18:00", label: "Evening",         enabled: true,  icon: "🌇" },
  { id: 6, time: "21:00", label: "Before sleep",    enabled: false, icon: "🌙" },
];
