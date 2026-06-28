import { Router, Request, Response } from "express";
import { PoolClient } from "pg";
import { pool, query } from "../db";
import { Drink, IngredientUnit } from "../types";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Busca ingredientes por drink_id e devolve mapa { drinkId → ingredientes } */
async function fetchIngredients(drinkIds: number[]) {
  if (!drinkIds.length) return {} as Record<number, { name: string; quantity: string; unit: IngredientUnit }[]>;
  const rows = await query(
    "SELECT drink_id, ingredient_name as name, quantity, unit FROM drink_ingredients WHERE drink_id = ANY($1) ORDER BY id",
    [drinkIds]
  );
  const map: Record<number, { name: string; quantity: string; unit: IngredientUnit }[]> = {};
  for (const r of rows) {
    if (!map[r.drink_id]) map[r.drink_id] = [];
    map[r.drink_id].push({ name: r.name, quantity: r.quantity, unit: (r.unit ?? "ml") as IngredientUnit });
  }
  return map;
}

function mapDrink(d: any, ingredients: { name: string; quantity: string; unit: IngredientUnit }[]): Drink {
  return {
    id:          d.id,
    name:        d.name,
    type:        d.types,
    ingredients,
    recipe:      d.recipe ?? "",
    img:         d.images ?? [],
    hidden:      d.hidden,
  };
}

async function insertIngredients(
  client: PoolClient,
  drinkId: number,
  ingredients: { name: string; quantity: string; unit?: string }[]
) {
  await client.query("DELETE FROM drink_ingredients WHERE drink_id = $1", [drinkId]);
  for (const ing of ingredients) {
    await client.query(
      "INSERT INTO drink_ingredients (drink_id, ingredient_name, quantity, unit) VALUES ($1, $2, $3, $4)",
      [drinkId, ing.name, ing.quantity, ing.unit ?? "ml"]
    );
  }
}

// ── GET /api/drinks ───────────────────────────────────────────────────────────

router.get("/", async (_req: Request, res: Response) => {
  try {
    const drinks = await query(
      "SELECT id, name, types, images, recipe, hidden FROM drinks WHERE hidden = false ORDER BY name"
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.id));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.id] ?? [])));
  } catch (err) {
    console.error("[GET /drinks]", err);
    res.status(500).json({ error: "Erro ao buscar drinks" });
  }
});

// ── GET /api/drinks/search?q= ─────────────────────────────────────────────────

router.get("/search", async (req: Request, res: Response) => {
  const q = (req.query.q as string) ?? "";
  if (!q.trim()) return res.json([]);
  try {
    const drinks = await query(
      "SELECT id, name, types, images, recipe, hidden FROM drinks WHERE hidden = false AND unaccent(lower(name)) ILIKE unaccent(lower($1))",
      [`%${q}%`]
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.id));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.id] ?? [])));
  } catch (err) {
    console.error("[GET /drinks/search]", err);
    res.status(500).json({ error: "Erro na busca" });
  }
});

// ── GET /api/drinks/by-ingredient/:ingredient ─────────────────────────────────

router.get("/by-ingredient/:ingredient", async (req: Request, res: Response) => {
  const { ingredient } = req.params;
  try {
    const drinks = await query(
      `SELECT DISTINCT d.id, d.name, d.types, d.images, d.recipe, d.hidden
       FROM drinks d
       JOIN drink_ingredients di ON di.drink_id = d.id
       WHERE d.hidden = false
         AND unaccent(lower(di.ingredient_name)) ILIKE unaccent(lower($1))
       ORDER BY d.name`,
      [`%${ingredient}%`]
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.id));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.id] ?? [])));
  } catch (err) {
    console.error("[GET /drinks/by-ingredient]", err);
    res.status(500).json({ error: "Erro ao buscar por ingrediente" });
  }
});

// ── GET /api/drinks/category/:category ───────────────────────────────────────

router.get("/category/:category", async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const drinks = await query(
      "SELECT id, name, types, images, recipe, hidden FROM drinks WHERE hidden = false AND $1 = ANY(types) ORDER BY name",
      [category]
    );
    const ingMap = await fetchIngredients(drinks.map((d) => d.id));
    res.json(drinks.map((d) => mapDrink(d, ingMap[d.id] ?? [])));
  } catch (err) {
    console.error("[GET /drinks/category]", err);
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
});

// ── GET /api/drinks/:name ─────────────────────────────────────────────────────

router.get("/:name", async (req: Request, res: Response) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const drinks = await query(
      "SELECT id, name, types, images, recipe, hidden FROM drinks WHERE name = $1 AND hidden = false",
      [name]
    );
    if (!drinks.length) return res.status(404).json({ error: "Drink não encontrado" });
    const drink = drinks[0];
    const ingMap = await fetchIngredients([drink.id]);
    res.json(mapDrink(drink, ingMap[drink.id] ?? []));
  } catch (err) {
    console.error("[GET /drinks/:name]", err);
    res.status(500).json({ error: "Erro ao buscar drink" });
  }
});

// ── POST /api/drinks ──────────────────────────────────────────────────────────

router.post("/", requireAuth, async (req: Request, res: Response) => {
  const { name, types, recipe, images, ingredients, hidden = false } = req.body;
  if (!name || !types?.length || !recipe) {
    return res.status(400).json({ error: "name, types e recipe são obrigatórios" });
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO drinks (name, types, recipe, images, hidden)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (name) DO UPDATE
         SET types   = EXCLUDED.types,
             recipe  = EXCLUDED.recipe,
             images  = EXCLUDED.images,
             hidden  = EXCLUDED.hidden
       RETURNING id`,
      [name, types, recipe, images ?? [], hidden]
    );
    const drinkId: number = result.rows[0].id;
    if (ingredients?.length) await insertIngredients(client, drinkId, ingredients);
    await client.query("COMMIT");

    const drinks = await query(
      "SELECT id, name, types, images, recipe, hidden FROM drinks WHERE id = $1",
      [drinkId]
    );
    const ingMap = await fetchIngredients([drinkId]);
    res.status(201).json(mapDrink(drinks[0], ingMap[drinkId] ?? []));
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[POST /drinks]", err);
    res.status(500).json({ error: "Erro ao criar drink" });
  } finally {
    client.release();
  }
});

// ── PUT /api/drinks/:name ─────────────────────────────────────────────────────

router.put("/:name", requireAuth, async (req: Request, res: Response) => {
  const name = decodeURIComponent(req.params.name);
  const { types, recipe, images, ingredients, hidden } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query(
      "SELECT id FROM drinks WHERE name = $1",
      [name]
    );
    if (!existing.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Drink não encontrado" });
    }
    const drinkId: number = existing.rows[0].id;

    await client.query(
      `UPDATE drinks SET
         types   = COALESCE($1, types),
         recipe  = COALESCE($2, recipe),
         images  = COALESCE($3, images),
         hidden  = COALESCE($4, hidden)
       WHERE id = $5`,
      [types ?? null, recipe ?? null, images ?? null, hidden ?? null, drinkId]
    );
    if (ingredients) await insertIngredients(client, drinkId, ingredients);
    await client.query("COMMIT");

    const drinks = await query(
      "SELECT id, name, types, images, recipe, hidden FROM drinks WHERE id = $1",
      [drinkId]
    );
    const ingMap = await fetchIngredients([drinkId]);
    res.json(mapDrink(drinks[0], ingMap[drinkId] ?? []));
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[PUT /drinks/:name]", err);
    res.status(500).json({ error: "Erro ao atualizar drink" });
  } finally {
    client.release();
  }
});

export default router;
