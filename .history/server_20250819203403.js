import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Static dosyaları servis et
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB bağlantısı
mongoose.connect("mongodb://127.0.0.1:27017/afloria", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model
const Product = mongoose.model("Product", {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
  imgs: [String] // birden fazla fotoğraf
});

// AdminJS ayarı
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  resources: [Product],
  rootPath: "/admin",
});
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// API endpoint: ürünleri JSON olarak döndür
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Sunucu başlat
app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
