import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose"; // <-- bu şekilde import et

import path from "path";

// -------------------------
// MongoDB Bağlantısı

// -------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://<kullanici>:<sifre>@<cluster-adres>/?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB bağlantısı başarılı"))
.catch(err => console.error("MongoDB bağlantı hatası:", err));

// -------------------------
// Mongoose Model
// -------------------------
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  desc: String,
  imgs: [String]
});

const Product = mongoose.model("Product", ProductSchema);

// -------------------------
// AdminJS Ayarları
// -------------------------
AdminJS.registerAdapter({ Database: AdminJSMongoose.Database, Resource: AdminJSMongoose.Resource });

const adminJs = new AdminJS({
  resources: [Product],
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);

// -------------------------
// Express Sunucu
// -------------------------
const app = express();

// JSON ve form verisi okuma
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public klasörünü statik olarak sun
app.use(express.static(path.join(process.cwd(), "public")));

// AdminJS route
app.use(adminJs.options.rootPath, router);

// Ürünleri API ile çek
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Ana siteyi aç
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Sunucu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
