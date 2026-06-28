import { Router, Request, Response } from "express";
import { query } from "../db";

const router = Router();

// SQL compartilhado para calcular custo por ingrediente
const COST_EXPR = `
  CASE
    WHEN b.price IS NULL OR b.quantity IS NULL OR b.quantity = 0 THEN 0
    WHEN lower(di.unit) IN ('completar', 'pitada')               THEN b.price
    WHEN di.quantity ~ '^[0-9]+(\\.[0-9]+)?$'                   THEN (di.quantity::numeric * (b.price / b.quantity))
    ELSE 0
  END
`;

// GET /api/utils/ingredients/summary
router.get("/ingredients/summary", async (_req: Request, res: Response) => {
  try {
    const rows = await query(`
      SELECT di.ingredient_name AS name,
             SUM(CASE WHEN di.quantity ~ '^[0-9]+(\\.[0-9]+)?$'
                      THEN di.quantity::numeric
                      ELSE 1 END) AS total
      FROM drink_ingredients di
      JOIN drinks d ON d.id = di.drink_id
      WHERE d.hidden = false
      GROUP BY di.ingredient_name
      ORDER BY total DESC
    `);
    res.json(rows.map((r) => ({ name: r.name, total: Number(r.total) })));
  } catch (err) {
    console.error("[utils/summary]", err);
    res.status(500).json({ error: "Erro ao calcular resumo" });
  }
});

// GET /api/utils/cost/:drinkName — custo de um drink específico (cálculo no SQL)
router.get("/cost/:drinkName", async (req: Request, res: Response) => {
  const drinkName = decodeURIComponent(req.params.drinkName);
  try {
    const rows = await query(
      `SELECT d.name,
              ROUND(SUM(${COST_EXPR})::numeric, 2) AS cost
       FROM drinks d
       LEFT JOIN drink_ingredients di ON di.drink_id = d.id
       LEFT JOIN beverages b ON b.name = di.ingredient_name
       WHERE d.hidden = false AND d.name = $1
       GROUP BY d.name`,
      [drinkName]
    );
    if (!rows.length) return res.status(404).json({ error: "Drink não encontrado" });
    res.json({ name: rows[0].name, cost: Number(rows[0].cost) });
  } catch (err) {
    console.error("[utils/cost]", err);
    res.status(500).json({ error: "Erro ao calcular custo" });
  }
});

// GET /api/utils/costs — custo de todos os drinks em uma única query
router.get("/costs", async (_req: Request, res: Response) => {
  try {
    const rows = await query(`
      SELECT d.name,
             ROUND(SUM(${COST_EXPR})::numeric, 2) AS cost
      FROM drinks d
      LEFT JOIN drink_ingredients di ON di.drink_id = d.id
      LEFT JOIN beverages b ON b.name = di.ingredient_name
      WHERE d.hidden = false
      GROUP BY d.name
      ORDER BY cost DESC
    `);
    res.json(rows.map((r) => ({ name: r.name, cost: Number(r.cost) })));
  } catch (err) {
    console.error("[utils/costs]", err);
    res.status(500).json({ error: "Erro ao calcular custos" });
  }
});

export default router;
