import { Router, Request, Response } from "express";
import { query } from "../db";

const router = Router();

// GET /api/beverages
router.get("/", async (_req: Request, res: Response) => {
  try {
    const rows = await query(
      "SELECT name, price::float, quantity::float, date_of_purchase, abv::float FROM beverages ORDER BY name"
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Erro ao buscar beverages" });
  }
});

// PUT /api/beverages/:name/price
router.put("/:name/price", async (req: Request, res: Response) => {
  const name = decodeURIComponent(req.params.name);
  const { price } = req.body as { price: number };

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ error: "Preco invalido" });
  }

  try {
    const rows = await query(
      "UPDATE beverages SET price = $1 WHERE name = $2 RETURNING name, price::float",
      [price, name]
    );
    if (!rows.length) return res.status(404).json({ error: "Ingrediente nao encontrado" });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Erro ao atualizar preco" });
  }
});

// PUT /api/beverages/:name/abv
router.put("/:name/abv", async (req: Request, res: Response) => {
  const name = decodeURIComponent(req.params.name);
  const { abv } = req.body as { abv: number };

  if (typeof abv !== "number" || abv < 0 || abv > 1) {
    return res.status(400).json({ error: "ABV invalido (deve ser entre 0 e 1)" });
  }

  try {
    const rows = await query(
      "UPDATE beverages SET abv = $1 WHERE name = $2 RETURNING name, abv::float",
      [abv, name]
    );
    if (!rows.length) return res.status(404).json({ error: "Ingrediente nao encontrado" });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: "Erro ao atualizar ABV" });
  }
});

export default router;
