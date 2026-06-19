import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    console.log("Adicionando coluna unit...");
    await client.query(`
      ALTER TABLE drink_ingredients
      ADD COLUMN IF NOT EXISTS unit VARCHAR(20) NOT NULL DEFAULT 'ml'
    `);

    console.log("Setando unidades especiais...");
    const specialCases: [string, string][] = [
      ["Hortelã",              "folha"],
      ["Angostura",            "dash"],
      ["Angostura de Laranja", "dash"],
      ["Clara de Ovo",         "unidade"],
      ["Pimenta Rosa",         "pitada"],
      ["Limão",                "suco"],
    ];

    for (const [name, unit] of specialCases) {
      const { rowCount } = await client.query(
        "UPDATE drink_ingredients SET unit = $1 WHERE ingredient_name = $2",
        [unit, name]
      );
      console.log(`  ${name} → ${unit} (${rowCount} linhas)`);
    }

    // Redbull (qualquer variação)
    const { rowCount: redbullCount } = await client.query(
      "UPDATE drink_ingredients SET unit = 'lata' WHERE ingredient_name ILIKE '%redbull%'"
    );
    console.log(`  Redbull* → lata (${redbullCount} linhas)`);

    console.log("Migração de unidades concluída!");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
