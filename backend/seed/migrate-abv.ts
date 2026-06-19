import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ABV conhecidos dos ingredientes existentes (0–1)
const ABV_MAP: Record<string, number> = {
  "Cachaça":              0.40,
  "Gin":                  0.40,
  "Vodka":                0.40,
  "Rum":                  0.40,
  "Tequila Silver":       0.40,
  "Whisky":               0.40,
  "Scotch Whisky":        0.40,
  "Whisky Bourbon":       0.40,
  "Jack Daniels":         0.40,
  "Cointreau":            0.40,
  "Curaçau Blue":         0.30,
  "Licor 43":             0.31,
  "Limoncello":           0.28,
  "Angostura de Laranja": 0.28,
  "Licor de Pêssego":     0.18,
  "Dry Vermouth":         0.18,
  "Sake":                 0.17,
  "Vermouth Rosso":       0.16,
  "Campari":              0.25,
  "Cynar":                0.165,
  "Licor Kahluá":         0.20,
  "Licor de Café":        0.20,
  "Rum Malibu":           0.21,
  "Espumante":            0.12,
  "Aperol":               0.11,
  "Angostura":            0.447,
};

async function run() {
  console.log("Adicionando coluna abv...");
  await pool.query(`
    ALTER TABLE beverages
    ADD COLUMN IF NOT EXISTS abv NUMERIC(5,3) NOT NULL DEFAULT 0
  `);

  console.log("Populando ABV dos ingredientes conhecidos...");
  for (const [name, abv] of Object.entries(ABV_MAP)) {
    const result = await pool.query(
      "UPDATE beverages SET abv = $1 WHERE name = $2",
      [abv, name]
    );
    if (result.rowCount) {
      console.log(`  ✓ ${name} → ${(abv * 100).toFixed(1)}%`);
    } else {
      console.log(`  - ${name} (não encontrado na tabela)`);
    }
  }

  console.log("Migração de ABV concluída.");
  await pool.end();
}

run().catch((err) => { console.error(err); process.exit(1); });
