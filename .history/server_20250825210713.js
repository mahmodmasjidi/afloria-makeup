import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // .env dosyasını yükle

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// 🔥 MongoDB Atlas bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  dbName: "aflorya", // database ismini burada belirt
})
.then(() => console.log("✅ MongoDB Atlas bağlantısı başarılı"))
.catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

// Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
  imgs: [String]
}, { collection: "Product" }); // Atlas'taki collection ismini birebir yaz

const Product = mongoose.model("Product", productSchema);

// AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [Product],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Public klasörünü statik dosya olarak sun
app.use(express.static(path.join(__dirname, "public")));

// "/" açıldığında public/index.html gönder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${port}`);
  console.log(`🛠️ Admin panel: http://localhost:${port}/admin`);
});
