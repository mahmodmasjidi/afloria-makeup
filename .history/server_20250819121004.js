import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Product } from './models/product.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Statik dosyaları sun
app.use(express.static('public'));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// AdminJS setup (zaten ekledin)

// API endpoint
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// HTML sayfayı göster
app.get('/', (req, res) => {
  res.sendFile(new URL('./views/index.html', import.meta.url));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
