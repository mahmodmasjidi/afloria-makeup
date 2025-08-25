import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSMongoose from "@adminjs/mongoose";

const app = express();

// --- AdminJS ---
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
});
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// --- Normal site routes ---
app.get("/", (req, res) => {
  res.send("<h1>Hoşgeldin! Burası ana sayfa</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Hakkında Sayfası</h1>");
});

// --- Server başlat ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
