import 'dotenv/config';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Ürün modeli
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  desc: String,
  img: String
});
const Product = mongoose.model('Product', productSchema);

// AdminJS ayarları
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  resources: [{ resource: Product }],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

// API endpoint
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
