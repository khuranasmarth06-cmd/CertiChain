import { useTheme } from "../context/ThemeContext";
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {theme === "light"
        ? "🌙"
        : "☀️"}
    </button>
  );
}
export default ThemeToggle;