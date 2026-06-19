export interface DrinkIngredient {
  name: string;
  quantity: string;
}

export interface Drink {
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
