import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  dbName: "aflorya",
})
.then(() => console.log("✅ MongoDB Atlas bağlantısı başarılı"))
.catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

// Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
  imgs: [String]
}, { collection: "Product" });

const Product = mongoose.model("Product", productSchema);

// AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [Product],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Public klasörü
app.use(express.static(path.join(__dirname, "public")));

// "/" route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API route: MongoDB’den ürünleri çek
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Ürünler alınamadı" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${port}`);
  console.log(`🛠️ Admin panel: http://localhost:${port}/admin`);
});
