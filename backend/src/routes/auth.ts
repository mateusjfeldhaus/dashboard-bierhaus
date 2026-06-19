import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// POST /api/auth
router.post("/", (req: Request, res: Response) => {
  if (!ADMIN_PASSWORD) {
    console.error("[auth] ADMIN_PASSWORD não configurado no servidor");
    return res.status(500).json({ error: "Autenticação não configurada" });
  }

  const { password } = req.body as { password?: string };

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

export default router;
