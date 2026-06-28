import { useState, useEffect, useCallback } from "react";
import { api, Beverage } from "../api/client";

export function useBeverages() {
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBeverages = useCallback(async () => {
    try {
      const data = await api.beverages.list();
      setBeverages(data);
      setError(null);
    } catch {
      setError("Erro ao carregar ingredientes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBeverages();
  }, [fetchBeverages]);

  const updatePrice = useCallback(async (name: string, price: number) => {
    await api.beverages.updatePrice(name, price);
    await fetchBeverages();
  }, [fetchBeverages]);

  const updateAbv = useCallback(async (name: string, abv: number) => {
    await api.beverages.updateAbv(name, abv);
    await fetchBeverages();
  }, [fetchBeverages]);

  return { beverages, loading, error, updatePrice, updateAbv };
}
