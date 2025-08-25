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

// MongoDB bağlantısı
mongoose.connect("mongodb://127.0.0.1:27017/afloria");

// Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String },
  imgs: [String] // birden fazla fotoğraf
}, { collection: "products" });

const Product = mongoose.model("Product", productSchema);

// AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [{
    resource: Product,
    options: {
      properties: {
        imgs: {
          type: "array",
          isArray: true
        }
      }
    }
  }],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// --- 🔥 ÖNEMLİ KISIM ---
// Public klasörünü statik dosya olarak sun
app.use(express.static(path.join(__dirname, "public")));

// "/" açıldığında public/index.html gönder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
  console.log(`Admin panel: http://localhost:${port}/admin`);
});
