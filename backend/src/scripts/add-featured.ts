import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT 1 FROM information_schema.columns
       WHERE table_name = 'drinks' AND column_name = 'featured'`
    );
    if (rows.length) {
      console.log("✓ Coluna featured já existe");
    } else {
      await client.query(
        "ALTER TABLE drinks ADD COLUMN featured BOOLEAN NOT NULL DEFAULT false"
      );
      console.log("→ Coluna featured adicionada");
    }
    console.log("\n✅ Migração concluída!");
  } catch (err) {
    console.error("\n❌ Falhou:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
