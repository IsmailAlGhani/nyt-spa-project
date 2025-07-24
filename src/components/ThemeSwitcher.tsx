import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  // If system, auto-redirect to light/dark based on system preference
  useEffect(() => {
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mq.matches ? "dim" : "fantasy");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        aria-label="Toggle theme"
        checked={theme === "dim"}
        onChange={() => setTheme(theme === "dim" ? "fantasy" : "dim")}
      />
      {/* Sun icon (light) */}
      <FaSun className="swap-on w-7 h-7 text-yellow-400" />
      {/* Moon icon (dark) */}
      <FaMoon className="swap-off w-7 h-7 text-gray-700" />
    </label>
  );
}
