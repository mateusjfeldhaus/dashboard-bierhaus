import { ReactNode, createContext, useState, useEffect } from "react";
import { api, Drink, Beverage } from "../api/client";

export type { Drink as IDrink };
export type IDrinkIngredients = { name: string; quantity: string };
export type { Beverage as IBevarege };

export interface IDrinkContext {
  cachacaList: Drink[];
  espumanteList: Drink[];
  ginList: Drink[];
  licoresList: Drink[];
  alkoholfreiList: Drink[];
  rumList: Drink[];
  sakeList: Drink[];
  tequilaList: Drink[];
  vodkaList: Drink[];
  whiskyList: Drink[];
  allDrinks: Drink[];
  loading: boolean;
  filterDrinksByIngredient: (drinks: Drink[], ingredient: string) => Drink[];
  filterDrinksByName: (query: string) => Drink[];
  sumOfIngredients: (drinks: Drink[]) => Record<string, number>;
  costPerDrink: (
    drinks: Drink[],
    beverages: Beverage[],
    name: string
  ) => number | null;
  getAllDrinksPrices: (
    drinks: Drink[],
    beverages: Beverage[]
  ) => string[];
}

export const DrinkContext = createContext({} as IDrinkContext);

export const DrinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allDrinks, setAllDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.drinks.list().then((drinks) => {
      setAllDrinks(drinks);
      setLoading(false);
    });
  }, []);

  const byType = (type: string) => allDrinks.filter((d) => d.type.includes(type));

  function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

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

  const sumOfIngredients = (drinks: Drink[]) => {
    const summary: Record<string, number> = {};
    drinks.forEach((d) =>
      d.ingredients?.forEach((i) => {
        const qty = typeof i.quantity === "string" && !isNaN(Number(i.quantity))
          ? Number(i.quantity)
          : 1;
        summary[i.name] = (summary[i.name] || 0) + qty;
      })
    );
    return summary;
  };

  const costPerDrink = (drinks: Drink[], beverages: Beverage[], name: string) => {
    const drink = drinks.find((d) => d.name.toLowerCase() === name.toLowerCase());
    if (!drink) return null;
    let total = 0;
    for (const ing of drink.ingredients || []) {
      const bev = beverages.find((b) => b.name === ing.name);
      if (!bev) continue;
      const pricePerUnit = bev.price / bev.quantity;
      if (ing.quantity === "Completar" || ing.quantity === "Pitada") {
        total += bev.price;
      } else {
        const qty = Number(ing.quantity);
        if (!isNaN(qty)) total += qty * pricePerUnit;
      }
    }
    return parseFloat(total.toFixed(2));
  };

  const getAllDrinksPrices = (drinks: Drink[], beverages: Beverage[]) => {
    return drinks
      .map((d) => {
        const cost = costPerDrink(drinks, beverages, d.name) ?? 0;
        return { name: d.name, cost };
      })
      .sort((a, b) => b.cost - a.cost)
      .map((r) =>
        r.cost > 0
          ? `${r.name} custa R$ ${r.cost.toFixed(2)}`
          : `${r.name} nao pode ser calculado`
      );
  };

  return (
    <DrinkContext.Provider
      value={{
        cachacaList: byType("Cachaça"),
        espumanteList: byType("Espumante"),
        ginList: byType("Gin"),
        licoresList: byType("Licores"),
        alkoholfreiList: byType("Não Alcoólicos"),
        rumList: byType("Rum"),
        sakeList: byType("Sake"),
        tequilaList: byType("Tequila"),
        vodkaList: byType("Vodka"),
        whiskyList: byType("Whisky"),
        allDrinks,
        loading,
        filterDrinksByIngredient,
        filterDrinksByName,
        sumOfIngredients,
        costPerDrink,
        getAllDrinksPrices,
      }}
    >
      {children}
    </DrinkContext.Provider>
  );
};
