export interface DrinkLog {
  id: number;
  ml: number;
  type: string;
  ts: number;
}

export interface Reminder {
  id: number;
  time: string;
  label: string;
  enabled: boolean;
  icon: string;
}

export interface Profile {
  name: string;
  weight: number;
  unit: "metric" | "imperial";
}

export interface DrinkType {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface QuickAmount {
  ml: number;
  icon: string;
  label: string;
}


export type TabId = "home" | "history" | "reminders" | "profile";
export type BtnVariant = "primary" | "secondary" | "ghost";