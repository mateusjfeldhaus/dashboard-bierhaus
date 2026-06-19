import * as fs from "fs";
import * as path from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const ASSETS_DIR = path.resolve(__dirname, "../../frontend/public/assets");

async function uploadFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: "bierhaus", use_filename: true, unique_filename: false },
      (err, result) => (err ? reject(err) : resolve(result!.secure_url))
    );
  });
}

async function main() {
  const { rows: drinks } = await pool.query(
    "SELECT name, images FROM drinks WHERE array_length(images, 1) > 0"
  );

  console.log(`Migrando imagens de ${drinks.length} drinks...`);

  for (const drink of drinks) {
    const images: string[] = drink.images;

    // Pula se já são URLs do Cloudinary
    if (images.every((img: string) => img.startsWith("http"))) {
      console.log(`  [SKIP] ${drink.name} — já no Cloudinary`);
      continue;
    }

    const newUrls: string[] = [];
    for (const img of images) {
      const filename = path.basename(img);
      const localPath = path.join(ASSETS_DIR, filename);

      if (!fs.existsSync(localPath)) {
        console.warn(`  [WARN] Arquivo não encontrado: ${filename}`);
        continue;
      }

      console.log(`  Uploading: ${filename}`);
      const url = await uploadFile(localPath);
      newUrls.push(url);
      console.log(`  → ${url}`);
    }

    if (newUrls.length > 0) {
      await pool.query("UPDATE drinks SET images = $1 WHERE name = $2", [
        newUrls,
        drink.name,
      ]);
      console.log(`  ✓ ${drink.name} atualizado`);
    }
  }

  console.log("\nMigração concluída!");
  await pool.end();
}

main().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});
