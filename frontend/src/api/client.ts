const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const SESSION_KEY = "bierhaus_auth";

export function getToken(): string | null {
  return sessionStorage.getItem(SESSION_KEY);
}

export function setToken(token: string) {
  sessionStorage.setItem(SESSION_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(SESSION_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export type IngredientUnit = "ml" | "dash" | "folha" | "lata" | "unidade" | "pitada" | "suco" | "completar";

export interface DrinkIngredient {
  name: string;
  quantity: string;
  unit: IngredientUnit;
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
  abv: number;
}

export const api = {
  auth: {
    login: (password: string) =>
      apiFetch<{ token: string }>("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }),
  },
  drinks: {
    list: () => apiFetch<Drink[]>("/api/drinks"),
    get: (name: string) => apiFetch<Drink>(`/api/drinks/${encodeURIComponent(name)}`),
    search: (q: string) => apiFetch<Drink[]>(`/api/drinks/search?q=${encodeURIComponent(q)}`),
    byIngredient: (ingredient: string) =>
      apiFetch<Drink[]>(`/api/drinks/by-ingredient/${encodeURIComponent(ingredient)}`),
    byCategory: (category: string) =>
      apiFetch<Drink[]>(`/api/drinks/category/${encodeURIComponent(category)}`),
  },
  beverages: {
    list: () => apiFetch<Beverage[]>("/api/beverages"),
    updatePrice: (name: string, price: number) =>
      apiFetch<Beverage>(`/api/beverages/${encodeURIComponent(name)}/price`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ price }),
      }),
    updateAbv: (name: string, abv: number) =>
      apiFetch<Beverage>(`/api/beverages/${encodeURIComponent(name)}/abv`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ abv }),
      }),
  },
  utils: {
    ingredientSummary: () =>
      apiFetch<{ name: string; total: number }[]>("/api/utils/ingredients/summary"),
    cost: (drinkName: string) =>
      apiFetch<{ name: string; cost: number }>(`/api/utils/cost/${encodeURIComponent(drinkName)}`),
    allCosts: () =>
      apiFetch<{ name: string; cost: number }[]>("/api/utils/costs"),
  },
};

export const uploadImage = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  if (!res.ok) throw new Error("Erro no upload");
  const data = await res.json();
  return data.url as string;
};

export const createDrink = async (drink: {
  name: string;
  types: string[];
  recipe: string;
  images: string[];
  ingredients: { name: string; quantity: string; unit: IngredientUnit }[];
}): Promise<Drink> => {
  return apiFetch<Drink>("/api/drinks", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(drink),
  });
};

export const updateDrink = async (
  originalName: string,
  data: Partial<{
    types: string[];
    recipe: string;
    images: string[];
    ingredients: { name: string; quantity: string; unit: IngredientUnit }[];
    hidden: boolean;
  }>
): Promise<Drink> => {
  return apiFetch<Drink>(`/api/drinks/${encodeURIComponent(originalName)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
};
