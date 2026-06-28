/**
 * Migração: transforma `name` de PK para UNIQUE e cria `id SERIAL PRIMARY KEY`
 * em `drinks`. Em `drink_ingredients`, substitui a FK `drink_name → drinks.name`
 * por `drink_id → drinks.id` (ON DELETE CASCADE).
 *
 * Roda uma única vez:
 *   cd backend && npx tsx src/scripts/migrate-pk.ts
 */
import dotenv from "dotenv";
import path from "path";
// Carrega .env antes de qualquer import que use process.env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Pool criada APÓS dotenv.config() para garantir DATABASE_URL disponível
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function constraintExists(client: any, name: string): Promise<boolean> {
  const { rows } = await client.query(
    "SELECT 1 FROM pg_constraint WHERE conname = $1",
    [name]
  );
  return rows.length > 0;
}

async function columnExists(client: any, table: string, column: string): Promise<boolean> {
  const { rows } = await client.query(
    `SELECT 1 FROM information_schema.columns
     WHERE table_name = $1 AND column_name = $2`,
    [table, column]
  );
  return rows.length > 0;
}

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // ── drinks ──────────────────────────────────────────────────────────

    // 1. Adiciona coluna id (idempotente)
    if (!(await columnExists(client, "drinks", "id"))) {
      console.log("→ Adicionando coluna id a drinks...");
      await client.query("ALTER TABLE drinks ADD COLUMN id SERIAL");
    } else {
      console.log("✓ Coluna id já existe em drinks");
    }

    // 2. Remove PK antiga (name) e cria PK em id
    if (!(await constraintExists(client, "drinks_pkey_id"))) {
      console.log("→ Trocando PK de name para id...");
      await client.query("ALTER TABLE drinks DROP CONSTRAINT IF EXISTS drinks_pkey");
      await client.query("ALTER TABLE drinks ADD CONSTRAINT drinks_pkey_id PRIMARY KEY (id)");
    } else {
      console.log("✓ PK em id já existe");
    }

    // 3. UNIQUE em name
    if (!(await constraintExists(client, "drinks_name_key"))) {
      console.log("→ Adicionando UNIQUE constraint em drinks.name...");
      await client.query("ALTER TABLE drinks ADD CONSTRAINT drinks_name_key UNIQUE (name)");
    } else {
      console.log("✓ UNIQUE em name já existe");
    }

    // ── drink_ingredients ────────────────────────────────────────────────

    // 4. Adiciona drink_id
    if (!(await columnExists(client, "drink_ingredients", "drink_id"))) {
      console.log("→ Adicionando coluna drink_id a drink_ingredients...");
      await client.query("ALTER TABLE drink_ingredients ADD COLUMN drink_id INTEGER");
    } else {
      console.log("✓ Coluna drink_id já existe em drink_ingredients");
    }

    // 5. Popula drink_id a partir de drink_name
    const { rowCount } = await client.query(`
      UPDATE drink_ingredients di
      SET    drink_id = d.id
      FROM   drinks d
      WHERE  d.name = di.drink_name
        AND  di.drink_id IS NULL
    `);
    console.log(`→ ${rowCount} linhas de drink_ingredients atualizadas com drink_id`);

    // 6. NOT NULL em drink_id
    await client.query(
      "ALTER TABLE drink_ingredients ALTER COLUMN drink_id SET NOT NULL"
    );

    // 7. FK drink_id → drinks.id
    if (!(await constraintExists(client, "fk_di_drink_id"))) {
      console.log("→ Adicionando FK drink_id → drinks.id...");
      await client.query(`
        ALTER TABLE drink_ingredients
        ADD CONSTRAINT fk_di_drink_id
        FOREIGN KEY (drink_id) REFERENCES drinks(id) ON DELETE CASCADE
      `);
    } else {
      console.log("✓ FK fk_di_drink_id já existe");
    }

    // 8. Remove FK antiga em drink_name
    await client.query(
      "ALTER TABLE drink_ingredients DROP CONSTRAINT IF EXISTS drink_ingredients_drink_name_fkey"
    );
    console.log("→ FK antiga drink_name removida (ou não existia)");

    // 9. Remove coluna drink_name
    if (await columnExists(client, "drink_ingredients", "drink_name")) {
      console.log("→ Removendo coluna drink_name de drink_ingredients...");
      await client.query("ALTER TABLE drink_ingredients DROP COLUMN drink_name");
    } else {
      console.log("✓ Coluna drink_name já foi removida");
    }

    await client.query("COMMIT");
    console.log("\n✅ Migração concluída com sucesso!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("\n❌ Migração falhou, rollback aplicado:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
