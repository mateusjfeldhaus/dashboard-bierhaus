export type IngredientUnit = "ml" | "dash" | "folha" | "lata" | "unidade" | "pitada" | "suco" | "completar";

export interface DrinkIngredient {
  name: string;
  quantity: string;
  unit: IngredientUnit;
}

export interface Drink {
  id: number;
  name: string;
  type: string[];
  ingredients: DrinkIngredient[];
  recipe: string;
  img: string[];
  hidden: boolean;
}

export interface Beverage {
  name: string;
  price: number;
  quantity: number;
  date_of_purchase: string | null;
}
