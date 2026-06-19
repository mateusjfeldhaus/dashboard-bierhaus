import { Router, Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/upload
router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  try {
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "bierhaus", transformation: [{ width: 1200, crop: "limit" }] },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      Readable.from(req.file!.buffer).pipe(stream);
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "Erro no upload" });
  }
});

export default router;
