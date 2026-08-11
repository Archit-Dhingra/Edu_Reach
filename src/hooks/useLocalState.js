import { useState, useCallback } from "react";

export function useLocalState(key, def) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : def;
    } catch {
      return def;
    }
  });

  const set = useCallback(val => {
    setV(p => {
      const n = typeof val === "function" ? val(p) : val;
      try {
        localStorage.setItem(key, JSON.stringify(n));
      } catch {}
      return n;
    });
  }, [key]);

  return [v, set];
}
