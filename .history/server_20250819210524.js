import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";

const app = express();
const port = 3000;

// MongoDB bağlantısı (güncel sürümde opsiyonlar kaldırıldı)
mongoose.connect("mongodb://127.0.0.1:27017/afloria");

// Schema
const adminJs = new AdminJS({
  resources: [{
    resource: Product,
    options: {
      properties: {
        name: { isVisible: { list: true, filter: true, show: true, edit: true } },
        price: { isVisible: { list: true, filter: true, show: true, edit: true } },
        desc: { isVisible: { list: true, filter: true, show: true, edit: true } },
        imgs: { 
          type: 'array', 
          isArray: true,
          isVisible: { list: false, filter: false, show: true, edit: true } 
        },
      },
    }
  }],
  rootPath: "/admin",
});


const Product = mongoose.model("Product", productSchema);

// AdminJS
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [{
    resource: Product,
    options: {
      properties: {
        imgs: {
          type: 'array',
          isArray: true
        }
      }
    }
  }],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Normal site için rota
app.get("/", (req, res) => {
  res.send("<h1>Hoşgeldin Afloria Makeup</h1><p>Siten çalışıyor 🎉</p>");
});

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
