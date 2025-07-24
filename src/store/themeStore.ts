import { create } from "zustand";

type Theme = "fantasy" | "dim" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem("theme");
  if (saved === "fantasy" || saved === "dim" || saved === "system")
    return saved;
  return "system";
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  },
}));
