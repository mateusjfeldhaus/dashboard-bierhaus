import { ReactNode, createContext, useState, useEffect } from "react";
import { api, Drink } from "../api/client";

export type { Drink as IDrink };

export interface IDrinkContext {
  allDrinks: Drink[];
  loading: boolean;
  filterDrinksByIngredient: (drinks: Drink[], ingredient: string) => Drink[];
  filterDrinksByName: (query: string) => Drink[];
}

export const DrinkContext = createContext({} as IDrinkContext);

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export const DrinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allDrinks, setAllDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.drinks.list().then((drinks) => {
      setAllDrinks(drinks);
      setLoading(false);
    });
  }, []);

  const filterDrinksByIngredient = (drinks: Drink[], ingredient: string) => {
    const term = removeAccents(ingredient.toLowerCase());
    return drinks.filter((d) =>
      d.ingredients?.some((i) =>
        removeAccents(i.name.toLowerCase()).includes(term)
      )
    );
  };

  const filterDrinksByName = (query: string) => {
    if (!query.trim()) return [];
    const term = removeAccents(query.toLowerCase());
    return allDrinks.filter((d) =>
      removeAccents(d.name.toLowerCase()).includes(term)
    );
  };

  return (
    <DrinkContext.Provider
      value={{ allDrinks, loading, filterDrinksByIngredient, filterDrinksByName }}
    >
      {children}
    </DrinkContext.Provider>
  );
};
