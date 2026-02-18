
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Theme init (no libs): persists in localStorage and falls back to system preference.
  (function initTheme() {
    const storageKey = "theme";
    const root = document.documentElement;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const saved = (() => {
      try {
        return localStorage.getItem(storageKey);
      } catch {
        return null;
      }
    })();

    const isDark = saved ? saved === "dark" : prefersDark;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  })();

  createRoot(document.getElementById("root")!).render(<App />);
  