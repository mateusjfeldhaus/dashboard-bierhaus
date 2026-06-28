import { useState, useCallback } from "react";

const KEY = "bierhaus_favorites";

function load(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); }
  catch { return []; }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(load);

  const toggle = useCallback((name: string) => {
    setFavorites((prev) => {
      const next = prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (name: string) => favorites.includes(name),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
