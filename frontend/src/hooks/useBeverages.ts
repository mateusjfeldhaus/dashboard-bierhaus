import { useState, useEffect, useCallback } from "react";
import { api, Beverage } from "../api/client";

export function useBeverages() {
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBeverages = useCallback(async () => {
    const data = await api.beverages.list();
    setBeverages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBeverages();
  }, [fetchBeverages]);

  const updatePrice = useCallback(async (name: string, price: number) => {
    await api.beverages.updatePrice(name, price);
    await fetchBeverages();
  }, [fetchBeverages]);

  return { beverages, loading, updatePrice };
}
