import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import drinksRouter from "./routes/drinks";
import beveragesRouter from "./routes/beverages";
import utilsRouter from "./routes/utils";
import uploadRouter from "./routes/upload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
}));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/drinks", drinksRouter);
app.use("/api/beverages", beveragesRouter);
app.use("/api/utils", utilsRouter);
app.use("/api/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Bierhaus API rodando na porta ${PORT}`);
});
