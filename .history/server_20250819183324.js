import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import mongoose from "mongoose";

const app = express();
const port = 2000;

// MongoDB bağlantısı
mongoose.connect("mongodb://localhost:27017/mydb");

// AdminJS ayarı
const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
});

// AdminJS router
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// 🌟 Root route ekle (yoksa Cannot GET / çıkar)
app.get("/", (req, res) => {
  res.send("Hoşgeldin! Admin panel için /admin adresine git 🚀");
});

// Server başlat
app.listen(port, () => {
  console.log(`Server çalışıyor 👉 http://localhost:${port}`);
});
