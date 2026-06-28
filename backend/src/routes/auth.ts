import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,                   // máx 10 tentativas por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas tentativas. Aguarde 15 minutos." },
});

// POST /api/auth
router.post("/", authLimiter, (req: Request, res: Response) => {
  const { password } = req.body as { password?: string };

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

export default router;
