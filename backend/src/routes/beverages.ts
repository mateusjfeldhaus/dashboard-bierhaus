import { Router, Request, Response } from "express";
import { query } from "../db";

const router = Router();

// GET /api/beverages
router.get("/", async (_req: Request, res: Response) => {
  try {
    const rows = await query(
      "SELECT name, price::float, quantity::float, date_of_purchase FROM beverages ORDER BY name"
    );
    res.json(rows);
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar preco" });
  }
});

export default router;
