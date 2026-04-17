"use client";
import { useEffect } from "react";
import { getUserSettings } from "@/lib/user-settings";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apply = () => {
      const s = getUserSettings();
      const html = document.documentElement;
      html.dataset.accent = s.accentColor || "indigo";
      // For "system", check prefers-color-scheme
      let theme = s.theme || "light";
      if (theme === "system") {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      html.dataset.theme = theme;
    };
    apply();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return <>{children}</>;
}
