import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import path from "path";

// -------------------------
// MongoDB Bağlantısı
// -------------------------
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://maama:Alam4321@products.7svhkvw.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// -------------------------
// Mongoose Model
// -------------------------
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  desc: String,
  imgs: [String],
  category: {
    type: String,
    enum: ["makeup", "cosmetic"], // sadece bu iki kategoriye izin ver
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

// -------------------------
// AdminJS Ayarları
// -------------------------
AdminJS.registerAdapter({
  Database: AdminJSMongoose.Database,
  Resource: AdminJSMongoose.Resource,
});

const adminJs = new AdminJS({
  resources: [
    {
      resource: Product,
      options: {
        properties: {
          name: { isTitle: true },
          category: {
            availableValues: [
              { value: "makeup", label: "Makeup" },
              { value: "cosmetic", label: "Cosmetic" },
            ],
          },
        },
      },
    },
  ],
  rootPath: "/admin",
});

const router = AdminJSExpress.buildRouter(adminJs);

// -------------------------
// Express Sunucu
// -------------------------
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
