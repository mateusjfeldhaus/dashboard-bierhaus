import { ReactNode, createContext } from "react";
import { drinksDatabase } from "../database/database";

export interface IDrinkIngredients {
  name: string;
  quantity: number | string;
}

export interface IDrink {
  name: string;
  type: string[];
  ingredients: IDrinkIngredients[];
  recipe: string;
  img: string[];
  hidden: boolean;
}

export interface IBevarege {
  name: string;
  price: number;
  quantity: number;
  dateOfPurchase: string;
}

export interface IDrinkProviderProps {
  children: React.ReactNode;
}

export interface IDrinkContext {
  cachacaList: IDrink[];
  espumanteList: IDrink[];
  ginList: IDrink[];
  licoresList: IDrink[];
  alkoholfreiList: IDrink[];
  rumList: IDrink[];
  sakeList: IDrink[];
  tequilaList: IDrink[];
  vodkaList: IDrink[];
  whiskyList: IDrink[];
  sumOfIngredients: (database: IDrink[]) => Record<string, number>;
  filterDrinksByIngredient(
    database: IDrink[],
    ingredientName: string
  ): IDrink[];
  filterDrinksByName(query: string): IDrink[];
  costPerDrink: (
    drinksDatabase: IDrink[],
    beveragesDatabase: IBevarege[],
    drink: string
  ) => number | null | undefined;
  getAllDrinksPrices(
    drinksDatabase: IDrink[],
    beveragesDatabase: IBevarege[]
  ): string[];
}

export const DrinkContext = createContext({} as IDrinkContext);

export const DrinkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: IDrinkProviderProps) => {
  // Método Antigo, quando o type era uma string e não um array
  // const cachacaList: IDrink[] = drinksDatabase.filter((drink) => {
  //   return drink.type.map((drinkType) => drinkType === "Cachaça");
  // });

  const cachacaList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Cachaça");
  });

  const espumanteList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Espumante");
  });

  const ginList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Gin");
  });

  const licoresList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Licores");
  });

  const alkoholfreiList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Não Alcoólicos");
  });

  const rumList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Rum");
  });

  const sakeList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Sake");
  });

  const tequilaList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Tequila");
  });

  const vodkaList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Vodka");
  });

  const whiskyList: IDrink[] = drinksDatabase.filter((drink: IDrink) => {
    return drink.type.includes("Whisky");
  });

  const sumOfIngredients = (database: IDrink[]): Record<string, number> => {
    const ingredientSummary: Record<string, number> = {};

    function parseQuantity(quantity: number | string): number {
      return typeof quantity === "string" ? 1 : quantity;
    }

    database.forEach((drink) => {
      drink.ingredients.forEach((ingredient) => {
        const quantity = parseQuantity(ingredient.quantity);
        if (ingredientSummary[ingredient.name]) {
          ingredientSummary[ingredient.name] += quantity;
        } else {
          ingredientSummary[ingredient.name] = quantity;
        }
      });
    });

    return ingredientSummary;
  };

  const filterDrinksByIngredient = (
    database: IDrink[],
    ingredientName: string
  ): IDrink[] => {
    function removeAccents(str: string): string {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const searchTerm = removeAccents(ingredientName.toLowerCase());

    return database.filter((drink) =>
      drink.ingredients.some((ingredient) =>
        removeAccents(ingredient.name.toLowerCase()).includes(searchTerm)
      )
    );
  };

  const filterDrinksByName = (query: string): IDrink[] => {
    if (!query.trim()) return [];
    function removeAccents(str: string): string {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const searchTerm = removeAccents(query.toLowerCase());
    return drinksDatabase.filter((drink) =>
      removeAccents(drink.name.toLowerCase()).includes(searchTerm)
    );
  };

  const costPerDrink = (
    drinksDatabase: IDrink[],
    beveragesDatabase: IBevarege[],
    drink: string
  ): number | null | undefined => {
    // Função Auxiliar para buscar o preço de um ingrediente na base de dados
    const getPricePerMl = (ingredientName: string): number | null => {
      const beverage = beveragesDatabase.find(
        (beverage) => beverage.name === ingredientName
      );

      if (beverage) {
        const costPerMl = beverage.price / beverage.quantity;
        return costPerMl;
      } else {
        console.error(
          `Ingrediente ${ingredientName} não encontrado na base de dados.`
        );
        return null;
      }
    };

    // Achar o Drink na base de dados
    const foundDrink = drinksDatabase.find(
      (item) => item.name.toLowerCase() === drink.toLowerCase()
    );

    // Tratar o Erro caso o Drink não seja encontrado
    if (!foundDrink) {
      console.error("Drink não encontrado");
      return null;
    }

    let totalPrice = 0;

    // Loop por todos os ingredients do drink
    foundDrink.ingredients.forEach((ingredient) => {
      const pricePerUnit = getPricePerMl(ingredient.name);

      if (pricePerUnit === null) {
        return null;
      }

      // Lidar com o Caso que na receita pede para completar com um ingrediente
      if (ingredient.quantity === "Completar") {
        totalPrice +=
          pricePerUnit *
          beveragesDatabase.find(
            (beverage) => beverage.name === ingredient.name
          )!.quantity;
        return;
      } else if (ingredient.quantity === "Pitada") {
        totalPrice +=
          pricePerUnit *
          beveragesDatabase.find(
            (beverage) => beverage.name === ingredient.name
          )!.quantity;
        return;
      } else {
        totalPrice +=
          Number(ingredient.quantity) * Number(getPricePerMl(ingredient.name));
      }
    });

    return parseFloat(totalPrice.toFixed(2));
  };

  function getAllDrinksPrices(
    drinksDatabase: IDrink[],
    beveragesDatabase: IBevarege[]
  ): string[] {
    const results: { name: string; price: number }[] = [];

    for (const drink of drinksDatabase) {
      const price = costPerDrink(drinksDatabase, beveragesDatabase, drink.name);

      // Garantindo que `price` seja um número
      const finalPrice = price ?? 0;

      if (finalPrice > 0) {
        results.push({ name: drink.name, price: finalPrice });
      } else {
        results.push({ name: drink.name, price: 0 });
      }
    }

    // Ordena os resultados em ordem decrescente de preço
    results.sort((a, b) => b.price - a.price);

    // Converte os resultados para strings formatadas
    return results.map((result) => {
      if (result.price > 0) {
        return `${result.name} custa R$ ${result.price.toFixed(2)}`;
      } else {
        return `${result.name} não pôde ser calculado.`;
      }
    });
  }

  return (
    <DrinkContext.Provider
      value={{
        cachacaList,
        espumanteList,
        ginList,
        licoresList,
        alkoholfreiList,
        rumList,
        sakeList,
        tequilaList,
        vodkaList,
        whiskyList,
        sumOfIngredients,
        filterDrinksByIngredient,
        filterDrinksByName,
        costPerDrink,
        getAllDrinksPrices,
      }}
    >
      {children}
    </DrinkContext.Provider>
  );
};
