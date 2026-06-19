import { Router, Request, Response } from "express";
import { query } from "../db";
import { Drink } from "../types";

const router = Router();

async function fetchIngredients(drinkNames: string[]) {
  if (!drinkNames.length) return {};
  const rows = await query(
    "SELECT drink_name, ingredient_name as name, quantity FROM drink_ingredients WHERE drink_name = ANY($1) ORDER BY id",
    [drinkNames]
  );
  const map: Record<string, { name: string; quantity: string }[]> = {};
  for (const r of rows) {
    if (!map[r.drink_name]) map[r.drink_name] = [];
    map[r.drink_name].push({ name: r.name, quantity: r.quantity });
  }
  return map;
}

function mapDrink(d: any, ingredients: { name: string; quantity: string }[]): Drink {
  return {
    name: d.name,
    type: d.types,
    ingredients,
    recipe: d.recipe ?? "",
    img: d.images ?? [],
    hidden: d.hidden,
  };
}

// GET /api/drinks — full list with ingredients
router.get("/", async (_req: Request, res: Response) => {
  try {
    const drinks = await query(
      "SELECT name, types, images, recipe, hidden FROM drinks WHERE hidden = false ORDER BY name"
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.name));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.name] ?? [])));
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar drinks" });
  }
});

// GET /api/drinks/search?q=
router.get("/search", async (req: Request, res: Response) => {
  const q = (req.query.q as string) ?? "";
  if (!q.trim()) return res.json([]);
  try {
    const drinks = await query(
      "SELECT name, types, images, recipe, hidden FROM drinks WHERE hidden = false AND unaccent(lower(name)) ILIKE unaccent(lower($1))",
      [`%${q}%`]
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.name));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.name] ?? [])));
  } catch (err) {
    res.status(500).json({ error: "Erro na busca" });
  }
});

// GET /api/drinks/by-ingredient/:ingredient
router.get("/by-ingredient/:ingredient", async (req: Request, res: Response) => {
  const { ingredient } = req.params;
  try {
    const drinks = await query(
      `SELECT DISTINCT d.name, d.types, d.images, d.recipe, d.hidden
       FROM drinks d
       JOIN drink_ingredients di ON di.drink_name = d.name
       WHERE d.hidden = false
         AND unaccent(lower(di.ingredient_name)) ILIKE unaccent(lower($1))
       ORDER BY d.name`,
      [`%${ingredient}%`]
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.name));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.name] ?? [])));
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar por ingrediente" });
  }
});

// GET /api/drinks/category/:category
router.get("/category/:category", async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const drinks = await query(
      "SELECT name, types, images, recipe, hidden FROM drinks WHERE hidden = false AND $1 = ANY(types) ORDER BY name",
      [category]
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.name));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.name] ?? [])));
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
});

// GET /api/drinks/:name
router.get("/:name", async (req: Request, res: Response) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const drinks = await query(
      "SELECT name, types, images, recipe, hidden FROM drinks WHERE name = $1 AND hidden = false",
      [name]
    );
    if (!drinks.length) return res.status(404).json({ error: "Drink nao encontrado" });
    const ingMap = await fetchIngredients([name]);
    res.json(mapDrink(drinks[0], ingMap[name] ?? []));
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar drink" });
  }
});

export default router;
