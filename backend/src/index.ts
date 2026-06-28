import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import drinksRouter from "./routes/drinks";
import beveragesRouter from "./routes/beverages";
import utilsRouter from "./routes/utils";
import uploadRouter from "./routes/upload";
import authRouter from "./routes/auth";

dotenv.config();

const REQUIRED_ENV = ["DATABASE_URL", "JWT_SECRET", "ADMIN_PASSWORD", "FRONTEND_URL"];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`[startup] Variável de ambiente obrigatória não definida: ${key}`);
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "PUT", "POST", "DELETE"],
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api/beverages", beveragesRouter);
app.use("/api/utils", utilsRouter);
app.use("/api/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Bierhaus API rodando na porta ${PORT}`);
});
