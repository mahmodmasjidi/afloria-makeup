import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSMongoose from "@adminjs/mongoose";

const app = express();
const port = 3000;

// MongoDB bağlantısı
mongoose.connect("mongodb://127.0.0.1:27017/afloria", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Basit model
const Product = mongoose.model("Product", {
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

// AdminJS ayarı
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  resources: [Product],
  rootPath: "/admin",
});
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// 🚀 Normal site için ana rota
app.get("/", (req, res) => {
  res.send("<h1>Hoşgeldin Afloria Makeup</h1><p>Siten çalışıyor 🎉</p>");
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
