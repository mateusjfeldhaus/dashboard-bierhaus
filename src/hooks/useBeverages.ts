import { useState, useCallback } from "react";
import { beveragesDatabase } from "../database/beverages";
import { IBevarege } from "../providers/drinksContext";

const STORAGE_KEY = "bierhaus_prices";

function loadOverrides(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides: Record<string, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function useBeverages() {
  const [overrides, setOverrides] = useState<Record<string, number>>(loadOverrides);

  const beverages: IBevarege[] = beveragesDatabase.map((b) => ({
    ...b,
    price: overrides[b.name] ?? b.price,
  }));

  const updatePrice = useCallback((name: string, price: number) => {
    setOverrides((prev) => {
      const next = { ...prev, [name]: price };
      saveOverrides(next);
      return next;
    });
  }, []);

  const resetPrice = useCallback((name: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[name];
      saveOverrides(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOverrides({});
  }, []);

  const isModified = (name: string) => name in overrides;

  return { beverages, updatePrice, resetPrice, resetAll, isModified };
}
