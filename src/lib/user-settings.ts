export type UserSettings = {
  companyName: string;
  country: string;
  phone: string;
  jobTitle: string;
  // Contract defaults
  defaultCity: string;
  defaultCurrency: string;
  defaultJurisdiction: string;
  signatureName: string;
  // Appearance
  accentColor: string;
  // Notifications
  notifExpiry: boolean;
  notifSigned: boolean;
  notifWeeklyReport: boolean;
  // Language & region
  language: string;
  dateFormat: string;
  // Privacy
  analyticsEnabled: boolean;
};

const SETTINGS_KEY = "contractai_user_settings";

const DEFAULTS: UserSettings = {
  companyName: "",
  country: "Colombia",
  phone: "",
  jobTitle: "",
  defaultCity: "Bogotá",
  defaultCurrency: "COP",
  defaultJurisdiction: "Colombia",
  signatureName: "",
  accentColor: "indigo",
  notifExpiry: true,
  notifSigned: true,
  notifWeeklyReport: false,
  language: "es",
  dateFormat: "dd/MM/yyyy",
  analyticsEnabled: true,
};

export function getUserSettings(): UserSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function saveUserSettings(settings: Partial<UserSettings>): void {
  if (typeof window === "undefined") return;
  const current = getUserSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
}
