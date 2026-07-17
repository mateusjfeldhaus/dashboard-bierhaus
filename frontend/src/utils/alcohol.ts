import { DrinkIngredient, Beverage } from "../api/client";

const ML_PER_DASH = 0.9;

function norm(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordMatch(haystack: string, needle: string): boolean {
  return new RegExp(`(^|[\\s,])${esc(needle)}([\\s,]|$)`).test(haystack);
}

export function buildAbvMap(beverages: Beverage[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const b of beverages) {
    if (b.abv) map[b.name.toLowerCase()] = b.abv;
  }
  return map;
}

export function findAbv(ingName: string, abvMap: Record<string, number>): number {
  const normIng = norm(ingName);

  for (const [bev, abv] of Object.entries(abvMap)) {
    if (norm(bev) === normIng) return abv;
  }

  const wordMatches = Object.entries(abvMap)
    .filter(([bev]) => { const nb = norm(bev); return wordMatch(normIng, nb) || wordMatch(nb, normIng); })
    .sort((a, b) => b[0].length - a[0].length);
  if (wordMatches.length) return wordMatches[0][1];

  const subMatches = Object.entries(abvMap)
    .filter(([bev]) => { const nb = norm(bev); return normIng.includes(nb) || nb.includes(normIng); })
    .sort((a, b) => b[0].length - a[0].length);
  if (subMatches.length) return subMatches[0][1];

  return 0;
}

export function calcAlcoholMl(ing: DrinkIngredient, abvMap: Record<string, number>): number {
  const abv = findAbv(ing.name, abvMap);
  if (!abv) return 0;
  const qty = parseFloat(ing.quantity);
  if (isNaN(qty)) return 0;
  if (ing.unit === "dash") return qty * ML_PER_DASH * abv;
  if (ing.unit === "ml")   return qty * abv;
  return 0;
}

export function alcoholLabel(ml: number): "sem álcool" | "médio" | "forte" {
  if (ml === 0)   return "sem álcool";
  if (ml <= 22.5) return "médio";
  return "forte";
}

export function calcDrinkAlcohol(
  ingredients: DrinkIngredient[],
  abvMap: Record<string, number>
): { mlAlcohol: number; label: ReturnType<typeof alcoholLabel> } {
  const mlAlcohol = ingredients.reduce((sum, ing) => sum + calcAlcoholMl(ing, abvMap), 0);
  return { mlAlcohol: Math.round(mlAlcohol * 10) / 10, label: alcoholLabel(mlAlcohol) };
}
