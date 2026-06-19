import { Router, Request, Response } from "express";
import { query } from "../db";

const router = Router();

// GET /api/utils/ingredients/summary
router.get("/ingredients/summary", async (_req: Request, res: Response) => {
  try {
    const rows = await query(`
      SELECT di.ingredient_name as name,
             SUM(CASE WHEN di.quantity ~ '^[0-9]+(\\.[0-9]+)?$'
                      THEN di.quantity::numeric
                      ELSE 1 END) as total
      FROM drink_ingredients di
      JOIN drinks d ON d.name = di.drink_name
      WHERE d.hidden = false
      GROUP BY di.ingredient_name
      ORDER BY total DESC
    `);
    res.json(rows.map((r) => ({ name: r.name, total: Number(r.total) })));
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular resumo" });
  }
});

// GET /api/utils/cost/:drinkName
router.get("/cost/:drinkName", async (req: Request, res: Response) => {
  const drinkName = decodeURIComponent(req.params.drinkName);
  try {
    const ingredients = await query(
      "SELECT di.ingredient_name, di.quantity, b.price::float, b.quantity::float as bev_qty FROM drink_ingredients di LEFT JOIN beverages b ON b.name = di.ingredient_name WHERE di.drink_name = $1",
      [drinkName]
    );
    if (!ingredients.length) return res.status(404).json({ error: "Drink nao encontrado" });

    let total = 0;
    for (const ing of ingredients) {
      if (!ing.price) continue;
      const pricePerUnit = ing.price / ing.bev_qty;
      if (ing.quantity === "Completar" || ing.quantity === "Pitada") {
        total += ing.price;
      } else {
        const qty = parseFloat(ing.quantity);
        if (!isNaN(qty)) total += qty * pricePerUnit;
      }
    }

    res.json({ name: drinkName, cost: parseFloat(total.toFixed(2)) });
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular custo" });
  }
});

// GET /api/utils/costs
router.get("/costs", async (_req: Request, res: Response) => {
  try {
    const drinks = await query(
      "SELECT name FROM drinks WHERE hidden = false ORDER BY name"
    );

    const results = await Promise.all(
      drinks.map(async (d) => {
        const ingredients = await query(
          "SELECT di.quantity, b.price::float, b.quantity::float as bev_qty FROM drink_ingredients di LEFT JOIN beverages b ON b.name = di.ingredient_name WHERE di.drink_name = $1",
          [d.name]
        );
        let total = 0;
        for (const ing of ingredients) {
          if (!ing.price) continue;
          const pricePerUnit = ing.price / ing.bev_qty;
          if (ing.quantity === "Completar" || ing.quantity === "Pitada") {
            total += ing.price;
          } else {
            const qty = parseFloat(ing.quantity);
            if (!isNaN(qty)) total += qty * pricePerUnit;
          }
        }
        return { name: d.name, cost: parseFloat(total.toFixed(2)) };
      })
    );

    results.sort((a, b) => b.cost - a.cost);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erro ao calcular custos" });
  }
});

export default router;
