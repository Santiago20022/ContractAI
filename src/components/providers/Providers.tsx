"use client";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "./ThemeProvider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
