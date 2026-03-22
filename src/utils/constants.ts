import type { DrinkType, Reminder, WaterSize } from "../type/types";
export const KEYS = {
  logs:      "hydro_logs",
  reminders: "hydro_reminders",
  profile:   "hydro_profile",
  goal:      "hydro_goal",
} as const;


export const P = {
  black:     "#000000",
  darkBlue:  "#2D466E",
  darkGray:  "#43414C",
  lightBlue: "#84C1F8",
  lightGray: "#D9D9D9",
  beige:     "#F5F0E8",
  white:     "#FFFFFF",
} as const;

export const DRINK_TYPES: DrinkType[] =[
  { id: "water",  label: "Water",  icon: "💧", color: P.lightBlue },
  { id: "tea",    label: "Tea",    icon: "🍵", color: "#a67c52" },
  { id: "coffee", label: "Coffee", icon: "☕", color: "#6f4e37" },
  { id: "juice",  label: "Juice",  icon: "🧃", color: P.black },
  { id: "milk",   label: "Milk",   icon: "🥛", color: "#c8c8c8" },
  { id: "sport",  label: "Sport",  icon: "🏃", color: P.lightGray },
];

export const WATER_SIZES: WaterSize[] = [
  { 
    id: 'small', 
    label: 'Small', 
    ml: 150, 
    desc: "A standard small glass or a quick coffee cup. Perfect for light hydration between tasks." 
  },
  { 
    id: 'medium', 
    label: 'Medium', 
    ml: 250, 
    desc: "A standard mug or glass of water. Great for a meal or a short break." 
  },
  { 
    id: 'large', 
    label: 'Large', 
    ml: 500, 
    desc: "A large water bottle. Ideal for workouts or long focused sessions." 
  },
  { 
    id: 'custom', 
    label: 'Custom', 
    ml: 0, 
    desc: "Enter your custom amount to log exactly what you drank." 
  },
];

export const DEFAULT_REMINDERS: Reminder[] =[
  { id: 1, time: "08:00", label: "Morning boost",   enabled: true,  icon: "🌅" },
  { id: 2, time: "11:00", label: "Mid-morning",     enabled: true,  icon: "☀️" },
  { id: 3, time: "13:00", label: "After lunch",     enabled: true,  icon: "🍽️" },
  { id: 4, time: "15:30", label: "Afternoon slump", enabled: false, icon: "😴" },
  { id: 5, time: "18:00", label: "Evening",         enabled: true,  icon: "🌇" },
  { id: 6, time: "21:00", label: "Before sleep",    enabled: false, icon: "🌙" },
];

