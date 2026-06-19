import { Pool } from "pg";
import dotenv from "dotenv";
import drinks from "./drinks.json";
import beverages from "./beverages.json";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function createSchema() {
  console.log("Criando schema...");
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS unaccent;

    CREATE TABLE IF NOT EXISTS drinks (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      types TEXT[] NOT NULL,
      recipe TEXT NOT NULL,
      images TEXT[] NOT NULL,
      hidden BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS drink_ingredients (
      id SERIAL PRIMARY KEY,
      drink_name TEXT NOT NULL REFERENCES drinks(name) ON DELETE CASCADE,
      ingredient_name TEXT NOT NULL,
      quantity TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS beverages (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      price NUMERIC(10,2) NOT NULL DEFAULT 0,
      quantity NUMERIC(10,2) NOT NULL DEFAULT 0,
      date_of_purchase DATE
    );
  `);
  console.log("Schema criado.");
}

async function seedDrinks() {
  console.log(`Inserindo ${drinks.length} drinks...`);
  for (const drink of drinks as any[]) {
    await pool.query(
      `INSERT INTO drinks (name, types, recipe, images, hidden)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (name) DO UPDATE SET
         types = EXCLUDED.types,
         recipe = EXCLUDED.recipe,
         images = EXCLUDED.images,
         hidden = EXCLUDED.hidden`,
      [drink.name, drink.type, drink.recipe, drink.img, drink.hidden]
    );

    // Remove old ingredients and re-insert
    await pool.query("DELETE FROM drink_ingredients WHERE drink_name = $1", [drink.name]);
    for (const ing of drink.ingredients) {
      await pool.query(
        "INSERT INTO drink_ingredients (drink_name, ingredient_name, quantity) VALUES ($1, $2, $3)",
        [drink.name, ing.name, String(ing.quantity)]
      );
    }
  }
  console.log("Drinks inseridos.");
}

async function seedBeverages() {
  console.log(`Inserindo ${beverages.length} ingredientes...`);
  for (const bev of beverages as any[]) {
    const dateValue = bev.dateOfPurchase && bev.dateOfPurchase.trim() !== ""
      ? bev.dateOfPurchase
      : null;
    await pool.query(
      `INSERT INTO beverages (name, price, quantity, date_of_purchase)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (name) DO UPDATE SET
         quantity = EXCLUDED.quantity,
         date_of_purchase = EXCLUDED.date_of_purchase`,
      [bev.name, bev.price, bev.quantity, dateValue]
    );
  }
  console.log("Ingredientes inseridos.");
}

async function main() {
  try {
    await createSchema();
    await seedDrinks();
    await seedBeverages();
    console.log("\nSeed concluido com sucesso!");
  } catch (err) {
    console.error("Erro no seed:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
